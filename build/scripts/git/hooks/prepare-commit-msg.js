const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { isDirtyBranch } = require('../helpers')

// GIT_PARAMS 参数由应用了 husky 后的 ./git/hooks/prepare-commit-msg 中传来
const GIT_PARAMS = process.env.GIT_PARAMS.split(' ')

// 此程序块用以防止 develop 被错误合并到其他分支中
if (GIT_PARAMS[1] === 'merge') {
  const content = fs.readFileSync(
    path.resolve(__dirname, '../../../../', GIT_PARAMS[0]),
    {
      encoding: 'utf8'
    }
  )

  if (/Merge branch \'develop\' into/.test(content)) {
    console.log('develop 分支不允许被合并')
    process.exit(1)
  }

  if (!/into develop/.test(content) && isDirtyBranch()) {
    console.log('此分支为脏分支，不允许合并或被合并')
    process.exit(1)
  }
}
