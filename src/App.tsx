import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { proposalContent } from './content/proposalContent'
import { whatsappUrl } from './config/contact'

const homeIntro = {
  title: 'Taller presencial Generación Video con IA',
  subtitle: 'Propuesta comercial',
  preparedBy: 'Preparado por: Laura Salazar / Vena Digital',
  preparedFor: 'Preparado para: Sara / Manuela',
  date: `Fecha: ${proposalContent.portada.date}`,
}

const iaToolLogos = [
  { id: 'gemini', src: '/ia-logos/gemini-color.png', alt: 'Gemini' },
  { id: 'kling', src: '/ia-logos/kilng.png', alt: 'Kling' },
  { id: 'runway', src: '/ia-logos/logo_runway.webp', alt: 'Runway' },
  { id: 'luma', src: '/ia-logos/Luma-Labs-Logo.png', alt: 'Luma Labs' },
  { id: 'freepik', src: '/ia-logos/freepik.webp', alt: 'Freepik' },
  { id: 'seedance', src: '/ia-logos/seedance.png', alt: 'Seedance' },
]

const sessionAccents = ['#3f82ff', '#00d084', '#8b6cff', '#34c8ff']

function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  return prefersReducedMotion
}

interface TypewriterTextProps {
  text: string
  startDelay?: number
  speed?: number
  reducedMotion?: boolean
  isActive?: boolean
}

function TypewriterText({
  text,
  startDelay = 0,
  speed = 30,
  reducedMotion = false,
  isActive = true,
}: TypewriterTextProps) {
  const [visibleText, setVisibleText] = useState(reducedMotion ? text : '')
  const [isDone, setIsDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion || !isActive) {
      return
    }

    let index = 0
    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setVisibleText(text.slice(0, index))

        if (index >= text.length) {
          if (intervalId) {
            window.clearInterval(intervalId)
          }
          setIsDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [isActive, reducedMotion, speed, startDelay, text])

  return (
    <span className="typewriter-text">
      {reducedMotion ? text : visibleText}
      {!reducedMotion && isActive && !isDone ? (
        <span className="typewriter-caret" aria-hidden="true">
          |
        </span>
      ) : null}
    </span>
  )
}

function App() {
  const reducedMotion = useReducedMotionPreference()
  const [descriptionInView, setDescriptionInView] = useState(false)
  const [contentInView, setContentInView] = useState(false)
  const [inversionInView, setInversionInView] = useState(false)
  const [stepsInView, setStepsInView] = useState(false)
  const [activeStepId, setActiveStepId] = useState(
    proposalContent.proximosPasos.steps[0]?.id ?? '',
  )
  const descriptionSectionRef = useRef<HTMLElement | null>(null)
  const contentSectionRef = useRef<HTMLElement | null>(null)
  const inversionSectionRef = useRef<HTMLElement | null>(null)
  const stepsSectionRef = useRef<HTMLElement | null>(null)
  const loopLogos = [...iaToolLogos, ...iaToolLogos]
  const activeStep =
    proposalContent.proximosPasos.steps.find((step) => step.id === activeStepId) ??
    proposalContent.proximosPasos.steps[0]
  const activeStepIndex = Math.max(
    proposalContent.proximosPasos.steps.findIndex((step) => step.id === activeStep?.id),
    0,
  )

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const observeOnce = (
      target: HTMLElement | null,
      onIntersect: (value: boolean) => void,
      threshold: number,
    ) => {
      if (!target) {
        return () => {}
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry?.isIntersecting) {
            onIntersect(true)
            observer.disconnect()
          }
        },
        { threshold },
      )

      observer.observe(target)
      return () => observer.disconnect()
    }

    const cleanups = [
      observeOnce(descriptionSectionRef.current, setDescriptionInView, 0.28),
      observeOnce(contentSectionRef.current, setContentInView, 0.28),
      observeOnce(inversionSectionRef.current, setInversionInView, 0.28),
      observeOnce(stepsSectionRef.current, setStepsInView, 0.28),
    ]

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [reducedMotion])

  return (
    <div className="app-shell">
      <section id="home" className="home-hero panel" aria-labelledby="home-title">
        <div className="home-logos-band" aria-label="Herramientas IA">
          <div className={`home-logos-marquee ${reducedMotion ? 'is-static' : ''}`}>
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="home-logos-track" aria-hidden={copyIndex === 1}>
                {loopLogos.map((logo, index) => (
                  <figure key={`${logo.id}-${copyIndex}-${index}`} className="home-logo-item">
                    <img
                      src={logo.src}
                      alt={copyIndex === 0 ? logo.alt : ''}
                      loading="lazy"
                      aria-hidden={copyIndex === 1}
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="home-overlay">
          <p className="eyebrow home-eyebrow">
            <TypewriterText
              text={homeIntro.subtitle}
              startDelay={120}
              speed={22}
              reducedMotion={reducedMotion}
            />
          </p>
          <h1 id="home-title" className="home-title">
            <TypewriterText
              text={homeIntro.title}
              startDelay={980}
              speed={35}
              reducedMotion={reducedMotion}
            />
          </h1>
          <p className="home-detail">
            <TypewriterText
              text={homeIntro.preparedBy}
              startDelay={1900}
              speed={20}
              reducedMotion={reducedMotion}
            />
          </p>
          <p className="home-detail">
            <TypewriterText
              text={homeIntro.preparedFor}
              startDelay={3000}
              speed={20}
              reducedMotion={reducedMotion}
            />
          </p>
          <p className="home-detail">
            <TypewriterText
              text={homeIntro.date}
              startDelay={4100}
              speed={24}
              reducedMotion={reducedMotion}
            />
          </p>
          <a className="cta-button home-cta-button" href="#propuesta">
            Ver propuesta
          </a>
        </div>
      </section>

      <main id="propuesta">
        <section
          ref={descriptionSectionRef}
          className={`panel program-block ${descriptionInView || reducedMotion ? 'is-in-view' : ''}`}
          aria-labelledby="descripcion-title"
        >
          <h2 id="descripcion-title" className="typed-title">
            <TypewriterText
              text={proposalContent.descripcion.title}
              speed={40}
              reducedMotion={reducedMotion}
              isActive={descriptionInView || reducedMotion}
            />
          </h2>
          <p className="section-copy">{proposalContent.descripcion.text}</p>
          <ul className="metrics" aria-label="Métricas del programa">
            {proposalContent.descripcion.metrics.map((metric, index) => (
              <li key={`${metric.value}-${metric.label}`} style={{ transitionDelay: `${index * 140}ms` }}>
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          ref={contentSectionRef}
          id="contenido"
          className="panel"
          aria-labelledby="contenido-title"
        >
          <h2 id="contenido-title" className="typed-title">
            <TypewriterText
              text={proposalContent.contenido.title}
              speed={40}
              reducedMotion={reducedMotion}
              isActive={contentInView || reducedMotion}
            />
          </h2>
          <div className="sessions-grid">
            {proposalContent.contenido.sesiones.map((session, index) => {
              const sessionLabel = session.title.match(/^Sesión\s+\d+/)?.[0] ?? `Sesión ${index + 1}`
              const cleanTitle = session.title.replace(/^Sesión\s+\d+\s*/, '')
              const sessionImageSrc = `/session-images/session-${index + 1}.jpeg`
              const cardStyle = {
                '--workflow-accent': sessionAccents[index % sessionAccents.length],
              } as CSSProperties

              return (
                <article key={session.title} className="workflow-card" style={cardStyle}>
                  <div className="workflow-card-media" aria-hidden="true">
                    <img
                      className="workflow-card-image"
                      src={sessionImageSrc}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="workflow-card-content">
                    <div className="workflow-card-top">
                      <div className="workflow-meta">
                        <span>{sessionLabel}</span>
                        <span>•</span>
                        <span className="workflow-status">
                          <span className="workflow-status-dot" />
                          Activo
                        </span>
                      </div>
                      <span className="workflow-more" aria-hidden="true">
                        •••
                      </span>
                    </div>
                    <h3 className="workflow-card-title">{cleanTitle}</h3>
                    <div className="workflow-expand-indicator" aria-hidden="true">
                      <svg
                        className="workflow-expand-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 8L10 13L15 8" />
                      </svg>
                    </div>

                    <div className="workflow-hover-details">
                      <p className="objective">{session.objective}</p>
                      <ul className="workflow-bullets">
                        {session.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="workflow-card-footer">
                    <div className="workflow-actions" aria-hidden="true">
                      <span className="workflow-action action-a" />
                      <span className="workflow-action action-b" />
                      <span className="workflow-action action-c" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section
          ref={inversionSectionRef}
          id="inversion"
          className="panel inversion-panel"
          aria-labelledby="inversion-title"
        >
          <h2 id="inversion-title" className="typed-title">
            <TypewriterText
              text={proposalContent.inversion.title}
              speed={42}
              reducedMotion={reducedMotion}
              isActive={inversionInView || reducedMotion}
            />
          </h2>
          <div className="table-head pricing-table-head" aria-hidden="true">
            <span>{proposalContent.inversion.tableHead.mode}</span>
            <span>{proposalContent.inversion.tableHead.value}</span>
          </div>

          <div className="pricing-plans-grid">
            {proposalContent.inversion.opciones.map((option, index) => (
              <article
                key={option.mode}
                className={`pricing-card-v2 ${index === 1 ? 'is-featured' : ''}`}
              >
                <div className="pricing-card-head">
                  <h3>{option.mode}</h3>
                  {index === 1 ? <span className="pricing-chip">Recomendado</span> : null}
                </div>
                <p className="pricing-card-description">{option.detail}</p>
                <p className="pricing-card-amount">{option.value}</p>
                {option.extra ? <p className="pricing-card-extra">{option.extra}</p> : null}
              </article>
            ))}
          </div>

          <div className="pricing-includes-card">
            <h3>{proposalContent.incluye.title}</h3>
            <ul>
              {proposalContent.incluye.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section ref={stepsSectionRef} id="pasos" className="panel" aria-labelledby="pasos-title">
          <h2 id="pasos-title" className="typed-title">
            <TypewriterText
              text={proposalContent.proximosPasos.title}
              speed={42}
              reducedMotion={reducedMotion}
              isActive={stepsInView || reducedMotion}
            />
          </h2>

          <div className={`steps-radio-shell ${stepsInView || reducedMotion ? 'is-visible' : ''}`}>
            <div className="steps-radio-layout">
              <div
                className="steps-radio-group"
                style={
                  {
                    '--steps-count': proposalContent.proximosPasos.steps.length,
                  } as CSSProperties
                }
              >
                {proposalContent.proximosPasos.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`steps-radio-option ${activeStep?.id === step.id ? 'is-active' : ''}`}
                  >
                    <input
                      id={`step-${step.id}`}
                      name="proximos-pasos"
                      type="radio"
                      value={step.id}
                      checked={activeStep?.id === step.id}
                      onChange={(event) => setActiveStepId(event.target.value)}
                      className="steps-radio-input"
                    />
                    <label htmlFor={`step-${step.id}`} className="steps-radio-label">
                      <span className="steps-radio-id">Paso {step.id}</span>
                      <span className="steps-radio-text">{step.text}</span>
                    </label>
                  </div>
                ))}

                <div className="steps-radio-track" aria-hidden="true">
                  <div
                    className="steps-radio-glider"
                    style={{ transform: `translateY(${activeStepIndex * 100}%)` }}
                  />
                </div>
              </div>

              {activeStep ? (
                <article className="step-focus-card">
                  <p className="step-id">Paso {activeStep.id}</p>
                  <p>{activeStep.text}</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="panel footer-panel">
        <a className="cta-button" href={whatsappUrl} target="_blank" rel="noreferrer">
          Escribir por WhatsApp
        </a>
        <p className="signature">{proposalContent.cierre.signature}</p>
        <p className="tagline">{proposalContent.cierre.tagline}</p>
      </footer>
    </div>
  )
}

export default App
