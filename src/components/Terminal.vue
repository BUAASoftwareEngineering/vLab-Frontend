<template>
    <div>
    <div>
        <button @click="fitin()">fitin</button>
    </div>
    <div id="xterm" class="xterm" />
    </div>
</template>

<script>
import '../../node_modules/xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: 'ws://120.53.27.31:32809'
      // default: 'ws://127.0.0.1:4000'
    },
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cols: 92,
        rows: 40,
        cursorBlink: true,
        scrollback: 800, 
        tabStopWidth: 8, 
        screenKeys: true
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById('xterm'));
      fitAddon.fit();
      term.focus();
      //term.fit()
      this.term = term
      let _this = this
      window.onresize = function() {
        fitAddon.fit();
        term.focus();
        //term.scrollToButtom();
      }
      // setTimeout(function() {
      //   //console.log('wtf')
      //   _this.socket.send(new TextEncoder().encode("\x00  \r"))
      // }, 2000)
      
    },
    fitin() {
        this.socket.send(new TextEncoder().encode("\x00ls\r"))
    },
    initSocket() {
      this.socket = new WebSocket(this.socketURI);
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
    //   this.socket.onmessage = () => {
    //       this.term.resize()
    //   }
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    }
  }
}
</script>