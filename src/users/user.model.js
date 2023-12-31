import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";
import { encrytedPassword } from "../config/plugins/ecriptedPasswordPlugins.js";

const Users = sequelize.define("users",{
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "Use_Id"
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type:DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type:DataTypes.ENUM("client", "employee"),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("available", "not available"),
        allowNull: false,
        defaultValue: "available",
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await encrytedPassword(user.password)
        }
    }
})

export default Users