'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import { useEffectOnce } from '@hooks/global'
import createSafeContext from '@utils/createSafeContext'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export interface StoreConsumerProps {
  store: string
  locale: string
}

export const [useRegions, Provider] = createSafeContext<StoreConsumerProps>()

export interface StoreProviderProps {
  children: React.ReactNode
}

export function StoreProvider({
  children,
  store,
  locale,
  settings = {},
  messages = {},
}: {
  children: ReactNode
  store: string
  locale: string
  settings: Object
  messages: Object
}) {
  const providerValues: StoreConsumerProps = {
    store,
    locale,
  }

  useEffectOnce(() => {
    window.localStorage.setItem('store', store)
    window.localStorage.setItem('locale', locale)
    window.localStorage.setItem('settings', JSON.stringify(settings))
  })

  return (
    <Provider value={providerValues}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages as AbstractIntlMessages}
      >
        {children}
      </NextIntlClientProvider>
    </Provider>
  )
}

export default StoreProvider
