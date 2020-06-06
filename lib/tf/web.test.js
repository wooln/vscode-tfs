const assert = require("assert")
const { buildVersionControlUrl } = require("./web")

describe("tf.web.buildVersionControlUrl", function () {
  it("should build url", function () {
    const collection = "http://server/tfs"
    const serverPath = "$/path/to/main.js"

    assert.equal(
      buildVersionControlUrl(collection, serverPath),
      "http://server/tfs/_versionControl#path=%24%2Fpath%2Fto%2Fmain.js"
    )
  })
})
