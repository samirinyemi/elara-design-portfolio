import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const container = useRef(null)
  const [count, setCount] = useState(0)

  useGSAP(() => {
    const counter = { val: 0 }

    // Count from 0 to 100 while moving text from left to right
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation — slide the loader up
        gsap.to(container.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => onComplete?.(),
        })
      },
    })

    tl.to(counter, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.val)),
    })
    .to('.loader-text', {
      xPercent: 75,
      duration: 2.4,
      ease: 'power2.inOut',
    }, 0)
    .to('.loader-line', {
      scaleX: 1,
      duration: 2.4,
      ease: 'power2.inOut',
    }, 0)

  }, { scope: container })

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] bg-white flex flex-col justify-end px-8 md:px-16 pb-12 md:pb-16"
    >
      {/* Progress line */}
      <div className="loader-line absolute top-0 left-0 w-full h-[2px] bg-black origin-left scale-x-0" />

      {/* Counter text — starts left, moves right */}
      <div className="loader-text text-[20vw] md:text-[15vw] font-black leading-none tracking-tighter text-black select-none">
        {count}%
      </div>
    </div>
  )
}
