(function wrap(global) {
  var jsonp = {};

  function callbackWrapper(callback) {
    return function (data) {
      callback(data)
    }
  }

  jsonp.get = function get(src, callback) {
    var script = document.createElement("script")
    script.onload = function () {
      script.parentNode.removeChild(script)
    }
    script.onerror = function () {
      
    }
    script.src = src
    window.callback = callbackWrapper(callback)
    document.body.appendChild(script)
  }

  global.jsonp = jsonp

})(window)