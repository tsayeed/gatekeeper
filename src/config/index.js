function getEnv(varName, defaultVal = undefined) {
  const value = process.env[varName] ?? defaultVal
  if (value === undefined) throw new Error(`Missing env value ${varName}`)
  return value
}

module.exports = Object.freeze({
  NODE_ENV: getEnv('NODE_ENV', 'local'),
  PORT: getEnv('PORT', 3000),
  HOST: getEnv('HOST', '0.0.0.0'),
  // DB_HOST: getEnv('DB_HOST'),
  // DB_USER: getEnv('DB_USER'),
  // DB_PASSWORD: getEnv('DB_PASSWORD'),
  // DB_NAME: getEnv('DB_NAME'),
})
