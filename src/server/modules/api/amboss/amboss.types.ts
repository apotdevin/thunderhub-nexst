import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AmbossSubscription {
  @Field()
  end_date: string;
  @Field()
  subscribed: boolean;
  @Field()
  upgradable: boolean;
}

@ObjectType()
export class AmbossUser {
  @Field(() => AmbossSubscription)
  subscription: AmbossSubscription;
}

@ObjectType()
export class BosScore {
  @Field()
  position: number;
  @Field()
  score: number;
  @Field()
  updated: string;
  @Field()
  alias: string;
  @Field()
  public_key: string;
}

@ObjectType()
export class BosScoreInfo {
  @Field()
  count: number;
  @Field(() => BosScore)
  first: BosScore;
  @Field(() => BosScore)
  last: BosScore;
}

@ObjectType()
export class NodeBosHistory {
  @Field(() => BosScoreInfo)
  info: BosScoreInfo;
  @Field(() => [BosScore])
  scores: BosScore[];
}

@ObjectType()
export class LightningAddress {
  @Field()
  pubkey: string;
  @Field()
  lightning_address: string;
}

@ObjectType()
export class NodeSocialInfo {
  @Field()
  private: boolean;
  @Field()
  telegram: string;
  @Field()
  twitter: string;
  @Field()
  twitter_verified: boolean;
  @Field()
  website: string;
  @Field()
  email: string;
}

@ObjectType()
export class NodeSocial {
  @Field(() => NodeSocialInfo)
  info: NodeSocialInfo;
}

@ObjectType()
export class LightningNodeSocialInfo {
  @Field(() => NodeSocial)
  socials: NodeSocial;
}
