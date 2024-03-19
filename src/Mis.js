'use strict';
const mysql = require('mysql');
const unicodestring = require('unicodechar-string');
const dotenv = require('dotenv');
dotenv.config();

class Mis {
       
    constructor(){
        console.log(`Your port is ${process.env.PORT}`); // 8626
        var con_pn = mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        });
    }

    function convertEMOJI(emoji) {
        var backStr = ""
        if(emoji&&emoji.length>0) {
            for(var char of emoji) {
                var index =  char.codePointAt(0);
                if(index>65535) {
                    var h = '\\u'+(Math.floor((index - 0x10000) / 0x400) + 0xD800).toString(16);
                    var c = '\\u'+((index - 0x10000) % 0x400 + 0xDC00).toString(16);
                    backStr = backStr + h + c;
                } else {
                    backStr = backStr + char;
                }
            }
            //console.log(backStr);
        }
        return backStr;
    }

}

module.exports = Mis;