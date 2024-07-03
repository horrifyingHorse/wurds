'use client'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

function TextContainer ({ text, k}) {
  
  const variant = {
    init: {
      opacity: 0,
    },

    animate: {
      opacity: 1,
      x: [60, 0],
      transition: {
        duration: 1.5,
      }
    },

    exit: {
      opacity: 0,
      x: [0, -60],
      transition: {
        duration: 1
      }
    }

  }

  return( <>
    <AnimatePresence> {
      text.map((el, index) => 
       index == k ? 
        <motion.div
          className={`text-gray-500 absolute text-5xl`}

          key={k}
          variants={variant}
          initial="init"
          animate="animate"
          exit="exit"
        >
          {el}
        </motion.div>
        : null 
      )
    } </AnimatePresence>
  </> )
}

export function TextCarousel({ text }) {
  const [ index, setIndex ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === text.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [text.length]);

  return(
    <div className="flex justify-center items-center w-full h-full">
      <TextContainer text={text} k={index} />
    </div>
  )
}