import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Hls from 'hls.js'

const ABOUT_VIDEO_PLAYBACK_ID = 'ib017V7uA44wtwFtcgjEy5hntFzapP3rhY9N02gD4MOEE'

export default function AboutSection() {
  const container = useRef(null)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const streamUrl = `https://stream.mux.com/${ABOUT_VIDEO_PLAYBACK_ID}.m3u8`
    const onPlaying = () => setIsPlaying(true)
    video.addEventListener('playing', onPlaying)

    const tryPlay = () => {
      video.muted = true
      video.play().catch(() => {
        setTimeout(() => {
          video.muted = true
          video.play().catch(() => {})
        }, 500)
      })
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
      })
      hls.loadSource(streamUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay)
      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (video.paused) tryPlay()
      })
      return () => {
        video.removeEventListener('playing', onPlaying)
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl
      video.addEventListener('loadedmetadata', tryPlay)
      video.addEventListener('canplay', () => {
        if (video.paused) tryPlay()
      })
      return () => {
        video.removeEventListener('playing', onPlaying)
      }
    }
  }, [])

  useGSAP(() => {
    // === About section starts BLACK, transitions to WHITE ===
    // This is tied to the HeroDark exit — uses the previous section as trigger
    const heroDark = container.current.previousElementSibling
    if (heroDark) {
      const aboutColorTrigger = {
        trigger: heroDark,
        start: 'top center',
        end: 'top 35%',
        scrub: 0.2,
      }

      // Background: black → white
      gsap.to(container.current, {
        backgroundColor: '#ffffff',
        ease: 'power2.inOut',
        scrollTrigger: aboutColorTrigger,
      })

      // Border top: white/transparent → black/10
      gsap.to(container.current, {
        borderColor: 'rgba(0,0,0,0.1)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // Label text: white → black/50
      gsap.to('.about-label', {
        color: 'rgba(0,0,0,0.5)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // Heading text: white → dark
      gsap.to('.about-heading', {
        color: '#111111',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // "invisible" word: white/30 → black/30
      gsap.to('.about-word-muted', {
        color: 'rgba(0,0,0,0.3)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // Body text: white/70 → black/70
      gsap.to('.about-body-text', {
        color: 'rgba(0,0,0,0.7)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // Description text: white/70 → black/70
      gsap.to('.about-desc', {
        color: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.1)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })

      // Border line: white/10 → black/10
      gsap.to('.about-border', {
        borderColor: 'rgba(0,0,0,0.1)',
        ease: 'power2.inOut',
        scrollTrigger: { ...aboutColorTrigger },
      })
    }

    // Section label slides in from left
    gsap.from('.about-label', {
      x: -40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    // Split heading into words and animate each
    const headingEl = container.current.querySelector('.about-heading')
    if (headingEl) {
      const words = headingEl.querySelectorAll('.about-word')
      gsap.from(words, {
        y: 60,
        opacity: 0,
        rotateX: 25,
        duration: 1,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingEl,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // Cards stagger reveal with clip-path
    const cards = gsap.utils.toArray('.about-card')
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Image reveal with clip-path
    gsap.from('.about-img-wrap', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '.about-img-wrap',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Bottom description text slide up
    gsap.from('.about-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-desc',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    // Border line draws in
    gsap.from('.about-border', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.about-border',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: container })

  // Helper to wrap each word in a span for stagger animation
  const wrapWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="about-word inline-block mr-[0.3em]">{word}</span>
    ))
  }

  return (
    <section ref={container} id="about" className="py-32 md:py-48 px-8 md:px-16 relative border-t border-white/10 z-10 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-y-16">
        <div className="md:col-span-1 pr-8">
          <div className="about-label text-xs uppercase tracking-widest font-bold text-white/50">( 01 — About )</div>
        </div>
        <div className="md:col-span-3 md:pl-8">
          <h2 className="about-heading text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight max-w-5xl text-white" style={{ perspective: '800px' }}>
            {wrapWords('I believe great design is')}
            <span className="about-word about-word-muted inline-block mr-[0.3em] text-white/30">invisible</span>
            {wrapWords('until it makes you feel something. Every detail, every choice, must')}
            <span className="about-word inline-block mr-[0.3em] text-gradient-dark">serve a purpose</span>
            {wrapWords('. I build brands that move people and experiences they remember.')}
          </h2>

          <div className="about-border mt-24 border-t border-white/10" />
          <div className="about-cards pt-16 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="about-card md:col-span-1">
              <p className="about-body-text text-sm leading-relaxed text-white/70">With over a decade in brand design, art direction, and interactive media, I help ambitious companies define who they are and how they show up in the world.</p>
            </div>
            <div className="about-card md:col-start-3 md:col-span-1">
              <div className="about-img-wrap aspect-[4/5] bg-black overflow-hidden mb-8 img-wrap relative">
                <img
                  src={`https://image.mux.com/${ABOUT_VIDEO_PLAYBACK_ID}/thumbnail.jpg?time=5&width=800`}
                  alt="Design philosophy"
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[1] ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="about-desc text-sm leading-relaxed text-white/70 border-t border-white/10 pt-6">Partnering with forward-thinking startups, agencies, and cultural institutions across five continents.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
