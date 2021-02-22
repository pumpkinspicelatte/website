const std = require('./std');
const validate = require('./validate');

const random = (max) => Math.floor(Math.random() * max);
const string = (length) => {
  let str = '',
      p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz' +
          '0123456789';

  for (
    let i = 0; 
    i < length; 
    i++, 
    str += p[random(p.length)]
  );

  return str;
};

module.exports = { std, string, random, validate };