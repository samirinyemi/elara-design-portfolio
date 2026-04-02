import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


export default function Footer() {
  const container = useRef(null)

  useGSAP(() => {
    // Section label + heading reveal
    gsap.from('.footer-heading', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-heading',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // CTA section
    gsap.from('.footer-cta', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-cta',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // Bottom links
    gsap.from('.footer-bottom-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: container })

  return (
    <footer ref={container} id="contact" className="bg-dark text-white pt-24 md:pt-40 pb-12 px-8 md:px-16 overflow-hidden relative z-10">
      {/* Header area — label + heading + description */}
      <div className="footer-heading mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-white/40 font-medium mb-6">[Services]</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
              How We Help You<br />Build the Brand
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/50 max-w-sm leading-relaxed md:text-right">
            We craft bold identities, immersive digital experiences, and visual narratives — strategically, creatively, and with obsession.
          </p>
        </div>
      </div>

      {/* CTA section */}
      <div className="footer-cta mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12">
          <div className="md:col-span-3 pr-8">
            <h2 className="text-[10vw] md:text-[7vw] font-black tracking-tighter uppercase leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
              Got a vision?<br />
              <a href="mailto:hello@elaradesign.co" className="text-accent hover:text-white transition-colors duration-500 underline decoration-2 underline-offset-8">Let's make it real.</a>
            </h2>
          </div>
          <div className="md:col-span-1 flex flex-col gap-10 md:pl-8 pt-2">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-5 border-b border-white/10 pb-3">Socials</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Dribbble</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-300">Behance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-5 border-b border-white/10 pb-3">Contact</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li><a href="mailto:hello@elaradesign.co" className="hover:text-accent transition-colors duration-300">hello@elaradesign.co</a></li>
                <li className="pt-2 text-white/40">Based in<br />New York, NY</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="footer-bottom-item text-xs uppercase tracking-widest font-bold text-white/25 hover:text-white/60 transition-colors">
          &copy; 2024 Elara Design
        </div>
        <div className="footer-bottom-item text-xs uppercase tracking-widest font-bold text-white/25 hover:text-white/60 transition-colors">
          Crafted with obsession.
        </div>
      </div>
    </footer>
  )
}
