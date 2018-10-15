function $(id) { return document.getElementById(id); }

window.onload = function() {
  $("input1").onkeyup = function() {
    $("input2").value = decode($("input1").value);
  }
  $("input2").onkeyup = function() {
    $("input1").value = encode($("input2").value);
  }
}

// 漢数字表記を数値に変換
function decode(input) {
  var n=0, m=0, l=0;
  
  for(var res; 0 < input.length; input=res.newstr) {
    // 文字列の先頭が"万",...,"無量大数"だった場合
    if(res = search(input, upperExpsTable)) {
      n += Math.max(l + m, 1) * Math.pow(10000, res.val);
      l = m = 0;
    }
    // "十","百","千"だった場合
    else if(res = search(input, lowerExpsTable)) {
      m += Math.max(l, 1) * Math.pow(10, res.val);
      l = 0;
    }
    // "〇","一",...,"九"だった場合
    else if(res = search(input, singleNumsTable)) {
      l = l * 10 + res.val;
    }
    else return 0;
  }
  
  return n + m + l;
}

// 与えられた配列（文字列と値の対応を格納）の中から、
// 文字列の先頭部分と一致する要素を探し、情報を返す
function search(str, arr) {
  for(var i=0; i < arr.length; i++) {
    if(str.startsWith(arr[i].ch))
      return {
        ch : arr[i].ch,
        val : arr[i].val,
        newstr : str.substring(arr[i].ch.length)
     };
  }
  return null;
}

function encode(num) {
  var str = "";
  for(var i=0; 0 < num; num = Math.floor(num / 10), i++) {
    if(num % 10 == 0) continue;
    if(i % 4 == 0) str = search2(Math.floor(i / 4), upperExpsTable) + str;
    str = search2(i % 4, lowerExpsTable) + str;
    if(num % 10 != 1 || i % 4 == 0) str = search2(num % 10, singleNumsTable) + str;
  }
  return str;
}

function encode2(num) {
  var str = "";
  for(; 0 < num; num = Math.floor(num / 10)) {
    str = search2(num % 10, singleNumsTable) + str;
  }
  return str;
}

function search2(num, arr) {
  for(var i=0; i < arr.length; i++) {
    if(arr[i].val == num)
      return arr[i].ch;
  }
  return "";
}
