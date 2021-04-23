const bcrypt = require('bcrypt');
const users = require('../../users-data.json');
var fs = require('fs');


module.exports = {
  async newUser(req, res) {
    if (req.body.username && req.body.password) {
      if (req.body.password2 && req.body.password == req.body.password2) {
        const user = users.find(element => element.username == req.body.username);
        users.find(element => element.username == req.body.username)
            if (user) {
              res.json({ statuscode:401, success: false, message: 'Username invalid' });
            } else {
              bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                  const encryptedPassword = hash;
                  users.push({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: encryptedPassword,
                    isAdmin: req.body.isAdmin,
                  })
                  fs.writeFile('users-data.json',JSON.stringify(users), function (err){
                    if(err) throw err;
                    res.status(201).send({
                      success: true,
                      message: 'User created successfully',
                    })
                  })
                })
                .catch((err) =>
                   res.json({statuscode:500, success: false, message: err })
                );
            }
      } else {
        res.status(400).send({
          sucess: false,
          message: 'Password invalid',
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: 'User and password invalid',
      });
    }
  },
  
};
