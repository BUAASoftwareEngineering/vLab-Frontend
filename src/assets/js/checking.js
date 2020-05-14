export function PassIsleagal(newPassword) {
    if (newPassword.length < 6) {
        return false
    }
    else {
        var patt = /[^0-9a-zA-Z.@#$-]/
        return !(patt.test(newPassword))


    }
}

