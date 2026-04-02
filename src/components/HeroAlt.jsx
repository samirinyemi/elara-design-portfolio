import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const floatingImages = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', rotate: -8, top: '8%', left: '15%', size: 'w-28 md:w-36', radius: 'rounded-2xl' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', rotate: 5, top: '5%', left: '38%', size: 'w-24 md:w-32', radius: 'rounded-xl' },
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400', rotate: 12, top: '12%', left: '62%', size: 'w-28 md:w-36', radius: 'rounded-3xl' },
  { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400', rotate: -5, top: '35%', left: '8%', size: 'w-24 md:w-28', radius: 'rounded-2xl' },
  { src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400', rotate: 8, top: '38%', left: '72%', size: 'w-26 md:w-32', radius: 'rounded-xl' },
  { src: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=400', rotate: -12, top: '62%', left: '12%', size: 'w-20 md:w-28', radius: 'rounded-2xl' },
  { src: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=400', rotate: 6, top: '60%', left: '42%', size: 'w-24 md:w-30', radius: 'rounded-xl' },
  { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400', rotate: -3, top: '58%', left: '68%', size: 'w-28 md:w-36', radius: 'rounded-3xl' },
]

const disciplines = ['Branding', 'Art Direction', 'Typography', 'Digital Design', 'Motion']

export default function HeroAlt() {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Floating images scatter in from center
    tl.from('.float-img', {
      scale: 0,
      opacity: 0,
      rotation: 0,
      duration: 1.2,
      stagger: {
        each: 0.08,
        from: 'random',
      },
      ease: 'back.out(1.4)',
    })
    // Center text reveals
    .from('.alt-hero-line', {
      y: '120%',
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
    }, '-=0.8')
    // Bottom bar fades in
    .from('.alt-hero-bottom', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
    }, '-=0.4')
    // Discipline tags stagger in
    .from('.discipline-tag', {
      x: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    }, '-=0.6')

    // Continuous gentle floating animation on images
    const imgs = gsap.utils.toArray('.float-img')
    imgs.forEach((img, i) => {
      gsap.to(img, {
        y: `random(-20, 20)`,
        x: `random(-10, 10)`,
        rotation: `random(-5, 5)`,
        duration: `random(3, 5)`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      })
    })

    // Parallax: images drift up, text stays
    gsap.to('.float-images-layer', {
      yPercent: -20,
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
    <section
      ref={container}
      className="relative min-h-screen overflow-hidden z-10"
      style={{
        background: 'linear-gradient(160deg, #e8e4df 0%, #d4d0cb 25%, #8a9bae 50%, #2c3e50 75%, #1a1a2e 100%)',
      }}
    >
      {/* Floating images layer */}
      <div className="float-images-layer absolute inset-0 z-0">
        {floatingImages.map((img, i) => (
          <div
            key={i}
            className={`float-img absolute ${img.size} aspect-square ${img.radius} overflow-hidden shadow-2xl`}
            style={{
              top: img.top,
              left: img.left,
              transform: `rotate(${img.rotate}deg)`,
            }}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Vertical grid lines — editorial feel */}
      <div className="absolute inset-0 z-[1] pointer-events-none px-8 md:px-16">
        <div className="h-full w-full flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-full w-px bg-white/[0.07]" />
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-16">
        {/* Main title — centered */}
        <div className="text-center">
          <h1 className="text-[13vw] md:text-[9vw] font-black tracking-tighter uppercase leading-[0.85]">
            <div className="overflow-hidden">
              <div className="alt-hero-line text-white">Creative</div>
            </div>
            <div className="overflow-hidden">
              <div className="alt-hero-line flex items-center justify-center gap-3 md:gap-6">
                <span className="font-serif italic lowercase text-[16vw] md:text-[11vw] font-normal text-accent leading-[0.5]">&amp;</span>
                <span className="text-white">Brand</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="alt-hero-line text-white/40">Designer</div>
            </div>
          </h1>
        </div>

        {/* Tagline below title */}
        <div className="overflow-hidden mt-8 md:mt-10">
          <p className="alt-hero-line text-sm md:text-base text-white/50 max-w-md text-center leading-relaxed">
            Crafting bold identities, immersive digital experiences, and visual narratives that resonate. I turn ideas into iconic brands.
          </p>
        </div>

        {/* Discipline tags — right side */}
        <div className="hidden md:flex flex-col gap-3 absolute right-16 top-1/2 -translate-y-1/2">
          {disciplines.map((tag) => (
            <div
              key={tag}
              className="discipline-tag px-5 py-2.5 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white/50 transition-colors duration-300 cursor-default backdrop-blur-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-8 flex items-end justify-between">
        <div className="alt-hero-bottom text-xs uppercase tracking-widest font-bold text-white/40">
          Based in New York, NY
        </div>
        <div className="alt-hero-bottom text-xs uppercase tracking-widest font-bold text-white/40">
          &copy;2024
        </div>
        <div className="alt-hero-bottom text-xs uppercase tracking-widest font-bold text-white/40 hidden md:block">
          Scroll Down
        </div>
      </div>
    </section>
  )
}
