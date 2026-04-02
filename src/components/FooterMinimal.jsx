import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const MARQUEE_ITEMS = [
  'Bold Vision.',
  'Pure Craft.',
  'Bold Vision.',
  'Pure Craft.',
  'Bold Vision.',
  'Pure Craft.',
  'Bold Vision.',
  'Pure Craft.',
]

// 8 distinct blob shape sets — each blob morphs between its own unique pair
const BLOB_SHAPE_SETS = [
  // 0: Round bubbly
  [
    'M44.5,-51.3C56.3,-40.2,63.8,-24.5,65.1,-8.5C66.4,7.6,61.5,23.9,51.5,36.1C41.5,48.3,26.4,56.4,9.3,60.1C-7.8,63.8,-26.9,63.1,-40.7,53.7C-54.5,44.3,-63,26.2,-65.2,7.4C-67.4,-11.4,-63.3,-30.9,-51.8,-42.3C-40.3,-53.7,-21.4,-57,-3.3,-53.2C14.8,-49.4,32.7,-62.4,44.5,-51.3Z',
    'M50.2,-56.8C63.7,-45.6,69.6,-27.4,70.3,-9.8C71,7.8,66.5,24.8,56.3,37.8C46.1,50.8,30.2,59.8,13.1,63.2C-4,66.6,-22.3,64.4,-36.8,55.4C-51.3,46.4,-62,30.6,-65.5,13.3C-69,-4,-65.3,-22.8,-55.1,-35.2C-44.9,-47.6,-28.2,-53.6,-11.2,-54.1C5.8,-54.6,38.7,-68,50.2,-56.8Z',
  ],
  // 1: Tall stretched
  [
    'M30.5,-42.1C38.3,-33.2,42.7,-22.5,48.8,-9.8C54.9,2.9,62.8,17.6,59.2,29.8C55.6,42,40.5,51.7,24.7,56.8C8.9,61.9,-7.6,62.4,-22.5,57.5C-37.4,52.6,-50.7,42.3,-58.2,28.4C-65.7,14.5,-67.4,-3,-62.1,-17.8C-56.8,-32.6,-44.5,-44.7,-31.3,-52.4C-18.1,-60.1,-4,-63.4,6.9,-71.8C17.8,-80.2,22.7,-51,30.5,-42.1Z',
    'M33.2,-45.8C42.1,-36.4,47.6,-24.8,52.5,-11.6C57.4,1.6,61.7,16.4,57.3,28.7C52.9,41,39.8,50.8,25.4,56.2C11,61.6,-4.7,62.6,-19.8,58.8C-34.9,55,-49.4,46.4,-56.7,33.5C-64,20.6,-64.1,3.4,-59.8,-11.6C-55.5,-26.6,-46.8,-39.4,-35.4,-48.2C-24,-57,-10.9,-61.8,1.4,-63.6C13.7,-65.4,24.3,-55.2,33.2,-45.8Z',
  ],
  // 2: Wide horizontal
  [
    'M52.8,-38.3C65.4,-25.5,70.2,-3.7,66.1,15.6C62,34.9,49,51.7,32.4,59.5C15.8,67.3,-4.4,66.1,-22.9,59.2C-41.4,52.3,-58.2,39.7,-64.6,23.1C-71,6.5,-67,-14.1,-56.2,-26.5C-45.4,-38.9,-27.8,-43.1,-11.6,-44.5C4.6,-45.9,40.2,-51.1,52.8,-38.3Z',
    'M48.3,-42.8C60.8,-28.4,67.5,-8.5,64.8,9.5C62.1,27.5,50,43.6,34.5,52.5C19,61.4,0.1,63.1,-17.6,57.9C-35.3,52.7,-51.8,40.6,-59.2,24.4C-66.6,8.2,-64.9,-12.1,-55.4,-25.8C-45.9,-39.5,-28.6,-46.6,-11.2,-48.4C6.2,-50.2,35.8,-57.2,48.3,-42.8Z',
  ],
  // 3: Organic amoeba
  [
    'M38.9,-46.2C49.2,-35.8,55.4,-21.6,57.8,-6.1C60.2,9.4,58.8,26.2,50.1,38.4C41.4,50.6,25.4,58.2,8.2,61.5C-9,64.8,-27.4,63.8,-40.4,54.3C-53.4,44.8,-61,26.8,-62.7,8.6C-64.4,-9.6,-60.2,-27.9,-49.5,-38.7C-38.8,-49.5,-21.6,-52.8,-3.8,-48.4C14,-44,28.6,-56.6,38.9,-46.2Z',
    'M42.1,-48.5C53.1,-38.5,59.8,-23.5,62.3,-7.3C64.8,8.9,63.1,26.3,53.6,38.2C44.1,50.1,26.8,56.5,9.8,58.7C-7.2,60.9,-23.9,58.9,-37.5,50.2C-51.1,41.5,-61.6,26.1,-64.6,9.1C-67.6,-7.9,-63.1,-26.5,-52.1,-36.8C-41.1,-47.1,-23.6,-49.1,-5.6,-42.8C12.4,-36.5,31.1,-58.5,42.1,-48.5Z',
  ],
  // 4: Pinched waist
  [
    'M40.3,-52.1C51.1,-42.7,58,-28.5,61.5,-13.2C65,2.1,65.1,18.5,58.4,32C51.7,45.5,38.2,56.1,22.8,61.2C7.4,66.3,-9.9,65.9,-25.1,60C-40.3,54.1,-53.4,42.7,-60.5,28.3C-67.6,13.9,-68.7,-3.5,-63.3,-18.4C-57.9,-33.3,-46,-45.7,-33,-53.8C-20,-61.9,-5.9,-65.7,5.9,-73C17.7,-80.3,29.5,-61.5,40.3,-52.1Z',
    'M45.7,-55.9C57.3,-44.9,63.3,-28.5,65.7,-11.8C68.1,4.9,66.9,21.9,59,35.3C51.1,48.7,36.5,58.5,20.3,63C4.1,67.5,-13.7,66.7,-28.8,60C-43.9,53.3,-56.3,40.7,-62.5,25.6C-68.7,10.5,-68.7,-7.1,-62.4,-21.4C-56.1,-35.7,-43.5,-46.7,-30.2,-57.2C-16.9,-67.7,-2.9,-77.7,8.5,-87.5C19.9,-97.3,34.1,-66.9,45.7,-55.9Z',
  ],
  // 5: Elongated blob
  [
    'M55.1,-41.2C66.7,-27.8,68.4,-5.5,63.3,14.5C58.2,34.5,46.3,52.2,29.5,61.1C12.7,70,-9,70.1,-27.1,62.1C-45.2,54.1,-59.7,38,-66.1,18.8C-72.5,-0.4,-70.8,-22.7,-60,-37.8C-49.2,-52.9,-29.3,-60.8,-8.9,-61.6C11.5,-62.4,43.5,-54.6,55.1,-41.2Z',
    'M49.8,-38.7C61.5,-24.3,65.7,-3.3,61.6,15.1C57.5,33.5,45.1,49.3,28.8,58.1C12.5,66.9,-7.7,68.7,-25.5,62.2C-43.3,55.7,-58.7,40.9,-64.8,23C-70.9,5.1,-67.7,-15.9,-57,-30.5C-46.3,-45.1,-28.1,-53.3,-9.5,-54.9C9.1,-56.5,38.1,-53.1,49.8,-38.7Z',
  ],
  // 6: Teardrop-ish
  [
    'M36.4,-49.5C46.1,-39.4,52.1,-26.7,56.6,-12.6C61.1,1.5,64.1,17,59.1,29.8C54.1,42.6,41.1,52.7,26.5,58.8C11.9,64.9,-4.3,67,-19.6,63.1C-34.9,59.2,-49.3,49.3,-57.8,35.6C-66.3,21.9,-68.9,4.4,-65.1,-11.1C-61.3,-26.6,-51.1,-40.1,-38.5,-49.6C-25.9,-59.1,-10.9,-64.6,2.1,-67.3C15.1,-70,26.7,-59.6,36.4,-49.5Z',
    'M41.2,-53.7C51.8,-43.8,57.6,-29.4,61.2,-14.2C64.8,1,66.2,17,60.1,30.2C54,43.4,40.4,53.8,25.1,60.1C9.8,66.4,-7.2,68.6,-22.1,64.2C-37,59.8,-49.8,48.8,-57.5,34.8C-65.2,20.8,-67.8,3.8,-64.3,-11.4C-60.8,-26.6,-51.2,-40,-38.9,-49.5C-26.6,-59,-11.6,-64.6,2.3,-67.5C16.2,-70.4,30.6,-63.6,41.2,-53.7Z',
  ],
  // 7: Cloud-like
  [
    'M47.2,-55.3C59.4,-45.2,66.3,-28.8,68.4,-12C70.5,4.8,67.8,22,59,35.3C50.2,48.6,35.3,58,19.1,63C2.9,68,-14.6,68.6,-29.3,62.3C-44,56,-55.9,42.8,-62.2,27.6C-68.5,12.4,-69.2,-4.8,-63.5,-19.2C-57.8,-33.6,-45.7,-45.2,-32.4,-55C-19.1,-64.8,-4.6,-72.8,7.5,-81.7C19.6,-90.6,35,-65.4,47.2,-55.3Z',
    'M43.8,-51.8C55.2,-42.1,61.8,-26.6,64.5,-10.4C67.2,5.8,66,22.7,58,35.8C50,48.9,35.2,58.2,19,63.1C2.8,68,-14.8,68.5,-29.8,62.5C-44.8,56.5,-57.2,44,-63.4,29C-69.6,14,-69.6,-3.5,-64,-18.4C-58.4,-33.3,-47.2,-45.6,-34.4,-54.9C-21.6,-64.2,-7.2,-70.5,5.3,-76.8C17.8,-83.1,32.4,-61.5,43.8,-51.8Z',
  ],
]

export default function FooterMinimal() {
  const container = useRef(null)
  const marqueeRef = useRef(null)

  // Animate all morphing blobs — each with unique shape & jelly feel
  useEffect(() => {
    const blobs = container.current?.querySelectorAll('.fm-blob-svg')
    if (!blobs || blobs.length === 0) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const timelines = []

    blobs.forEach((blob, index) => {
      const pathEl = blob.querySelector('path')
      if (!pathEl) return

      const shapeSet = BLOB_SHAPE_SETS[index % BLOB_SHAPE_SETS.length]

      // Morph: always run, slower on mobile
      const morphTl = gsap.timeline({ repeat: -1, yoyo: true })
      morphTl.to(pathEl, {
        attr: { d: shapeSet[1] },
        duration: isMobile ? 8 + (index % 4) * 2 : 4 + (index % 4) * 1,
        ease: 'sine.inOut',
      })
      timelines.push(morphTl)

      // Breathe + rotate: skip on mobile (imperceptible at small size)
      if (!isMobile) {
        const breatheTl = gsap.timeline({ repeat: -1, yoyo: true, delay: (index % 6) * 0.5 })
        const intensity = 0.03 + (index % 5) * 0.01
        breatheTl
          .to(blob, {
            scaleX: 1 + intensity,
            scaleY: 1 - intensity,
            duration: 2.5 + (index % 4) * 0.5,
            ease: 'sine.inOut',
          })
          .to(blob, {
            scaleX: 1 - intensity * 0.6,
            scaleY: 1 + intensity * 0.6,
            duration: 2.8 + (index % 3) * 0.6,
            ease: 'sine.inOut',
          })
        timelines.push(breatheTl)

        const direction = index % 2 === 0 ? 360 : -360
        const rotTl = gsap.to(blob, {
          rotation: direction,
          duration: 30 + (index % 7) * 6,
          ease: 'none',
          repeat: -1,
        })
        timelines.push(rotTl)
      }
    })

    return () => timelines.forEach((tl) => tl.kill())
  }, [])

  // Marquee scroll + other animations
  useGSAP(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const track = marquee.querySelector('.fm-marquee-track')
    if (!track) return

    const halfWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -halfWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    gsap.from('.fm-link-col', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.fm-links',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.fm-bottom', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.fm-bottom-bar',
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: container })

  const renderBlob = (prefix, i) => {
    const shapeIdx = i % BLOB_SHAPE_SETS.length
    const id = `${prefix}${i}`

    return (
      <div className="flex-shrink-0 w-10 h-10 md:w-24 md:h-24 lg:w-28 lg:h-28">
        <svg
          className="fm-blob-svg w-full h-full"
          viewBox="-80 -80 160 160"
        >
          <defs>
            <linearGradient id={`blob-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#b0c4de" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2d5f8a" stopOpacity="0.5" />
            </linearGradient>
            <filter id={`blob-glow-${id}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={BLOB_SHAPE_SETS[shapeIdx][0]}
            fill={`url(#blob-grad-${id})`}
            filter={`url(#blob-glow-${id})`}
            transform="scale(0.85)"
          />
        </svg>
      </div>
    )
  }

  return (
    <section
      ref={container}
      className="relative flex flex-col z-10 overflow-hidden pt-20 pb-10 md:pt-28 md:pb-14"
      style={{
        background: 'linear-gradient(160deg, #c9b8a8 0%, #7a9bb5 20%, #2d5f8a 45%, #1a3a5c 65%, #0f2440 85%, #1a1a2e 100%)',
      }}
    >

      {/* Scrolling marquee */}
      <div ref={marqueeRef} className="fm-center py-12 md:py-20 overflow-hidden">
        <div className="fm-marquee-track flex items-center gap-4 md:gap-10 w-max">
          {MARQUEE_ITEMS.map((text, i) => (
            <div key={`a-${i}`} className="flex items-center gap-4 md:gap-10 flex-shrink-0">
              <span className="text-2xl md:text-5xl lg:text-6xl font-light text-white/50 tracking-wide whitespace-nowrap">
                {text}
              </span>
              {renderBlob('a', i)}
            </div>
          ))}
          {MARQUEE_ITEMS.map((text, i) => (
            <div key={`b-${i}`} className="flex items-center gap-4 md:gap-10 flex-shrink-0">
              <span className="text-2xl md:text-5xl lg:text-6xl font-light text-white/50 tracking-wide whitespace-nowrap">
                {text}
              </span>
              {renderBlob('b', i)}
            </div>
          ))}
        </div>
      </div>

      {/* Social & contact links */}
      <div className="fm-links px-8 md:px-16 mt-16 md:mt-24 mb-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0 border-t border-white/10 pt-10">
          <div className="fm-link-col">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-4">Socials</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Dribbble</a>
              <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Behance</a>
            </div>
          </div>
          <div className="fm-link-col md:text-right">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <a href="mailto:hello@elaradesign.co" className="hover:text-white transition-colors duration-300">hello@elaradesign.co</a>
              <span className="text-white/30">New York, NY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fm-bottom-bar px-8 md:px-16 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="fm-bottom text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/20">
            &copy; 2024 Elara Design
          </span>
          <span className="fm-bottom text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/20">
            Crafted with obsession.
          </span>
        </div>
      </div>
    </section>
  )
}
