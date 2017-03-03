# TFS extension for Visual Studio Code
**Visual Studio Code Team Foundation Server integration**

[![Build Status](https://travis-ci.org/ivangabriele/vscode-tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/vscode-tfs)
[![npm version](https://badge.fury.io/js/vscode-tfs.svg)](https://badge.fury.io/js/vscode-tfs)
[![dependencies Status](https://david-dm.org/ivangabriele/vscode-tfs/status.svg)](https://david-dm.org/ivangabriele/vscode-tfs)
[![devDependencies Status](https://david-dm.org/ivangabriele/vscode-tfs/dev-status.svg)](https://david-dm.org/ivangabriele/vscode-tfs?type=dev)
[![NSP Status](https://nodesecurity.io/orgs/ivan-gabriele/projects/06083557-7055-4c2d-a1f0-e9f10c671faf/badge)](https://nodesecurity.io/orgs/ivan-gabriele/projects/06083557-7055-4c2d-a1f0-e9f10c671faf)

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

- **Automatic Checkout (for Edit)** when a file is modified.

### List of available commands

- **Add**
- **Checkin**
- **Get (entire workspace)**
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
