import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {API_BACKEND, WS_BACKEND} from './config/env.js'

let httpLink = createHttpLink({
  uri: API_BACKEND,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: WS_BACKEND,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />
}