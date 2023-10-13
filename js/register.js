var iscode = false

function callYourFunction(value) {
    debugger
    const Drawnum = show_num.join('')
        // 在这里调用你的函数
    console.log("调用函数，输入值为：" + value, Drawnum);
    if (value == Drawnum) {
        $('.codeerr').hide()
        iscode = true
    } else {
        $('.codeerr').show()
    }
}

function Register() {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var phone = document.getElementsByName("phone")[0].value;
    if (!username) {
        return swal({
            text: "请先输入姓名",
        });
    }
    if (!password) {
        return swal({
            text: "请先输入密码",
        });
    }
    if (!email) {
        return swal({
            text: "请先输入邮箱",
        });
    }
    if (!phone) {
        return swal({
            text: "请先输入手机号",
        });
    }
    if (!iscode) {
        return swal({
            text: "请先输入正确的验证码",
        });
    }
    $.ajax({
        url: path + ":5000/Userregistration",
        type: "POST",
        data: JSON.stringify({
            Password: password,
            username: username,
            email: email,
            phone: phone
        }),
        contentType: "application/json", // 设置Content-Type为JSON
        success: function(data) {
            console.log(2222, data);
            if (data) {
                document.cookie = `Token=${data.token}; expires=${new Date(new Date().getTime() + 60 * 60 * 1000)}; path=/`;
                document.cookie = `refreshToken=${data.refreshToken}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}; path=/`;
                window.location.replace('./index.html')
            }
        },
        error: function() {
            // 错误处理
        }
    });
}