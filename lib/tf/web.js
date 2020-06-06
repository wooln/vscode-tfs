const querystring = require("querystring")

function buildVersionControlUrl(collection, serverPath) {
  const project = encodeURIComponent(serverPath.split("/")[1])
  const fragment = querystring.stringify({
    path: serverPath,
  })
  return `${collection}/${project}/_versionControl?${fragment}`
}

module.exports = {
  buildVersionControlUrl,
}
