"use strict";

/*#############################################################

 usefull functions for Javascript

#############################################################*/

/*=============================================================
 String
=============================================================*/
// .format([Object|Array])
// 
String.prototype.format = function (what) {
    var current_string = this.valueOf(), c = -1;
    
    if (what.constructor.name === "Array") {
        if (current_string.match(/\{\}/g) !== null) {
            current_string = current_string.replace(/\{\}/g, function (match) {
                c += 1;
                return what[c];
            });
            return current_string;
        } 
    } else if (what.constructor.name === "Object") {
        if (current_string.match(/\{(\w+?)\}/g) !== null) {
            current_string = current_string.replace(/\{(\w+?)\}/g, function (match) {
                var key = match.replace(/\{(.*)\}/, "$1");
                return what[key];
            });
            return current_string;
        } 
    } else {
        throw Error("[ERROR] TypeError");
    }
};

/*=============================================================
  Date 
=============================================================*/
// .strftime([String])
Date.prototype.strftime =  function(formatstring) {
    var date = this
    var wd_name = { "Mon":"Monday", "Tue":"Tuesday", "Wed":"Wednesday", 
                "Thu":"Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun":"Sunday"}
    var m_name = {  "Jan" : "January", "Feb" : "February", "Mar" : "March", "Apr":"April",
                "May" : "May" , "Jun" : "June" , "Jul" : "July", "Aug" : "August",  
                "Sep" : "September", "Oct": "October", "Nov" : "November", "Dec" : "December" }
    
    function day_of_the_year() {
       var current_month=date.getMonth(), day=0, days_in_month=[31,28,31,30,31,30,31,31,30,31,30,31]
     
       days_in_month[1] = (date.getFullYear() % 4) == 0 ? 29 : 28
       
       days_in_month.map(function(value,index) {
            if (index < current_month) {
                day+=value
            } else if (index == current_month) {
                day+=date.getDate()
            } else {
                return
            }
        })
       return day
    }
    
    var format_notations = {
        "a" : date.toString().substr(0,3),
        "A" : wd_name[date.toString().substr(0,3)],
        "b" : date.toString().substr(4,3),
        "B" : m_name[date.toString().substr(4,3)],
        "c" : date.toString(),
        "d" : date.getDate(),
        "H" : String(date.getHours()).replace(/^(\d{1})$/,"0$1"),
        "I" : date.getHours() <= 12 ? String(date.getHours()).replace(/^(\d{1})$/,"0$1") : String(date.getHours() - 12).replace(/^(\d{1})$/,"0$1"),
        "j" : day_of_the_year(),
        "m" : String(date.getMonth() + 1).replace(/^(\d{1})$/,"0$1"),
        "M" : String(date.getMinutes()).replace(/^(\d{1})$/,"0$1"),
        "p" : date.getHours() <= 12 ? "AM" : "PM",
        "S" : date.getSeconds() + 1,
        "w" : date.getDay(),
        "Y" : date.getFullYear(),
        "y" : String(date.getFullYear()).substr(2,2),
    }

    return formatstring.replace(/(%[a-z])|(%%)/gi, function(match,para1,para2) {
        if (para2) {
            return match.replace('%%','%')
        }
        return format_notations[match.replace('%','')]
    })
}

/*=============================================================
  Random 
=============================================================*/
function Random() {
    // .randomint([Int],[Int])
    this.randomint = function(min,max) { 
        if (max == undefined)  { max = 0}
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    // .sample([Array],[Int])
    this.sample = shuffle_sample
    // .shuffle([Array])
    this.shuffle = shuffle_sample

    function shuffle_sample(list,samples) {
        var new_list = new Array()
        var c = 0
        var list_l = list.length  
        if (samples > (list_l - 1) && samples != undefined) { throw Error("ValueError: Samples > List Length")}
        if (samples == undefined) { samples = list_l }
        while (c < samples) {
            var r = this.randomint(0,list.length-1)
            new_list.push(list[r])
            list.splice(r,1)
            c++
        }
        return new_list
    }

}






