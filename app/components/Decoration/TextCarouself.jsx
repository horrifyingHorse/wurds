'use client'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

import { useThisWord, useCommitWord } from "@/app/hooks/useThisWord"

function TextContainer ({ text, k, nwc}) {
  const commitWord = useCommitWord()
  
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
          className={`text-gray-500 absolute text-5xl cursor-pointer`}
          onClick={() => { nwc(el); commitWord(el)}}

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
  const { newWurdClicked } = useThisWord()
  const intervalRef = useRef(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === text.length - 1 ? 0 : prevIndex + 1));
      }, 7000);
    };
    startInterval();
    console.log("Here we are inside this useEffect!")

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else {
        // setIndex((prevIndex) => (prevIndex === text.length - 1 ? 0 : prevIndex + 1));
        startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [text.length]);
  
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       clearInterval(interval);
  //     } else {
  //       setIndex((prevIndex) => (prevIndex === text.length - 1 ? 0 : prevIndex + 1));
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [text.length]);

  return(
    <div className="flex justify-center items-center w-full h-full">
      <TextContainer text={text} k={index} nwc={newWurdClicked} />
    </div>
  )
}