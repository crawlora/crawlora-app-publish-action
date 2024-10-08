import { debug } from '@actions/core'

export const chdir = (path: string, failSafe = false): void => {
  try {
    debug(`checking out to the directory ${path}`)
    process.chdir(path)
  } catch (e) {
    if (!failSafe) {
      debug(`failed to change directory`)
      throw e
    }
  }
}
