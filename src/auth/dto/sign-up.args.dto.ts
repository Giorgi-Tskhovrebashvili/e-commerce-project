import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SignUpInput {
  @Field()
  email: string;

  @Field()
  password: string;
}