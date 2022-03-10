import parse from "../src"

describe("props-break", () => {
  it("give neither type or interface declaration, should return null", () => {
    const code = `
                const Component: React.FC = () => {}
            `
    expect(parse(code)).toBeNull()
  })
  it("give type declaration, should return name and fields", () => {
    const code = `
            type FormProps = {
                name: string
                friends: string[],
                assets: {
                    money: number,
                    house: number
                }
            }
        `
    expect(parse(code)).toEqual({ name: "FormProps", fields: ["name", "friends", "assets"] })
  })
  it("give interface declaration, should return name and fields", () => {
    const code = `
            interface FormProps {
                name: string
                friends: string[]
                assets: {
                    money: number
                    house: number
                }
            }
        `
    expect(parse(code)).toEqual({ name: "FormProps", fields: ["name", "friends", "assets"] })
  })
  it("give multiple type declaration, should return first type's name and fields", () => {
    const code = `
            type FormProps = {
                name: string
                friends: string[],
                assets: {
                    money: number,
                    house: number
                }
            }
            type FormProps2 = {
                name2: string
            }
        `
    expect(parse(code)).toEqual({ name: "FormProps", fields: ["name", "friends", "assets"] })
  })
})
