'use client'

import { WurdInfoDisplay } from "@/app/components/new/WurdForm.jsx"
import { Provider, createStore } from "jotai"

// https://datamuse.com/api/
// https://random-word-api.vercel.app/api?words=1
const mystore = createStore()

export default function NewPage() {
  return (
    <>
      <Provider store={mystore}>
        <WurdInfoDisplay />
      </Provider>
    </>
  )
}