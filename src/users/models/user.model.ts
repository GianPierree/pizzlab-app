import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  
  @Field(() => ID)
  _id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  role: string;
}