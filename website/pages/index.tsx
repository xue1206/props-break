import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { parse } from "@props-break/core"
import { generate } from "@props-break/generater-react"
import { useState } from "react"
import Button from "../components/Button"
import { useMemo } from "react"

const Editor = dynamic(() => import("../components/Editor"), { ssr: false })

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

const defaultValue = `type FormProps = {
    name: string
}
`
const parseTypeToReactCode = (code: string, options?: { children?: boolean }) => {
  const result = parse(code)
  if (!result?.name) {
    return ""
  }
  let componentName: string = ""
  try {
    componentName = (result.name as string).match(/(\w+)Props/)?.[1] || ""
  } catch (err) {
    alert("parse component name failed")
  }
  return generate({
    componentName,
    propsTypeName: result.name as string,
    propsFields: options?.children ? result.fields.concat("children") : result.fields,
  })
}

const Home: NextPage = () => {
  const [typeCode, setTypeCode] = useState(defaultValue)
  const [withChildren, setWithChildren] = useState(false)
  const reactCode = useMemo(
    () => parseTypeToReactCode(typeCode, { children: withChildren }),
    [typeCode, withChildren]
  )
  return (
    <>
      <h1
        className="text-center cursor-pointer text-[#A9CEC2] active:translate-x-[2px] active:translate-y-[2px] text-4xl pt-6 pb-2 font-bold text-shadow"
        onClick={() => copy(typeCode + reactCode)}
      >
        Props Break
      </h1>
      <h2 className="text-center text-[#A9CEC2] text-normal pb-6 font-normal text-shadow--sm opacity-60">
        Generate code from type/interface declaration
      </h2>
      <main className="w-[1300px] flex px-8 justify-between mx-auto">
        <section className="flex-1 max-w-[600px]">
          <div className="h-6 mb-2 flex justify-between">
            <div className="text-[0px]"></div>
            <Button className="mr-0" onClick={() => copy(typeCode)}>
              copy
            </Button>
          </div>
          <div className="p-2 border border-primary rounded">
            <Editor path="1" value={typeCode} onChange={(text) => setTypeCode(text || "")}></Editor>
          </div>
        </section>
        <section className="flex-1 max-w-[600px]">
          <div className="h-6 mb-2 flex justify-between">
            <div className="text-[0px]">
              <Button
                className={"ml-0 " + (withChildren ? "!bg-primary" : "")}
                onClick={() => setWithChildren((v) => !v)}
              >
                children
              </Button>
            </div>
            <Button className="mr-0" onClick={() => copy(reactCode)}>
              copy
            </Button>
          </div>
          <div className="p-2 border border-primary rounded">
            <Editor path="2" value={reactCode}></Editor>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
