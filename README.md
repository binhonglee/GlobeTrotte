# GlobeTrotte

[![GitHub Action](https://github.com/binhonglee/GlobeTrotte/workflows/CI/badge.svg)](https://github.com/binhonglee/GlobeTrotte/actions?query=workflow%3ACI+branch%3Amain)
[![CircleCI](https://circleci.com/gh/binhonglee/GlobeTrotte/tree/main.svg?style=shield)](https://circleci.com/gh/binhonglee/GlobeTrotte/tree/main)
[![Azure Pipelines](https://binhonglee.visualstudio.com/GlobeTrotte/_apis/build/status/binhonglee.GlobeTrotte?branchName=main)](https://binhonglee.visualstudio.com/GlobeTrotte/_build/latest?definitionId=1&branchName=main)
[![codecov](https://codecov.io/gh/binhonglee/GlobeTrotte/branch/main/graph/badge.svg?token=H3UDTCtJoy)](https://codecov.io/gh/binhonglee/GlobeTrotte)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/binhonglee/GlobeTrotte.svg)](https://app.snyk.io/org/binhonglee/project/c9cff2be-f8f8-4db5-b687-1b69865cade9/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbinhonglee%2FGlobeTrotte.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbinhonglee%2FGlobeTrotte?ref=badge_shield)

[![Codacy](https://api.codacy.com/project/badge/Grade/4f01a8a8e4694a8d9c0bef49ed3a8058)](https://app.codacy.com/project/binhonglee/GlobeTrotte/dashboard)
[![CodeFactor](https://www.codefactor.io/repository/github/binhonglee/globetrotte/badge)](https://www.codefactor.io/repository/github/binhonglee/globetrotte)
[![CodeClimate](https://api.codeclimate.com/v1/badges/f7aaf4db648db9bd6188/maintainability)](https://codeclimate.com/github/binhonglee/GlobeTrotte/maintainability)
[![Go Report Card](https://goreportcard.com/badge/github.com/binhonglee/GlobeTrotte)](https://goreportcard.com/report/github.com/binhonglee/GlobeTrotte)
[![Gitter](https://img.shields.io/gitter/room/binhonglee/GlobeTrotte.svg)](https://gitter.im/binhonglee/GlobeTrotte)

![AGPL-3.0](https://img.shields.io/github/license/binhonglee/GlobeTrotte.svg?logo)
![GitHub last commit](https://img.shields.io/github/last-commit/binhonglee/GlobeTrotte.svg)
![GitHub language count](https://img.shields.io/github/languages/count/binhonglee/GlobeTrotte.svg)
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)

## Requirements

_You can install all these requirements with `./scripts/setup.sh` if needed._

- [go](https://golang.org/)
- [node](https://nodejs.org/en/)
  - [pnpm](https://pnpm.js.org/)
- [please](https://please.build) (optional)
- [postgresql](https://www.postgresql.org/)
- [shellcheck](https://github.com/koalaman/shellcheck) (Shell script lint)

\*_Note: Replace `plz` with `./pleasew` if you do not have please installed._

## Setup

```
./scripts/setup.sh
```

You might want to pay attention to the console. If something went wrong (or throws an error), feel free to file an issue.

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


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbinhonglee%2FGlobeTrotte.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbinhonglee%2FGlobeTrotte?ref=badge_large)