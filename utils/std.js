function response (err, data) {
    if (err) {
      console.log(err);
      return {
        success: false,
        result: err
      };
    } return {
      success: true,
      result: data
    };
  }
  
  function cleanUpData (data) {
    for (let key in data) {
      if (!data[key]) continue;
      data[key] = data[key].toString().trim();
    } return data;
  }
  
  function isUserValid (user) {
    let result = { success: false };
  
    user = cleanUpData(user);
    if(!user.email || !isEmailValid(user.email)) {
      result.message = 'Please, enter your email!';
    } else if(!user.password || !isAlphaNumeric(user.password) || user.password.length < 12) {
      result.message = 'Passwords must be 12 alphanumeric characters long.';
    } else if (user.password !== user.repassword) {
      result.message = 'Passwords did not match!';
    } else {
      result.success = true;
      result.user = {
        email: user.email.toLowerCase(),
        password: user.password
      };
    }
  
    return result;
  }
  
  function isEmailValid (email) {
    return email.indexOf('@') < email.lastIndexOf('.') &&
           email.indexOf('@') !== -1;
  }
  
  function isPasswordValid (password) {
    const regex = /^[\.\?\,\-\!0-9a-zA-Z]+$/;
    return password.length >= 12 && password.match(regex);
  }
  
  function isAlphaNumeric (word) {
    const regex = /^[0-9a-zA-Z]+$/;
    return word.match(regex);
  }
  
  function grabURL (req) {
    const host = req.headers.host;
    const pre = host.indexOf('localhost') !== -1 ? 'http://' : 'https://';
    return { host, pre };
  }
  
  function truncateName(name) {
    let usr = name;
  
    if (usr && usr.length) {
      if (usr.indexOf(' ') !== -1) usr = usr.substr(0, usr.indexOf(' '));
      if (usr.indexOf('-') !== -1) usr = usr.substr(0, usr.indexOf('-'));
      if (usr.indexOf('.') !== -1) usr = usr.substr(0, usr.indexOf('.'));
      if (usr.indexOf('_') !== -1) usr = usr.substr(0, usr.indexOf('_'));
      if (usr.length > 6) usr = usr.substr(0, 3) + '...';
    } else usr = 'Login';
  
    return usr;
  }
  
  const memo = (data) => {
    const cache = { l: data.length };
            
    for (
        let i = 0;
        i < data.length;
        cache[i] = data[i], i++
    );
  
    cache.resize = () => {
        let count = 0;
        for (let i in this) {
            if (i == 'resize' || i == 'l') continue;
            cache[count] = i;
            count++;
        } this.l = count;
    }
  
    return cache;
  }

  const secs = (s) => 1000 * s;
  const mins = (m) => secs(60) * m;
  const hours = (h) => mins(60) * h;
  const days = (d) => hours(24) * d;
  const maxDays = (m, y) => {
    switch (m) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31
      case 1:
        if (!(y % 4)) return 29
        else return 28
      default:
        return 30
    }
  }
  
  const getDays = (m, y) => {
    const build = [];
  
    for (let i = 1; i <= maxDays(m, y); i++) {
      build.push({ m, d: i, y });
    }
  
    return build;
  }
  
  module.exports = {
    secs,
    mins,
    days,
    memo,
    hours,
    grabURL,
    getDays,
    maxDays,
    response,
    cleanUpData,
    isUserValid,
    isEmailValid,
    truncateName,
    isAlphaNumeric,
  }
