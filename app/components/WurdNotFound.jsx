'use client'

import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { wordCommit } from "../store/myatoms";
import { useCommitWord, useThisWord } from "../hooks/useThisWord";

export function ErrorMsg() {
  const [ wurd ] = useAtom(wordCommit)
  const [ simWurd, setSimWurd ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const { newWurdClicked } = useThisWord()
  const  commitWord = useCommitWord()

  useEffect(() => {
    setLoading(true)
    fetch(`api/wurd?simto=${wurd}`)
    .then((r) => r.json())
    .then((data) => {
      setSimWurd(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching similar words:', error)
      setLoading(false)
    });
  }, [wurd])
  
  return (
    <div className="w-full flex justify-center p-10">
      <div>
        <div className="font-Dosis mb-5">
          <span className="text-7xl">{wurd.toLowerCase()}</span> <span className="font-Dosis">NOT FOUND</span>
        </div>

        Did you mean?
        <div className="ml-9">
        { loading 
          ? "loading" 
          : simWurd.map((el, index) => {
              if (el.score < 100 && index > 4) return(null)
                
              return (
               <div> 
                <span 
                  className="text-blue-600 hover:text-purple-600 transition-all underline cursor-pointer"
                  onClick={() => {
                    commitWord(el.word)
                    newWurdClicked(el.word)
                  }}
                >
                  {el.word}
                </span>
               </div>
              )
            })
        }
        </div>
      </div>
    </div>
  )
}