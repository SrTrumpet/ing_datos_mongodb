import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import App from './App.jsx'

const client = new ApolloClient({
  uri:"http://192.168.231.151:3000/graphql",
  cache: new InMemoryCache
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App/>
    </StrictMode>
  </ApolloProvider>
);
