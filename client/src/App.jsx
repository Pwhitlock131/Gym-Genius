import './App.css';
import {Outlet} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from "@apollo/client";

const httpLink = createHttpLink({
    uri: '/graphql',
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

