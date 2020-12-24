
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://peaceful-beach-24392.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// ApolloClient Instanace
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Pass the ApolloClient instance to the ApolloProvider component
export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);








