
# try 模块

值相关的安全尝试，防止**由于属性断层抛出报错打断程序运行**的情况发生

## get 安全取值

```javascript
var obj = {
  a: {
    b: 1
  }
}

// 基础
get(obj, 'a.b') // 1
get(obj, ['a', 'b']) // 1
get(obj, 'c.b') // undefined

// 带默认值
get(obj, 'c.b', 1) // 1
```

## run 安全运行（可保护上下文）

```javascript
var obj = {
  deep: {
    deep: {
      add: (a, b) => a + b
    }
  },

  name: 'CJY',
  greet() {
    console.log(`hello, I'm ${this.name}`)
  }
}

// 函数存在时
run(obj, 'deep.deep.add', 1, 2) // 3


// 取值不是函数或查找结果不存在时，行为与 get 函数一致
run(obj, 'deep.deep.reduce') // undefined
run(obj, 'name') // CJY

// 保护上下文
run(obj, 'greet') // hello, I'm CJY
```

## value 多层默认值（只在值为`undefined`情况下生效）

```javascript
var v1, v2, v3 = 'default'

value(v1, v2, v3) // default

value(v1, 0, v3) // 0

// 可传递执行函数
value(
  v1, 
  () => {
    console.log('v1没有，尝试v2')
    return v2
  },
  () => {
    console.log('v2也没有，尝试v3')
    return v3
  },
) // default
```
