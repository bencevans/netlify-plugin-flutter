const flutterPath = process.env['HOME'] + '/flutter'
const flutterBinPath = flutterPath + '/bin'

/* eslint-disable no-unused-vars */
export const onPreBuild = async function ({
  inputs,
  // Core utilities
  utils: {
    // Utility to report errors.
    // See https://github.com/netlify/build#error-reporting
    build,
    // Utility to display information in the deploy summary.
    // See https://github.com/netlify/build#logging
    status,
    // Utility for caching files.
    // See https://github.com/netlify/build/blob/master/packages/cache-utils#readme
    cache,
    // Utility for running commands.
    // See https://github.com/netlify/build/blob/master/packages/run-utils#readme
    run,
  },
}) {
  const targetChannel = inputs.channel || 'stable'
  const flutterVersion = inputs.version
  let shouldUpgrade = false

  if (flutterVersion != null) {
    console.log('⚡️ Downloading Flutter SDK ' + flutterVersion)
    await run('git', [
      'clone',
      '--depth',
      '1',
      'https://github.com/flutter/flutter.git',
      '-b',
      flutterVersion,
      process.env['HOME'] + '/flutter',
    ])
  } else {
    shouldUpgrade = true

    console.log('⚡️ Downloading Flutter Stable SDK')
    await run('git', [
      'clone',
      '--depth',
      '1',
      'https://github.com/flutter/flutter.git',
      '-b',
      'stable',
      process.env['HOME'] + '/flutter',
    ])
  }

  console.log('✅ Flutter SDK downloaded')

  console.log('🪄 Adding Flutter to PATH')
  process.env['PATH'] = process.env['PATH'] + ':' + flutterBinPath

  console.log('🚀 Setting Flutter Channel to ' + targetChannel)
  await run('flutter', ['channel', targetChannel])

  if (shouldUpgrade) {
    console.log('🚀 Upgrading Flutter')
    await run('flutter', ['upgrade'])
  }

  status.show({ summary: 'Success!' })
}
