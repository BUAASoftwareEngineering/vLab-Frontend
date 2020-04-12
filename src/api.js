
const http = new XMLHttpRequest()
const server = "http://114.116.135.181:8081"
const CPP = 'CPP'
const PYTHON3 = 'PYTHON3'
const PYTHON2 = 'PYTHON2'
const JAVA = 'JAVA'
http.withCredentials = true

function get_request(url, callback) {
    http.open("GET", url, true)
    http.send()
    http.onreadystatechange = function(data) {
        if (http.readyState == 4 && http.status == 200) {
            console.log('get success')
            var obj = eval("("+http.responseText+")")
            if (obj.code == undefined) {
                obj.code = -100
            }
            if (obj.message == undefined) {
                obj.message = "Wrong format message!"
            }
            if (obj.data == undefined) {
                obj.data = {}
            }
            callback(obj)
        } else if (http.readyState == 4) {
            console.log('get fail')
            console.log(eval("(" + http.responseText + ")"))
            var obj = {
                code: http.status,
                message: "Http request fail!",
                data: {}
            }
            callback(obj)
        }
        // console.log(obj)
        
    }
}

function post_request(url, data, callback) {
    http.open("POST", url, true)
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    //http.setRequestHeader("Cookie","type=lpx")
    http.send(data)
    http.onreadystatechange = function(data) {
        if (http.readyState == 4 && http.status == 200) {
            console.log('post success')
            var obj = eval("("+http.responseText+")")
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
            console.log('post fail')
            console.log(http.responseText)
            var obj = {
                code: http.status,
                message: "Http request fail!",
                data: {}
            }
            callback(obj)
        }
        // console.log(obj)
        
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

function user_register(user_name, password, callback) {
    var url = server + '/user/register'
    var data =  'user_name=' + encodeURIComponent(user_name) + 
                '&password=' + encodeURIComponent(password)
    post_request(url, data, callback)
}

function user_info_update(user_name, password, callback) {
    var url = server + '/user/info_update'
    var data =  'user_name=' + encodeURIComponent(user_name) + 
                '&password=' + encodeURIComponent(password)
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

function file_file_struct(project_id, callback) {
    var url = server + '/file/file_struct?project_id=' + encodeURIComponent(project_id)
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
                '&file_path=' + encodeURIComponent(file_path) + 
                '&file_content=' + encodeURIComponent(file_content)
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

function file_move(project_id, old_path, new_path, callback) {
    var url = server + '/file/move'
    var data =  'project_id=' + encodeURIComponent(project_id) +
                '&old_path=' + encodeURIComponent(old_path) + 
                '&new_path=' + encodeURIComponent(new_path)
    post_request(url, data, callback)
}

function file_copy(project_id, old_path, new_path, callback) {
    var url = server + '/file/copy'
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

function get_user_name() {
    var name = document.cookie.indexOf("user_name=")
    if (name != -1 && name != '') {
        return name
    } else {
        return undefined
    }
}

export default {
    user_login,
    user_logout,
    user_register,
    user_info_update,
    user_info,
    project_info,
    project_new,
    project_delete,
    project_enter,
    project_exit,
    file_file_struct,
    file_content,
    file_update,
    file_new,
    file_delete,
    file_move,
    file_copy,
    dir_new,
    dir_delete,
    CPP,
    PYTHON2,
    PYTHON3,
    JAVA
}
