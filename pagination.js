/**
 * Created by shiqian on 2017/2/9.
 */

var orderCirculateInit = 0,
    orderCirculateFinish = 1;
$.fn.sPagination = function(options){
    var defaults = {
        orderPage:1,
        pageTotal: 0,
        numbers:0
    };
    var setting = $.extend(defaults,options);
    if(setting.pageTotal ==0){
        return
    };
    var  that =this;
    //下一页
    function orderNextPage(){
        if(orderPage < orderPageTotal){
            orderPage += 1;
            orderParams.pageNum = "" + orderPage;
            orderList(orderParams,orderPage,order_subscribe_status);
        }
    }
    //上一页
    function orderLastPage(){
        if(orderPage > 1){
            orderPage -= 1;
            orderParams.pageNum = "" + orderPage;
            orderList(orderParams,orderPage,order_subscribe_status);
        }
    }
    //基础样式
    function orderList(defaultPage){
        setting.orderPage = defaultPage;
        var orderPageStr = '<span style="height:24px;line-height:24px;border:0px;margin-right:10px;">共'+ setting.numbers +'条</span>' +
            '<span id="orderLastPage" class="ishover lastPage">上一页</span>' ;
        var orderIslt_6 ;
        if(setting.pageTotal <= 6){
            orderIslt_6 = setting.pageTotal;
            orderCirculateFinish = setting.pageTotal;
            orderCirculateInit = 0;
        }else{
            if($(".orderCirculatePage").first().length > 0){    //判断第一位和最后一位
                var firstPageValue = Number($(".orderCirculatePage").first().text()),
                    lastPageValue = Number($(".orderCirculatePage").last().text());
                defaultPage = Number(defaultPage);
                console.log(firstPageValue,defaultPage);
                if (defaultPage === firstPageValue) {//判断第一位
                    if (defaultPage <= 1) {
                        orderIslt_6 = orderCirculateFinish;
                    }else{
                        if(defaultPage -1 >= 3){
                            orderCirculateInit = defaultPage -2 -1;
                            orderCirculateFinish = defaultPage + 2;
                            orderIslt_6 = orderCirculateFinish;
                        }else{
                            orderCirculateInit = 0;
                            orderCirculateFinish = 6;
                            orderIslt_6 = orderCirculateFinish;
                        }
                    }
                }else if(defaultPage === lastPageValue){//判断最后一位

                    //最后一位和总页数比较
                    if (defaultPage >= setting.pageTotal - 1) { // >= （总页数 - 1） 不循环
                        orderIslt_6 = orderCirculateFinish;
                    }else{

                        //  (总页数 - 1) - 最后一页  之差 >=3  循环分页  最后一页居中
                        if (setting.pageTotal - 1 - defaultPage >= 3) {
                            orderCirculateInit = defaultPage - 3;
                            orderCirculateFinish = defaultPage + 2;
                            orderIslt_6 = orderCirculateFinish;
                        }else{
                            //  (总页数 - 1) - 最后一页  之差 < 3  循环分页  以(总页数-1)为终点  特指7 8 9
                            orderCirculateInit = setting.pageTotal - 1 - 3 - 1;
                            orderCirculateFinish = setting.pageTotal - 1;
                            orderIslt_6 = orderCirculateFinish;
                        }
                    }
                }else if(defaultPage === 1){ // 第一页
                    orderIslt_6 = 6;
                    orderCirculateFinish = 6;
                    orderCirculateInit = 0;
                }else if(defaultPage === setting.pageTotal){  //总数页
                    orderCirculateInit = setting.pageTotal - 1 - 3 - 1;
                    orderCirculateFinish = setting.pageTotal - 1;
                    orderIslt_6 = orderCirculateFinish;
                }else if(defaultPage > lastPageValue && defaultPage < setting.pageTotal){
                    //  (总页数 - 1) - 最后一页  之差 >=3  循环分页  最后一页居中
                    if (setting.pageTotal - 1 - defaultPage >= 3) {
                        orderCirculateInit = defaultPage - 3;
                        orderCirculateFinish = defaultPage + 2;
                        orderIslt_6 = orderCirculateFinish;
                    }else{
                        //  (总页数 - 1) - 最后一页  之差 < 3  循环分页  以(总页数-1)为终点  特指7 8 9
                        orderCirculateInit = setting.pageTotal - 1 - 3 - 1;
                        orderCirculateFinish = setting.pageTotal - 1;
                        orderIslt_6 = orderCirculateFinish;
                    }
                }
                else { //其他
                    orderIslt_6 = orderCirculateFinish;
                }
            }else{
                orderIslt_6 = 6;
                orderCirculateFinish = 6;
                orderCirculateInit = 0;
            }
        }
        if (orderCirculateInit > 1) {
            orderPageStr +=  '<span id="orderNumberPage_1" class="ishover numberPage" >1</span>'   +
                '<span class="ellipsis">…</span>';
        }

        for (var i = orderCirculateInit; i < orderIslt_6; i++) {
            orderPageStr += '<span id="orderNumberPage_' + (i+1) + '" class="ishover numberPage orderCirculatePage">' + (i+1) + '</span>';
        }

        if (setting.pageTotal > 6) {
            if (orderCirculateFinish < setting.pageTotal - 1) {
                orderPageStr += '<span class="ellipsis">…</span>' ;
            }
            orderPageStr +=  '<span id="orderNumberPage_' + setting.pageTotal + '" class="ishover numberPage" >' + setting.pageTotal + '</span>';
        }

        orderPageStr += '<span id="orderNextPage" class="ishover nextPage" >下一页</span>';
        //输入框
        orderPageStr += '<span style="height:24px;line-height:24px;border:0px;margin-left:10px;">跳转到 <input type="text" style="width:30px;' +
            'height:18px;border:1px solid #c8c9c7;outline:none;text-align:center;" value="' + defaultPage +'" id="orderPageInput"  onkeydown="orderPageInputKeydown(event)" /> 页</span>' +
            '<span id="orderPageInputBtn" style="width:40px;height:24px;line-height:22px;background:#4d6f91;color:#fff;border:1px solid #4d6f91;margin-left:10px;cursor:pointer;font-size:14px;" >确定</span>';
        that.empty();
        that.append(orderPageStr);
        if(defaultPage === 1){
            $("#orderNumberPage_1").addClass("isClick");
            $("#orderNumberPage_1").removeClass("ishover")
        }else{
            $("#orderNumberPage_" + defaultPage).removeClass("ishover");
            $("#orderNumberPage_" + defaultPage).addClass("isClick")
        }
    }

    //当前是第几页;
    //上一页是否可以点击
    //上一页是否显示
    //下一页是否可以点击
    //下一页是否显示
    //点击颜色定制
    orderList(setting.orderPage);
    if(setting.orderPage>5){
        orderList(setting.orderPage);
    }

    this.on('click','.numberPage',function(){
        console.log(this);
        orderList(this.innerText);
    });
    this.on('onblur','.numberPage',function(){
        orderList(this.innerText);
    });
    this.on('click','#orderLastPage',function(){
        setting.orderPage = Number(setting.orderPage)
        if(setting.orderPage > 1){
            setting.orderPage -= 1;
            orderList(setting.orderPage);
        }
    });
    this.on('click','#orderNextPage',function(){
        setting.orderPage = Number(setting.orderPage)
        if(setting.orderPage <setting.pageTotal){
            setting.orderPage += 1;
            orderList(setting.orderPage);
        }
    });
    var a = '';
    $("#orderPageInput").bind('input propertychange', function() {
        $(this).val($(this).val().trim());
        //过滤字符串，禁止输入数字之外的字符
        var filterNumber = /[0-9]+/g;
        var temp = $(this).val().match(filterNumber);
        temp && temp.length > 0 ? $(this).val(temp[0]) : $(this).val("");
        a = $(this).val();
    });
    this.on('click','#orderPageInputBtn',function(){
        orderList(a);
    });
    return  this;
};

