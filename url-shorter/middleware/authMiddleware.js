export default (req, res, next) => {
  const auth = req.header('Authorization');
  if (auth?.startsWith('Basic')){
    const authData = auth.substring(5, auth.length).split(':');
    console.log(authData)
  } else {
    res.status(401).end('Auth header is not provided')
  }

  next();
}