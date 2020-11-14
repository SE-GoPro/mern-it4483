const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@services': 'src/services',
    '@utils' : 'src/utils'
  })(config)

  return config
}