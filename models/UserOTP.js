module.exports = (sequelize, DataTypes) => {
    const UserOTP = sequelize.define('UserOTP', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false,  
    });

    return UserOTP;
};
