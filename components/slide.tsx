"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import type React from "react"
import { useRef, useEffect } from "react"

interface SlideProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const Slide = ({ children, className, delay = 0 }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        delay: delay,
      }}
      animate={controls}
      initial="hidden"
      className={className}
    >
      {children}
    </motion.div>
  )
}
