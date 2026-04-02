import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroSection() {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero-meta', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    })
    .from('.hero-line', {
      y: '110%',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    }, '-=0.4')
    .from('.hero-bottom', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    }, '-=0.5')

    // Parallax on scroll
    gsap.to('.hero-title-wrap', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: container })

  return (
    <section ref={container} className="min-h-[90vh] md:min-h-screen relative pt-32 pb-16 px-8 md:px-16 flex flex-col justify-between z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 text-xs uppercase tracking-widest font-bold">
        <div className="hero-meta md:col-span-1 text-black/50">Portfolio [01]</div>
        <div className="hero-meta md:col-start-4 text-black/50 text-right md:text-left">Available for Freelance</div>
      </div>

      <div className="hero-title-wrap my-auto py-20 w-full relative">
        <h1 className="text-[15vw] md:text-[13vw] leading-[0.8] font-black tracking-tighter uppercase w-full flex flex-col relative z-10">
          <div className="self-start overflow-hidden">
            <div className="hero-line">Creative</div>
          </div>
          <div className="self-center flex items-center gap-4 md:gap-8 text-accent overflow-hidden">
            <span className="hero-line font-serif italic lowercase text-[18vw] md:text-[15vw] font-normal leading-[0.5] pb-4">&amp;</span>
            <span className="hero-line">Brand</span>
          </div>
          <div className="self-end pr-0 md:pr-16 overflow-hidden">
            <div className="hero-line">Designer</div>
          </div>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 pt-8 border-t border-black/10 gap-y-8">
        <div className="hero-bottom md:col-span-1 text-sm font-bold uppercase tracking-widest leading-relaxed">
          Based in<br />New York, NY
        </div>
        <div className="hero-bottom md:col-start-3 md:col-span-2 text-sm md:text-base leading-relaxed text-black/70 max-w-md md:pl-8">
          Crafting bold identities, immersive digital experiences, and visual narratives that resonate. I turn ideas into iconic brands.
        </div>
      </div>
    </section>
  )
}
