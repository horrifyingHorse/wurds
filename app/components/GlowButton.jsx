'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function GlowButton ({index, def, onClick}) {
  const [ rotation, setRotation ] = useState(0)

  const buttonVariants = {
    init: {
      boxShadow: '0 0 2px #fff, inset 0 0 2px #fff, 0 0 10px #08f,0 0 1px #08f,0 0 10px #08f',
      scale: 1,
      opacity: 1
    },

    anim: {
      boxShadow: '0 0 2px #fff, inset 0 0 2px #fff, 0 0 10px #08f,0 0 1px #08f,0 0 10px #08f',
    },

    hover: {
      scale: 1.05,
      boxShadow: '0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #08f,0 0 15px #08f,0 0 30px #08f',
      transition: {
        type: 'spring',
        duration: 0.5,
        scale: {
          duration: 0.1
        }
      }
    },

    tap: {
      scale: 0.97,
      boxShadow: '0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #08f,0 0 50px #08f,0 0 5px #08f'
    }
  }

  const svgVariants = {

    anim: {
      rotate: rotation
    },

    hover: {
      rotate: rotation ? 0 : 180
    }
  }

  return ( <>
    <AnimatePresence>
    <motion.div 
      // className="w-40 p-2 text-sm font-medium cursor-pointer flex justify-center items-center text-sky-200 border-2 rounded-full border-sky-200 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_10px_#08f,0_0_1px_#08f,0_0_10px_#08f] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" 
      className="w-40 p-2 text-sm font-medium cursor-pointer flex justify-center items-center text-sky-200 border-2 rounded-full border-sky-200" 
      onClick={onClick}

      variants={buttonVariants}
      initial="init"
      animate="anim"
      whileHover='hover'
      whileTap="tap"
      onTapStart={() => setRotation(rotation ? 0 : 180)}
      key={def}
    >
      Expand
      <motion.div className="ml-2" variants={svgVariants}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14} >
          <path fill="#BAE6FD" d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472H2.296c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z" />
        </svg>
      </motion.div>
    </motion.div> 
    </AnimatePresence>
  </> )
}