# TFS extension for Visual Studio Code
**Visual Studio Code Team Foundation Server integration** _&nbsp; ― &nbsp; This is a work in progress..._

[![Build Status](https://travis-ci.org/ivangabriele/vscode-tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/vscode-tfs)
[![NPM Version](https://img.shields.io/npm/v/vscode-tfs.svg?style=flat)](https://www.npmjs.org/package/vscode-tfs)
[![NPM Downloads](https://img.shields.io/npm/dm/vscode-tfs.svg?style=flat)](https://www.npmjs.org/package/vscode-tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/vscode-tfs.svg)](https://david-dm.org/ivangabriele/vscode-tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/vscode-tfs/dev-status.svg)](https://david-dm.org/ivangabriele/vscode-tfs#info=devDependencies)

Mar

---

## Important !

> **You MUST have Visual Studio installed with Team Foundation Server Power Tools or Team Foundation Server.**

## About TFS permissions

To be able to use this plugin as is, you also need to be able to execute 'TF.exe' commands in your favorite CLI without any login window. It may be planned to implement an auto `/login` to avoid that but this would be highly unsafe to store your login and password into settings.

## Available commands

- **GET**

## Roadmap

- **AUTO CHECKOUT FOR EDIT** to be able to edit files without unchecking "Read-only" files property
- **CHECKIN** command implementation
- **UNDO** command implementation

#### Links

- [Visual Studio Code TFS extension on Visual Studio Market Place](https://marketplace.visualstudio.com/items/ivangabriele.vscode-tfs)
