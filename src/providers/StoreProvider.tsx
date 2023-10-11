'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import { useEffectOnce } from '@hooks/global'
import createSafeContext from '@utils/createSafeContext'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export interface StoreConsumerProps {
  store: string
}

export const [useRegions, Provider] = createSafeContext<StoreConsumerProps>()

export interface StoreProviderProps {
  children: React.ReactNode
}

export function StoreProvider({
  children,
  store,
  settings = {},
}: {
  children: ReactNode
  store: string
  settings: Object
}) {
  const providerValues: StoreConsumerProps = {
    store,
  }

  useEffectOnce(() => {
    window.localStorage.setItem('store', store)
    window.localStorage.setItem('settings', JSON.stringify(settings))
  })

  return <Provider value={providerValues}>{children}</Provider>
}

export default StoreProvider
