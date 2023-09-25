import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

/**
 *
 * @param params
 * @returns
 */
const CustomerPage = async ({ params }: { params: any }) => {
  return (
    <>
      Customer Page
      {JSON.stringify(params)}
    </>
  )
}

export default CustomerPage
