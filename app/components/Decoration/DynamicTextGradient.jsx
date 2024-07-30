import { motion } from "framer-motion"

export function GradientText ({ gradList, txt }) {
  let bgImgGrad = []

  if (!gradList || gradList.length < 5) return (<>Invalid gradient List (gradList prop)</>)

  for (let i = 0; i < 5; i++) {
    bgImgGrad.push(
      `linear-gradient(to left, ${gradList[i % 5]}, ${gradList[(i + 1) % 5]}, ${gradList[(i + 2) % 5]}, ${gradList[(i + 3) % 5]}, ${gradList[(i + 4) % 5]}`
    )
  }
  bgImgGrad.push(bgImgGrad[0])

  return (
    <motion.div
      // layout
      animate={{
        backgroundImage: bgImgGrad,
        backgroundClip: 'text',
        color: 'transparent'
      }}
      transition={{
        ease: "easeIn",
        duration: 5,
        repeat: Infinity,
        repeatType: ''
      }}
    >
      {txt}
    </motion.div>
  )
}