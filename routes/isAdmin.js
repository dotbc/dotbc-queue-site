export default function isLoggedIn (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.writeHead(302, {
      'Location': '/login'
    });
    res.end();
  }
};