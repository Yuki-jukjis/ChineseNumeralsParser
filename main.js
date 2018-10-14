﻿function $(id) { return document.getElementById(id); }

window.onload = function() {
  $("input").onkeyup = function() {
    $("result").innerText = decode($("input").value);
  }
}

function decode(input) {
  var n=0, m=0, l=0;
  
  while(0 < input.length) {
    var res;
    
    if(res = check(input, c)) {
      input = res.newstr;
      m += l;
      n += Math.max(m, 1) * Math.pow(10000, res.val);
      m = l = 0;
    }
    else if(res = check(input, b)) {
      input = res.newstr;
      m += Math.max(l, 1) * Math.pow(10, res.val);
      l = 0;
    }
    else if(res = check(input, a)) {
      input = res.newstr;
      l = l * 10 + res.val;
    }
    else return 0;
  }
  
  return n + m + l;
}

function check(str, arr) {
  for(var i=0; i<arr.length; i++) {
    if(str.startsWith(arr[i].ch))
      return {
        ch : arr[i].ch,
        val : arr[i].val,
        newstr : str.substring(arr[i].ch.length)
     };
  }
  return null;
}