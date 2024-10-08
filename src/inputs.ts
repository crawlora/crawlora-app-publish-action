import * as core from '@actions/core'

export enum INPUTS {
    auth_key = "auth_key",
    working_dir = "working-directory"
}

export const getInput = (key: INPUTS, isRequired = true) => {
    return core.getInput(key, { required: isRequired, trimWhitespace: true })
}

export const auth_key = () => getInput(INPUTS.auth_key)

export const working_dir = () => getInput(INPUTS.working_dir, false)
