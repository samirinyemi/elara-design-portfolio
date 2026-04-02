import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Hls from 'hls.js'

const projects = [
  {
    title: 'Meridian Studios',
    category: 'Brand Identity & Web Platform',
    year: '2024',
    playbackId: 'b023viL0171lMZ02mO8fsqnhEZ02n74ptx83KpjmBQzLtjk',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Kinetic Journal',
    category: 'Editorial & Art Direction',
    year: '2024',
    playbackId: 'xzchoZV3AHpaNbWYCFxgcaMk2MpB6nFZ005tnUfCs5j00',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Forma Collective',
    category: 'Creative Direction & E-Commerce',
    year: '2023',
    playbackId: '02wEdPWiDdKyWZMjALU6ysTSfD00oEFnA01wyz01N8lSsD8',
    aspect: 'aspect-square md:aspect-[16/9]',
    titleSize: 'text-3xl md:text-4xl',
  },
]

const placeholders = [
  {
    title: 'Lumina Skincare',
    category: 'Packaging & Visual Identity',
    year: '2023',
    playbackId: 'Gy87NP021UvJmv7FcffdCp00YkrDeOl74wf9twHVEJYn4',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Onyx Records',
    category: 'Album Art & Campaign Design',
    year: '2022',
    playbackId: 'hpv4btwpP5nwVDOdUDDqzv02XAyxzTDsOdzwXUbzlWRc',
    aspect: 'aspect-[4/5]',
  },
]

function ProjectCard({ title, category, year, playbackId, aspect, titleSize = 'text-2xl md:text-3xl' }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=50&width=1200`
  const streamUrl = `https://stream.mux.com/${playbackId}.m3u8`

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlaying = () => setIsPlaying(true)
    video.addEventListener('playing', onPlaying)

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(streamUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      hlsRef.current = hls
      return () => {
        video.removeEventListener('playing', onPlaying)
        hls.destroy()
        hlsRef.current = null
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
      })
      return () => {
        video.removeEventListener('playing', onPlaying)
      }
    }
  }, [streamUrl])

  return (
    <div className="group cursor-pointer relative z-20">
      <div className={`${aspect} overflow-hidden bg-white mb-4 md:mb-8 relative img-wrap card-media`}>
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[1] ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors duration-700 z-[2]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-accent text-white text-xs uppercase tracking-widest px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 whitespace-nowrap z-[3]">
          View Case Study
        </div>
      </div>
      <div className="card-info flex items-start justify-between border-t border-black/15 pt-4 md:pt-6">
        <div>
          <h3 className={`card-title ${titleSize} font-bold uppercase tracking-tight mb-2`}>{title}</h3>
          <p className="card-category text-sm text-black/60">{category}</p>
        </div>
        <span className="card-year text-xs uppercase tracking-widest font-bold text-black/30">{year}</span>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const container = useRef(null)

  useGSAP(() => {
    // Section label slides in
    gsap.from('.work-label', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    // Section heading — clip reveal from bottom
    gsap.from('.work-heading', {
      y: '100%',
      duration: 1.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.work-heading-wrap',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    // Each project card — staggered reveal with different entrance per card
    const cards = gsap.utils.toArray('.project-card')
    cards.forEach((card, i) => {
      const media = card.querySelector('.card-media')
      const info = card.querySelector('.card-info')
      const title = card.querySelector('.card-title')
      const category = card.querySelector('.card-category')
      const year = card.querySelector('.card-year')

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      // Media reveal with clip-path wipe
      if (media) {
        cardTl.from(media, {
          clipPath: i % 2 === 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
        })
      }

      // Info line draws in
      if (info) {
        cardTl.from(info, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.5')
      }

      // Title slides up
      if (title) {
        cardTl.from(title, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.6')
      }

      // Category and year fade in
      if (category) {
        cardTl.from(category, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4')
      }

      if (year) {
        cardTl.from(year, {
          opacity: 0,
          x: -10,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4')
      }
    })

    // Horizontal rule under heading draws in
    gsap.from('.work-rule', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.work-rule',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: container })

  return (
    <section ref={container} id="work" className="py-32 md:py-48 relative border-t border-black/10 bg-white text-dark z-10">
      <div className="px-8 md:px-16 mb-24 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16">
          <div className="md:col-span-1">
            <div className="work-label text-xs uppercase tracking-widest font-bold text-black/50">( 02 — Selected Works )</div>
          </div>
          <div className="md:col-span-3 md:pl-8">
            <div className="work-heading-wrap overflow-hidden">
              <h2 className="work-heading text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase leading-none">(19' - 26')</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="work-rule mx-8 md:mx-16 border-t border-black/10 mb-16 md:mb-24" />

      <div className="px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 md:gap-y-0">
          <div className="project-card md:col-span-2 md:pr-16">
            <ProjectCard {...projects[0]} />
          </div>

          <div className="project-card md:col-span-2 md:mt-64 md:pl-16">
            <ProjectCard {...projects[1]} />
          </div>

          <div className="project-card md:col-span-4 grid grid-cols-1 md:grid-cols-4 md:mt-48">
            <div className="md:col-start-2 md:col-span-3 md:pl-8">
              <ProjectCard {...projects[2]} />
            </div>
          </div>

          <div className="project-card md:col-span-2 md:pr-16 md:mt-48">
            <ProjectCard {...placeholders[0]} />
          </div>

          <div className="project-card md:col-span-2 md:mt-64 md:pl-16">
            <ProjectCard {...placeholders[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}
