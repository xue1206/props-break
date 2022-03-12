import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { parse } from "@props-break/core"
import { generate } from "@props-break/generater-react"

const Editor = dynamic(() => import("../components/Editor"), { ssr: false })

const defaultValue = `type FormProps = {
  name: string
  age: number
}
`
const parseTypeToReactCode = (code: string) => {
  const result = parse(code)
  let componentName
  try {
    componentName = result.name.match(/(\w+)Props/)[1]
  } catch (err) {
    alert("parse component name failed")
  }
  return generate({
    componentName,
    propsTypeName: result.name,
    propsFields: result.fields,
  })
}

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-center text-[#A9CEC2] text-4xl pt-6 pb-12 font-bold text-shadow">
        Props Break
      </h1>
      <main className="w-[1300px] flex px-8 justify-between mx-auto">
        <section className="flex-1 max-w-[600px] p-2 border border-[#535E65] rounded">
          <Editor path="1" defaultValue={defaultValue}></Editor>
        </section>
        <section className="flex-1 max-w-[600px] p-2 border border-[#535E65] rounded">
          <Editor path="2" defaultValue={parseTypeToReactCode(defaultValue)}></Editor>
        </section>
      </main>
    </>
  )
}

export default Home
