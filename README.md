## Hexlet tests, maintenance and tests coverage:
[![Actions Status](https://github.com/vlad1slove1/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/vlad1slove1/frontend-project-lvl2/actions)
[![Node.js Package](https://github.com/vlad1slove1/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/vlad1slove1/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/43dd356ce76f5118988c/maintainability)](https://codeclimate.com/github/vlad1slove1/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/43dd356ce76f5118988c/test_coverage)](https://codeclimate.com/github/vlad1slove1/frontend-project-lvl2/test_coverage)

## Description:

The following repository contains gendiff function. It compares two configuration files and shows a difference. Function works with *.yml* *.yaml* and *.json* formats.

## Setup:

1) Fork this repo by SSH key:

```
git@github.com:vlad1slove1/frontend-project-lvl2.git
```

2) Install depencies:

```sh
make install
```

3) Link the package to execute gendiff function:

```sh
make link
```

4) Display help:

```sh

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           output usage information
      
```     

## Run tests:

1) Run linter:

```sh
make lint
```

2) Run test:

```sh
make test
```

3) Get test coverage:

```sh
make test-coverage
```

## ascii:

**display help and gendiff wit flat files**
[![asciicast](https://asciinema.org/a/474275.svg)](https://asciinema.org/a/474275)

**gendiff with nested files**
[![asciicast](https://asciinema.org/a/478361.svg)](https://asciinema.org/a/478361)

**plain format of gendiff**
[![asciicast](https://asciinema.org/a/478779.svg)](https://asciinema.org/a/478779)
