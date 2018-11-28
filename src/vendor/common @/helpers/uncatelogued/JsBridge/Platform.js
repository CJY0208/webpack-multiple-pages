import { get, run, value } from '../../try'

export default class JsBridgePlatform {
  /**
   * 原生的支持性检查器
   */
  isPlatformSupport = () => false

  /**
   * 原生接口获取器
   */
  getPlatformRunner = api => () =>
    console.warn(`JsBridgePlatform 不支持 ${api} 接口，未设置 Runner Shape`)

  /**
   * 设置原生的支持性检查器，可链式调用
   */
  setSupportChecker = supportChecker => {
    this.isPlatformSupport = supportChecker
    return this
  }

  /**
   * 设置原生接口获取器，可链式调用
   */
  setRunnerShape = runnerShape => {
    this.getPlatformRunner = runnerShape
    return this
  }

  /**
   * 生成原生接口运行器，得到的 runner 拥有 isSupported 函数用以检测支持性，并拥有 custom 方法定制化 runner 预执行过程（例如参数处理）
   */
  native = (api, ...args) => {
    const nativeRunner = this.getPlatformRunner(api, ...args)
    const isSupported = () => this.isPlatformSupport(api)

    const runner = (...args) => {
      if (isSupported()) {
        run(nativeRunner, undefined, ...args)
        return true
      } else {
        console.warn(`JsBridgePlatform 不支持 ${api} 接口`)
        return false
      }
    }

    return Object.assign(runner, {
      isSupported,
      custom: customizedGenerator => {
        const customizedRunner = customizedGenerator(runner)

        return Object.assign(customizedRunner, { isSupported })
      }
    })
  }

  /**
   * 手动声明接口，此时 isSupported 始终为 true
   */
  manual = runner => {
    runner.isSupported = () => true
    return runner
  }

  /**
   * 注册运行器，可批量注册，可链式调用，参数为 Object 或 Function
   * 其中 Function 形式的调用示例如下
   *
   * platform.register(({ native, manual }) => ({
   *   aaa: native('nativeAAA'),
   *   bbb: manual(() => {
   *     console.log('BBB')
   *   })
   * }))
   */
  register = methods => {
    this.__methods = {
      ...this.__methods,
      ...run(methods, undefined, this)
    }

    return this
  }

  /**
   * 按运行器名称检查当前 platform 是否支持
   */
  support = api => {
    const runner = this.getRunner(api)

    return value(run(runner, 'isSupported'), false)
  }

  /**
   * 按运行器名称获取当前 platform 运行器
   */
  getRunner = api => get(this.__methods, [api])
}
