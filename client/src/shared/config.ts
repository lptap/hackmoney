import { Config } from './types'

const environment = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'kovan'
export const config = require(`../env/${environment}.ts`).env as Config
