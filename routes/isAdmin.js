export default function isLoggedIn (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.redirect(302, '/login');
  }
};