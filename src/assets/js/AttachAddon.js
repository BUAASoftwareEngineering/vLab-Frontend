// "use strict";
import bridge from '../../components/bridge'
var timer = undefined
const that = {
    show: true,
    matches: {},
    cansend: true,
    onlyRead: false
}
// Object.defineProperty(exports, "__esModule", { value: true });
var AttachAddon = (function () {
    function AttachAddon(socket, options) {
        this._disposables = [];
        this._socket = socket;
        this._socket.binaryType = 'arraybuffer';
        that.show = true
        that.matches = {}
        let _this = this
        setMatch('root@[^:]+', function(str) {
            setMatch(str, function(str2) {
                if (that.onlyRead) {
                    that.cansend = false
                }
            })
            disposeMatch('root@[^:]+')
        })
        this._bidirectional = (options && options.bidirectional === false) ? false : true;
    }
    AttachAddon.prototype.activate = function (terminal) {
        var _this = this;
        this._disposables.push(addSocketListener(this._socket, 'message', function (ev) {
            var data = ev.data;
            if (that.show) {
                terminal.write(typeof data === 'string' ? data : new Uint8Array(data));
            }
            if (typeof data === 'string') {
                for (let match in that.matches) {
                    if (that.matches[match]) {
                        let Reg = new RegExp(match,"g")
                        let result = ''
                        while ((result = Reg.exec(data)) !== null) {
                            if (that.matches[match]) {
                                that.matches[match](result[0])
                            }
                            
                        }
                    }
                }
            }
            // console.log(data)
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function() {
                bridge.$emit("FleshFilesTree")
            }, 1000)
        }));
        if (this._bidirectional) {
            this._disposables.push(terminal.onData(function (data) { return _this._sendData(data); }));
            this._disposables.push(terminal.onBinary(function (data) { return _this._sendBinary(data); }));
        }
        this._disposables.push(addSocketListener(this._socket, 'close', function () { return _this.dispose(); }));
        this._disposables.push(addSocketListener(this._socket, 'error', function () { return _this.dispose(); }));
    };
    AttachAddon.prototype.dispose = function () {
        that.show = true
        that.matches = {}
        that.cansend = true
        that.onlyRead = false
        this._disposables.forEach(function (d) { return d.dispose(); });
    };
    AttachAddon.prototype._sendData = function (data) {
        if (this._socket.readyState !== 1) {
            return;
        }
        if ((that.show) && (that.cansend)) {
            this._socket.send(data);
        }
    };
    AttachAddon.prototype._sendBinary = function (data) {
        if (this._socket.readyState !== 1) {
            return;
        }
        var buffer = new Uint8Array(data.length);
        for (var i = 0; i < data.length; ++i) {
            buffer[i] = data.charCodeAt(i) & 255;
        }
        if ((that.show) && (that.cansend)) {
            this._socket.send(buffer);
        }
    };
    return AttachAddon;
}());

// exports.AttachAddon = AttachAddon;
function addSocketListener(socket, type, handler) {
    socket.addEventListener(type, handler);
    return {
        dispose: function () {
            if (!handler) {
                return;
            }
            socket.removeEventListener(type, handler);
        }
    };
}

function setShowable(flag) {
    that.show = flag
}

function setMatch(match, callback) {
    that.matches[match] = callback
}

function disposeMatch(match) {
    if (that.matches[match]) {
        that.matches[match] = undefined
    }
}

function openSend() {
    that.cansend = true
}

function setOnlyRead() {
    that.onlyRead = true
}

export default {
    AttachAddon,
    setShowable,
    setMatch,
    disposeMatch,
    openSend,
    setOnlyRead
}
//# sourceMappingURL=AttachAddon.js.map