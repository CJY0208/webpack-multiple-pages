const { exec } = require('child_process')

const remove = (path, isFile = true) => {
  exec(`rm${isFile ? '' : ' -rf'} ${path}`, (error, stdout, stderr) => {
    // if (error) {
    //     console.error(`error: ${error}`);
    // }
    // if (stdout) {
    //   console.log(`stdout: ${stdout}`)
    // }
    // if (stderr) {
    //   console.log(`stderr: ${stderr}`)
    // }
  })
}

const clean = ({ directories = [], files = [] }) => {
  directories.forEach(path => remove(path, false))
  files.forEach(path => remove(path))
}

module.exports = {
  remove,
  clean
}
