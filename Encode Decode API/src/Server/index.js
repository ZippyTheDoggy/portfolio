const express = require("express");
const app = express();

app.use(express.static("public"));

var Base64 = {
  _keyStr:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function(e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function(e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function(e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function(e) {
    var t = "";
    var n = 0;
    var c1, c2, c3;
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));

        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  }
};

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/encode", (request, response) => {
  let toEncode = Base64.decode(request.query.txt);
  var txt = "";

  for (let i = 0; i != toEncode.length; i++) {
    switch (toEncode.charAt(i)) {
      case "a":
        txt += "[";
        break;

      case "b":
        txt += "]";
        break;

      case "c":
        txt += ";";
        break;
      case "d":
        txt += ":";
        break;

      case "e":
        txt += "{";
        break;
      case "f":
        txt += "}";
        break;
      case "g":
        txt += "\\";
        break;
      case "h":
        txt += "|";
        break;
      case "i":
        txt += "-";
        break;
      case "j":
        txt += "_";
        break;
      case "k":
        txt += "=";
        break;
      case "l":
        txt += "+";
        break;
      case "m":
        txt += ",";
        break;
      case "n":
        txt += ".";
        break;
      case "o":
        txt += "<";
        break;
      case "p":
        txt += ">";
        break;
      case "q":
        txt += "/";
        break;
      case "r":
        txt += "?";
        break;
      case "s":
        txt += "!";
        break;
      case "t":
        txt += "@";
        break;
      case "u":
        txt += "#";
        break;
      case "v":
        txt += "$";
        break;
      case "w":
        txt += "%";
        break;
      case "x":
        txt += "^";
        break;
      case "y":
        txt += "&";
        break;
      case "z":
        txt += "*";
        break;
      case "1":
        txt += "n";
        break;
      case "2":
        txt += "u";
        break;
      case "3":
        txt += "m";
        break;
      case "4":
        txt += "l";
        break;
      case "5":
        txt += "e";
        break;
      case "6":
        txt += "r";
        break;
      case "7":
        txt += "o";
        break;
      case "8":
        txt += "s";
        break;
      case "9":
        txt += "k";
        break;
      case "0":
        txt += "b";
        break;
      case " ":
        txt += "(";
        break;
    }
  }

  console.log("Encode; Recieved code: " + Base64.decode(request.query.txt) + " Sent Back: " + txt);
  
  response.json(Base64.encode(txt));
});

app.get("/decode", function(request, response) {
  let txt = "";
  let txtToDecode = Base64.decode(request.query.txt);

  for (let i = 0; i != txtToDecode.length; i++) {
    switch (txtToDecode.charAt(i)) {
      case "[":
        txt += "a";
        break;

      case "]":
        txt += "b";
        break;

      case ";":
        txt += "c";
        break;

      case ":":
        txt += "d";
        break;

      case "{":
        txt += "e";
        break;

      case "}":
        txt += "f";
        break;

      case "\\":
        txt += "g";
        break;

      case "|":
        txt += "h";
        break;

      case "-":
        txt += "i";
        break;

      case "_":
        txt += "j";
        break;

      case "=":
        txt += "k";
        break;

      case "+":
        txt += "l";
        break;

      case ",":
        txt += "m";
        break;

      case ".":
        txt += "n";
        break;

      case "<":
        txt += "o";
        break;

      case ">":
        txt += "p";
        break;

      case "/":
        txt += "q";
        break;

      case "?":
        txt += "r";
        break;

      case "!":
        txt += "s";
        break;

      case "@":
        txt += "t";
        break;

      case "#":
        txt += "u";
        break;

      case "$":
        txt += "v";
        break;

      case "%":
        txt += "w";
        break;

      case "^":
        txt += "x";
        break;

      case "&":
        txt += "y";
        break;

      case "*":
        txt += "z";
        break;

      case "n":
        txt += "1";
        break;

      case "u":
        txt += "2";
        break;

      case "m":
        txt += "3";
        break;

      case "b":
        txt += "4";
        break;

      case "e":
        txt += "5";
        break;

      case "r":
        txt += "6";
        break;
      case "o":
        txt += "7";
        break;

      case "s":
        txt += "8";
        break;

      case "k":
        txt += "9";
        break;

      case "b":
        txt += "0";
        break;

      case "(":
        txt += " ";
        break;
    }
  }
  
  console.log("Decode; Recieved code: " + Base64.decode(request.query.txt) + " Sent Back: " + txt);

  response.json(Base64.encode(txt));
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
