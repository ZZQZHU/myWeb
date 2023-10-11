window.onload = function() {
    var rememberMe = getCookie("rememberMe");
    if (rememberMe) {
        var username = getCookie("username");
        document.getElementsByName("username")[0].value = username;
        document.getElementsByName("checkbox")[0].checked = true;
    }
}



function rememberMe() {
    var checkBox = document.getElementsByName("checkbox")[0];
    var username = document.getElementsByName("username")[0].value;
    if (checkBox.checked == true) {
        // 创建一个名为 "rememberMe" 的Cookie，存储用户名和密码
        document.cookie = "rememberMe=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/";
        document.cookie = "username=" + username + "; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/";
    } else {
        // 如果复选框未被选中，删除之前创建的Cookie
        document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

function Login() {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;
    $.ajax({
        url: path + ":5000/Login/?username=" + username + "&password=" + password, // Node.js 接口的地址
        method: 'GET',
        success: function(data) {
            console.log(11111, data)
            if (data) {
                rememberMe()
                document.cookie = `Token=${data.token}; expires=${new Date(new Date().getTime() + 60 * 60 * 1000)}; path=/`;
                document.cookie = `refreshToken=${data.refreshToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}; path=/`;
                // document.cookie = "Token=" + data + "; path=/";
                location.href = './index.html'
            } else {
                window.alert('用户名或密码不正确')
            }
        },
        error: function() {

        }
    });
}