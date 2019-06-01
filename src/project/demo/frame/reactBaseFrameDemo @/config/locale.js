import * as helpers from '@helpers'

import en_US_locale from '../assets/i18n/en_US.json'
import in_locale from '../assets/i18n/in.json'
import ms_locale from '../assets/i18n/ms.json'
import vi_locale from '../assets/i18n/vi.json'

export default {
  en: helpers.i18n.load([
    en_US_locale,
    () =>
      import(/* webpackChunkName: 'assets/i18n/common/en_US' */ '__assets__/i18n/common/en_US.json')
  ]),
  in: helpers.i18n.load([
    in_locale,
    () =>
      import(/* webpackChunkName: 'assets/i18n/common/in' */ '__assets__/i18n/common/in.json')
  ]),
  ms: helpers.i18n.load([
    ms_locale,
    () =>
      import(/* webpackChunkName: 'assets/i18n/common/ms' */ '__assets__/i18n/common/ms.json')
  ]),
  vi: helpers.i18n.load([
    vi_locale,
    () =>
      import(/* webpackChunkName: 'assets/i18n/common/vi' */ '__assets__/i18n/common/vi.json')
  ])
}
