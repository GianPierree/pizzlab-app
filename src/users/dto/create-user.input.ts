import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  role: string;
}
