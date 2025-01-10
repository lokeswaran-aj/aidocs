import dotenv from 'dotenv'

dotenv.config()

export const configuration = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    embeddingsModel: 'text-embedding-3-large',
    llmModel: 'gpt-4o-mini',
  },
  database: {
    postgresConnectionOptions: {
      type: 'postgres',
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME || 'aidocs',
      ssl: true,
    },
    dimensions: 1536,
    tableName: 'langchain_pg_embedding',
    collectionTableName: 'langchain_pg_collection',
    collectionName: 'nextjs',
    columns: {
      idColumnName: 'id',
      vectorColumnName: 'embedding',
      contentColumnName: 'document',
      metadataColumnName: 'cmetadata',
    },
  },
}

export type ConfigurationType = typeof configuration
