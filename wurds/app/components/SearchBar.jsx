'use client'
import { motion } from "framer-motion"

export function SearchBar (props) {
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

  return (
    <>
    <div className={`${divH} ${divW}`}>
        <motion.input 
          className={styleClass}
          type="text"
          placeholder="callous"
          onChange={(e) => props.wurdUpdate(e.target.value)}

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