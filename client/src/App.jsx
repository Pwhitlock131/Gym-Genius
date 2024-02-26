import React from 'react';
import './App.css';
import {Outlet} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from "@apollo/client";
  import { setContext } from '@apollo/client';


const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  

function App() {
 return (
    <ApolloProvider client={client}>
    <div className="App">
        <Outlet />
    </div>
    </ApolloProvider>
    );
}

export default App;

