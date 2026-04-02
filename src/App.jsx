import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridOverlay from './components/GridOverlay'
import Navbar from './components/Navbar'
import HeroCinematic from './components/HeroCinematic'
import HeroDark from './components/HeroDark'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import ProcessSection from './components/ProcessSection'
import FooterMinimal from './components/FooterMinimal'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scrolling after loader completes
  useEffect(() => {
    if (loading) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <div className="text-dark antialiased overflow-x-hidden">
          <GridOverlay />
          <Navbar />
          <HeroCinematic />
          <HeroDark />
          <AboutSection />
          <WorkSection />
          <ProcessSection />
          <FooterMinimal />
        </div>
      )}
    </>
  )
}

export default App
