const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true,},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  avatar: {type: DataTypes.STRING}
})

const Notes = sequelize.define('notes', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  data: {type: DataTypes.JSON}
})


Users.hasMany(Notes)
Notes.belongsTo(Users)




module.exports = {Users, Notes}




