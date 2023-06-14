const jwt = require("jsonwebtoken");
const JWT_KEY = "adsk984^g3$#3rfef23";

// this middleware will be used to check if the user has valid auth token 
//if yes we will return the data (user Id) of the token
fetchUser = (req, res, next) => {
  const authToken = req.header('auth-token');

  if (!authToken) {
    return res.status(401).send("Access Denied. Wrong Credentials");
  }

  try {
    const data = jwt.verify(authToken, JWT_KEY);
    console.log("data from token : " + data.user.id);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Access Denied. Wrong Credentials");
  }
};

module.exports = fetchUser;
