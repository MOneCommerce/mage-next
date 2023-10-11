import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

export const getApolloClient = (storeCode?: string) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: process.env.ECOM_GRAPHQL_API,
      headers: {
        'Content-Type': 'application/json',
        ...(storeCode && { Store: storeCode }),
      },
    }),
    cache: new InMemoryCache(),
  })
}
