import { useAtom } from "jotai"
import { useWurdSub } from "./useWurdSub"
import { useState, useEffect } from "react"
import { newWord, word } from "../store/myatoms"

export function useThisWord() {
  const [ searchWurd ] = useAtom(word)
  const [ , setWurd ] = useAtom(newWord)
  const { wurdSub } = useWurdSub()
  const [ i, setI ] = useState(false)
  const [ prevWurd, setPrevWurd ] = useState(searchWurd)

  const newWurdClicked = (wurd) => {
    setPrevWurd(searchWurd) // to prevent multiple calls for the same wurd
    setWurd(wurd);
    setI(!i);
  }

  useEffect(()=> {
    if (!searchWurd) return
    if (prevWurd == searchWurd) return

    console.log("this effect\nPrev Word: ", prevWurd)
    wurdSub()
  }, [i])
  
  return { newWurdClicked }
}
