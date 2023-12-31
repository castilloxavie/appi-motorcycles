import Users from "../../users/user.model.js"
import Repairs from "../../repairs/repairs.model.js"


export const associationModels = () => {
    Users.hasMany(Repairs, {foreignKey: "userId", as: "UsersOneToManyRepairs"})
    Repairs.belongsTo(Users,{foreignKey: "userId", as: "RepairsManyToOneUser"})
}
