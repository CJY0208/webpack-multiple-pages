const path = require('path')
const fs = require('fs')
const prettier = require('prettier')

const CSVParser = require('./helpers/CSVParser')
const DataGridRenderer = require('./helpers/DataGridRenderer')

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
      fs.readFileSync(path.resolve(__dirname, './.txt'), {
        encoding: 'utf8'
      })
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

try {
  fs.mkdirSync(path.resolve(__dirname, `./i18n`))
} catch (err) {
  // nothing
}

Object.entries(i18nMap).forEach(([code, data]) => {
  fs.writeFile(
    path.resolve(__dirname, `./i18n/${code}.json`),
    prettier.format(JSON.stringify(data), {
      semi: false,
      singleQuote: true,
      parser: 'json'
      // printWidth: 1000
    }),
    'utf8',
    () => {
      console.log(`输出文件：${code}.json 完成`)
    }
  )
})
