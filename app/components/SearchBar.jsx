'use client'
import { motion } from "framer-motion"
import { useRef } from "react"

export function SearchBar (props) {
  const inRef = useRef(null)

  const SearchVariants = {
    init: {
      scale: 1
    },

    visible: {
      scale:1
    },

    hover: {
      scale: 1.05
    },

    tap: {
      scale: 0.95
    }
  }

  const styleClass = 
    `p-3 
    text-black 
    w-full 
    h-full
    outline-none
    ${props.style ? props.style : ""}`
  
  const divH = "h-16"// `h-${props.h ? props.h : 10}`
  const divW = "w-50px"// `w-${props.w ? props.w : 60}`

  const selectAll = () => {
    inRef.current && inRef.current.select()
  }

  return (
    <>
    <div className={`${divH} ${divW}`}>
        <motion.input 
          ref={inRef}
          className={styleClass}
          type="text"
          placeholder="callous"
          onChange={(e) => props.wurdUpdate(e.target.value)}
          onFocus={selectAll}

          layout
          variants={SearchVariants}
          initial="init"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        />
      </div>
    </>
  )
}