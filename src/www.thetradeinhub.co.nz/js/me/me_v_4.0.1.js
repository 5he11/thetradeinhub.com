aiya.me = aiya.me || {};

aiya.tab = aiya.tab || {};
aiya.tab.changeTabRound = function (obj,callBack) {
    $(obj).addClass("active").siblings().removeClass("active");
    callBack(obj);
}

$("body").on("click", function () {
    $(".ay_form_small_select").removeClass("ay_form_selected");
})

aiya.me.addRepairSupplierIndex = 0;
aiya.me.addRepairSupplier = function () {
    aiya.ajaxGet('/me/addrepairsupplier?pageFrom=select&supplierrequired=' + $("#repair_supplier_required").val(), function (result) {
        aiya.me.addRepairSupplierIndex = layer.open({
            type: 1,
            title: '',
            area: ['700px', '380px'],
            shadeClose: false,
            content: result
        });
    })
}
aiya.me.addRepairSupplierOnSuccess = function (result) {
    var that = this;
    if (result.code == 10000) {
        $("#repair_supplier_box").html(result.data);
        layer.close(aiya.me.addRepairSupplierIndex);
    } else {
        aiya.toast(result.message, 2);
    }
}


aiya.me.addDeliveryPortIndex = 0;
aiya.me.addDeliveryPort = function () {
    aiya.ajaxGet('/me/adddeliveryport?pageFrom=select', function (result) {
        aiya.me.addDeliveryPortIndex = layer.open({
            type: 1,
            title: '',
            area: ['380px', '180px'],
            shadeClose: false,
            content: result
        });
    })
}
aiya.me.addDeliveryPortOnSuccess = function (result) {
    var that = this;
    if (result.code == 10000) {
        $("#delivery_port_box").html(result.data);
        layer.close(aiya.me.addDeliveryPortIndex);
    } else {
        aiya.toast(result.message, 2);
    }
}

aiya.me.addVesselIndex = 0;
aiya.me.addVessel = function () {
    aiya.ajaxGet('/me/addvessel?pageFrom=select', function (result) {
        aiya.me.addVesselIndex = layer.open({
            type: 1,
            title: '',
            area: ['380px', '180px'],
            shadeClose: false,
            content: result
        });
    })
}
aiya.me.addVesselOnSuccess = function (result) {
    var that = this;
    if (result.code == 10000) {
        $("#vessel_box").html(result.data);
        layer.close(aiya.me.addVesselIndex);
    } else {
        aiya.toast(result.message, 2);
    }
}

aiya.me.autoCompleteCustomerIndex = 0;
aiya.me.addcustomer = function () {
    aiya.ajaxGet('/me/addcustomer?pageForm=autocompletecustomer', function (result) {
        aiya.me.autoCompleteCustomerIndex = layer.open({
            type: 1,
            title: '',
            area: ['900px', '490px'],
            shadeClose: false,
            content: result
        });
    });

}
aiya.me.editAutoCompletecustomerOnSuccess = function (result) {
    if (result.code == 10000) {
        $("#customer_search_box").html(result.data);
        layer.close(aiya.me.autoCompleteCustomerIndex);
    } else {
        aiya.toast(result.message, 2);
    }


}


aiya.me.dealerInvoiceCustomerIndex = 0;
aiya.me.addDealerInvoiceCustomer = function () {
    aiya.ajaxGet('/me/addcustomerdealer?pageForm=dealerinvoicecustomer', function (result) {
        aiya.me.dealerInvoiceCustomerIndex = layer.open({
            type: 1,
            title: '',
            area: ['900px', '490px'],
            shadeClose: false,
            content: result
        });
    });
}
aiya.me.editDealerInvoiceCustomerOnSuccess = function (result) {
    if (result.code == 10000) {
        $("#select_customer_result").html(result.data);
        layer.close(aiya.me.dealerInvoiceCustomerIndex);
        $('#frmInventory').removeData('validator').removeData('unobtrusiveValidation'); $.validator.unobtrusive.parse($('#frmInventory'));
    } else {
        aiya.toast(result.message, 2);
    }


}
aiya.me.selectDealerCallback = function (res) {
    if (res) {
        aiya.ajaxPost('/me/customerselectdealer', { shopId: res }, function (result) {
            $("#shop_info").html(result);
        });
    }

}
aiya.me.adddealer = function () {
    aiya.ajaxGet('/me/addcustomerdealer?pageForm=autocompletecustomer', function (result) {
        aiya.me.autoCompleteCustomerIndex = layer.open({
            type: 1,
            title: '',
            area: ['900px', '490px'],
            shadeClose: false,
            content: result
        });
    });
}
aiya.me.addClientExpenseIndex = 0;
aiya.me.addClientExpense = function (is_expense) {
    aiya.ajaxGet('/me/addClientExpense?isExpense=' + is_expense+'&pageFrom=select', function (result) {
        aiya.me.addClientExpenseIndex = layer.open({
            type: 1,
            title: '',
            area: ['500px', '260px'],
            shadeClose: false,
            content: result
        });
    })
}
aiya.me.addClientExpenseOnSuccess = function (result) {
    if (result.code == 10000) {
        $("#item_category").html(result.data);
        layer.close(aiya.me.addClientExpenseIndex);
    } else {
        aiya.toast(result.message, 2);
    }
}
aiya.me.viewImages = function (paths) {
    var photos = [];
    var imagePaths = paths.split(',');
    var i = 0;
    for (var row in imagePaths) {
        photos.push({
            "alt": i,
            "pid": i,
            "src": $('#cdnFile').val() + imagePaths[row],
            "thumb": $('#cdnFile').val() + imagePaths[row]
        });
        i++;
    }
    layer.photos({
        photos: {
            "title": "", //相册标题
            "id": 123, //相册id
            "start": 0, //初始显示的图片序号，默认0
            "data": photos
        },
        anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });
}
aiya.me.toggleMenu = function () {
    //更新fullPage
    var is_full_page = $(".admin_right_part").hasClass("admin_right_part_expand") ? false : true;
    if (is_full_page) {
        $("body").css({ "min-width": 1360 });
    } else {
        $("body").css({ "min-width": 1500 });
    }
    aiya.ajaxHiddenPost('/Me/UpdateFullPage', { is_full_page: is_full_page}, function (result) {
            
    })
    $(".admin_right_part").toggleClass("admin_right_part_expand")
    $(".cus_sidebar").toggleClass("cus_sidebar_expand");

}
aiya.me.shrink = function (ele) {
    if ($(ele).hasClass('cus_collapse')) {
        $(ele).removeClass('cus_collapse').addClass('cus_expand')
        $(ele).parent('li.cus_title').nextAll('li.cus_second').slideUp();
    } else {
        $(ele).removeClass('cus_expand').addClass('cus_collapse')
        $(ele).parent('li.cus_title').nextAll('li.cus_second').slideDown();
    }
}
aiya.me.success = function (result) {
    if (result.code == 10000) {
        aiya.toast('Success', function () {
            window.location.reload();
        });
    }
    else {
        aiya.toast(result.message, 2);
    }
}
aiya.me.closeMessage = function (notificationId, ele) {
    aiya.ajaxPost('/Me/CloseMessage/' + notificationId, {}, function (result) {
        if (result.code == 10000) {
            $(ele).parent().parent().fadeOut();
        }
    })
}
aiya.me.readMessage = function (notificationId) {
    aiya.ajaxPost('/Me/ReadMessage/' + notificationId, {}, function (result) {
        if (result.code == 10000) {
            layer.closeAll();
        }
    })
}
aiya.form.fitler = aiya.form.fitler || {};
aiya.form.fitler.onchange = function (ele, id, callback) {
    $(ele).addClass("ay_active").siblings().removeClass('ay_active');
    $ipFormSelect = $(ele).parents(".ay_form_fitler_select:first");
    var str = "";
    if ($(ele).data("src")) {
        str = str + "<i class=\"ay_form_fitler_select_top_icon\" style=\"background-image:url(\"/images/v2/crm/customer_confirmed_icon.png\")\"></i>"
    }
    str = str + $(ele).data("text")
    $ipFormSelect.find(".ay_form_fitler_select_text").html(str);
    var inputObj = $("#" + id);
    inputObj.val($(ele).data("value"));
    var validateor = $(ele).closest('form').validate();
    validateor.element(inputObj);
    if (callback) {
        callback($(ele).data("value"));
    }
}

aiya.me.editdealer = function (customerId) {
    aiya.ajaxGet('/me/editcustomerdealer?id=' + customerId + '&pageForm=detail', function (result) {
        layer.open({
            type: 1,
            title: '',
            area: ['800px', '490px'],
            shadeClose: false,
            content: result
        });
    });

}
aiya.me.editcustomer = function (customerId) {
    aiya.ajaxGet('/me/editcustomer?id=' + customerId + "&pageForm=detail", function (result) {
        layer.open({
            type: 1,
            title: '',
            area: ['860px', '690px'],
            shadeClose: false,
            content: result
        });
    });

}
aiya.me.editcustomerOnSuccess = function (result) {
    if (result.code == 10000) {
        layer.closeAll();
        $("#customer_details").html(result.data);
    }
    else {
        aiya.toast(result.message, 2);
    }
}


aiya.ajaxFormPostUncheck = function ($form, successfn, element) {
    $form.ajaxSubmit({
                type: 'post',
                success: function (d) {
                    if (element) {
                        $(element).hide();
                        $(element).hide();
                    } else {
                        $('#loading').hide();
                        $('#loading_gif').hide();
                    }

                    //called when successful
                    if (successfn) {
                        successfn(d);
                    }
                },
                beforeSubmit: function (arr, $form, options) {
                    if (element) {
                        $(element).show();
                        $(element).show();
                    } else {
                        $('#loading').show();
                        $('#loading_gif').show();
                    }
                },
                complete: function () {
                    if (element) {
                        $(element).hide();
                        $(element).hide();
                    } else {
                        $('#loading').hide();
                        $('#loading_gif').hide();
                    }

                },
                error: function (error) {
                    if (element) {
                        $(element).hide();
                        $(element).hide();
                    } else {
                        $('#loading').hide();
                        $('#loading_gif').hide();
                    }
                    aiya.toast(error, 3);
                }
            });
};

aiya.createFromErrorBox = function ($form, invalid) {
    aiya.createFromErrorBox.errorList = aiya.createFromErrorBox.errorList || {};
    var form_id = $form.attr("id");
    if ($form.find(".ay_form_top_error").length > 0) {
        var $ay_form_top_error = $form.find(".ay_form_top_error");
        var errorList = [];
        //必须要执行一遍验证，要不然验证错误信息不存在
        for (item in invalid) {
            if (invalid[item]) {
                errorList.push(item);
            }
        }
        if (!aiya.createFromErrorBox.errorList[form_id]) {
            aiya.createFromErrorBox.errorList[form_id] = errorList;
        } else {
            if (aiya.createFromErrorBox.errorList[form_id].length == errorList.length) {
                var flag = 0;
                for (var i = 0; i < aiya.createFromErrorBox.errorList[form_id].length; i++) {
                    if (aiya.createFromErrorBox.errorList[form_id][i] != errorList[i]) {
                        flag = 1;
                        break;
                    }
                }
                //如果错误信息不变，那么不重新创建
                if (flag == 0) {
                    return false;
                }
            }
            aiya.createFromErrorBox.errorList[form_id] = errorList;
        }

        if (errorList.length == 0) {
            $ay_form_top_error.html("");
        } else {
            //先创建错误框
            if ($form.find(".ay_form_error_box").length > 0) {
                $form.find(".ay_form_error_list").html("");
            } else {
                var str = "";
                str = str + '<div class="ay_form_error_box">';
                str = str + '<div class="ay_form_error_title">Please resolve the following issues before submit</div>';
                str = str + '<div class="ay_form_error_des">Click on an issue to go directly to the related section of the form.</div>';
                str = str + '<div class="ay_form_error_list">';
                str = str + '</div>';
                str = str + '</div>';
                $ay_form_top_error.html(str);
            }
            //group by error list
            var gounpNodeData = [{
                partDom: null, errorList: []
            }];
            var ay_part_form_list = $form.find(".ay_part_form");
            for (var i = 0; i < ay_part_form_list.length; i++) {
                gounpNodeData.push({
                    partDom: ay_part_form_list[i], errorList: []
                });
            }
            for (var i = 0; i < errorList.length; i++) {
                var element = $("[name='" + errorList[i] + "']");
                var element_target_ay_part_form = element.parents(".ay_part_form:first");
                if (element_target_ay_part_form.length == 0) {
                    for (var j = 0; j < gounpNodeData.length; j++) {
                        if (gounpNodeData[j].partDom == null) {
                            gounpNodeData[j].errorList.push(element)
                        }
                    }
                } else {
                    for (var j = 0; j < gounpNodeData.length; j++) {
                        if (gounpNodeData[j].partDom == element_target_ay_part_form[0]) {
                            gounpNodeData[j].errorList.push(element);
                        }
                    }
                }
            }
            //render error message to html
            for (var i = 0; i < gounpNodeData.length; i++) {
                if (gounpNodeData[i].errorList.length > 0) {
                    var str = "";
                    str = str + '<div class="ay_form_error_item">';
                    str = str + '<img src="/images/v2/finance/ay_form_error_tip.png" class="ay_form_error_tip_pic" />';
                    if (gounpNodeData[i].partDom != null) {
                        str = str + '<span>' + $(gounpNodeData[i].partDom).attr("data-title") + '</span><br/>';
                    }
                    var arr = [];
                    for (var j = 0; j < gounpNodeData[i].errorList.length; j++) {
                        arr.push('<span class="ay_form_error_tip_text" onclick="aiya.errorClickFormFocus(\'' + $(gounpNodeData[i].errorList[j]).attr("name") + '\')">' + $(gounpNodeData[i].errorList[j]).data("label") + '</span>');
                    }
                    str = str + arr.join("<span style='margin-right:5px;'>, </span>");
                    str = str + '</div>';
                    $form.find(".ay_form_error_list").append(str);
                }

            }
        }
    }
   
}
//点击错误信息的地方跳转
aiya.errorClickFormFocus = function (name) {
    $row = $("[name='" + name + "']").parents(".ay_row:first");
    $('html, body').animate({
        scrollTop: $row.offset().top - $(window).height() / 2
    }, 300, function () {
            var inputDom = $row.find(".ay_input");
            if (inputDom.length > 0) {
                inputDom.focus();
            } else {
                var smallInputDom = $row.find(".ay_small_select_input ");
                if (smallInputDom.length > 0) {
                    smallInputDom.focus();
                }
            }
    });
}

aiya.me.setStorage = function (key,value) {
    window.localStorage.setItem(key, value);
}
aiya.me.getStorage = function (key) {
    return window.localStorage.getItem(key);
}
aiya.me.setFuelTypeOrc = function (fuel_type_id, value) {
    if (fuel_type_id > 0  && value) {
        var obj = {};
        var fuel_type_orc = aiya.me.getStorage("fuel_type_orc");
        if (fuel_type_orc) {
            obj = JSON.parse(fuel_type_orc);
        }
        obj[fuel_type_id] = value;
        aiya.me.setStorage("fuel_type_orc", JSON.stringify(obj));
    }
}

aiya.me.getFuelTypeOrc = function (fuel_type_id) {
    if (fuel_type_id > 0) {
        var fuel_type_orc = aiya.me.getStorage("fuel_type_orc");
        if (fuel_type_orc) {
            var data = JSON.parse(fuel_type_orc);
            if (data[fuel_type_id]) {
                return data[fuel_type_id];
            }
        }
    }
    return null;
    
}
aiya.me.completeFuelTypeOrc = function () {
    $("#OrcAmount").val($("#orc_tip_amount").text());
}

aiya.me.getFuelTypeOrcForPage = function () {
    var fuel_type_id = $("#FuelTypeId").val();
    if (fuel_type_id > 0) {
        var result = aiya.me.getFuelTypeOrc(fuel_type_id);
        if (result) {
            $("#orc_tip_amount").text(result);
            $("#orc_tip_amount_box").show();
            return;
        }
    }
    $("#orc_tip_amount_box").hide();
}

$.validator.setDefaults({
    showErrors: function (errorMap, errorList) {
        aiya.createFromErrorBox($(this.currentForm), this.invalid);
        this.defaultShowErrors();
    },
});
