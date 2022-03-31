import mqtt from 'mqtt'
import env from 'env-var'

export default class MQTTClient {
    private logger: any
    private client: any

    constructor (logger: any) {
      this.logger = logger
    }

    async connect () {
      return new Promise((resolve, reject) => {
        this.client = mqtt.connect(env.get('MQTT_URL').required().asString())
        this.client.on('connect', () => {
          this.logger.info('MQTT Client connected')
          resolve(true)
        })
        this.client.on('error', (error: any) => {
          this.logger.error(`Error to connect: ${error}`)
          reject(error)
        })
      })
    }

    async publish (topic: string, value: string) {
      const options = {
        qos: env.get('MQTT_QOS').required().asIntPositive(),
        retain: env.get('MQTT_RETAIN').required().asBool()
      }

      const response = await this.client.publish(topic, value, options)
      if (!response.connected) {
        throw new Error('MQTT Client not connected')
      }
      return response
    }

    async end () {
      return new Promise((resolve, reject) => {
        this.client.end()
        this.client.on('close', () => {
          this.logger.info('MQTT Client disconnected')
          resolve(true)
        })
        this.client.on('error', (error: any) => {
          this.logger.error(`Error to disconnect: ${error}`)
          reject(error)
        })
      })
    }
}
