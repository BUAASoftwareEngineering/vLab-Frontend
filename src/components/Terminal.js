import '../../node_modules/xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import api from './api'

const that = {}
that.socketURL = 'ws://120.53.27.31:'
that.project = {}

function mounted(project, div_id) {
    that.socketURL = 'ws://' + project.ip + ':' + project.terminalPort
    that.project = project
    that.div_id = div_id
    that.project.name = 'project_' + that.project.name
    initSocket()
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
  term.open(document.getElementById(that.div_id))
  const attachAddon = new AttachAddon(that.socket);
  const fitAddon = new FitAddon();
  term.loadAddon(attachAddon);
  term.loadAddon(fitAddon);
  fitAddon.fit();
  term.focus();
  that.term = term
  that.fitAddon = fitAddon
  let ele = document.getElementById(that.div_id)
  new ResizeSensor(ele, fit)
  // runcommand('pkill python3')
  // runcommand('clear')
  window.onresize = function() {
    fit()
  }
}

function initSocket() {
    that.socket = new WebSocket(that.socketURL);
    socketOnClose();
    socketOnOpen();
    socketOnError();
  //   that.socket.onmessage = () => {
  //       that.term.resize()
  //   }
}

function runcommand(command) {
  that.socket.send(new TextEncoder().encode(command + '\r'))
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
  let base = '/build/'
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
  await new Promise((resolve) => {
    api.file_new(id, base + 'Compile.sh', function (obj) {
      resolve(obj)
    })
  })
  await new Promise((resolve) => {
    content = '#!/bin/bash\n\nnow=`pwd`\ncd /build/ && cmake CMakeLists.txt && make\ncd $now\n'
    api.file_update(id, base + 'Compile.sh', content, function(obj) {
      resolve(obj)
    })
  })
  return base + name
}

async function compile(submit) {
  submit.type = that.project.imageType
  let ret = undefined
  that.term.writeln('Compile project begin ...')
  switch (submit.type) {
    case api.CPP:
      ret = await gen_build(that.project.projectId, that.project.name, submit.sources)
      // console.log("4")
      // console.log(ret)
      runcommand('sh /build/Compile.sh')
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
  submit.type = that.project.imageType
  let command = ''
  // that.term.writeln('Run project begin ...')
  switch (submit.type) {
    case api.CPP:
      command = '/build/' + that.project.name
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