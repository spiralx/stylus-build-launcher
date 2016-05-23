'use babel'

import { execFile } from 'child_process'
import path from 'path'

// ----------------------------------------------------------------------------

// const WORKDIR='D:\\ffdev\\projects\\userstyle-sources'
// const CONEMU='D:\\Apps\\ConEmu' // \\App\\ConEmu\\ConEmu64'
// const STYLUS='stylus -w -m -o css -u nib'
//
// function getenv(ne) {
//   const e = Object.assign({}, process.env, { NODE_ENV: ne })
//   if (typeof ne === 'undefined') delete e['NODE_ENV']
//   return e
// }



export default class ConEmuLauncher {

  constructor(app_path, ...app_args) {
    this.app = path.join(app_path, 'App/ConEmu/ConEmu64.exe')
    this.app_args = app_args.concat([ '-Run' ])
    this.nodeEnv = undefined
  }

  toString() {
    return `ConEmuLauncher(app="${this.app}", args="${this.app_args.join(' ')}")`
  }

  env() {
    const e = Object.assign({}, process.env)

    if (this._nodeEnv) e.NODE_ENV = this._nodeEnv
    else delete e['NODE_ENV']

    return e
  }

  open(cwd, ...shell_args) {
    const opts = typeof cwd === 'string'
      ? { cwd, env: this.env() }
      : cwd

    const child = execFile(
      this.app,
      this.app_args.concat(shell_args),
      opts,
      (error, stdout, stderr) => {
        if (error) throw error
      }
    )

    // console.log(`openShell(${shell_cmd.join(' ')}) child pid: ${child.pid}`)
    return child
  }
}
