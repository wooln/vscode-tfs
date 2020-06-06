const fs = require("fs")
const util = require("util")
const winattr = require("winattr")

const attrSet = util.promisify(winattr.set)

const isWritable = (fileName) =>
  new Promise((resolve) => {
    fs.access(fileName, fs.constants.W_OK, (err) => resolve(!err))
  })

module.exports = {
  attrSet,
  isWritable,
}
