import TelemetryDataFetcher from '../src/telemetry-data-fetcher'
import fetchCsvResponse from './mocks/fetch-csv-response'
import expectedResponse from './mocks/expected-response'

describe('Telemetry Data Fetcher Unit Tests.', () => {
  test('Properly parses the csv data to messages.', async () => {
    const loggerMock = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      trace: jest.fn()
    }

    const httpClientMock = {
      get: jest.fn(() => Promise.resolve(fetchCsvResponse))
    }

    const telemetryDataFetcher = new TelemetryDataFetcher(loggerMock, httpClientMock)
    const telemetryData = await telemetryDataFetcher.fetchData()
    expect(telemetryData).toEqual(expectedResponse)
  })
})
