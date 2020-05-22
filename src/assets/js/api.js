const server = "https://api.ivlab.xyz:8443"
// const server = "http://114.116.135.181:8081"
// const server = "http://127.0.0.1:3000"
// const server = "http://120.53.27.31:3000"
const CPP = 'CPP'
const PYTHON3 = 'PYTHON3'
const PYTHON2 = 'PYTHON2'
const JAVA = 'JAVA'
const C = 'C'

    
function get_request(url, callback) {
    let http = new XMLHttpRequest()
    http.withCredentials = true
    http.open("GET", url, true)
    http.send()
    http.onreadystatechange = function(data) {
        if (http.readyState == 4 && http.status == 200) {
            if (url.split('?')[0] == server + '/file/download') {
                // console.log(new Buffer(data.currentTarget.response))
                //downloadFile(data.currentTarget.response, 'file.zip')
            } else {
                // console.log('get success')
                var obj = {}
                try {
                    obj = eval("("+http.responseText+")")
                } catch (err) {
                    // console.log(http.responseText)
                }

                if (obj.code == undefined) {
                    obj.code = -100
                }
                if (obj.message == undefined) {
                    obj.message = "Wrong format message!"
                }
                if (obj.data == undefined) {
                    obj.data = {}
                }
                if (url.split('?')[0] == server + '/file/content') {
                    // console.log(new Buffer(obj.data.content))
                    obj.data.content = new TextDecoder('utf-8').decode(new Buffer(obj.data.content))
                }
                callback(obj)
            }
        } else if (http.readyState == 4) {
            // console.log('get fail')
            let code = (http.status == 0) ? -100 : http.status
            // console.log(http.responseText)
            var obj = {
                code: code,
                message: "Http request fail!",
                data: {}
            }
            callback(obj)
        }
        // console.log(obj)
        setTimeout(function() {
            http = null
        }, 500)
    }
}

function post_request(url, data, callback) {
    let http = new XMLHttpRequest()
    http.withCredentials = true
    http.open("POST", url, true)
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    //http.setRequestHeader("Cookie","type=lpx")
    http.send(data)
    http.onreadystatechange = function(data) {
        if (http.readyState == 4 && http.status == 200) {
            // console.log('post success')
            var obj = {}
            try {
                obj = eval("("+http.responseText+")")
            } catch (err) {
                // console.log(http.responseText)
            }
            // console.log(http.getResponseHeader('Set-Cookie'))
            // console.log(document.cookie.length)
            if (obj.code == undefined) {
                obj.code = -100
            }
            if (obj.message == undefined) {
                obj.message = "Wrong format message!"
            }
            if (obj.data == undefined) {
                obj.data = {}
            }
            // console.log(document.cookie)
            callback(obj)
        } else if (http.readyState == 4) {
            // console.log('post fail')
            // console.log(http.responseText)
            let code = (http.status == 0) ? -100 : http.status
            var obj = {
                code: code,
                message: "Http request fail!",
                data: {}
            }
            callback(obj)
        }
        // console.log(obj)
        setTimeout(function() {
            http = null
        }, 500)
    }
}

function user_login(user_name, password, callback) {
    var url = server + '/user/login'
    var data =  'user_name=' + encodeURIComponent(user_name) + 
                '&password=' + encodeURIComponent(password)
    post_request(url, data, callback)
}

function user_logout(callback) {
    var url = server + '/user/logout'
    var data = ''
    post_request(url, data, callback)
}

function user_register(user_name, password, email, captcha, callback) {
    var url = server + '/user/register'
    var data =  'user_name=' + encodeURIComponent(user_name) + 
                '&password=' + encodeURIComponent(password) +
                '&email=' + encodeURIComponent(email) +
                '&captcha=' + encodeURIComponent(captcha)
    post_request(url, data, callback)
}

function user_info_update () {
    var url = server + '/user/info_update'
    let callback = console.log
    if (arguments.length === 3) {
        let user_name = arguments[0]
        let password = arguments[1]
        callback = arguments[2]
        var data =  'user_name=' + encodeURIComponent(user_name) + 
                    '&password=' + encodeURIComponent(password)
    } else {
        let user_name = arguments[0]
        callback = arguments[1]
        var data = 'user_name=' + encodeURIComponent(user_name)
    }
    post_request(url, data, callback)
}

function user_info(callback) {
    var url = server + '/user/info?'
    get_request(url, callback)
}

function project_info(callback) {
    var url = server + '/project/info?'
    get_request(url, callback)
}

function project_info_update(project_id, project_name, callback) {
    var url = server + '/project/info_update'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&project_name=' + encodeURIComponent(project_name)
    post_request(url, data, callback)
}

function project_new(project_name, project_type, callback) {
    var url = server + '/project/new'
    var data =  'project_name=' + encodeURIComponent(project_name) + 
                '&project_type=' + encodeURIComponent(project_type)
    post_request(url, data, callback) 
}

function project_enter(project_id, callback) {
    var url = server + '/project/enter'
    var data = 'project_id=' + encodeURIComponent(project_id)
    post_request(url, data, callback)
}

function project_exit(project_id, callback) {
    var url = server + '/project/exit'
    var data = 'project_id=' + encodeURIComponent(project_id)
    post_request(url, data, callback)
}

function project_delete(project_id, callback) {
    var url = server + '/project/delete'
    var data = 'project_id=' + encodeURIComponent(project_id)
    post_request(url, data, callback)
}

function file_struct(project_id, root_path, callback) {
    var url = server + '/file/struct?project_id=' + encodeURIComponent(project_id) +
                                    '&root_path=' + encodeURIComponent(root_path)
    get_request(url, callback)
}

function file_content(project_id, file_path, callback) {
    var url = server + '/file/content?project_id=' + encodeURIComponent(project_id) + 
                                    '&file_path=' + encodeURIComponent(file_path)
    get_request(url, callback)
}

function file_update(project_id, file_path, file_content, callback) {
    var url = server + '/file/update'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&file_path=' + encodeURIComponent(file_path)
    if (Buffer.isBuffer(file_content)) {
        // console.log('yessss')
        data += '&file_content=' + encodeURIComponent(JSON.stringify(file_content))
    } else {
        data += '&file_content=' + encodeURIComponent(JSON.stringify(Buffer(new TextEncoder('utf-8').encode(file_content))))
    }
    post_request(url, data, callback)
}

function file_new(project_id, file_path, callback) {
    var url = server + '/file/new'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&file_path=' + encodeURIComponent(file_path)
    post_request(url, data, callback)
}

function file_delete(project_id, file_path, callback) {
    var url = server + '/file/delete'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&file_path=' + encodeURIComponent(file_path)
    post_request(url, data, callback)
}

function file_move(project_id, old_path, new_path, force, callback) {
    var url = server + '/file/move'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&old_path=' + encodeURIComponent(old_path) + 
                '&new_path=' + encodeURIComponent(new_path) +
                '&force=' + encodeURIComponent(force)
    post_request(url, data, callback)
}

function file_copy(project_id, old_path, new_path, force, callback) {
    var url = server + '/file/copy'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&old_path=' + encodeURIComponent(old_path) +
                '&new_path=' + encodeURIComponent(new_path) +
                '&force=' + encodeURIComponent(force)
    post_request(url, data, callback)
}

function file_download(project_id, path='') {
    var url = server + '/file/download?project_id=' + encodeURIComponent(project_id) + '&path=' + encodeURIComponent(path)
    let aTag = document.createElement('a')
    aTag.href = url
    aTag.click()
    //get_request(url, callback)
} 

function file_rename(project_id, old_path, new_path, callback) {
    var url = server + '/file/rename'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&old_path=' + encodeURIComponent(old_path) +
                '&new_path=' + encodeURIComponent(new_path)
    post_request(url, data, callback)
}

function dir_new(project_id, dir_path, callback) {
    var url = server + '/dir/new'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&dir_path=' + encodeURIComponent(dir_path)
    post_request(url, data, callback)
}

function dir_delete(project_id, dir_path, callback) {
    var url = server + '/dir/delete'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&dir_path=' + encodeURIComponent(dir_path)
    post_request(url, data, callback)
}

function dir_move(project_id, old_path, new_path, force, callback) {
    var url = server + '/dir/move'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&old_path=' + encodeURIComponent(old_path) +
                '&new_path=' + encodeURIComponent(new_path) +
                '&force=' + encodeURIComponent(force)
    post_request(url, data, callback)
}

function dir_copy(project_id, old_path, new_path, force, callback) {
    var url = server + '/dir/copy'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&old_path=' + encodeURIComponent(old_path) +
                '&new_path=' + encodeURIComponent(new_path) +
                '&force=' + encodeURIComponent(force)
    post_request(url, data, callback)
}

function dir_rename(project_id, old_path, new_path, callback) {
    var url = server + '/dir/rename'
    var data =  'project_id=' + encodeURIComponent(project_id) + 
                '&old_path=' + encodeURIComponent(old_path) +
                '&new_path=' + encodeURIComponent(new_path)
    post_request(url, data, callback)
}

function util_check_username(username, callback) {
    var url = server + '/util/check-username?username=' + encodeURIComponent(username)
    get_request(url, callback)
}

function util_check_email(email, callback) {
    var url = server + '/util/check-email?email=' + encodeURIComponent(email)
    get_request(url, callback)
}

function util_send_captcha(email, callback) {
    var url = server + '/util/send-captcha'
    var data = 'email=' + encodeURIComponent(email)
    post_request(url, data, callback)
}

function share_info(callback) {
    var url = server + '/share/info'
    var data = ''
    post_request(url, data, callback)
}

function share_invite(project_id, user_name, writeable, callback) {
    var url = server + '/share/invite'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&user_name=' + encodeURIComponent(user_name) +
                '&writeable' + encodeURIComponent(writeable)
    post_request(url, data, callback)
}

function share_accept(project_id, callback) {
    var url = server + '/share/accpet'
    var data = 'project_id=' + encodeURIComponent(project_id)
    post_request(url, data, callback)
}

function share_refuse(project_id, callback) {
    var url = server + '/share/refuse'
    var data = 'project_id=' + encodeURIComponent(project_id)
    post_request(url, data, callback)
}


export default {
    user_login,
    user_logout,
    user_register,
    user_info_update,
    user_info,
    project_info,
    project_info_update,
    project_new,
    project_delete,
    project_enter,
    project_exit,
    file_struct,
    file_content,
    file_update,
    file_new,
    file_delete,
    file_move,
    file_copy,
    file_rename,
    file_download,
    dir_new,
    dir_delete,
    dir_move,
    dir_copy,
    dir_rename,
    util_check_username,
    util_check_email,
    util_send_captcha,
    share_info,
    share_invite,
    share_accept,
    share_refuse,
    CPP,
    C,
    PYTHON2,
    PYTHON3,
    JAVA
}