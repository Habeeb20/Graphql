const UserModel = require('../models/user.model.js');
const UserHelper = require('../helpers/user.helper.js')
const jwt = require('jsonwebtoken')



const userResolver = {
    Query: {
        getUsers: async (_, { total}, contextValue) => {
            try {
                const users = await UserModel.find().sort({createdAt: -1}).limit(total);
                return users
            } catch (error) {
                throw new error(error.message)
                
            }
        },
        getUsers: async(_, { id }, contextValue) => {
            try {
                const user = await UserModel.findById(id);
                return user
            } catch (error) {
                throw new Error(error.message)
                
            }
        },
    },
    Mutation: {
        signup: async(_, { input }) => {
            const { email, password, fname, lname, } = input;
            const isUserExists = await UserHelper.isEmailAlreadyExist(email);
            if(isUserExists) {
                throwCustomError(
                    'Email is already registered',
                    Errortypes.ALREADY_EXISTS
                );
            }

            const userToCreate = new UserModel({
                email:email,
                password: password,
                fname:fname,
                lnanme:lname,
                following:[]
            });
            const user = await userToCreate.save();
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_PRIVATE_KEY,
                {expiresIn: process.env.TOKEN_EXPIRY_TIME}
            );

            return {
                _typename: 'UserWithToken',
                ...user._doc,
                userJwtToken:{token: token,},
            }
        },



        login: async(_, {input: { email, password }}, context ) => {
            const user = await UserModel.findOne({
                $and: [{email: email }, {password: password}],
            });
            if(user){
                const token = jwt.sign(
                    {userId: user._id, email: user.email},
                    process.env.JWT_PRIVATE_KEY,
                    {expiresIn: process.env.TOKEN_EXPIRY_TIME}
                );
                 return {
                   
                    ...user._doc,
                    userJwtToken:{token: token,},
                }
            }

            throwCustomError(
                'Invalid email of password entered',
                Errortypes.BAD_User_INPUT
            );

        }
    }
}


module.exports = {
    userResolver
}