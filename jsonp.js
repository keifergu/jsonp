(function wrap(global) {
  var jsonp = {};
  jsonp.get = function get(src, callback) {
    var script = document.createElement("script")
    script.src = src
    window.callback = callback
  }
})(window)