var nodejsModule = require('module');

function patchModule(modName, factory) {
  var mod = require(modName);
  nodejsModule._cache[require.resolve(modName)].exports = factory(mod);
}

module.exports = patchModule;