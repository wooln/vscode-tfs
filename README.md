# TFS extension for Visual Studio Code
**TFS Atom integration** _&nbsp; ― &nbsp; This is a work in progress..._

[![Build Status](https://travis-ci.org/ivangabriele/vsc-tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/vsc-tfs)
[![NPM Version](https://img.shields.io/npm/v/vsc-tfs.svg?style=flat)](https://www.npmjs.org/package/vsc-tfs)
[![NPM Downloads](https://img.shields.io/npm/dm/vsc-tfs.svg?style=flat)](https://www.npmjs.org/package/vsc-tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/vsc-tfs.svg)](https://david-dm.org/ivangabriele/vsc-tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/vsc-tfs/dev-status.svg)](https://david-dm.org/ivangabriele/vsc-tfs#info=devDependencies)

---

## Important !

> **You MUST have Visual Studio 2010 or above installed with Team Foundation Server.**

## About TFS permissions

To be able to use this plugin as is, you also need to be able to execute 'TF.exe' commands in your favorite CLI without any login window. It may be planned to implement an auto `/login` to avoid that but this would be highly unsafe to store your login and password into settings.

## Available commands

- **GET**

## Roadmap

- **AUTO CHECKOUT FOR EDIT** to be able to edit files without unchecking "Read-only" files property
- **CHECKIN** command implementation
- **UNDO** command implementation
