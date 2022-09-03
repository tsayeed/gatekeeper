const bindings = new Map()

function bind(qualifier, resolver) {
  const _idx = typeof qualifier === 'symbol' ? qualifier : Symbol.for(qualifier)
  bindings.set(_idx, resolver)
}

function resolve(qualifier) {
  const _idx = typeof qualifier === 'symbol' ? qualifier : Symbol.for(qualifier)
  if (bindings.has(_idx)) {
    return bindings.get(_idx)()
  }
  throw new Error(`Binding not found for ${qualifier}`)
}

function depends(qualifier) {
  const res = resolve
  return {
    resolve() {
      return res(qualifier)
    },
  }
}

module.exports = { bind, resolve, depends }
