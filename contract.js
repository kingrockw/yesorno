"use strict";

var Yesorno = function () {};

Yesorno.prototype = {
    init: function () {},
    set: function (key) {

        function myRandom(){
            var r = Math.random()
            if (r>0.7) {
                //不爱
                return 22
            }else{
                //爱
                return 21
            }
        }
        var address = Blockchain.transaction.from;
        var defaultData = JSON.parse(LocalContractStorage.get(address));
        var data = Object.prototype.toString.call(defaultData) == '[object Object]' ? defaultData : {};
        var result = data[key]
        if (result) {
             throw new Error({
                msg:'该名称你已测试',
                value:result
            })
        }else{
            data[key] = myRandom()
        }
        LocalContractStorage.set(address, JSON.stringify(data));
        return data[key]
    },
    get: function () {
        var address = Blockchain.transaction.from;
        return LocalContractStorage.get(address);
    }
};
module.exports = Yesorno;
