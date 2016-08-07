

// helper functions

// refactor these using regex
module.exports = {

  parseAlignment: function (str) {
    var darkRe = /[Dd][Aa][Rr][Kk]+/g
    var lightRe = /[Ll][Ii][Gg][Hh][Tt]+/g
    var isLight = lightRe.test(str);
    var isDark = darkRe.test(str);
    var alignment = undefined

    if (isDark && !isLight) alignment = 'dark';
    else if (isLight && !isDark) alignment = 'light';

    return alignment;
  },

  parsePoints: function (str) {
    var numReg = /\d+/g
    var numArr = str.match(numReg);
    var points = undefined;
    var alignment = this.parseAlignment(str);

    if (numArr && numArr.length === 1) {
      if (numArr[0] > 100) numArr[0] = 100;
      if (alignment === "light") points = Math.round(numArr[0]/10);
      if (alignment === "dark") points = Math.round(-(numArr[0]/10));
    }

    return points;
  },

  parseReq: function (str) {
    return {
      alignment: this.parseAlignment(str),
      points: this.parsePoints(str),
      user: this.parseUser(str)
    }
  },

  parseUser: function (str) {
    var userRe = /@\w+/g;
    var userArr = str.match(userRe);
    var user = undefined;

    if (userArr && userArr.length === 1) user = userArr[0].slice(1);

    return user;
  }

};
