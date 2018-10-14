function $(id) { return document.getElementById(id); }

window.onload = function() {
  // inputが更新される毎に更新。
  $("input").onkeyup = function() {
    $("result").innerText = decode($("input").value);
  }
}

// 漢数字表記を数値に変換
function decode(input) {
  var n=0, m=0, l=0;
  
  while(0 < input.length) {
    var res;
    
    // 文字列の先頭が"万",...,"無量大数"だった場合
    if(res = check(input, c)) {
      input = res.newstr;
      n += Math.max(m + l, 1) * Math.pow(10000, res.val);
      m = l = 0;
    }
    // "十","百","千"だった場合
    else if(res = check(input, b)) {
      input = res.newstr;
      m += Math.max(l, 1) * Math.pow(10, res.val);
      l = 0;
    }
    // "〇","一",...,"九"だった場合
    else if(res = check(input, a)) {
      input = res.newstr;
      l = l * 10 + res.val;
    }
    else return 0;
  }
  
  return n + m + l;
}

// 与えられた配列（文字列と値の対応を格納）の中から、
// 文字列の先頭部分と一致する要素を探し、情報を返す
function check(str, arr) {
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