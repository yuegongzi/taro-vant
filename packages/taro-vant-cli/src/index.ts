// @ts-ignore
import packageJson from '../package.json'
import { clean } from './commands/clean'
import { build } from './commands/build'
import { changelog } from './commands/changelog'
import { watch } from './commands/dev'

export const cliVersion: string = packageJson.version
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.env.VANT_CLI_VERSION = cliVersion

export { clean, build, changelog, watch as dev }
