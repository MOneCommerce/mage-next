import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

/**
 *
 * @param params
 * @returns
 */
const CmsPage = async ({ params }: { params: any }) => {
  return (
    <>
      Checkout Cart Page
      {JSON.stringify(params)}
    </>
  )
}

export default CmsPage
