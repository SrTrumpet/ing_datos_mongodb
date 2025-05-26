import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity('usuarios')
export class UserEntity{

    @ObjectIdColumn()
    @Field(() => ID)
    id: ObjectId;

    @Field({ nullable: true })
    @Column()
    nombre: string;

    @Field({ nullable: true })
    @Column()
    correo: string;

    @Field({ nullable: true })
    @Column()
    edad: number;

    @Field(() => [String], { nullable: true })
    @Column()
    intereses: string[];

}