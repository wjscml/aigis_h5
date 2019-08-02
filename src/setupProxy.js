const proxy = require("http-proxy-middleware")

module.exports = function(app) {
    app.use(proxy("^~ /websocket", {
        target: "https://aigis.leadfintech.com/wss",
        ws: true,
        changeOrigin: true
    }))
    app.use(proxy("/apis/news", {
        target: "https://api.cnibd.com",
        changeOrigin: true,
        pathRewrite: {
            "^/apis/news": ""
        }
    }))
    app.use(proxy("/apis", {
        target: "https://aigis.leadfintech.com:8888",
        changeOrigin: true,
        pathRewrite: {
            "^/apis": ""
        }
    }))
}