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
    const promises = telemetryData.map((data: any) => this.publishToMQTT(data))
    await Promise.all(promises)
  }

  private async publishToMQTT (data: any) {
    const rainTopic = `${TOPIC}/rain/${data.rainGauge.locationCode}`
    await this.mqttClient.publish(rainTopic, data.rainGauge.value)
    const rainTimeTopic = `${TOPIC}/rain/time/${data.rainGauge.locationCode}`
    await this.mqttClient.publish(rainTimeTopic, data.rainGauge.dateTime)
    const flowTimeTopic = `${TOPIC}/flow/time/${data.flowMeter.locationCode}`
    await this.mqttClient.publish(flowTimeTopic, data.flowMeter.dateTime)
    const flowTopic = `${TOPIC}/flow/${data.flowMeter.locationCode}`
    await this.mqttClient.publish(flowTopic, data.flowMeter.value)
    this.logger.info(`Published rain data to MQTT: topic ${rainTopic} date: ${data.rainGauge.dateTime} value: ${data.rainGauge.value}`)
    this.logger.info(`Published flow data to MQTT: topic ${flowTopic} date: ${data.flowMeter.dateTime} value: ${data.flowMeter.value}`)
  }
}
