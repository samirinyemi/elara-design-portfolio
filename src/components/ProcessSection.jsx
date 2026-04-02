import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep conversations, research, and strategic workshops to uncover the core truth of your brand and define where it needs to go.',
    colStart: 'md:col-start-2',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Visual explorations, moodboards, and typographic systems that translate strategy into a distinct creative direction.',
    colStart: 'md:col-start-3',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Pixel-perfect design, motion, and development brought to life with obsessive attention to craft and detail.',
    colStart: 'md:col-start-4',
  },
]

export default function ProcessSection() {
  const container = useRef(null)

  useGSAP(() => {
    // Section label slides in from left
    gsap.from('.process-label', {
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

    // Heading — word-by-word stagger
    const headingWords = gsap.utils.toArray('.process-word')
    gsap.from(headingWords, {
      y: 50,
      opacity: 0,
      rotateX: 20,
      duration: 0.9,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-heading',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

    // Top border draws in
    gsap.from('.process-top-rule', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.process-top-rule',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // Each step — sequenced timeline per step
    const stepEls = gsap.utils.toArray('.process-step')
    stepEls.forEach((step, i) => {
      const number = step.querySelector('.process-number')
      const title = step.querySelector('.step-title')
      const desc = step.querySelector('.step-desc')

      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      // Number scales up with elastic bounce
      if (number) {
        stepTl.from(number, {
          scale: 0.3,
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      // Title slides up
      if (title) {
        stepTl.from(title, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.6')
      }

      // Description fades in from below
      if (desc) {
        stepTl.from(desc, {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.4')
      }
    })

    // Numbers color shift on scroll — scrub-based
    const numbers = gsap.utils.toArray('.process-number')
    numbers.forEach((num) => {
      gsap.to(num, {
        color: '#111',
        duration: 1,
        scrollTrigger: {
          trigger: num,
          start: 'top 50%',
          end: 'bottom 20%',
          scrub: 1,
          toggleActions: 'play reverse play reverse',
        },
      })
    })

    // Vertical dividers between steps draw in
    const dividers = gsap.utils.toArray('.step-divider')
    dividers.forEach((div) => {
      gsap.from(div, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: div,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, { scope: container })

  // Helper to wrap words
  const wrapWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="process-word inline-block mr-[0.3em]">{word}</span>
    ))
  }

  return (
    <section ref={container} className="py-32 md:py-48 px-8 md:px-16 relative bg-white text-dark border-t border-black/10 z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 mb-24 md:mb-32 gap-y-16">
        <div className="md:col-span-1 pr-8">
          <div className="process-label text-xs uppercase tracking-widest font-bold text-black/50">( 03 — Process )</div>
        </div>
        <div className="md:col-span-3 md:pl-8">
          <h2 className="process-heading text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-4xl" style={{ perspective: '800px' }}>
            {wrapWords('A methodical approach that balances intuition with intention, vision with precision.')}
          </h2>
        </div>
      </div>

      <div className="process-top-rule border-t border-black/20" />
      <div className="process-steps grid grid-cols-1 md:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`process-step ${step.colStart} pr-0 md:pr-12 flex flex-col py-16 md:pl-8 relative ${i > 0 ? 'border-t md:border-t-0 border-black/20' : ''}`}
          >
            {i > 0 && <div className="step-divider hidden md:block absolute left-0 top-0 bottom-0 w-px bg-black/10" />}
            <div className="process-number text-[15vw] md:text-[6vw] font-black leading-none tracking-tighter text-gradient-dark mb-8 drop-shadow-sm">{step.number}</div>
            <h3 className="step-title text-xl font-bold uppercase tracking-tight mb-4">{step.title}</h3>
            <p className="step-desc text-sm leading-relaxed text-black/70 mt-auto md:pt-16 max-w-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
