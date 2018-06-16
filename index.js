var dappAddress = "n1xNyZTPZD6yjgGPCkGpEcDJWbQgHg6v8yj"
var hash = "4ab2cf818d1dcf5d957e58d9231e04c6165f783c8a4111c6545733cbdf6526cb"
// var dappAddress = "n1rHDqGfUpKc6eiGNRz7NTZ6b8Pn2WQbFB1";
// var hash = "9f82cb342f3fd192042871b802523fa0c60b24d7310cd0896c844bc147ca4d18";

var NebPay = require("nebpay");
var nebPay = new NebPay();
if (typeof webExtensionWallet === "undefined") {
    toast('星云钱包环境未运行，请安装钱包插件')
}
var timer = null
function toast (text) {
    $('#toast').html(text);
    $('#toast').show();
    setTimeout(function () {
        $('#toast').addClass('toast-show');
        showToast()
    }, 300);
}
function showToast () {
    setTimeout(function () {
        $('#toast').removeClass('toast-show');
        setTimeout(function () {
            $('#toast').hide();
        }, 2300);
    }, 3000);
}

function loading (type) {
    if (type) {
        $('#loading').show();
    } else {
        $('#loading').hide();
    }
}
// function getWallectInfo () {
//   window.postMessage({
//     "target": "contentscript",
//     "data": {},
//     "method": "getAccount"
//   }, "*");

//   window.addEventListener("message", function (e) {
//     if (e.data && e.data.data && e.data.data.account) {
//       window.address = e.data.data.account;
//     }
//   })
// }
// getWallectInfo();

function myRandom1(value){
    return parseInt(value*Math.random())
}

function myRandom2(value){
    if(Math.random()>0.5){
        return parseInt(value*Math.random())
    }else{
        return -parseInt(value*Math.random())
    }
}
function showRecord(event) {
    $("#main_bgm_id").hide()
    toast('正在从链上获取数据请稍等')
    loading(true);
    nebPay.simulateCall(dappAddress, "0", "getAll", JSON.stringify([]), {
        listener: function(res){
            debugger
            var data = null
            try{
                if (res && res.result){
                    data = JSON.parse(JSON.parse(res.result))
                }
            }catch (e){

            }
            if (data){
                loading(false);
                var html = '<table class="detailTable">'
                for (var item in data) {
                   var result = data[item]
                    var resultStr = '爱'
                    if(result == 22){
                        resultStr = '不爱'
                    }
                    html += '<tr>'
                        +'<td class="detailTd">' + item + '</td>'
                        +'<td class="detailTd">' + resultStr + '</td>'
                        +'</tr>'
                }
                html = html+ '</table>'
                $("#record_id").html(html)
            }else {
                loading(false);
                $("#record_id").html("<div class=\"search-result-item\">您还有进行过测试，暂无数据，请先进行测试</div>")
            }
        }
    })

    event.stopPropagation()
}
function get(key) {
    debugger
    console.log('key running:'+ key)
    nebPay.simulateCall(dappAddress, "0", "get", JSON.stringify([key]), {
      listener: function(res){
          console.log(res)
          if (res && res.result &&  res.result != '"No data pending inquiry"'&&
             !Number.isNaN(res.result)){
              clearInterval(timer)
              loading(false);
              $("#tip_id").hide()
              $("#yesorno_id").show()
              productFlower(res.result)
          }
          else if(res.execute_err=='insufficient balance'){
              debugger
              loading(false);
              clearInterval(timer)
              toast('请检查钱包环境和余额！')
              setTimeout(()=> {
                  location.reload()
              },4000)
          }
      }
    })
}

function submit(event){
    var name = $('#inputName_id').val()
    if (!name) {
        toast('请输入心中的TA的名字再点击开始')
        return
    };

    //隐藏主页图片
    $("#main_id").hide()
    $("#input_id").hide()
    $("#tip_id").show()
    loading(true);
    nebPay.call(dappAddress, "0", "set", JSON.stringify([name]), {
        listener: function(res){
            debugger
            if (res.txhash) {
                timer = setInterval(get,2000,name)
            }


            // if (res.result=='Error: [object Object]') {
            //     toast('该名称已测试过，不能再次测试，要相信命运')
            //     setTimeout(()=>{
            //         location.reload()
            //     },4000)
            // }else{
            //     productFlower(res.result)
            //     $("#yesorno_id").show()
            // }
        }
    })
    event.stopPropagation()
}

function productFlower(num){
    //随机生成玫瑰花
    for(var i=0 ;i<num;i++){
        var imgDom = document.createElement("img")
        imgDom.src = './img/11.png'
        var style='position:absolute;'
        style=style+'width:'+(120+myRandom1(50))+'px;'
        style=style+'top:' + (200+myRandom1(100))+'px;'
        console.log($(document.body).width())
        style=style+'right:'+(300+myRandom1($(document.body).width()-600))+'px;'
        style=style+'-webkit-transform: rotate(' + myRandom2(45)+'deg);'
        imgDom.style=style
        $("#panel_id").append(imgDom)
    }
}
function bodyclick(){
    var flowers = $("#panel_id").children()
    if(flowers.length>0){
        var yesorno = $("#yesorno_id")[0]
        if(yesorno.innerText=='爱'){
            yesorno.innerText='不爱'
        }else{
            yesorno.innerText='爱'
        }
        var i = myRandom1(flowers.length)
        flowers[i].remove()
    }else{
        var isDisplay = $("#yesorno_id").css('display');
        var yesorno = $("#yesorno_id")[0]

        if(isDisplay!='none'){
            if (yesorno.innerText=='爱') {
                toast('恭喜你，TA是爱你的！')
            }else{
                toast('本测试纯属娱乐，请勿相信！')
            }
        }
    }
}
