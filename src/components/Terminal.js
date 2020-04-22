import '../../node_modules/xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import api from './api'

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

function runcommand(command) {
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

async function gen_build(id, name, sources) {
  let base = '/home/user/build/'
  let content = 'cmake_minimum_required(VERSION 3.10)\n\n'
  content = await new Promise ((resolve) => {
    api.dir_new(id, base, function () {
      // console.log("1")
      content += 'project(' + name + ')\n\n'
      content += 'add_executable(' + name + '\n'
      for (let i = 0; i < sources.length; i += 1) {
        content += '\t' + sources[i]
        if (i != sources.length - 1) {
          content += '\n'
        }
      }
      content += ')\n'
      resolve(content)
    })
  })
  await new Promise ((resolve) => {
    api.file_new(id, base + 'CMakeLists.txt', function (obj) {
      // console.log("2")
      resolve(obj)
    })
  })
  await new Promise ((resolve) => {
    api.file_update(id, base + 'CMakeLists.txt', content, function (obj) {
      // console.log("3")
      // console.log(obj)
      resolve(obj)
    })
  })
  return base + name
}

async function compile(submit) {
  let ret = undefined
  switch (submit.type) {
    case api.CPP:
      ret = await gen_build(submit.project_id, submit.project_name, submit.sources)
      // console.log("4")
      // console.log(ret)
      runcommand('cd /home/user/build/ && cmake CMakeLists.txt && make')
      // runcommand('cmake CMakeLists.txt')
      // runcommand('make')
      break;
    case api.PYTHON3:

      break;
    default:
      break;
  }
  return ret
}

function run (submit) {
  let command = ''
  switch (submit.type) {
    case api.CPP:
      command = submit.exec
      if (submit.args) {
        for (let i = 0; i < submit.args.length; i += 1) {
          command += ' ' + args[i]
        }
      }
      runcommand(command)
      break;
    case api.PYTHON3:
      command = 'python3 ' + submit.exec
      if (submit.args) {
        for (let i = 0; i < submit.args.length; i += 1) {
          command += ' ' + args[i]
        }
      }
      runcommand(command)
      break
    default:
      break;
  }
}

export default {
  mounted,
  fit,
  run,
  compile
}