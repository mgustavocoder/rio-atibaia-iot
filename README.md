# .

## Tooling
- Jest for tests.
- Eslint with standard shareable config for lint.
- Husky as pre-commit checker (test, lint, audit).
- dotenv with **Dev** and **Prod** env files.
- Dockerfile
- VSCode Debbuger
- Github Actions Quality Check (test, lint, audit)

## Running locally
- Requires node ^16.0.0
- npm run init
- npm run start:dev

## Running in docker
- Build the image:
    - docker build -t rio-atibaia-iot:latest .
- Start the container
    - docker run rio-atibaia-iot:latest
