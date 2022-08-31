const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const User = sequelize.define('users', {
  user_role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal'
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_history: {
    type: DataTypes.JSON,
    allowNull: true
  }
});

const dbInit = async() => {
  try{
    await sequelize.sync({force: false});
    console.log('All Tables Created Successfully');
  }
  catch(err){
    console.error(err.stack)
  }
}

module.exports = {
  dbInit,
  User,
}