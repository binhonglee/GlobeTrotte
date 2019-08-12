# GlobeTrotte

[![CircleCI](https://circleci.com/gh/binhonglee/GlobeTrotte/tree/master.svg?style=shield)](https://circleci.com/gh/binhonglee/GlobeTrotte/tree/master)
[![codecov](https://codecov.io/gh/binhonglee/GlobeTrotte/branch/master/graph/badge.svg?token=H3UDTCtJoy)](https://codecov.io/gh/binhonglee/GlobeTrotte)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/binhonglee/GlobeTrotte.svg)](https://app.snyk.io/org/binhonglee/project/c9cff2be-f8f8-4db5-b687-1b69865cade9/)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0078733b53a49e08d5b1281d359a94c)](https://app.codacy.com/project/binhonglee/GlobeTrotte/dashboard)
[![CodeFactor](https://www.codefactor.io/repository/github/binhonglee/globetrotte/badge)](https://www.codefactor.io/repository/github/binhonglee/globetrotte)
[![Maintainability](https://api.codeclimate.com/v1/badges/f7aaf4db648db9bd6188/maintainability)](https://codeclimate.com/github/binhonglee/GlobeTrotte/maintainability)
[![Gitter](https://img.shields.io/gitter/room/binhonglee/GlobeTrotte.svg)](https://gitter.im/binhonglee/GlobeTrotte)

![GitHub](https://img.shields.io/github/license/binhonglee/GlobeTrotte.svg?logo)
![GitHub last commit](https://img.shields.io/github/last-commit/binhonglee/GlobeTrotte.svg)
![GitHub language count](https://img.shields.io/github/languages/count/binhonglee/GlobeTrotte.svg)
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)

## Requirements

*You can install all these requirements with `./scripts/setup.sh` if needed.*

- [go](https://golang.org/)
  - [goformat](https://github.com/mbenkmann/goformat) (Go files lint)
- [Nim](https://nim-lang.org/)
  - [choosenim](https://github.com/dom96/choosenim)
- [node](https://nodejs.org/en/)
  - [pnpm](https://pnpm.js.org)
- [please](https://please.build) (optional)
- [postgresql](https://www.postgresql.org/)
- [shellcheck](https://github.com/koalaman/shellcheck) (Shell script lint)

\*_Note: Replace `plz` with `./pleasew` if you do not have please installed._

## Setup

1. Run `./scripts/setup.sh`
2. (If you have not already,) create a Postgres DB for the project.
3. Fill in your PostgreSQL credentials in `config/psql.config`.

## Build

```txt
plz build
```

## Run

Server:

```txt
plz work
```

Frontend:

```txt
plz show
```

## Test & Lint

```txt
plz test --no-cache
```

## Editor support

Just so vscode would stop complaining about missing Go libraries. (You will still need to run `plz build` to populate the libraries.)

```txt
plz vscode
```
