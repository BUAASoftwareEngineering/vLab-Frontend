export function PassIsleagal(newPassword) {
    if (newPassword.length < 6) {
        return false
    }
    else {
        var patt = /[^0-9a-zA-Z.@#$-]/
        return !(patt.test(newPassword))
    }
}

export function GiturlIsleagal(newGiturl) {
    if (newGiturl.length == 0) {
        return false
    }
    else {
        var patt1 = /\.git$/
        var patt2 = /[\s]/
        return patt1.test(newGiturl) && !patt2.test(newGiturl)
    }
}