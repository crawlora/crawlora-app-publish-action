import { resolve } from 'path'
import fs from 'fs'
import { crawloraFileValidation, getValidatedFileInfo } from './fileValidation'
import z from 'zod'

export const crawloraFile = 'crawlora.json'
export const getCrawloraFile = (
  dir: string
): z.infer<typeof crawloraFileValidation> => {
  const file = resolve(dir, crawloraFile)
  if (!fs.existsSync(file)) {
    throw new Error(`file: ${file} does not exists`)
  }
  return getValidatedFileInfo(file)
}
