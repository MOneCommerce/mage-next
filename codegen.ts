import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_ECOM_GRAPHQL_API,
  ignoreNoDocuments: true,
  config: {
    skipTypename: true,
    enumsAsTypes: true,
    scalars: {
      numeric: 'number',
    },
    dedupeOperationSuffix: true,
  },
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/server-generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    'src/graphql/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // avoidOptionals: true,
        // dedupeFragments: true,
        // flattenGeneratedTypes: true,
        // skipDocumentsValidation: true,
        // omitOperationSuffix: true,
        // dedupeOperationSuffix: true,
      },
    },
  },
}

export default config
