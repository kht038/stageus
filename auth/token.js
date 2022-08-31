const jwt = require('jsonwebtoken');

const generateToken = (role, id, name, email, phone) => {
  const jwtToken = jwt.sign({
    "role": role,
    "id": id,
    "name": name,
    "email": email,
    "phone": phone
  }, 
  process.env.SECRET_KEY,
  {
    issuer: role,
    expiresIn: process.env.EXPIRES
  });

  return jwtToken
}

module.exports = generateToken;