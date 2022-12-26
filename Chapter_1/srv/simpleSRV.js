const exportSRV = function(srv) {
    srv.on("magnificentEvent", req => {
      return "Hello " + req.data.msg
    })
  }
  
  module.exports = exportSRV