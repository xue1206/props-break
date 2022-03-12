import generate from "../src"

describe("generater-react", () => {
  it("generate", () => {
    const result = generate({
      componentName: "Form",
      propsTypeName: "FormProps",
      propsFields: ["name", "age"],
    })
    expect(result).toBe(`const Form: React.FC<FormProps> = ({ name, age }) => {
    return
}
`)
  })
  it("generate with children fields", () => {
    const result = generate({
      componentName: "Form",
      propsTypeName: "FormProps",
      propsFields: ["name", "age"],
      children: true,
    })
    expect(result).toBe(`const Form: React.FC<FormProps> = ({ name, age, children }) => {
    return
}
`)
  })
})
