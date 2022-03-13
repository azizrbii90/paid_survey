'use strict';

const User = require('./model');


module.exports = {

    get: async (query) => {
        try {
            let dbQuery = User;
            let data = [];
            if (query.email !== undefined && query.email !== '') {
                dbQuery = dbQuery
                    .findOne({ email: query.email });
                let user = await dbQuery.exec();
                data = user;
            } else if (query.id !== undefined && query.id !== '') {
                dbQuery = dbQuery
                    .findById(query.id)
                let user = await dbQuery.exec();
                data = user;
            } else {
                dbQuery = dbQuery
                    .find()
                let users = await dbQuery.exec();
                data = users.map(u => u.toObject());
            }
            return {
                data
            };
        } catch (error) {
            if (error.name === 'UserNotFound') {
                const notFoundError = new Error('UserNotFound')
                notFoundError.details = `verify data entered`
                throw notFoundError
            }
            throw error;
        }
    },

    update: async (id, updateUser) => {
        try {
            const userToUpdate = await User.findById(id);
            updateUser.password = userToUpdate.password;
            const updatedUser = await User.findByIdAndUpdate(id, updateUser, { new: true });
            return updatedUser;
        } catch(error) {
            console.log(error)
        }
    },

    create: async (createUser) => {
        try {
            const creatingUser = new User(createUser);
            return await creatingUser.save();
        } catch (error) {
            console.log(error);
        }
    },

    delete: async (id) => {
        try {
          const deletingUser = await User.findByIdAndDelete(id);
          return deletingUser;
        } catch (error) {
          console.log(error);
        }
    },

    updatePassword: async (id, data) => {
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
        return updatedUser;
    },
    
}
