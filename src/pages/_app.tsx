import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider
      client={client}
    >
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
