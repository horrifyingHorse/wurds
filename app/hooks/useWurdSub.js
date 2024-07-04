import { useAtom } from "jotai"
import { word, newWordData } from "../store/myatoms"

export const useWurdSub = () => {
  const [ wurd, setWurd ] = useAtom(word)
  const [ , updateIt ] = useAtom(newWordData)
  
  const wurdSub = async () => {
  
    try {
      const response = await fetch(`/api/wurd/${wurd}`)
      const data = await response.json()
      updateIt(data)
    } catch {
      updateIt({'Error': 'Ignorant API response'})
    } 
  }
  
  return { wurdSub, setWurd }
}
