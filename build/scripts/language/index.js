const { argv } = require('yargs')
const path = require('path')
const fs = require('fs')
const prettier = require('prettier')

const CSVParser = require('./helpers/CSVParser')
const DataGridRenderer = require('./helpers/DataGridRenderer')

const __root__path = path.resolve(__dirname, '../../../')
const __is__customer__output__path = !!argv.path
const __output__path = __is__customer__output__path
  ? path.resolve(__root__path, argv.path)
  : path.resolve(__dirname, `./i18n/`)

function getParsedText(text) {
  let { dataGrid, headerNames, headerTypes } = CSVParser.parse(
    text,
    undefined,
    'auto',
    false,
    false
  )

  return DataGridRenderer['jsonArrayRows'](
    dataGrid,
    headerNames,
    headerTypes,
    '  ',
    '\n'
  )
}

const { languageCodeSort, origData } = {
  languageCodeSort: ['en_US', 'in', 'ms', 'vi'],
  origData: JSON.parse(
    getParsedText(
      fs
        .readFileSync(path.resolve(__dirname, './.txt'), {
          encoding: 'utf8'
        })
        .replace(/\\/g, '')
        .replace(/\"/g, '”')
    )
  )
}

const i18nMap = origData.reduce(
  (map, item) =>
    languageCodeSort.reduce(
      (map, code, idx) =>
        Object.assign(map, {
          [code]: Object.assign(
            map[code] || {},
            item[0] !== ''
              ? {
                  [item[0]]: item[idx + 1]
                }
              : {}
          )
        }),
      map
    ),
  {}
)

if (!__is__customer__output__path) {
  try {
    fs.mkdirSync(path.resolve(__dirname, `./i18n`))
  } catch (err) {
    // nothing
  }
}

Object.entries(i18nMap).forEach(([code, data]) => {
  const __output__file = path.resolve(__output__path, `./${code}.json`)

  fs.writeFile(
    __output__file,
    prettier.format(JSON.stringify(data), {
      semi: false,
      singleQuote: true,
      parser: 'json'
      // printWidth: 1000
    }),
    'utf8',
    e => {
      if (e) {
        console.error(e.message)
      } else {
        console.log(
          `输出文件：${__output__file.replace(__root__path, '')} 完成`
        )
      }
    }
  )
})
