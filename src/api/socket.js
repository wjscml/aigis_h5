class WebSocketClass {
    constructor (name = 'default', data, msgCallback) {
      this.data = data
      this.msgCallback = msgCallback
      this.name = name
      this.ws = null // websocket对象
      this.status = null // websocket是否关闭
    }
    connect () {
      let loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';  
      // 新建 WebSocket 实例
      const wsuri = 'wss://aigis.leadfintech.com/wss'
      this.ws = new WebSocket(wsuri)
      this.ws.onopen = () => {
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'none';
        // 连接ws成功回调
        this.status = 'open'
        // console.log(`${this.name}连接成功`, e)
        this.heartCheck()
        if (this.data !== undefined) {
          // 有要传的数据,就发给后端
          return this.ws.send(JSON.stringify(this.data))
        }
      }
      // 监听服务器端返回的信息
      this.ws.onmessage = e => {
        // 把数据传给回调函数，并执行回调
        if (e.data === 'pong') {
          this.pingPong = 'pong' // 服务器端返回pong,修改pingPong的状态
        } else {
          return this.msgCallback(JSON.parse(e.data))
        }
      }
      // ws关闭回调
      this.ws.onclose = e => {
        this.closeHandle(e) // 判断是否关闭
      }
      // ws出错回调
      this.onerror = e => {
        this.closeHandle(e) // 判断是否关闭
      }
    }
    heartCheck () {
      this.pingPong = 'ping' // ws的心跳机制状态值
      this.pingInterval = setInterval(() => {
        if (this.ws.readyState === 1) {
          // 检查ws为链接状态 才可发送
          this.ws.send('ping') // 客户端发送ping
        }
      }, 60000)
      this.pongInterval = setInterval(() => {
        // this.pingPong = false
        if (this.pingPong === 'ping') {
          this.closeHandle('pingPong没有改变为pong') // 没有返回pong 重启webSocket
        }
        // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
        // console.log('返回pong')
        this.pingPong = 'ping'
      }, 120000)
    }
    // 发送信息给服务器
    sendHandle (data) {
      // console.log(`${this.name}发送消息给服务器:`, data)
      return this.ws.send(data)
    }
    closeHandle () {
      // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
      if (this.status !== 'close') {
        // console.log(`${this.name}断开，重连websocket`, e)
        if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
          // 清除定时器
          clearInterval(this.pingInterval)
          clearInterval(this.pongInterval)
        }
        this.connect() // 重连
      } else {
        // console.log(`${this.name}websocket手动关闭`)
      }
    }
    // 手动关闭WebSocket
    closeMyself () {
      // console.log(`关闭${this.name}`)
      this.status = 'close'
      return this.ws.close()
    }
}
  
export default WebSocketClass
  