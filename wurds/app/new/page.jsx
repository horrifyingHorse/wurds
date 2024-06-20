import { SearchBar } from "../components/SearchBar.jsx"

export default function NewPage() {
  return (
    <>
      <div className="h-svh w-svh">
        <div className="h-1/5"></div>

        <div className="flex justify-center">
          <form action="">
            <SearchBar style="rounded-3xl" />
          </form>
        </div>

      </div>
    </>
  )
}