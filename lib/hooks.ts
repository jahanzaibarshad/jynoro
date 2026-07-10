import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export function useMousePosition() {
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition.current
}

export function useTilt(ref: React.RefObject<HTMLElement | null>, strength: number = 15) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)

      const rotateX = (y / (rect.height / 2)) * strength
      const rotateY = (x / (rect.width / 2)) * -strength

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])
}

export function useMagneticButton(
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 30
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    let rect = element.getBoundingClientRect()

    const updateRect = () => {
      rect = element.getBoundingClientRect()
    }

    const handleMouseEnter = () => {
      rect = element.getBoundingClientRect()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX
      const mouseY = e.clientY

      const distanceX = mouseX - centerX
      const distanceY = mouseY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      // Only perform calculations if mouse is close (within 300px)
      if (distance > 300) {
        element.style.transform = 'translate(0, 0)'
        return
      }

      const attraction = strength / (distance + 1)

      element.style.transform = `translate(${(distanceX / distance) * attraction}px, ${
        (distanceY / distance) * attraction
      }px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)'
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', updateRect, { passive: true })
    window.addEventListener('resize', updateRect, { passive: true })

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', updateRect)
    }
  }, [strength, ref])
}
