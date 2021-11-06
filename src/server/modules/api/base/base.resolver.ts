import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BaseResolver {
  @Query(() => Boolean)
  async getBaseCanConnect() {
    return true;
  }
}
