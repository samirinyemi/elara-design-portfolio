import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const menuBtnRef = useRef(null)
  const overlayRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from('.nav-logo', {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
    .from('.nav-link, .nav-menu-btn', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    }, '-=0.6')

    gsap.to(navRef.current, {
      y: -100,
      ease: 'power2.inOut',
      duration: 0.4,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 300) {
            gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.inOut' })
          } else {
            gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
          }
        },
      },
    })
  }, { scope: navRef })

  const openMenu = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)

    const overlay = overlayRef.current
    const btn = menuBtnRef.current
    if (!overlay || !btn) return

    const btnRect = btn.getBoundingClientRect()
    const navPadding = 24 // px-6 = 24px
    const top = btnRect.bottom + 12

    gsap.set(overlay, {
      display: 'block',
      left: navPadding,
      right: navPadding,
      top: top,
      width: 'auto',
      transformOrigin: 'top right',
      opacity: 0,
      scale: 0.92,
      y: -10,
    })
    gsap.set('.mobile-nav-item', { opacity: 0, y: 14 })

    const tl = gsap.timeline()
    tl.to(overlay, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
    .to('.mobile-nav-item', {
      opacity: 1,
      y: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: 'power3.out',
    }, '-=0.2')
  }, [isOpen])

  const closeMenu = useCallback(() => {
    if (!isOpen) return
    const overlay = overlayRef.current
    if (!overlay) return

    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    })
    tl.to('.mobile-nav-item', {
      opacity: 0,
      y: -8,
      duration: 0.18,
      stagger: 0.025,
      ease: 'power2.in',
    })
    .to(overlay, {
      opacity: 0,
      scale: 0.92,
      y: -8,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => gsap.set(overlay, { display: 'none' }),
    }, '-=0.08')
  }, [isOpen])

  const handleLinkClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 lg:px-16 py-8 text-xs uppercase tracking-widest font-bold mix-blend-difference text-white">
        <a href="#" className="nav-logo hover:text-accent transition-colors duration-300">Elara.</a>
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <a href="#work" className="nav-link hover:text-accent transition-colors duration-300 hidden md:block">Work</a>
          <a href="#about" className="nav-link hover:text-accent transition-colors duration-300 hidden md:block">About</a>
          <a href="#contact" className="nav-link hover:text-accent transition-colors duration-300 hidden md:block">Contact</a>
          <button
            ref={menuBtnRef}
            onClick={isOpen ? closeMenu : openMenu}
            className="nav-menu-btn md:hidden uppercase hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={overlayRef}
        className="fixed z-[60] hidden"
        style={{ display: 'none' }}
      >
        <div
          className="rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm px-8 py-8 flex flex-col"
          style={{
            background: 'linear-gradient(160deg, #c9b8a8 0%, #7a9bb5 20%, #2d5f8a 45%, #1a3a5c 65%, #0f2440 85%, #1a1a2e 100%)',
          }}
        >
          {/* Navigation links */}
          <div className="flex flex-col gap-0">
            <a href="#work" onClick={handleLinkClick} className="mobile-nav-item text-lg font-semibold uppercase tracking-widest text-white/90 py-4 hover:text-white transition-colors duration-200">
              Work
            </a>
            <div className="w-full h-px bg-white/10" />
            <a href="#about" onClick={handleLinkClick} className="mobile-nav-item text-lg font-semibold uppercase tracking-widest text-white/90 py-4 hover:text-white transition-colors duration-200">
              About
            </a>
            <div className="w-full h-px bg-white/10" />
            <a href="#contact" onClick={handleLinkClick} className="mobile-nav-item text-lg font-semibold uppercase tracking-widest text-white/90 py-4 hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="mobile-nav-item mt-8 pt-6 border-t border-white/10">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-3">Socials</h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
              <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors duration-200">Instagram</a>
              <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors duration-200">Dribbble</a>
              <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors duration-200">LinkedIn</a>
              <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors duration-200">Behance</a>
            </div>
          </div>

          {/* Contact info */}
          <div className="mobile-nav-item mt-6 pt-6 border-t border-white/10">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-3">Contact</h4>
            <div className="flex flex-col gap-1.5 text-sm text-white/50">
              <a href="mailto:hello@elaradesign.co" className="hover:text-white transition-colors duration-200">hello@elaradesign.co</a>
              <span className="text-white/30">New York, NY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop to close menu on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={closeMenu}
        />
      )}
    </>
  )
}
