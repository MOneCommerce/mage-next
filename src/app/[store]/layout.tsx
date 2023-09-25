import StoreProvider from '@providers/StoreProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store Title',
  description: 'Generated by create next app',
}

/**
 * Store Root Layout
 * @param children
 * @returns
 */
export default async function RootStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    store: string
  }
}) {
  return (
    <StoreProvider store={params.store} locale="en" messages={{}} settings={{}}>
      {children}
    </StoreProvider>
  )
}
