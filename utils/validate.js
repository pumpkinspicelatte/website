const { response } = require('./std');
const users = require('../controllers/users');

const llc = '@pumpkinspicelatte.org';

function admin (req, res, next) {
  const { user } = req.body;
  user.id = user.id.toLowerCase();

  if (user.id.indexOf(llc) === -1) {
    res.json(
      response({
        message: 'You do not have access to this endpoint!'
      })
    );
    return;
  }

  users.check(user.id, user).then(({ err }) => {
    if (err) res.json(response(err));
    else next();
  }).catch(err => res.json(response(err)));
  
  return;
}

function user (req, res, next) {
  const { user } = req.body;
  if (!user.id) return res.json(response({
    message: 'You have not logged in!'
  }));

  users.check(user.id, user).then(({ err }) => {
    if (err) res.json(response(err));
    else next();
  }).catch(err => res.json(response(err)));
}

module.exports = { user, admin };
