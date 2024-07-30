export function ManyWurds () {
  const randomW = [
    "roman",
    "excretion",
    "natural",
    "opal",
    "strut",
    "profound",
    "maximum",
    "ankle",
    "elevator",
    "irreverant",
    "vindicate",
    "overeater",
    "kiwi",
    "tabasco",
    "sequence",
    "excruciating",
    "available",
    "passcode",
    "revisable",
    "scouts",
    "disparity",
    "unlighted",
    "operable",
    "huddle",
    "manila",
    "cloak",
    "tapping",
    "unknown",
    "mumbo",
    "unmovable",
    "snowstorm",
    "mascot",
    "contently",
    "sturdy",
    "hybrid",
    "bonfire",
    "molecular",
    "staunch",
    "hasty",
    "lash",
    "mumbling",
    "appeasing",
    "exit",
    "bootlace",
    "fresh",
    "bright",
    "consuming",
    "okay",
    "residue",
    "squealer"
  ]
  return (
    <>
      <div className="flex flex-wrap justify-center content-center h-svh w-svw blur-sm">
        <div className= "skew-x-12 -rotate-45 select-none"> 
          {/* "skew-x-12 -rotate-45 */}
          <div className="skew-x-12 font-bold">
            <div className="bg-gradient-to-r from-black via-gray-500 to-black bg-clip-text text-transparent">
            {randomW.slice(0, 7).map((word, index) => `${word} `)} 
            </div>
            <div className="bg-gradient-to-r from-black via-white to-black bg-clip-text text-transparent">
            {randomW.slice(24, 30).map((word, index) => `${word} `)} 
            </div>
            <div className="flex">
              <div className="flex flex-col">
                {randomW.slice(8, 12).map((word, index) => 
                  // index == 3 ? <div key={index} className="text-left">{word} more stuff here</div>
                  <div key={index} className="text-right bg-gradient-to-r from-black to-blue-300 bg-clip-text text-transparent">{word}</div>
                )}
              </div>
              <div className={`text-8xl font-Zain bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent`}>Wurds</div>
              <div className="flex flex-col">
                {randomW.slice(13, 17).map((word, index) => <div key={index} className="bg-gradient-to-r from-yellow-300 to-black bg-clip-text text-transparent">{word}</div>)}
              </div>
            </div>
            <div className="bg-gradient-to-r from-black via-white to-black bg-clip-text text-transparent">
              {randomW.slice(18, 24).map((word, index) => 
                 `${word} `
              )} 
            </div>
            <div className="bg-gradient-to-r from-black via-gray-500 to-black bg-clip-text text-transparent">
              {randomW.slice(30, 36).map((word, index) => 
                 `${word} `
              )} 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}