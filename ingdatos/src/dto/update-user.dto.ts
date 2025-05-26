import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    nombre?: string;

    @Field({ nullable: true })
    correo?: string;

    @Field({ nullable: true })
    edad?: number;

    @Field(() => [String], { nullable: true })
    intereses?: string[];
}
