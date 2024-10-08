import * as core from '@actions/core'
import { auth_key, working_dir } from './inputs'
import { chdir } from './utils/changeDir'
import { getCrawloraFile } from './utils/getCrawloraFile'
import { compress } from './utils/compress'
import { readFileSync } from 'fs'
import { Application } from '@crawlora/sdk'
import { AxiosError } from 'axios'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apikey = auth_key()
    const dir = working_dir()

    chdir(dir, true)

    core.debug(`api key = ${apikey}`)
    core.debug(`workding directory ${dir}`)

    const cwd = process.cwd()
    core.debug(`Current working directory: ${cwd}`)

    const fileInfo = getCrawloraFile(cwd)

    const zipFile = await compress(cwd)

    core.debug(JSON.stringify(fileInfo))

    const app = new Application(apikey)

    // if app_id exists then we should update it else create it
    if (fileInfo.app_id) {
      // update it
      const msg = await app.update(fileInfo.app_id, {
        file_path: zipFile,
        input: JSON.parse(
          readFileSync(fileInfo.input_file, { encoding: 'utf-8' })
        ),
        description: readFileSync(fileInfo.documentation_file, {
          encoding: 'utf-8'
        }),
        icon: fileInfo.logo_file,
        banner: fileInfo.banner_file,
        author: fileInfo.author || 'admin',
        screenshots: fileInfo.screenshot_files,
        title: fileInfo.title,
        version: fileInfo.version
      })

      core.debug(`got message: ${msg.message || 'code updated successfully'}`)

      return
    }

    const msg = await app.create({
      file_path: zipFile,
      input: JSON.parse(
        readFileSync(fileInfo.input_file, { encoding: 'utf-8' })
      ),
      description: readFileSync(fileInfo.documentation_file, {
        encoding: 'utf-8'
      }),
      icon: fileInfo.logo_file,
      banner: fileInfo.banner_file,
      author: fileInfo.author || 'admin',
      screenshots: fileInfo.screenshot_files,
      title: fileInfo.title,
      version: fileInfo.version
    })

    core.debug(`got message: ${msg.message || 'code updated successfully'}`)

    // upload the files
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data)
    }

    if (error instanceof Error) {
      core.debug(error.message)
      core.setFailed(error)
    }
  }
}
