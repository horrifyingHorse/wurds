import { atom } from "jotai";

export const globalLoading = atom(false)

export const word = atom('')
export const newWord = atom(
  null,
  (get, set, Nword) => {
    set(word, Nword)
  }
)
export const wordCommit = atom('')

export const wordData = atom(null)
export const newWordData = atom(
  null,
  (get, set, data) => {
    set(wordData, data) 
  }
)
