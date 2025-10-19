aiya.site = new function () {
    this.login = function () {
        aiya.ajaxGet('/site/gotoLogin', function (result) {
            layer.open({
                type: 1,
                title: '',
                area: ['480px', '300px'],
                shadeClose: false,
                content: result
            });
        });
    }
    this.topup = function () {
        aiya.ajaxGet('/dms/topup', function (result) {
            layer.open({
                type: 1,
                title: '',
                area: ['420px', 'auto'],
                shadeClose: false,
                content: result
            });
        });
    }
    this.saveTopUp = function () {
        if ($("#top_up_list .top_up_item.active").length == 0) {
            aiya.toast("Please select one of the following top-up amount", 2);
            return false;
        }
        var amount = $("#top_up_list .top_up_item.active").data("amount");
        aiya.ajaxPost('/dms/addreportinvoice', { amount: amount }, function (result) {
            if (result.code == 10000) {
                layer.closeAll();
                aiya.toast("Success", function () {
                    window.location.href = $('#apiFile').val() + result.data.path;
                });
            }
            else {
                aiya.toast(result.message, 2);
            }
        });
    }
    this.loginSuccess = function (result) {
        if (result.success) {
            aiya.toast('Login Successfully');
            layer.closeAll();
            window.location.href = "https://www.justcar.co.nz/me?access_token=" + result.data.access_token;
            //window.location.reload();
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    this.logout = function () {
        aiya.ajaxPost('/shared/logout', {}, function (result) {
            aiya.toast("Successfully Logged out", function () { window.location.reload(); });
        });
    }
    this.editProfile = function () {
        aiya.ajaxGet('/me/edit', function (result) {
            layer.open({
                type: 1,
                title: '',
                area: ['500px', '320px'],
                shadeClose: false,
                content: result
            });
        });
    }
    this.changePassword = function () {
        aiya.ajaxGet('/me/changepassword', function (result) {
            layer.open({
                type: 1,
                title: '',
                area: ['480px', '300px'],
                shadeClose: false,
                content: result
            });
        });
    }
}

aiya.me = aiya.me || {};
aiya.me.edit = new function () {
    this.editSuccess = function (result) {
        if (result.code == 10000) {
            aiya.toast('Success', function () {
                location.reload();
            });
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    this.editBusinessSuccess = function (result) {
        if (result.code == 10000) {
            aiya.toast('Success');
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    this.editServiceSuccess = function (result) {
        if (result.code == 10000) {
            aiya.toast('Success');
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
}
aiya.me.changepassword = new function () {
    this.changepasswordSuccess = function (result) {
        if (result.code == 10000) {
            layer.closeAll();
            aiya.toast('Success');
        }
        else {
            aiya.toast(result.message, 2);
        }
    }

}