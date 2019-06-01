const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { exec } = require('child_process')
const { isDirtyBranch, getCurrentBranch } = require('../../helpers')

const currentBranch = getCurrentBranch()

if (currentBranch !== 'develop' && isDirtyBranch()) {
  console.log('你合并了一个脏分支，将会帮你执行撤销合并操作')
  console.log(
    // https://stackoverflow.com/questions/17041317/undo-git-fast-forward-merge/32783586
    `若自动执行失败，请手动运行命令：git reset --keep ${currentBranch}@{1}`
  )
  // https://gist.github.com/neekey/5552351
  exec(`start node ./build/scripts/git/hooks/post-merge/revert.js`)
  setTimeout(() => process.exit(0), 500)
}
