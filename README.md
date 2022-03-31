# Rio Atibaia IOT
Fetch Atibaia's River telemetrics data from the website of the Sistema de Alerta a Inundações de São Paulo (SAISP), transforms this data into messages with rain information and river flow and then sends these messages to an MQTT message broker to make possible to use these data in dashboards and MQTT clients.

Monitored sensors:
- Rio Atibaia Captação Valinhos - Valinhos
- Rio Atibaia em Desembargador Furtado - Campinas

## Running locally
- Requires node ^16.0.0
- npm run init
- npm run start

## Running in docker
- Build the image:
    - docker build -t rio-atibaia-iot:latest .
- Start the container
    - docker run rio-atibaia-iot:latest
