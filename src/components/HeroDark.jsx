import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroDark() {
  const container = useRef(null)

  useGSAP(() => {
    // Set initial hidden states
    gsap.set('.dh-line', { y: '120%', rotateX: 30 })
    gsap.set('.dh-info', { y: 30, opacity: 0 })
    gsap.set('.dh-side', { opacity: 0, x: -10 })
    gsap.set('.dh-top-item', { y: 20, opacity: 0 })

    // Entrance timeline — triggers almost immediately when section appears
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 98%',
        toggleActions: 'play none none none',
      },
    })

    // Top info bar items stagger in first
    tl.to('.dh-top-item', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
    }, 0)
    .to('.dh-line', {
      y: '0%',
      rotateX: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power4.out',
    }, 0.1)
    .to('.dh-info', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power4.out',
    }, 0.4)
    .to('.dh-side', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.3)

    // Parallax: title drifts up slowly on scroll
    gsap.to('.dh-title', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })

    // Info bar slides up and fades on exit
    gsap.to('.dh-info-bar', {
      yPercent: -20,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: '60% top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // === Color transition: starts when top of section hits middle of screen, very fast ===
    const colorTrigger = {
      trigger: container.current,
      start: 'top center',
      end: 'top 35%',
      scrub: 0.2,
    }

    gsap.to(container.current, {
      backgroundColor: '#ffffff',
      ease: 'power2.inOut',
      scrollTrigger: colorTrigger,
    })

    gsap.to('.dh-line', {
      color: '#111111',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

    gsap.to('.dh-info', {
      color: 'rgba(0,0,0,0.5)',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

    gsap.to('.dh-info-bar', {
      borderColor: 'rgba(0,0,0,0.1)',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

    gsap.to('.dh-side', {
      color: 'rgba(0,0,0,0.4)',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

    // Top bar color transitions
    gsap.to('.dh-top-item', {
      color: 'rgba(0,0,0,0.4)',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

    gsap.to('.dh-top-border', {
      borderColor: 'rgba(0,0,0,0.1)',
      ease: 'power2.inOut',
      scrollTrigger: { ...colorTrigger },
    })

  }, { scope: container })

  return (
    <section
      ref={container}
      className="w-full flex flex-col px-6 md:px-12 relative z-10 bg-black overflow-hidden"
    >
      {/* Top information bar — moved from HeroCinematic */}
      <div className="px-2 md:px-4 py-6 md:py-8">
        <div className="dh-top-border flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/15 pt-6">
          <div className="dh-top-item text-xs uppercase tracking-widest text-white/40 font-medium">
            The journey begins in stillness.
          </div>
          <div className="dh-top-item text-xs md:text-sm text-white/50 max-w-lg text-left md:text-center leading-relaxed">
            Crafting bold identities, immersive digital experiences, and visual narratives that resonate. I turn ideas into iconic brands.
          </div>
          <div className="dh-top-item text-xs uppercase tracking-widest text-white/40 font-medium hidden md:block">
            [Scroll to Explore]
          </div>
        </div>
      </div>

      {/* Side label */}
      <div className="dh-side absolute top-[40%] left-6 md:left-12 text-[10px] md:text-xs font-mono uppercase tracking-widest rotate-[-90deg] origin-left text-gray-400 hidden md:block">
        Elara Studio
      </div>

      {/* Center content */}
      <div className="dh-title w-full max-w-[90vw] mx-auto flex flex-col items-center text-center py-16 md:py-24">
        {/* Title — smaller than HeroCinematic */}
        <h1 className="text-[10vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter uppercase flex flex-col items-center text-white">
          <span className="block overflow-hidden">
            <span className="dh-line block">Brands</span>
          </span>
          <span className="block ml-[10vw] md:ml-[15vw] overflow-hidden">
            <span className="dh-line block">That Move</span>
          </span>
          <span className="block mr-[5vw] md:mr-[10vw] overflow-hidden">
            <span className="dh-line block">
              People.
            </span>
          </span>
        </h1>

        {/* Bottom info bar */}
        <div className="dh-info-bar mt-16 md:mt-24 flex justify-between w-full max-w-full lg:max-w-4xl text-xs md:text-sm font-mono uppercase text-gray-400 border-t border-gray-800 pt-6">
          <p className="dh-info max-w-[200px] text-left">Strategy, identity, and experience design for bold brands.</p>
          <p className="dh-info max-w-[160px] md:max-w-[200px] text-right">Open for new<br />collaborations.</p>
        </div>
      </div>
    </section>
  )
}
