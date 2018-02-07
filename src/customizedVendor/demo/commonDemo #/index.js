import 'babel-polyfill'
// import { common_common as aaa } from '../common_common'
// console.log(common_common)

// export const common_common = aaa

export const fn1 = () => {
  console.log('common fn1')
}

export const fn2 = () => {
  console.log('common fn2')
}

export const fn3 = () => {
  console.log('common fn3')
}

function Instantiate(Class, opt) {
  return new Class(opt)
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))

@Instantiate
export class Test {
  async test() {
    console.log('common Test')
    await delay(2000)
    console.log('common Test class after 2000 ms ')
  }
}

console.log(Test)
Test.test()
