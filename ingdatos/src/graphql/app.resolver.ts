import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUserInput } from 'src/dto/add-input.dto';
import { UpdateUserInput } from 'src/dto/update-user.dto';

@Resolver()
export class AppResolver{

    constructor(private readonly appService: AppService){}

    @Query(() => [UserEntity])
    getAllUser(){
        return this.appService.findAll();
    }

    @Query(() => UserEntity, { nullable: true })
    getUserById(@Args('id') id: string) {
        return this.appService.findOne(id);
    }

    @Mutation(() => UserEntity)
    async addUser(@Args('data') data: CreateUserInput) {
        return this.appService.create(data);
    }

    @Mutation(() => UserEntity)
    async deleteUser(@Args('id') id: string) {
        return this.appService.deleteUser(id);
    }
    @Mutation(() => UserEntity)
    async updateUser(@Args('data') data: UpdateUserInput) {
        return this.appService.updateUser(data);
    }
}