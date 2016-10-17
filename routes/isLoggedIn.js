export default function isLoggedIn (req, res, next) {
  if (req.user !== undefined) {
    next();
  } else {
    if (req.path.indexOf('/api') === 0) return res.send(401, null);
    return res.redirect('/login');
  }
};