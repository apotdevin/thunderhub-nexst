import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypes, queryTypes, mutationTypes } from './types';
import { bosResolvers } from './bos/resolvers';
import { bosTypes } from './bos/types';

const typeDefs = [generalTypes, queryTypes, mutationTypes, bosTypes];

const resolvers = merge(bosResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
