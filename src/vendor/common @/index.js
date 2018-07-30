import '__prefix__'

export * as helpers from './helpers'

import * as helpers from './helpers'

if (helpers.isMobile()) {
  helpers.CDN.js('//cdn.jsdelivr.net/npm/eruda', 'eruda').then(eruda =>
    eruda.init()
  )
}
