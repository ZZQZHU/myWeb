function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
const refreshToken = getCookie('refreshToken');
const token = getCookie('Token');
if (!refreshToken) {
    if (window.location.pathname !== "/login.html") {
        window.location.href = "./login.html";
    }
} else {
    if (token) {
        sendRequestWithToken()
    } else {
        checkTokenExpiration()
    }
}


// 发送带有Token的请求检测登录状态
function sendRequestWithToken() {
    $.ajax({
        url: path + ":5000/checkLogin/", // Node.js 接口的地址
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(data) {
            if (data) {

            } else {
                checkTokenExpiration()
            }
        },
        error: function() {
            checkTokenExpiration()
        }
    });

}

// 通过refreshToken无感刷新Token
function checkTokenExpiration() {
    if (refreshToken) {
        $.ajax({
            url: path + ":5000/refreshToken/", // Node.js 接口的地址
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            },
            success: function(data) {
                if (data) {
                    document.cookie = `Token=${data.accessToken}; expires=${new Date(new Date().getTime() + 60 * 60 * 1000)}; path=/`;
                } else {
                    if (window.location.pathname !== "/login.html") {
                        window.location.href = "./login.html";
                    }
                }
            },
            error: function() {

            }
        });
    } else {
        if (window.location.pathname !== "/login.html") {
            window.location.href = "./login.html";
        }
    }
}