import Repairs from "./repairs.model.js";

export class RepairsServices {

    async createRepair(data){
        return await Repairs.create(data)
    }

    async findAllrepairs(){
        return await Repairs.findAll({
            where: {
                status: true
            }
        })
    }

    async findOnerepair(id){
        return await Repairs.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async updateRepair(repair, data){
        return await repair.update(data)
    }


    async deleteRepair(repair){
        return await repair.update({status:false})
    }

}