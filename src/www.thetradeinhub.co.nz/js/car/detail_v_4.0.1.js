aiya.car = aiya.car || {};
aiya.car.detail = new function () {
    this.calcSuccess = function (result) {
        if (result.code == 10000) {
            $('#weeklyFee').text(result.data.weekly);
            $('#fortnightlyFee').text(result.data.fortnightly);
            $('#monthlyFee').text(result.data.monthly);
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    this.changeMonth = function (month, ele) {
        $(ele).parent().find('a.calc').removeClass('calc_selected');
        $(ele).addClass('calc_selected');
        $('#financemonth').val(month);
    }
    this.messageSuccess = function (result) {
        if (result.code == 10000) {
            aiya.toast('Successfully Sent', function () {
                $('#frmContactUs')[0].reset();
            });
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    this.messageLayerSuccess = function (result) {
        if (result.code == 10000) {
            $(".layer_success_box").show();
            $(".layer_contain_box").hide();
            //aiya.toast('Successfully Sent', function () {
            //    $('#frmContactUs')[0].reset();
            //});
        }
        else {
            aiya.toast(result.message, 2);
        }
    }
    $(function () {
        $('a.online_chatting').hover(function () {
            $(this).find('img').show();
        }, function () {
            $(this).find('img').hide();
        });
    });


    this.changeTerm = function (ele,clientId) {
        $('.month_group .month_item').removeClass("active");
        $(ele).addClass("active");
        aiya.car.detail.calculate(clientId,ele);
    }
    
    this.showEnquiry = function () {
        layer.open({
            type: 1,
            area: ['680px', '540px'], //宽高
            title: false, //不显示标题
            content: $('#enquiry')
        });
    }

    this.calculateXhr = null;
    this.calculate = function (clientId, ele) {
        if ($(ele).attr("type")) {
            $(ele).val($(ele).val().replace(/[^\d]/g, ''));
        }
        var vehiclePrice = $('#vehiclePrice').val();
        if (!vehiclePrice) {
            vehiclePrice = 0;
        }
        var data = {
            clientId: clientId,
            vehiclePrice: vehiclePrice,
            cashDeposit: $('#cashDeposit').val(),
            tradeInPrice: $('#tradeInPrice').val(),
            financemonth: $('.month_group .month_item.active').data('month')
        }
        if (aiya.car.detail.calculateXhr && aiya.car.detail.calculateXhr != null) {
            aiya.car.detail.calculateXhr.abort();
        };
        aiya.car.detail.calculateXhr = aiya.ajaxHiddenPost('/car/calculate', data, function (result) {
            if (result.code == 10000) {
                aiya.car.detail.calculateXhr = null;
                $('#financePrice').html(result.data.weekly);
                $('#caculate').html(result.tip);
            }
        });
       
    }
    this.getCarView = function () {
        aiya.ajaxHiddenPost('/car/carviewlist', {}, function (result) {
            $('#car_view').html(result);
        });
    }
    this.finaceAdLayer = function (id) {
        aiya.ajaxGet('/finance/finaceadlayer/'+id, function (result) {
            layer.open({
                type: 1,
                title: '',
                area: ['680px', '500px'], //宽高
                title: false, //不显示标题
                content: result
            });
        });
    }
}