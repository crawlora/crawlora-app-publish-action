import * as core from '@actions/core'
import * as tar from 'tar'
import { resolve } from 'path'

export const compress = async (path: string): Promise<string> => {
  const output = resolve(path, 'compress.tgz')

  await tar.c(
    {
      gzip: false,
      file: output
    },
    [path]
  )

  core.debug(`Folder ${path} has been compressed to ${output}`)

  return output
}
