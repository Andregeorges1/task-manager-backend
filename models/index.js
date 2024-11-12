const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);
const UserOTP = require('./UserOTP')(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task, UserOTP };

