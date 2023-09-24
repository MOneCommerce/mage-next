import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params },
  parent: ResolvingMetadata
): Promise<Metadata> {

  return {
    title: 'category title',
  };
}

/**
 *
 * @param params
 * @returns
 */
const CategoryDetailPage = async ({
  params
}: {params: any}) => {
  return (
    <>
    Category Detail Page
    {JSON.stringify(params)}
    </>
  );
};

export default CategoryDetailPage;
