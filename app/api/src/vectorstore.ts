import { PGVectorStore } from '@langchain/community/vectorstores/pgvector'
import { configuration } from './configuration'
import { embeddings } from './openai'

/**
 * Singleton class to manage vector store instance
 */
export class VectorStoreService {
  private static instance: PGVectorStore | null = null
  
  /**
   * Initialize and get the vector store instance
   * @returns Promise<PGVectorStore>
   * @throws Error if initialization fails
   */
  public static async getInstance(): Promise<PGVectorStore> {
    if (!VectorStoreService.instance) {
      try {
        VectorStoreService.instance = await PGVectorStore.initialize(
          embeddings,
          configuration.database
        )
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new Error(`Failed to initialize vector store: ${errorMessage}`)
      }
    }
    
    return VectorStoreService.instance
  }

  // Prevent instantiation
  private constructor() {}
}

// Export a convenient method to get the vector store
export const getVectorStore = VectorStoreService.getInstance
