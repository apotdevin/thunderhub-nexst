import { Field, ObjectType } from '@nestjs/graphql';

export type JwtObjectType = {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
};

@ObjectType()
export class UserId {
  // @Field()
  // pubkey: string;
  @Field()
  owner: boolean;
  @Field()
  admin: boolean;
  @Field()
  api_key: string;
}

@ObjectType()
export class UserSubscription {
  @Field()
  subscribed: boolean;

  @Field()
  end_date: string;

  @Field()
  upgradable: boolean;
}

@ObjectType()
export class UserInfo extends UserId {
  @Field(() => UserSubscription)
  subscription: UserSubscription;
}

@ObjectType()
export class SignInfo {
  @Field()
  message: string;
  @Field()
  expiry: string;
  @Field()
  identifier: string;
}
