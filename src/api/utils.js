const toSnakeCase = (text) =>
  text
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

const TransformOptions = Object.freeze({
  include: null,
  exclude: null,
  transform: null,
  snakeCase: false,
  camelCase: false,
})

function transform(obj, options = TransformOptions) {
  obj = options.transform ? options.transform(obj) : obj
  let includes = options.include
  let excludes = options.exclude

  if (includes && excludes)
    throw new Error('Both include and exclude can not be set')

  const keyMapper = options.snakeCase
    ? toSnakeCase
    : options.camelCase
    ? toCamel
    : (str) => str

  if (includes) {
    return includes.reduce(
      (prev, curr) => ({ ...prev, [keyMapper(curr)]: obj[curr] }),
      {}
    )
  }
  if (excludes) {
    const excluded = new Set(excludes)
    return Object.keys(obj).reduce(
      (prev, curr) =>
        curr in excluded ? prev : { ...prev, [keyMapper(curr)]: obj[curr] },
      {}
    )
  }
}

function validate(schema, key) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[key])
    if (error) {
      res.status(422).json({
        error: {
          message: 'The request is invalid. Please provide a valid request',
          details: error.details,
        },
      })
    }
    req[key] = value
    next()
  }
}

function resolveDependencies(dependencies) {
  return (req, res, next) => {
    req.context = { ...req.context }
    for (let [arg, dep] of Object.entries(dependencies)) {
      req.context[arg] = dep.resolve()
    }
    next()
  }
}

function registerResource(router, resource, url = undefined) {
  url = url ?? resource.url
  const routes = router.route(url)
  for (let method of ['get', 'post', 'put', 'patch', 'delete']) {
    const action = resource[method]
    if (!action) continue

    // defined handlers
    const handlers = [...(action.handlers ?? [])]
    // validators
    if (action.query) {
      handlers.push(validate(action.query, 'query'))
    }
    if (action.body) {
      handlers.push(validate(action.body, 'body'))
    }

    if (action.dependencies) {
      handlers.push(resolveDependencies(action.dependencies))
    }
    // actual controller method
    handlers.push(action.handler)

    // add to router
    routes[method](handlers)
  }
}

module.exports = { transform, registerResource }
