'use sctrict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  // Definir las relaciones entre modelos
  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  // Validar la configuracionde la base de datos
  await sequelize.authenticate()

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
