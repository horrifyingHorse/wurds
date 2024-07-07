import { useAtom } from "jotai"
import { word, newWordData, globalLoading } from "../store/myatoms"

export const useWurdSub = () => {
  const [ loading, setLoading ] = useAtom(globalLoading)
  const [ wurd, setWurd ] = useAtom(word)
  const [ , updateIt ] = useAtom(newWordData)
  
  const wurdSub = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/wurd/${wurd}`)
      const data = await response.json()
      updateIt(data)
    } catch {
      updateIt({'Error': 'Ignorant API response'})
    } finally {
      setLoading(false)
    }
  }
  
  return { wurdSub, setWurd }
}
