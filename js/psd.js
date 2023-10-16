function checkAccount() {
    var username = document.getElementsByName("username")[0].value;
    var phone = document.getElementsByName("phone")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var checkpassword = document.getElementsByName("checkpassword")[0].value;
    if (!username) {
        return swal({
            text: "请先输入用户名",
        });
    }
    if (!phone) {
        return swal({
            text: "请先输入手机号",
        });
    }
    if (!email) {
        return swal({
            text: "请先输入邮箱",
        });
    }
    if (!password) {
        return swal({
            text: "请先输入密码",
        });
    }
    if (!checkpassword) {
        return swal({
            text: "请先输入确认密码",
        });
    }
    if (checkpassword != password) {
        return swal({
            text: "两次密码输入不一，请重新输入",
        });
    }
    $.ajax({
        url: path + ":5000/ForgotPassword",
        type: "POST",
        data: JSON.stringify({
            username: username,
            password: password,
            email: email,
            phone: phone
        }),
        contentType: "application/json", // 设置Content-Type为JSON
        success: function(data) {
            console.log(333, data)
            if (data == 0) {
                return swal({
                    text: "账号不存在",
                });
            } else if (data == 1) {
                return swal({
                    text: "查询错误，请联系管理员",
                });
            } else {
                window.location.replace('./index.html')
            }

        },
        error: function() {
            // 错误处理
        }
    });

}