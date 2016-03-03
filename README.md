# TFS extension for Visual Studio Code
**Visual Studio Code Team Foundation Server integration** _&nbsp; ― &nbsp; This is a work in progress..._

[![Build Status](https://travis-ci.org/ivangabriele/vscode-tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/vscode-tfs)
[![NPM Version](https://img.shields.io/npm/v/vscode-tfs.svg?style=flat)](https://www.npmjs.org/package/vscode-tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/vscode-tfs.svg)](https://david-dm.org/ivangabriele/vscode-tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/vscode-tfs/dev-status.svg)](https://david-dm.org/ivangabriele/vscode-tfs#info=devDependencies)

---

## Important !

> **You MUST have a Visual Studio with Team Foundation Server features to be able to use this extension.**

## Installation

1. Open up VS Code
2. Type **`F1`**
3. Type `ext` in command palette.
4. Select `Extensions: Install Extension` and hit **`ENTER`**
5. Type `tfs`
6. Select **`TFS`** extension and hit **`ENTER`**

## Usage

Hit **`Alt + T`** to list available commands for the current edited file.

## Features

- **Auto Check Out for Edit** when a file is saved

### List of available commands

- **Add**
- **Checkin**
- **Checkout**
- **Get**
- **Status (Pending Changes)**
- **Undo**

## Issues

Please report any issue or comment [here](https://github.com/ivangabriele/vscode-tfs/issues).

## Contribute

To be able to contribute to TFS development, you need to be at ease with **NodeJS** language and **Git** usage.

    git clone https://github.com/ivangabriele/vscode-tfs.git
    cd vscode-tfs
    npm install
    npm install grunt-cli -g
    grunt githooks

The last command create a `pre-commit` hook to ensure that you don't commit anything if tests fail.

## Roadmap

1. **Checkin multiple files**
2. File name in status bar message (when suitable)
3. **Exclude** command

#### Links

- [TFS extension on Github](https://github.com/ivangabriele/vscode-tfs)
- [TFS extension on Visual Studio Market Place](https://marketplace.visualstudio.com/items/ivangabriele.vscode-tfs)
- [MIT Licence](https://github.com/ivangabriele/vscode-tfs/blob/master/LICENCE)
