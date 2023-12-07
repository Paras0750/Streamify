const jwt = require("jsonwebtoken");

module.exports.protect = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token)
  return res.status(401).json({ status: false, msg: "No Token Provided" });

  token = token.split(" ")[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(403)
        .json({ status: false, msg: "authorization failed" });
    }
    req.user = decoded;
    next();
  });
};
