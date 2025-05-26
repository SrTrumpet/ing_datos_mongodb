import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { UserEntity } from "src/entity/user.entity";
import { ObjectId } from "mongodb";
import { UpdateUserInput } from "src/dto/update-user.dto";

@Injectable()
export class AppService{

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: MongoRepository<UserEntity>,
    ){}

    async create(data: Partial<UserEntity>){
        return this.userRepository.save(data);
    }

    async findAll(){
        return this.userRepository.find();
    }

    async findOne(id: string) {
        return this.userRepository.findOneBy({ _id: new ObjectId(id) });
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await this.userRepository.delete({ id: new ObjectId(id) });
        return user;
    }

    async updateUser(data: any) {
        const objectId = new ObjectId(data.id);
        const user = await this.userRepository.findOneBy({ _id: objectId });

        if (!user) {
        throw new Error('Usuario no encontrado');
        }

        if (data.nombre != null) user.nombre = data.nombre;
        if (data.correo != null) user.correo = data.correo;
        if (data.edad != null) user.edad = data.edad;

        if (Array.isArray(data.intereses)) {
        user.intereses = data.intereses;
        }

        return this.userRepository.save(user);
    }
}