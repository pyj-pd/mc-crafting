import { readFile } from 'fs/promises'

/**
 * Load post file
 * @param file
 * @returns
 */
export const loadPost = async (file: string) => {
  const fileData = await readFile(file, 'utf-8')

  return fileData
}
