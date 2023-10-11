'use client'

import { ApolloLink, HttpLink, from } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_ECOM_GRAPHQL_API,
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')
    const store = localStorage.getItem('store')
    console.log(store)
    console.log(token)
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        ...(token && { authorization: `Bearer ${token}` }),
        ...(store && { store }),
      },
    }))

    return forward(operation)
  })

  const activityMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
      },
    }))

    return forward(operation)
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : from([authMiddleware, activityMiddleware, httpLink]),
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
