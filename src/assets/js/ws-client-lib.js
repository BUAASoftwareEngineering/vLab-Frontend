let ip     = "62.234.28.61";
let port   = "8080";


function run_code(userId, code, type, io_init, _this) {
    let ws = create_run_code_ws(userId);
    let codeFile = get_codeFile(code, type);
    let isSend = false
    ws.onopen = () => {
        io_init()
        ws.onclose = () => {
            _this.outpus += '\n[Error] Something wrong happened when running your code!\n'
            if (_this.io_ws && (_this.io_ws.readyState == 1)) {
                _this.io_ws.close()
            }
        }
        ws.send(JSON.stringify(codeFile));
        isSend = true
        // ws.close();
    }
    return ws
}

function create_run_code_ws(userId) {
    let ws = new WebSocket("ws://" + ip + ":" + port + "/run?userId=" + userId);
    return ws;
}

function get_codeFile(code, type) {
    let codeFile = {'code': code, 'type': type};
    return codeFile;
}


// to send input content to server 
// use ws.send('xxx');
function create_io_ws(userId, message_handler) {
    let ws = new WebSocket("ws://" + ip + ":" + port + "/io?userId=" + userId);
    ws.addEventListener("message", message_handler);
    // ws.onmessage = (message) => {
    //     console.log(message)
    // }
    return ws;
}

export default {
    run_code,
    create_io_ws
}