'use strict';

const bcrypt = require('bcrypt');

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%.^&*])[a-zA-Z0-9!@#$%^.&*]{6,16}$/;
  return regularExpression.test(password);
}

async function checkPassword(password, encryptedPassword) {
  try {
    const valid = await bcrypt.compare(password, encryptedPassword);
    return valid;
  } catch (e) {
    // throw new Error(e);
    return e;
  }
}

module.exports = {
  validateEmail,
  validatePassword,
  checkPassword,
};
