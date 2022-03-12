import type { NextPage } from "next"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("../components/Editor"), { ssr: false })

const defaultValue = `type FormProps = {
  name: string
  age: number
}
`

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
          <Editor path="2" options={{}}></Editor>
        </section>
      </main>
    </>
  )
}

export default Home
