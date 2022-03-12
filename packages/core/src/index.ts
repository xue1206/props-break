import * as ts from "typescript"

const DEFINITION_TYPES = [ts.SyntaxKind.TypeAliasDeclaration, ts.SyntaxKind.InterfaceDeclaration]

const createSource = (code: string) => {
  return ts.createSourceFile("_.ts", code, ts.ScriptTarget.Latest)
}

const walk = (node: ts.Node) => {
  try {
    if (DEFINITION_TYPES.includes(node.kind)) {
      return node
    } else if (node.getChildCount() > 0) {
      return walk(node.getChildAt(0))
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

const parseNode = (node: ts.TypeAliasDeclaration | ts.InterfaceDeclaration) => {
  const name = node.name.escapedText
  const fields: string[] = []
  if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
    // typescript throw "reading escapedText" error
    try {
      node.type.forEachChild((child) => {
        // @ts-ignore
        fields.push(child?.name?.escapedText)
      })
    } catch (err) {
      console.warn(err)
    }
  } else {
    node.members?.forEach((child) => {
      // @ts-ignore
      fields.push(child?.name?.escapedText)
    })
  }

  return {
    name,
    fields: fields.filter(Boolean),
  }
}

export const parse = (code: string) => {
  const source = createSource(code)
  const target = walk(source)
  if (!target) {
    return null
  }
  return parseNode(target)
}

export default parse
