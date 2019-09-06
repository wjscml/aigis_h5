const proxy = require("http-proxy-middleware")

module.exports = function(app) {
    app.use(proxy("^~ /websocket", {
        target: "https://aigis.leadfintech.com/wss",
        ws: true,
        changeOrigin: true
    }))
    app.use(proxy("/apis", {
        target: "https://aigis.leadfintech.com",
        changeOrigin: true
    }))
}