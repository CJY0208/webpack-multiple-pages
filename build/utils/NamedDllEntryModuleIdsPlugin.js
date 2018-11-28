/**
 * Dll 使用了顺序下标作为入口的 id 值，顺序变化会影响打包内容结果，导致 hash 值发生改变
 *
 * 故需要此插件来调节 dll entryModule.id
 */
class NamedDllEntryModuleIdsPlugin {
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('before-hash', () => {
        compilation.chunks.forEach(chunk => {
          if (chunk.entryModule.type === 'dll entry') {
            chunk.entryModule.id = chunk.name
          }
        })
      })
    })
  }
}

module.exports = NamedDllEntryModuleIdsPlugin
