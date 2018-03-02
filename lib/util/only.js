module.exports = function only(fn) {
  let isBusy = false

  return async function() {
    if (!isBusy) {
      isBusy = true
      try {
        return await fn.apply(this, arguments)
      } finally {
        isBusy = false
      }
    }
  }
}
