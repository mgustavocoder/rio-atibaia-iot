import axios from 'axios'
import logger from './logger'
import MQTTClient from './mqtt-client'
import TelemetryDataFetcher from './telemetry-data-fetcher'
import TelemetryDataPublisher from './telemetry-data-publisher'

// TODO: Lambda function
// TODO: Create infra with sam
// TODO: Create infra with terraform
// TODO: Create CI/CD pipeline
// TODO: Diagram in the README with mermaid
export async function run () {
  const mqttClient = new MQTTClient(logger)
  try {
    await mqttClient.connect()
    const fetcher = new TelemetryDataFetcher(logger, axios)
    const publisher = new TelemetryDataPublisher(logger, mqttClient)

    const telemetryData = await fetcher.fetchData()
    await publisher.publishData(telemetryData)
  } catch (error) {
    logger.error(`Error to execute the job: ${error}`)
  } finally {
    await mqttClient.end()
    logger.info('Job ended.')
    process.exit(0)
  }
}

run()
