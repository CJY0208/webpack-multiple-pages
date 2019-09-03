const fixedContext = []

function fixContext(context) {
  fixedContext.push(context)
}

export const getFixedContext = () => fixedContext
export default fixContext
