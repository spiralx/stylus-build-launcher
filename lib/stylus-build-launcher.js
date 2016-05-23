'use babel'

import path from 'path'
import varstring from 'varstring'

import { CompositeDisposable } from 'atom'

import ConEmuLauncher from './conemu'

// ----------------------------------------------------------------------------

export default {

  subscriptions: null,

  config: {
    conemuDirectory: {
      title: 'ConEmu installation directory',
      description: 'Directory where ConEmu is installed',
      type: 'string',
      'default': 'D:\\Apps\\ConEmu'
    },
    conemuArguments: {
      title: 'ConEmu arguments',
      description: 'Additional arguments to pass to ConEmu',
      type: 'string',
      'default': '-Single -NoCloseConfirm'
      /*'default': [
        '-Single',
        '-NoCloseConfirm'
      ], // r`D:\Apps\ConEmu\App\ConEmu\ConEmu64 -single -dir {dir} -run bash -l -i -c "{cmd}"`
      items: {
        type: 'string'
      },*/
    },
    stylusArguments: {
      title: 'Stylus arguments',
      description: 'Additional arguments to pass to Stylus',
      type: 'string',
      'default': '--sourcemap-inline --hoist-atrules --inline --out css'
    },
    stylusModules: {
      title: 'Stylus modules',
      description: 'Third-party Stylus modules to use',
      type: 'array',
      'default': [ 'nib' ],
      items: {
        type: 'string'
      }
    }
  },

  // --------------------------------------------------------------------------

  activate(state) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stylus-build-launcher:launch': () => this.launch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  // --------------------------------------------------------------------------

  _getConfig() {
    const conf = {}
    for (let k in this.config) {
      conf[k] = atom.config.get(`stylus-build-launcher.${key}`)
    }
    return conf
  },

  // --------------------------------------------------------------------------

  launch() {
    console.log('stylus-build-launcher:launch')

    const editor = atom.workspace.getActiveTextEditor()
    const project_paths = atom.project.getPaths()

    if (!(editor || project_paths.length)) return

    const launch_dir = editor
      ? editor.getDirectoryPath()
      : project_paths[0]
    console.info(`launch_dir="${launch_dir}"`)

    const config = this._getConfig()
    console.dir(config)

    const launcher = new ConEmuLauncher(config.conemuDirectory, ...config.conemuArguments.split(' '))
    console.log(`launcher=${launcher}`)

    const stylus_cmd = [
      'stylus --watch',
      config.stylusArguments,
      config.stylusModules.map(m => `--use ${m}`)
    ].join(' ')
    console.info(`stylus_cmd="${stylus_cmd}"`)

    const child_proc = launcher.open(launch_dir, 'bash', '-c', stylus_cmd)
    console.warn(`stylus-build-launcher:launch - child process has pid=${child.pid}!`)

    // const shell_cmd = varstring(config.consoleCommand, {
    //   app: path.join(config.conemuDirectory, 'App/ConEmu/ConEmu64'),
    //   dir: launch_dir,
    //   cmd: stylus_cmd
    // })
    // console.info(`shell_cmd: %c${shell_cmd}%c`, 'color:#05f', 'color:#000')
    //
    // const env = Object.assign({}, process.env)
    // delete env['NODE_ENV']
  }

}
