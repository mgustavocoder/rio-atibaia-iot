import env from 'env-var'
import MQTTClient from './mqtt-client'

const TOPIC = env.get('MQTT_TOPIC').required().asString()

export default class TelemetryDataPublisher {
  private mqttClient: MQTTClient
  private logger: any

  constructor (logger: any, mqttClient: MQTTClient) {
    this.mqttClient = mqttClient
    this.logger = logger
  }

  async publishData (telemetryData: any) {
    // const promises = telemetryData.map((data: any) => this.publishToMQTT(data))
    // const response = await Promise.all(promises)
    for await (const data of telemetryData) {
      await this.publishToMQTT(data)
    }
  }

  private async publishToMQTT (data: any) {
    const rainTopic = `${TOPIC}/rain/${data.rainGauge.locationCode}`

    const rainMessage = `${data.rainGauge.dateTime},${data.rainGauge.value}`
    await this.mqttClient.publish(rainTopic, rainMessage)
    const flowTopic = `${TOPIC}/flow/${data.flowMeter.locationCode}`
    const flowMessage = `${data.flowMeter.dateTime},${data.flowMeter.value}`
    await this.mqttClient.publish(flowTopic, flowMessage)
    this.logger.info(`Published rain data to MQTT: topic ${rainTopic} value ${flowMessage}`)
    this.logger.info(`Published flow data to MQTT: topic ${flowTopic} value ${flowMessage}`)
  }
}
