const assert = require("assert")
const fs = require("fs")
const path = require("path")
const parse = require("./parse")

const read = (...args) => fs.readFileSync(path.join(__dirname, ...args))

describe("parse.info", function () {
  it("should parse empty string", function () {
    assert.deepEqual(null, parse.info(""))
  })

  it("should parse string", function () {
    const infoEditStdout = read("../../fixtures/info-edit.txt")

    assert.deepEqual(
      {
        localInformation: {
          change: "edit",
          changeset: "950",
          localPath: "D:\\data\\prj\\server\\index.js",
          serverPath: "$/prj/server/index.js",
          type: "file",
        },
        serverInformation: {
          changeset: "950",
          deletionId: "0",
          fileType: "windows-1251",
          lastModified: "Thursday, October 19, 2017 22:34:18",
          lock: "none",
          lockOwner: "",
          serverPath: "$/prj/server/index.js",
          size: "2702",
          type: "file",
        },
      },
      parse.info(infoEditStdout)
    )
  })

  it("should parse when item does not match", function () {
    const infoDoesNotExistStdout = read("../../fixtures/info-does-not-exist.txt")

    assert.deepEqual(
      {
        localInformation: {
          localPath: "D:\\data\\prj\\main.css.map",
        },
      },
      parse.info(infoDoesNotExistStdout)
    )
  })

  it("should ignore === lines", function () {
    const workfoldStdout = read("../../fixtures/workfold.txt")

    assert.deepEqual(
      {
        workspace: "WORKSPACE_1 (Generalov, Evgeniy)",
        collection: "http://tfs.server:8080/tfs/prj_collection",
        collectionItems: {
          "$/prj/server/index.js": "D:\\data\\server\\index.js",
        },
      },
      parse.info(workfoldStdout)
    )
  })
})
