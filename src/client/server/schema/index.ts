import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypes, queryTypes, mutationTypes } from './types';
import { bosResolvers } from './bos/resolvers';
import { bosTypes } from './bos/types';
import { lnMarketsResolvers } from './lnmarkets/resolvers';
import { lnMarketsTypes } from './lnmarkets/types';

const typeDefs = [
  generalTypes,
  queryTypes,
  mutationTypes,
  bosTypes,
  lnMarketsTypes,
];

const resolvers = merge(bosResolvers, lnMarketsResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
