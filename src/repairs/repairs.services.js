import Repairs from "./repairs.model.js";

export class RepairsServices {

    async createRepair(data){
        return await Repairs.create(data)
    }

    async findAllrepairs(){
        return await Repairs.findAll({
            where: {
                status: "pending"
            }
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

    async updateRepair(repair, data){
        return await repair.update(data)
    }


    async deleteRepair(repair){
        return await repair.update({status:"cancelled"})
    }

}