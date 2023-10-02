import Users from "./user.model.js";

export class UseService {

    async createUser(data){
        return await Users.create(data)
    }

    async findAllUser(){
        return await Users.findAll({
            where: {
                status: "available"
            }
        })
    }

    async findOneUser(id){
        return await Users.findOne({
            where: {
                id,
                status: "available"
            }
        })
    }

    async updateUser(user, data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({status:"not available"})
    }

}
