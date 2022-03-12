type Options = {
  componentName: string
  propsTypeName: string
  propsFields: string[]
  children?: boolean
}

export const generate = (options: Options) => {
  return `const ${options.componentName}: React.FC<${
    options.propsTypeName
  }> = ({ ${options.propsFields.join(", ")}${options.children ? ", children" : ""} }) => {
    return
}
`
}

export default generate
