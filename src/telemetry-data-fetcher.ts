import dataSource from './data-source'

export default class TelemetryDataFetcher {
  private httpClient: any
  private logger: any

  constructor (logger: any, httpClient: any) {
    this.httpClient = httpClient
    this.logger = logger
  }

  async fetchData () {
    const fetchResponse = await this.requestData()
    const telemetryData = this.parseFetchResponse(fetchResponse)
    const formatetedData = this.formatData(telemetryData)
    this.logger.debug(`Telemetry data fetched: ${JSON.stringify(formatetedData)}`)
    return formatetedData
  }

  private async requestData () {
    const fetchPromises = dataSource.map(source => this.httpClient.get(source.url))
    return Promise.all(fetchPromises)
  }

  private parseFetchResponse (fetchResponse: any) {
    return fetchResponse.map((response: any, index: any) => {
      this.logger.trace(response.data)
      const dataSlice = response.data.split(';').splice(11, 10)
      const dateTime = new Date(dataSlice[2].replace('\n', '').replace('"', '').replace('"', '')).toISOString()
      const rain = dataSlice[3]
      const flow = dataSlice[5]
      return {
        dateTime,
        rain,
        flow,
        locationCode: dataSource[index].locationCode
      }
    })
  }

  private formatData (telemetryData: any) {
    return telemetryData.map((telemetryData: any) => ({
      rainGauge: {
        description: 'Rain Gauge',
        locationCode: telemetryData.locationCode,
        dateTime: telemetryData.dateTime,
        unit: 'PLU',
        value: String(parseFloat(('0' + telemetryData.rain).replace(',', '.')))
      },
      flowMeter: {
        description: 'Flow Meter',
        locationCode: telemetryData.locationCode,
        dateTime: telemetryData.dateTime,
        unit: 'Q',
        value: String(parseFloat('0' + telemetryData.flow.replace(',', '.')))
      }
    }))
  }
}
