const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../../users-data.json')



module.exports = {
  async Login(req, res) {
    const { username, password } = req.body;
    const user = await users.find(element => element.username == username)
    if (!user) {
      return res.status(402).send({ erro: 'User does not exist' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ erro: 'Password invalid' });
    }
    return res.status(200).send({message:'Login successfully'});
  },
};
