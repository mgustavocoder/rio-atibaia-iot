import axios from 'axios'
import dataSource from './data-source'
import logger from './logger'

export async function run () {
  const sensors = []
  for await (let source of dataSource) {
    const { status, data } = await axios.get(source.url)
    if (status === 200) {
      const dataSlice = data.split(';').splice(11, 10)
      const rain = dataSlice[3]
      const flow = dataSlice[5]

      sensors.push({
        description: 'Rain Gauge',
        code: `${source.code}-PLU`,
        value: parseFloat(('0' + rain).replace(',', '.'))
      })

      sensors.push({
        description: 'Flow Meter',
        code: `${source.code}-Q`,
        value: parseFloat('0' + flow.replace(',', '.'))
      })
    }
  }

  logger.info(`Sensors - ${JSON.stringify(sensors)}`)
}

run()
