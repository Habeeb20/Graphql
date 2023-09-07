const UserModel= require('../models/user.model.js');

const userHelper = {
  isEmailAlreadyExist: async (email) => {
    const user = await UserModel.findOne({ email: email });
    return user ? true : false;
  },
};

module.exports={userHelper};