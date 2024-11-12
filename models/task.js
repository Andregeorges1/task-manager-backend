module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        due_date: { type: DataTypes.DATE },
        status: {
            type: DataTypes.ENUM('in_progress', 'completed'), 
            defaultValue: 'in_progress' 
        },
    });
    return Task;
};
