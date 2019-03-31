///Setting up cookies: session and session.sig
// in order to skip GoogleOAuth

const Buffer = require('safe-buffer').Buffer;
const KeyGrip = require('keygrip');
const { cookieKey } = require('../../config/keys');
const keygrip = new KeyGrip([cookieKey]);

module.exports = user => {
  const sessionObject = {
    // Adding .toString() because user._id is an object, but we nedd a String
    passport: { user: user._id.toString() }
  };

  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  //keygrip - depadancie for cookie-session module(i guess)
  const sig = keygrip.sign('session=' + session);
  return { session, sig };
};
