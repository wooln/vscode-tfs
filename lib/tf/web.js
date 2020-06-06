const querystring = require("querystring")

function buildVersionControlUrl(collection, serverPath) {
  const fragment = querystring.stringify({
    path: serverPath,
  })
  return `${collection}/_versionControl#${fragment}`
}

module.exports = {
  buildVersionControlUrl,
}
