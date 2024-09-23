import React from 'react'
import {motion} from 'framer-motion'

export default function CheckboxCard({children}: {children: React.ReactNode}) {
  return (
    <motion.div initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 40
    }} className='py-2 flex items-center rounded-lg bg-cyan-300/50'>{children}</motion.div>
  )
}
