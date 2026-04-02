import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_2y8vb5Mw0K3MUO0JxEbVoRRIJNJ/hf_20260402_100838_48dfbfcd-046b-466e-99a8-992ec434c762.mp4'

export default function HeroCinematic() {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Background video scale-in with slight rotation
    tl.from('.cine-bg', {
      scale: 1.2,
      rotation: 1,
      duration: 2.8,
      ease: 'power2.out',
    })
    // Headline lines clip-reveal with stagger — starts at 0.3s
    .from('.cine-line', {
      y: '110%',
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
    }, 0.3)
    // CTA buttons appear alongside bottom bar
    .from('.cine-cta', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    }, 0.8)
    // Scroll indicator fade in
    .from('.cine-scroll', {
      opacity: 0,
      y: 10,
      duration: 0.5,
    }, 1.0)

    // Parallax on scroll — background drifts slower with scale
    gsap.to('.cine-bg', {
      yPercent: 25,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    // Text layer drifts up faster for depth
    gsap.to('.cine-content', {
      yPercent: -15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '60% top',
        scrub: 0.5,
      },
    })

    // Scroll indicator pulses
    gsap.to('.cine-scroll-line', {
      scaleY: 1.3,
      opacity: 0.6,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, { scope: container })

  return (
    <section ref={container} className="relative h-screen overflow-hidden z-10 bg-black">
      {/* Full-bleed background video */}
      <div className="cine-bg absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Main content — positioned over video */}
      <div className="cine-content relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-12 md:pb-16">
        {/* Headline — large, left-aligned, capped at max size */}
        <div className="max-w-5xl overflow-hidden">
          <h1
            className="font-bold tracking-tighter leading-[0.95] text-white uppercase"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          >
            <div className="overflow-hidden py-[0.05em]">
              <div className="cine-line">Creative Design</div>
            </div>
            <div className="overflow-hidden py-[0.05em]">
              <div className="cine-line">Director and</div>
            </div>
            <div className="overflow-hidden py-[0.05em]">
              <div className="cine-line">Designer.</div>
            </div>
          </h1>

          {/* CTA buttons */}
          <div className="flex items-center gap-4 mt-8">
            <a
              href="#work"
              className="cine-cta px-7 py-3.5 bg-white/15 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/25 transition-all duration-300"
            >
              View Selected Work
            </a>
          </div>
          <div className="mt-3">
            <a
              href="#contact"
              className="cine-cta py-2 text-white/80 text-sm font-medium hover:text-white transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="cine-scroll absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Scroll</span>
        <div className="cine-scroll-line w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <div className="w-full h-full bg-white absolute animate-scrolldown" />
        </div>
      </div>
    </section>
  )
}
