import { camelToKebabCase } from "./utils"

/**
 * Transform this:
 *
 * import { useBoolean } from '../useBoolean'
 * import { useCounter } from '../useCounter'
 * import { useInterval } from '../useInterval'
 *
 * Or this:
 *
 * import { useBoolean } from './useBoolean'
 *
 * Into this:
 *
 * import { useBoolean, useCounter, useInterval } from 'vhooks'
 */
export function transformImports(data:string) {
  // const importRegex = /import { ([^}]+) } from ['"]\.\.\/use([^'"]+)['"]/g
  const importRegex = /import { ([^}]+) } from ['"]\.\.?(\/[^'"]+)['"]/g

  const imports = Array.from(data.matchAll(importRegex)).map(match => ({
    importName: match[1],
    startIndex: match.index,
    endIndex: match.index + match[0].length,
  }))

  // If there are imports to transform
  if (imports.length > 0) {
    // Concatenate import names and create the new import statement
    const importNames = imports.map(({ importName }) => importName).join(', ')
    const newImportStatement = `import { ${importNames} } from 'vhooks'`

    // Replace existing import statements with the new one
    if (data.indexOf(imports[0].importName) !== -1) {
      const startIndex = imports[0].startIndex
      const endIndex = imports[imports.length - 1].endIndex

      data = `${data.slice(0, startIndex)}${newImportStatement}${data.slice(endIndex)}`
    }
  }

  return data
}

export function removeJSDocComments(data: string): string {
  const inlineJsdocRegex = /\/\*\*\s*([\s\S]*?)\*\/\n?/g
  const multiLineJsdocRegex = /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\/\n?/g
  return data.replace(inlineJsdocRegex, '').replace(multiLineJsdocRegex, '')
}

export function removeFirstLine(data: string): string {
  return data.split('\n').slice(1).join('\n')
}

export function removeDefinedInSections(data: string): string {
  let lines = data.split('\n')
  const occurrences = lines.filter(line => line === '#### Defined in').length

  for (let index = 0; index < occurrences; index++) {
    const index = lines.findIndex(line => line === '#### Defined in')
    const before = lines.slice(0, index)
    const after = lines.slice(index + 3)
    lines = [...before, ...after]
  }

  return lines.join('\n')
}

export function removeEslintDisableComments(data: string): string {
  return data
    .split('\n')
    .filter(line => !line.startsWith('// eslint-disable-next-line'))
    .join('\n')
}

export function replaceRelativePaths(data: string, slug: string) {
  return data.replace(/\[([^\[]+)\]\((.*?)\)/g, (match, title, link) => {
    const sanitizedLink = link.trim()

    if (sanitizedLink.startsWith('http')) {
      return match
    }

    const filename = sanitizedLink.replace('../types/', '').replace('.md', '')
    // const hookName = filename.split('_')[0]
    const typeName = filename.split('.').at(-1)
    const newLink = `/hooks/${slug}#${typeName}`

    return `[${title}](${newLink})`
  })
}
