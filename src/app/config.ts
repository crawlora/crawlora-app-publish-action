export const getEnv = (key: string, def?: string, shouldCrash = true)  => {
    const { env } = process
    const value = env[key] || def;
    if(typeof value !== 'string' && shouldCrash === true){
            throw new Error(`env ${key} did not found in env`)
    }
    return value
  }

  
export const auth_key = getEnv('CRAWLORA_AUTH_KEY', undefined, false); // provided by default

