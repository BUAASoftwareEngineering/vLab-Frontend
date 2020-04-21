import '../../node_modules/xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

const that = {}
that.socketURL = 'ws://120.53.27.31:'

function mounted(port) {
    initSocket(port)
}

function beforeDestroy() {
  that.socket.close()
  that.term.dispose()
}

function initTerm() {
  const term = new Terminal({
    fontSize: 14,
    cursorBlink: true,
    scrollback: 800, 
    tabStopWidth: 8, 
    screenKeys: true
  });
  term.open(document.getElementById('shell'))
  const attachAddon = new AttachAddon(that.socket);
  const fitAddon = new FitAddon();
  term.loadAddon(attachAddon);
  term.loadAddon(fitAddon);
  fitAddon.fit();
  term.focus();
  that.term = term
  that.fitAddon = fitAddon
  let ele = document.getElementById('shell')
  new ResizeSensor(ele, fit)
  window.onresize = function() {
    fit()
  }
}

function initSocket(port) {
    that.socket = new WebSocket(that.socketURL+port);
    socketOnClose();
    socketOnOpen();
    socketOnError();
  //   that.socket.onmessage = () => {
  //       that.term.resize()
  //   }
}

function run(command) {
  that.socket.send(new TextEncoder().encode('\x00' + command + '\r'))
}

function socketOnOpen() {
    that.socket.onopen = () => {
      // 链接成功后
      initTerm()
    }
}

function socketOnClose() {
    that.socket.onclose = () => {
      // console.log('close socket')
    }
}

function socketOnError() {
    that.socket.onerror = () => {
      // console.log('socket 链接失败')
    }
}

function fit() {
  that.fitAddon.fit()
  that.term.focus()
  that.term.scrollToBottom()
}

function compile(submit) {
  if (submit.type) {
    
  }
}


export default {
  mounted,
  fit,
  run
}