import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { parse } from "@props-break/core"
import { generate } from "@props-break/generater-react"
import { useState } from "react"

const Editor = dynamic(() => import("../components/Editor"), { ssr: false })

const defaultValue = `type FormProps = {
    name: string
}
`
const parseTypeToReactCode = (code: string) => {
  const result = parse(code)
  let componentName: string = ""
  try {
    componentName = (result.name as string).match(/(\w+)Props/)?.[1] || ""
  } catch (err) {
    alert("parse component name failed")
  }
  return generate({
    componentName,
    propsTypeName: result.name as string,
    propsFields: result.fields,
  })
}

const Home: NextPage = () => {
  const [typeCode, setTypeCode] = useState(defaultValue)
  return (
    <>
      <h1 className="text-center text-[#A9CEC2] text-4xl pt-6 pb-2 font-bold text-shadow">
        Props Break
      </h1>
      <h2 className="text-center text-[#A9CEC2] text-normal pb-6 font-normal text-shadow--sm opacity-60">
        Generate code from type/interface declaration
      </h2>
      <main className="w-[1300px] flex px-8 justify-between mx-auto">
        <section className="flex-1 max-w-[600px] p-2 border border-[#535E65] rounded">
          <Editor path="1" value={typeCode} onChange={(text) => setTypeCode(text || "")}></Editor>
        </section>
        <section className="flex-1 max-w-[600px] p-2 border border-[#535E65] rounded">
          <Editor path="2" value={parseTypeToReactCode(typeCode)}></Editor>
        </section>
      </main>
    </>
  )
}

export default Home
