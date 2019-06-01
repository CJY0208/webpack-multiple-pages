const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { isDirtyBranch, getCurrentBranch } = require('../../helpers')

const currentBranch = getCurrentBranch()

setTimeout(() => {
  console.log('正在执行撤销合并操作，操作完成后窗口将自动关闭')
  console.log('请勿关闭此窗口...')

  // https://stackoverflow.com/questions/17041317/undo-git-fast-forward-merge/32783586
  exec(`git reset --keep ${currentBranch}@{1}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`)
    }
    if (stdout) {
      console.log(`stdout: ${stdout}`)
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
    }

    if (isDirtyBranch()) {
      console.log(
        `撤销失败，10 秒后自动退出，请手动运行命令：git reset --keep ${currentBranch}@{1}`
      )

      setTimeout(() => {
        console.log('拜拜，这句话你看不到了')
      }, 10000)
    } else {
      console.log('撤销成功！一秒后退出')

      setTimeout(() => {
        console.log('拜拜，这句话你看不到了')
      }, 1000)
    }
  })
}, 1000)
