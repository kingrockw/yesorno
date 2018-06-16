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
        var defaultDataStr = LocalContractStorage.get(address);
        var data = {}
        try{
            if(defaultDataStr){
                data = JSON.parse(defaultDataStr)
            }
        }catch (e){

        }
        var result = data[key]
        if (!result) {
            data[key] = myRandom()
        }
        LocalContractStorage.set(address, JSON.stringify(data));
    },
    get: function (key) {
        var address = Blockchain.transaction.from;
        var dataStr = LocalContractStorage.get(address)
        var data ={}
        try{
            if(dataStr){
                data = JSON.parse(dataStr)
            }
        }catch (e){

        }
        if(data[key]){
            return data[key]
        }
        return 'No data pending inquiry';
    },
    getAll: function () {
        var address = Blockchain.transaction.from;
        return LocalContractStorage.get(address);
    }
};
module.exports = Yesorno;
