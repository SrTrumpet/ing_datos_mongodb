import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    nombre?: string;

    @Field({ nullable: true })
    correo?: string;

    @Field({ nullable: true })
    edad?: number;

    @Field(() => [String], { nullable: true })
    intereses?: string[];
}
