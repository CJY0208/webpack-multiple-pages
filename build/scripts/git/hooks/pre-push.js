const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { exec } = require('child_process')
const { isDirtyBranch, getCurrentBranch } = require('../helpers')

const currentBranch = getCurrentBranch()

// 防止 develop 以外的脏分支被推送到远端
if (currentBranch !== 'develop' && isDirtyBranch()) {
  console.log('你当前所处的分支为脏分支，无法执行 push 操作')
  process.exit(1)
}
