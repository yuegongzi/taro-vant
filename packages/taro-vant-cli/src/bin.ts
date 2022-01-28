import { Command } from 'commander'

import { build, changelog, clean, cliVersion, dev, buildSite } from './index'

const program = new Command()

program.version(`@taro-vant/cli ${cliVersion}`)

program.command('clean').description('Clean all dist files').action(clean)

program.
  command('build').
  description('Compile components in production mode').
  action(build)

program.
  command('build-site').
  description('Compile site in production mode').
  action(buildSite)

program.
  command('dev').
  description('Compile components in development mode').
  option('--type <type>', 'Build type').
  action(dev)

program.command('changelog').description('Generate changelog').action(changelog)

program.parse()
