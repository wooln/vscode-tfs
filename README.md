# TFS extension for Visual Studio Code
**Visual Studio Code Team Foundation Server integration** _&nbsp; ― &nbsp; This is a work in progress..._

[![Build Status](https://travis-ci.org/ivangabriele/vscode-tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/vscode-tfs)
[![NPM Version](https://img.shields.io/npm/v/vscode-tfs.svg?style=flat)](https://www.npmjs.org/package/vscode-tfs)
[![NPM Downloads](https://img.shields.io/npm/dm/vscode-tfs.svg?style=flat)](https://www.npmjs.org/package/vscode-tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/vscode-tfs.svg)](https://david-dm.org/ivangabriele/vscode-tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/vscode-tfs/dev-status.svg)](https://david-dm.org/ivangabriele/vscode-tfs#info=devDependencies)

---

## Important !

> **You MUST have Team Foundation Server Power Tools installed to be able to use this extension.**

## Available commands

- **CHECKIN**
- **CHECKOUT**
- **GET**
- **HISTORY**
- **UNDO**

## Contribute to development

You need to be at ease with NodeJS language and Git usage.

    git clone https://github.com/ivangabriele/vscode-tfs.git
    cd vscode-tfs
    npm install
    npm install grunt-cli -g
    grunt githooks

The last command create a `pre-commit` hook to ensure that you don't commit anything if it the tests are not successful.

## Roadmap

- **AUTO CHECKOUT FOR EDIT** to be able to edit files without unchecking "Read-only" files property
- **CHECKIN** command implementation
- **UNDO** command implementation

#### Links

- [Visual Studio Code TFS extension on Visual Studio Market Place](https://marketplace.visualstudio.com/items/ivangabriele.vscode-tfs)
