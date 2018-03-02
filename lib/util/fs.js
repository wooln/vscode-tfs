const fs = require("fs")

const isWritable = fileName =>
  new Promise(resolve => {
    fs.access(fileName, fs.constants.W_OK, err => resolve(!err))
  })

module.exports = {
  isWritable
}
