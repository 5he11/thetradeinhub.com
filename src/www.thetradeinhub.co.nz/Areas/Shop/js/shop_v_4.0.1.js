aiya.ajaxGifFormPostSuccess = function (obj) {
    layer.open({
        area: ['700px', '500px'],
        title: "",
        btn: [],
        end: function () {
            window.location.reload();
        },
        content: '<div class="ay_layer_loading_box" style="text-align:center;padding-top:100px;"><img src="/images/loading_success.gif" class="ay_layer_loading_pic" /><div class="ay_layer_loading_title" style="text-align: center;font-size: 20px;font-weight: bold;color: #333333;line-height: 32px;margin-top: 20px;">' + obj.title + '</div><div class="ay_layer_loading_content" style="text-align: center;font-size: 14px;font-weight: normal;color: #999999;line-height: 32px;">' + obj.content + '</div></div>'
    })
}