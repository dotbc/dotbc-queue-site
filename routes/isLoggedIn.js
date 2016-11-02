export default function isLoggedIn (req, res, next) {
  if (req.user !== undefined) {
    next();
  } else {
    console.log('redirecting')
    return res.send(403, { error: 'not logged in' });
  }
};