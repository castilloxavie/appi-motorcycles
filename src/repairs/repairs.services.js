import { Op } from "sequelize";

import Users from "../users/user.model.js"
import Repairs from "./repairs.model.js";

export class RepairsServices {

    async createRepair(data){
        return await Repairs.create(data)
    }

    async findAllrepairs(){
        return await Repairs.findAll()
    }

    async fiendAllWithAllUser(){
        return await Repairs.findAll({
            where: {
                status: {
                    [Op.in]: ["pending", "completed"]
                }
            },
            include: [
                {
                    model: Users, 
                    as: "RepairsManyToOneUser",
                    attributes: ["name", "email", "role", "status"]
                }
            ]
        })
    }

    async findOnerepair(id){
        return await Repairs.findOne({
            where: {
                id,
                status: "pending"
            }
        })
    }

    

    async updateRepair(repair,data){
        return await repair.update(data)
    }


    async deleteRepair(repair){
        return await repair.update({status:"cancelled"})
    }

}