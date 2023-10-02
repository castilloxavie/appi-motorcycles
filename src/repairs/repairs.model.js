import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";

const Repairs = sequelize.define("repairs",{
    id: {
        primaryKey:true,
        allowNull:false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field:"Rep_Id"
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
    userId: {
        type: DataTypes.INTEGER
    }

})

export default Repairs