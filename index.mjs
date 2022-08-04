#!/usr/bin/env node

import SimpleHyperproxy from 'simple-hyperproxy'
import { spawn } from 'child_process'
import readline from 'readline'

const proxy = new SimpleHyperproxy()
const port = await proxy.bind(Buffer.from('f277bebb369ce20f60ace93eb1e1924f0292e685fe281fbddcf11389da389eff', 'hex'))
const telnet = spawn('telnet', ['127.0.0.1 ', port])

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (c, key) => {
  telnet.stdin.write(key.sequence)
  if (key && key.ctrl && key.name === 'c') {
    process.exit()
  }
})

telnet.stdout.pipe(process.stdout)
