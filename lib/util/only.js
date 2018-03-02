module.exports = function only(fn) {
  let isBusy = false

  return async function() {
    if (!isBusy) {
      try {
        isBusy = true
        const res = await fn.apply(this, arguments)
        isBusy = false
        return res
      } catch (err) {
        isBusy = false
        throw err
      }
    }
  }
}
