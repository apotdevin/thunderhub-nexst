import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypes, queryTypes, mutationTypes } from './types';
import { routeResolvers } from './route/resolvers';
import { routeTypes } from './route/types';
import { bosResolvers } from './bos/resolvers';
import { bosTypes } from './bos/types';
import { lnMarketsResolvers } from './lnmarkets/resolvers';
import { lnMarketsTypes } from './lnmarkets/types';
import { boltzResolvers } from './boltz/resolvers';
import { boltzTypes } from './boltz/types';

const typeDefs = [
  generalTypes,
  queryTypes,
  mutationTypes,
  routeTypes,
  bosTypes,
  lnMarketsTypes,
  boltzTypes,
];

const resolvers = merge(
  routeResolvers,
  bosResolvers,
  lnMarketsResolvers,
  boltzResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
