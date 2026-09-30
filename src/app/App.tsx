import { BrowserRouter, Routes, Route, useLocation, useNavigate, NavLink } from 'react-router'
import { motion, AnimatePresence, useInView, type Variants } from 'motion/react'
import { useState, useEffect, useRef, type ReactNode, type JSX } from 'react'
import alonBg   from '../imports/ALON_BACKGROUND.png'
import alonIcon from '../imports/ALON_app_icon.png'
import alonPost from '../imports/ALON.png'
import portrait    from '../imports/3cad1233-a651-419e-9f6b-f426bcfcea03.jpg'
import klmFront        from '../imports/5.png'
import klmBack         from '../imports/6.png'
import klmArtwork      from '../imports/1.png'
import klmLogo         from '../imports/2.png'
import pgdcWhite       from '../imports/PGDC_WHITE.png'
import pgdcBlack       from '../imports/PGDC_BLACK.png'
import bltnWhite       from '../imports/BLTN_WHITE.png'
import bltnBlack       from '../imports/BLTN_BLACK.png'
import ucFront         from '../imports/UNDERCOVER_FRONT.png'
import ucBack          from '../imports/UNDERCOVER_BACK.png'
import ucLogo          from '../imports/UNDERCOVER_LOGO_FRONT.png'
import ucDesignBack    from '../imports/UNDERCOVER_DESIGN_BACK.png'
import soltFront       from '../imports/SOLT_FRONT.png'
import soltBack        from '../imports/SOLT_BACK.png'
import soltDesignFront from '../imports/SOLT_DESIGN_FRONT.png'
import soltDesignBack  from '../imports/SOLT_DESIGN_BACK.png'
import jtdHero     from '../imports/JTD_Business_Card.png'
import jtdCube     from '../imports/Logo.png'
import jtdMono     from '../imports/Word_Logo.png'
import jtdWordmark from '../imports/Text.png'

/* ─── Injected keyframes ──────────────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @keyframes blink { 0%,48%{opacity:1} 50%,100%{opacity:0} }
      @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      .ticker-track { animation: ticker 28s linear infinite; }
      .ticker-track:hover { animation-play-state: paused; }
      input::placeholder, textarea::placeholder {
        color: rgba(255,255,255,0.16);
        font-family: 'Inter','Helvetica Neue',sans-serif;
      }
      textarea { resize: none; }
    `}</style>
  )
}

/* ─── Typewriter hook ─────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 68, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [text, speed, startDelay])

  return { displayed, done }
}

/* ─── Mobile breakpoint hook ─────────────────────────────────────────────── */
function useMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

/* ─── Shared motion config ────────────────────────────────────────────────── */
const E = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PAGE_VARIANTS: Variants = {
  initial: { opacity: 0, x: 48 },
  enter:   { opacity: 1, x: 0,  transition: { duration: 0.42, ease: E } },
  exit:    { opacity: 0, x: -32, transition: { duration: 0.28, ease: E } },
}

const STAGGER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const ITEM_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.56, ease: E } },
}

const ITEM_LEFT: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.52, ease: E } },
}

/* ─── Typography scale (always Inter, Swiss precision) ────────────────────── */
const FF = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif"

const tx = {
  label: {
    fontFamily: FF, fontSize: 10, fontWeight: 600,
    letterSpacing: '0.26em', textTransform: 'uppercase' as const,
    color: '#ff2d2d',
  },
  micro: {
    fontFamily: FF, fontSize: 10, fontWeight: 500,
    letterSpacing: '0.22em', textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.26)',
  },
  hero: {
    fontFamily: FF, fontWeight: 900,
    letterSpacing: '-0.042em', lineHeight: 0.87,
    color: '#ffffff',
  },
  body: {
    fontFamily: FF, fontSize: 14, fontWeight: 400,
    lineHeight: 1.78, letterSpacing: '0.01em',
    color: 'rgba(255,255,255,0.48)',
  },
  nav: {
    fontFamily: FF, fontSize: 10, fontWeight: 500,
    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
  },
}


/* ─── Page shell with slide transition ───────────────────────────────────── */
function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={PAGE_VARIANTS}
      initial="initial" animate="enter" exit="exit"
      style={{ minHeight: '100vh', paddingTop: 64 }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Complex CTA button ─────────────────────────────────────────────────── */
function CTAButton({ label, to }: { label: string; to: string }) {
  const navigate = useNavigate()
  return (
    <motion.button
      onClick={() => navigate(to)}
      whileHover={{ scale: 1.035, backgroundColor: '#ff2d2d', boxShadow: '0 0 0 1px #ff2d2d, 0 0 28px rgba(255,45,45,0.22)' }}
      whileTap={{ scale: 0.93, transition: { duration: 0.07, ease: 'easeIn' } }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        ...tx.nav, fontSize: 10, color: '#ffffff',
        padding: '19px 44px',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'transparent', cursor: 'pointer',
      }}
    >
      {label}
    </motion.button>
  )
}

/* ─── Navigation ──────────────────────────────────────────────────────────── */
function Nav() {
  const navigate = useNavigate()
  const isMobile = useMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',           label: 'Index',      end: true  },
    { to: '/about',      label: 'About',      end: false },
    { to: '/designs',    label: 'Designs',    end: false },
    { to: '/experience', label: 'Experience', end: false },
    { to: '/contact',    label: 'Contact',    end: false },
  ]

  const handleNav = (to: string) => {
    navigate(to)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: isMobile ? '0 20px' : '0 48px',
        background: 'rgba(8,8,8,0.94)', backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {/* Wordmark */}
        <button
          onClick={() => handleNav('/')}
          style={{
            ...tx.nav, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.24em', color: '#ffffff',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >G.Z Maramag</button>

        {isMobile ? (
          /* Hamburger button */
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center',
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ width: 20, height: 1, background: '#ffffff' }}
            />
            <motion.div
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{ width: 20, height: 1, background: '#ffffff' }}
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ width: 20, height: 1, background: '#ffffff' }}
            />
          </button>
        ) : (
          <>
            {/* Desktop page links */}
            <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
              {links.map(l => (
                <NavLink key={l.to} to={l.to} end={l.end} style={{ display: 'block' }}>
                  {({ isActive }) => (
                    <motion.span
                      whileHover={{ color: '#ffffff' }}
                      style={{
                        ...tx.nav, cursor: 'pointer',
                        color: isActive ? '#ff2d2d' : 'rgba(255,255,255,0.36)',
                        transition: 'color 0.18s',
                      }}
                    >
                      {l.label}
                    </motion.span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Availability dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e88' }} />
              <span style={{ ...tx.micro, fontSize: 9 }}>Available</span>
            </div>
          </>
        )}
      </nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: E }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              zIndex: 499,
              background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              padding: '48px 20px',
            }}
          >
            {links.map((l, i) => (
              <NavLink key={l.to} to={l.to} end={l.end} style={{ display: 'block' }}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    onClick={() => handleNav(l.to)}
                    style={{
                      fontFamily: FF, fontSize: 32, fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: isActive ? '#ff2d2d' : '#ffffff',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                    }}
                  >
                    {l.label}
                  </motion.div>
                )}
              </NavLink>
            ))}

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e88' }} />
              <span style={{ ...tx.micro, fontSize: 9 }}>Available for work</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Contour line canvas background ─────────────────────────────────────── */
function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      /* Use parent element dimensions — more reliable than offsetWidth on abs-positioned canvas */
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth  : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      canvas.width  = w
      canvas.height = h
    }

    /* Delay first resize one tick so the parent has painted */
    const initialTimer = setTimeout(resize, 0)
    window.addEventListener('resize', resize)

    const LINES = 22

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < LINES; i++) {
        const yBase = (H / (LINES - 1)) * i
        ctx.beginPath()

        for (let x = 0; x <= W + 4; x += 3) {
          const nx = x / W
          const y = yBase
            + Math.sin(nx * 2.8 + t * 0.6  + i * 0.38) * 28
            + Math.sin(nx * 6.1 - t * 0.4  + i * 0.22) * 12
            + Math.sin(nx * 11.3 + t * 0.25 + i * 0.55) * 5

          if (x === 0) ctx.moveTo(x, y)
          else         ctx.lineTo(x, y)
        }

        const isAccent = i % 4 === 2
        const opacity  = isAccent
          ? 0.07 + Math.sin(i * 0.9 + t * 0.18) * 0.02
          : 0.05 + Math.sin(i * 0.6 + t * 0.12) * 0.015

        ctx.strokeStyle = isAccent
          ? `rgba(255,45,45,${opacity})`
          : `rgba(255,255,255,${opacity})`
        ctx.lineWidth = isAccent ? 1 : 0.7
        ctx.stroke()
      }

      t += 0.006
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      clearTimeout(initialTimer)
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', display: 'block',
        zIndex: 0,
      }}
    />
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 1 — LANDING
═══════════════════════════════════════════════════════════════════════════════ */
function LandingPage() {
  const isMobile = useMobile()
  /* Sequential typewriter: each word starts after previous finishes */
  const { displayed: w1, done: d1 } = useTypewriter('DESIGN',   68, 600)
  const { displayed: w2, done: d2 } = useTypewriter('BEYOND',   68, d1 ? 80 : 999999)
  const { displayed: w3 }           = useTypewriter('LIMITS.',   68, d2 ? 80 : 999999)

  return (
    <Page>
      {/* ── Hero ── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        padding: isMobile ? '0 20px 60px' : '0 48px 80px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <ContourBackground />

        {/* Hero content — sits above canvas */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
        {/* Section stamp */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ ...tx.label, marginBottom: 44 }}
        >
          Portfolio 2026 — Information Technology
        </motion.div>

        {/* Typewriter headline */}
        <div style={{ ...tx.hero, fontSize: 'clamp(68px,12.5vw,188px)', marginBottom: 56 }}>
          {/* Line 1 */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: w1.length > 0 ? '0%' : '100%' }}
              transition={{ duration: 0.01 }}
              style={{ display: 'inline-block' }}
            >
              {w1}
              {!d1 && (
                <span style={{ color: '#ff2d2d', animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>
              )}
            </motion.div>
          </div>
          {/* Line 2 */}
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'inline-block' }}>
              {d1 ? w2 : ' '}
              {d1 && !d2 && (
                <span style={{ color: '#ff2d2d', animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>
              )}
            </div>
          </div>
          {/* Line 3 */}
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', color: d2 ? '#ff2d2d' : '#ffffff' }}>
              {d2 ? w3 : ' '}
              {d2 && w3.length < 7 && (
                <span style={{ animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>
              )}
            </div>
          </div>
        </div>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.55, ease: E }}
          style={{ ...tx.body, maxWidth: 360, marginBottom: 44 }}
        >IT Student & Creative<br />Graphic design, web development, and digital content creation.</motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.95, duration: 0.55, ease: E }}
          style={{ display: 'flex', gap: 2 }}
        >
          <CTAButton label="About Me" to="/about" />
          <CTAButton label="Designs"  to="/designs" />
          <CTAButton label="Contact"  to="/contact" />
        </motion.div>

        </div>{/* end hero content wrapper */}

        {/* Grid number stamp — absolute to section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.5 }}
          style={{
            position: 'absolute', bottom: 36, left: isMobile ? 20 : 48,
            ...tx.micro, fontSize: 9, zIndex: 1,
          }}
        >
          01 / 05
        </motion.div>
      </section>

    </Page>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 2 — ABOUT
═══════════════════════════════════════════════════════════════════════════════ */
function AboutPage() {
  const tools = [
    'Python','Django','JavaScript','HTML / CSS','Bootstrap','SQLite',
    'Canva','Affinity','Microsoft Apps','Google Apps','Git / GitHub','VS Code','AI Workflows',
  ]

  const textBlocks = [
    {
      label: 'Biography',
      text: "I'm Gadiel Zya Maramag — a 4th-year Bachelor of Science in Information Technology student at Palawan State University with hands-on experience in graphic design, digital content creation, social media management, and web development.",
    },
    {
      label: 'Focus',
      text: 'I work at the intersection of design and technology: building functional web systems, crafting minimalist visual identities, and producing content that communicates clearly and looks considered.',
    },
    {
      label: 'Approach',
      text: 'Seeking opportunities to apply technical and creative skills in a professional environment — every project is a chance to solve a real problem, learn something new, and produce work that earns its place.',
    },
  ]

  const rightRef = useRef<HTMLDivElement>(null)
  const rightIn  = useInView(rightRef, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  return (
    <Page>
      <div style={{ padding: isMobile ? '60px 20px 0' : '72px 48px 0' }}>
        {/* Section stamp */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ ...tx.label, marginBottom: 64 }}
        >
          02 / About Me
        </motion.div>

        {/* Two-column */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80, alignItems: 'start',
        }}>
          {/* Left — portrait */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, ease: E, delay: 0.18 }}
          >
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', position: 'relative' }}>
              <img
                src={portrait}
                alt="Gadiel Zya Maramag"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center 20%',
                  display: 'block',
                  filter: 'grayscale(18%) contrast(1.06)',
                }}
              />
            </div>
            <div style={{
              marginTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 16,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span style={{ ...tx.micro, fontSize: 9 }}>Gadiel Zya Maramag</span>
              <span style={{ ...tx.micro, fontSize: 9 }}>Puerto Princesa, PH</span>
            </div>
          </motion.div>

          {/* Right — text blocks */}
          <motion.div
            ref={rightRef}
            variants={STAGGER}
            initial="hidden"
            animate={rightIn ? 'show' : 'hidden'}
          >
            <motion.h1
              variants={ITEM_UP}
              style={{
                ...tx.hero, fontSize: 'clamp(36px,4.5vw,64px)',
                marginBottom: 48,
              }}
            >
              IT Student
              <br />
              <span style={{ color: '#ff2d2d' }}>& Creative Designer</span>
            </motion.h1>

            {textBlocks.map((b, i) => (
              <motion.div
                key={i}
                variants={ITEM_UP}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 28, paddingBottom: 28,
                }}
              >
                <div style={{ ...tx.label, fontSize: 9, marginBottom: 14 }}>{b.label}</div>
                <p style={tx.body}>{b.text}</p>
              </motion.div>
            ))}

            {/* Availability block */}
            <motion.div
              variants={ITEM_UP}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 28, paddingBottom: 28,
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 12px #22c55e88', flexShrink: 0 }} />
              <span style={{ ...tx.body, fontSize: 13 }}>Available for freelance & internships — mgadielzya@gmail.com</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{
        marginTop: isMobile ? 60 : 100, borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 32, paddingBottom: 32,
        overflow: 'hidden',
      }}>
        <div style={{ paddingLeft: isMobile ? 20 : 48, marginBottom: 20 }}>
          <span style={tx.micro}>Tools & Technologies</span>
        </div>
        {/* CSS-animated ticker with hover-pause */}
        <div style={{ overflow: 'hidden', cursor: 'default' }}>
          <div
            className="ticker-track"
            style={{ display: 'flex', gap: 56, width: 'max-content', alignItems: 'center' }}
          >
            {[...tools, ...tools].map((tool, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 56, flexShrink: 0 }}>
                <span style={{
                  fontFamily: FF, fontSize: 13, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap',
                }}>
                  {tool}
                </span>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff2d2d', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

/* ─── ALON Featured Project ──────────────────────────────────────────────── */
function AlonFeatured() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const stack = [
    'Python', 'Django', 'SQLite', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Django-allauth',
  ]

  const bullets = [
    'Developed a social music platform allowing users to upload music, create playlists, and interact through a community feed.',
    'Implemented user authentication, personal music libraries, community posts, and music discovery via an external music API.',
    'Designed the platform UI/UX and visual identity — a responsive, vinyl-inspired interface centred on music culture.',
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E }}
      style={{
        marginBottom: 72,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* ── Hero image ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(220px, 38vw, 480px)' }}>
        <img
          src={alonBg}
          alt="ALON — Social Music Platform hero background"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.12) 0%, rgba(8,8,8,0.6) 100%)',
        }} />
        {/* Top-left stamp */}
        <div style={{
          position: 'absolute', top: 24, left: 28,
          ...tx.label, fontSize: 9,
        }}>
          Featured — Web Platform
        </div>
        {/* Bottom-right index */}
        <div style={{
          position: 'absolute', bottom: 24, right: 28,
          ...tx.micro, fontSize: 9,
        }}>
          01 / Academic Project
        </div>
      </div>

      {/* ── Detail row ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Left — meta + description */}
        <div style={{
          padding: isMobile ? '28px 20px' : '36px 40px',
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
          display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          {/* Icon + title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src={alonIcon}
              alt="ALON app icon"
              style={{
                width: 64, height: 64,
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.1)',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ ...tx.label, fontSize: 9, marginBottom: 6 }}>
                2024 — Python / Django / JavaScript
              </div>
              <div style={{
                fontFamily: FF, fontSize: 'clamp(22px,3vw,36px)',
                fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff',
                lineHeight: 1,
              }}>
                ALON
              </div>
              <div style={{ ...tx.body, fontSize: 12, marginTop: 4 }}>
                Social Music Platform
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#ff2d2d', marginTop: 6, flexShrink: 0,
                }} />
                <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div style={{ ...tx.micro, fontSize: 9, marginBottom: 14 }}>Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {stack.map(s => (
                <span
                  key={s}
                  style={{
                    fontFamily: FF, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    padding: '6px 12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — ALON.png poster */}
        <div style={{ position: 'relative', overflow: 'hidden', maxHeight: isMobile ? 300 : 540 }}>
          <img
            src={alonPost}
            alt="ALON project showcase — features, preview and tech stack poster"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              display: 'block',
            }}
          />
          {/* Subtle right-edge fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(8,8,8,0.08), transparent 20%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── JTD Logistics Featured Project ────────────────────────────────────── */
function JTDFeatured() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const deliverables = ['Logo Design', 'Brand Identity', 'Wordmark', 'Social Media', 'Facebook Management', 'Customer Engagement']

  const bullets = [
    'Conceived the visual identity from scratch — a geometric JTD lettermark and isometric cube mark that signal reliability and precision without a single wasted element.',
    'Established brand colour system: deep navy (#1a2a6e) for authority, steel-grey for balance — a palette legible across digital and print.',
    'Created and managed the company\'s Facebook presence, publishing order showcases and service content; acted as primary point of contact for customer inquiries.',
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.08 }}
      style={{
        marginBottom: 72,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* ── Hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(200px, 32vw, 400px)' }}>
        <img
          src={jtdHero}
          alt="JTD Logistics brand hero — city skyline with cube mark and wordmark"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
        />
        {/* Dark vignette bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.05) 0%, rgba(8,8,8,0.55) 100%)',
        }} />
        <div style={{ position: 'absolute', top: 24, left: 28, ...tx.label, fontSize: 9 }}>
          Featured — Brand Identity
        </div>
        <div style={{ position: 'absolute', bottom: 24, right: 28, ...tx.micro, fontSize: 9 }}>
          02 / Freelance Project
        </div>
      </div>

      {/* ── Detail row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Left — identity + description */}
        <div style={{
          padding: isMobile ? '28px 20px' : '36px 40px',
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
          display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          {/* Cube + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src={jtdCube}
              alt="JTD cube mark"
              style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <div style={{ ...tx.label, fontSize: 9, marginBottom: 6 }}>
                2024 — Branding / Social Media
              </div>
              <div style={{
                fontFamily: FF, fontSize: 'clamp(22px,3vw,36px)',
                fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1,
              }}>
                JTD
              </div>
              <div style={{ ...tx.body, fontSize: 12, marginTop: 4 }}>
                Logistics — Brand Identity
              </div>
            </div>
          </div>

          {/* Design rationale bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#ff2d2d', marginTop: 6, flexShrink: 0,
                }} />
                <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div>
            <div style={{ ...tx.micro, fontSize: 9, marginBottom: 14 }}>Deliverables</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {deliverables.map(d => (
                <span
                  key={d}
                  style={{
                    fontFamily: FF, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    padding: '6px 12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — brand sheet presentation panel */}
        <div style={{
          background: '#f8f8f8',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '32px 20px' : '40px 48px', gap: 0,
          position: 'relative',
        }}>
          {/* Label */}
          <div style={{
            position: 'absolute', top: 20, left: 24,
            fontFamily: FF, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.22)',
          }}>
            Brand System
          </div>

          {/* Monogram mark — large */}
          <div style={{
            width: '100%', display: 'flex', justifyContent: 'center',
            paddingBottom: 24,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: 28,
          }}>
            <img
              src={jtdMono}
              alt="JTD lettermark monogram"
              style={{ width: 'clamp(100px, 40%, 180px)', objectFit: 'contain' }}
            />
          </div>

          {/* Wordmark — below divider */}
          <img
            src={jtdWordmark}
            alt="JTD Logistics wordmark"
            style={{ width: 'clamp(140px, 70%, 280px)', objectFit: 'contain' }}
          />

          {/* Colour swatches */}
          <div style={{
            display: 'flex', gap: 8, marginTop: 36,
            alignItems: 'center',
          }}>
            {[
              { hex: '#1a2a6e', label: 'Navy' },
              { hex: '#8a8a9a', label: 'Steel' },
              { hex: '#ffffff', label: 'White', border: '1px solid rgba(0,0,0,0.12)' },
            ].map(c => (
              <div key={c.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 32, height: 32,
                  background: c.hex,
                  border: c.border ?? 'none',
                }} />
                <span style={{
                  fontFamily: FF, fontSize: 8, fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.4)',
                }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ZIYA! SOLT Collection ──────────────────────────────────────────────── */
function SOLTFeatured() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const tags = ['Streetwear', 'Graphic Tee', 'Brand Identity', 'ZIYA!', 'Apparel Design', 'Typography']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.06 }}
      style={{ marginBottom: 72, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
    >
      {/* ── Collection header ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12 }}>
            03 / Fashion Design — Apparel
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1,
            }}>
              ZIYA!
            </span>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              SOLT Collection
            </span>
          </div>
          <div style={{ ...tx.body, fontSize: 12, marginTop: 8 }}>
            Swagged Out Like This — Debut streetwear drop
          </div>
        </div>
        <div style={{ ...tx.micro, fontSize: 9, textAlign: 'right', lineHeight: 1.8 }}>
          <div>Colorway</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
            {[['#0a0a0a','rgba(255,255,255,0.18)'], ['#ffffff','none'], ['#ff2d2d','none']].map(([bg, border], i) => (
              <div key={i} style={{
                width: 16, height: 16,
                background: bg,
                border: border === 'none' ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${border}`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Shirt mockup — front & back ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Front */}
        <div style={{
          background: '#f4f4f4',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 16, left: 20,
            fontFamily: FF, fontSize: 8, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.3)',
          }}>Front</div>
          <img
            src={soltFront}
            alt="SOLT tee — front view, chest logo hit"
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>
        {/* Back */}
        <div style={{ background: '#f4f4f4', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 16, left: 20,
            fontFamily: FF, fontSize: 8, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.3)',
          }}>Back</div>
          <img
            src={soltBack}
            alt="SOLT tee — back view, full graphic print"
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── Artwork isolates ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={soltDesignFront}
            alt="SOLT front artwork — S.O.L.T. by ZIYA! logotype"
            style={{ width: '72%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div style={{
          padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={soltDesignBack}
            alt="SOLT back artwork — halftone figure with red star and SWAGGED OUT LIKE THIS. text"
            style={{ width: '72%', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Copy + tags ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40,
        background: '#0a0a0a',
      }}>
        {/* Left — description */}
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>
            SOLT keeps the front restrained — a compact chest logo, "S.O.L.T." in bold italic
            white with a red star badge cutting through the "O", and the "BY ZIYA!" sub-mark
            beneath it. The back is where the drop makes its statement: a high-contrast halftone
            figure, hand raised palm-out as if silencing the noise, fractured red stars layered
            across the face, and the collection mantra stamped in heavy condensed red at the
            bottom. Two sides, two moods — quiet confidence up front, full attitude behind.
          </p>
        </div>
        {/* Right — tags */}
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: FF, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                padding: '6px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ZIYA! KLM LNG — Kalma Lang Collection ──────────────────────────────── */
function KLMLNGFeatured() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const SUN = '#d4a43a'

  const tags = ['Streetwear', 'Bestseller', 'Retro Cartoon', 'ZIYA!', 'Filipino Culture', 'Apparel Design', 'Illustration']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.06 }}
      style={{ marginBottom: 72, border: `1px solid ${SUN}44`, overflow: 'hidden' }}
    >
      {/* ── Header ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        background: '#080808',
        borderBottom: `1px solid ${SUN}22`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: SUN }}>
            08 / Fashion Design — Apparel · Bestseller
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1,
            }}>
              ZIYA!
            </span>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              KLM LNG Collection
            </span>
          </div>
          <div style={{ ...tx.body, fontSize: 12, marginTop: 8 }}>
            Kalma Lang — Chill out, Kaibigan
          </div>
        </div>

        {/* Bestseller badge */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
        }}>
          <div style={{
            fontFamily: FF, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#080808', background: SUN,
            padding: '6px 14px',
          }}>
            Most Sold
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { bg: '#ffffff', border: 'rgba(255,255,255,0.12)' },
              { bg: '#080808', border: 'rgba(255,255,255,0.18)' },
              { bg: SUN,       border: 'none' },
            ].map((c, i) => (
              <div key={i} style={{ width: 16, height: 16, background: c.bg, border: `1px solid ${c.border}` }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Front & Back mockups ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderBottom: `1px solid ${SUN}22` }}>
        {[
          { src: klmFront, alt: 'KLM LNG tee — white front, KLM LNG KAIBIGAN chest hit in black and gold', label: 'Front' },
          { src: klmBack,  alt: 'KLM LNG tee — white back, retro sun mascot with KALMA LANG stacked type', label: 'Back'  },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#0d0d0d',
            borderRight: i === 0 ? `1px solid ${SUN}22` : 'none',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 20, zIndex: 1,
              fontFamily: FF, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: `${SUN}99`,
            }}>{s.label}</div>
            <img src={s.src} alt={s.alt} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        ))}
      </div>

      {/* ── Artwork isolates ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
        borderBottom: `1px solid ${SUN}22`,
      }}>
        {/* Back graphic — dark */}
        <div style={{
          background: '#050505',
          borderRight: `1px solid ${SUN}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px 0',
        }}>
          <img
            src={klmArtwork}
            alt="KLM LNG back artwork — KALMA LANG triple echo with retro sun character"
            style={{ width: '72%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        {/* Logo — warm cream panel */}
        <div style={{
          background: '#fdf8ee',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 32px', gap: 16, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 20, left: 24,
            fontFamily: FF, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.22)',
          }}>Logotype</div>
          <img
            src={klmLogo}
            alt="KLM LNG Kaibigan logotype — black and gold slab serif"
            style={{ width: '80%', objectFit: 'contain', display: 'block' }}
          />
          <div style={{
            fontFamily: FF, fontSize: 9, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.3)', textAlign: 'center',
          }}>
            "Calm down, friend."
          </div>
        </div>
      </div>

      {/* ── Copy + tags ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40,
        background: '#080808',
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: SUN }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>
            KLM LNG is ZIYA!'s most culturally rooted piece — and the brand's bestseller for
            good reason. "Kalma lang" is Filipino for "calm down, take it easy," and the
            design commits to that energy completely: a grinning retro sun mascot strolling
            between clouds, wearing sneakers, carrying spray cans — pure 70s cartoon joy
            translated into streetwear. Above it, "KALMA LANG" echoes three times in stacked
            gold and fading grey, like a mantra repeating until it lands. The chest reads
            "KLM LNG / KAIBIGAN" — friend. It's a shirt that speaks Filipino and smiles
            doing it. No aggression, no mystery — just warmth, motion, and good energy.
          </p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: SUN }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: FF, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: `${SUN}cc`,
                padding: '6px 12px',
                border: `1px solid ${SUN}44`,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ZIYA! PGDC — Pretty Girls Don't Cry Collection ─────────────────────── */
function PGDCFeatured() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const PINK = '#e07ab0'

  const tags = ['Streetwear', 'Two Colorways', 'Brand Identity', 'ZIYA!', 'Apparel Design', 'Hand-Lettered']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.06 }}
      style={{ marginBottom: 72, border: `1px solid ${PINK}33`, overflow: 'hidden' }}
    >
      {/* ── Header ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        background: '#0a0a0a',
        borderBottom: `1px solid ${PINK}22`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: PINK }}>
            07 / Fashion Design — Apparel
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1,
            }}>
              ZIYA!
            </span>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              PGDC Collection
            </span>
          </div>
          <div style={{ ...tx.body, fontSize: 12, marginTop: 8 }}>
            Pretty Girls Don't Cry — Two colorways, one declaration
          </div>
        </div>

        {/* Colorways */}
        <div style={{ ...tx.micro, fontSize: 9, textAlign: 'right' }}>
          <div style={{ marginBottom: 8 }}>Colorways</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
            {[
              { bg: '#ffffff', border: 'rgba(255,255,255,0.12)', label: 'White' },
              { bg: '#0a0a0a', border: 'rgba(255,255,255,0.18)', label: 'Black' },
              { bg: PINK,      border: 'none',                   label: 'Pink'  },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 16, height: 16, background: c.bg, border: `1px solid ${c.border}` }} />
                <span style={{ ...tx.micro, fontSize: 7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Both colorways full-bleed ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        {[
          { src: pgdcWhite, alt: 'PGDC tee — white colorway, Pretty girls dont cry in pink script with lip marks', label: 'White' },
          { src: pgdcBlack, alt: 'PGDC tee — black colorway, Pretty girls dont cry in pink script with crimson lip marks', label: 'Black' },
        ].map((s, i) => (
          <div key={i} style={{
            overflow: 'hidden', position: 'relative',
            borderRight: i === 0 ? `1px solid ${PINK}22` : 'none',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 20, zIndex: 1,
              fontFamily: FF, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: i === 0 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)',
            }}>{s.label}</div>
            <img src={s.src} alt={s.alt} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* ── Copy + tags ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40,
        background: '#0a0a0a',
        borderTop: `1px solid ${PINK}22`,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: PINK }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>
            PGDC leaves the dark palette entirely. No chrome, no gold, no heavy graphic
            compositions — just a dusty pink field scattered with lip prints and "Pretty girls
            dont cry!" written large in loose hand-lettered script. The typography doesn't
            try to be precise: it's expressive, fast, personal — like the thought was written
            down the moment it landed. On white, the kiss marks read soft and warm in mauve;
            on black they deepen to crimson. Same defiance, different edge. ZIYA!'s most
            playful piece, and the one that proves the brand has more range than any one drop
            could show.
          </p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: PINK }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: FF, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: `${PINK}cc`,
                padding: '6px 12px',
                border: `1px solid ${PINK}33`,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ZIYA! BLTN — Better Late Than Never Collection ─────────────────────── */
function BLTNFeatured() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const tags = ['Streetwear', 'Two Colorways', 'Brand Identity', 'ZIYA!', 'Apparel Design', 'Editorial']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.06 }}
      style={{ marginBottom: 72, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
    >
      {/* ── Header ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12 }}>
            06 / Fashion Design — Apparel
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1,
            }}>
              ZIYA!
            </span>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              BLTN Collection
            </span>
          </div>
          <div style={{ ...tx.body, fontSize: 12, marginTop: 8 }}>
            Better Late Than Never — Two colorways, one mark
          </div>
        </div>

        {/* Colorway — both shown */}
        <div style={{ ...tx.micro, fontSize: 9, textAlign: 'right' }}>
          <div style={{ marginBottom: 8 }}>Colorways</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 16, background: '#ffffff', border: '1px solid rgba(255,255,255,0.12)' }} />
              <span style={{ ...tx.micro, fontSize: 7 }}>White</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 16, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.18)' }} />
              <span style={{ ...tx.micro, fontSize: 7 }}>Black</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Both colorways side by side — full bleed, no padding ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 16, left: 20, zIndex: 1,
            fontFamily: FF, fontSize: 8, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>White</div>
          <img
            src={bltnWhite}
            alt="BLTN tee — white colorway, better late than never chest mark"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 16, left: 20, zIndex: 1,
            fontFamily: FF, fontSize: 8, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>Black</div>
          <img
            src={bltnBlack}
            alt="BLTN tee — black colorway, better late than never chest mark"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* ── Copy + tags ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40,
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>
            BLTN strips everything back. No full-back graphic, no aggressive type, no layered
            composition. Just a crescent moon and three words — "better / late than / never." —
            stacked in clean lowercase beside it. The moon mark is quietly conceptual: timing,
            patience, cycles. The serif typeface is a deliberate break from SOLT and UC —
            less streetwear, more editorial. Available in both black and white, BLTN is
            ZIYA!'s most wearable piece. It doesn't announce itself. It waits to be read.
          </p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: FF, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                padding: '6px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ZIYA! UC — Undercover Collection ───────────────────────────────────── */
function UCFeatured() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()

  const GOLD = '#c4a55a'

  const tags = ['Streetwear', 'Graphic Tee', 'Brand Identity', 'ZIYA!', 'Apparel Design', 'Anonymity']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: E, delay: 0.06 }}
      style={{ marginBottom: 72, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
    >
      {/* ── Collection header ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        background: '#080808',
        borderBottom: `1px solid ${GOLD}22`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: GOLD }}>
            05 / Fashion Design — Apparel
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1,
            }}>
              ZIYA!
            </span>
            <span style={{
              fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              UC Collection
            </span>
          </div>
          <div style={{ ...tx.body, fontSize: 12, marginTop: 8 }}>
            Undercover — Royalty without recognition
          </div>
        </div>

        {/* Colorway */}
        <div style={{ ...tx.micro, fontSize: 9, textAlign: 'right' }}>
          <div style={{ marginBottom: 8 }}>Colorway</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            {[
              { bg: '#0a0a0a', border: 'rgba(255,255,255,0.18)' },
              { bg: '#ffffff', border: 'rgba(255,255,255,0.06)' },
              { bg: GOLD,      border: 'none' },
            ].map((c, i) => (
              <div key={i} style={{
                width: 16, height: 16,
                background: c.bg,
                border: `1px solid ${c.border}`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Shirt mockups ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderBottom: `1px solid ${GOLD}22`,
      }}>
        {[
          { src: ucFront, alt: 'UC tee — front, UC. chest mark', label: 'Front' },
          { src: ucBack,  alt: 'UC tee — back, masked figure with crown and halo', label: 'Back' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: '#f0ede8',
              borderRight: i === 0 ? `1px solid ${GOLD}22` : 'none',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', top: 16, left: 20,
              fontFamily: FF, fontSize: 8, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
            }}>{s.label}</div>
            <img src={s.src} alt={s.alt} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        ))}
      </div>

      {/* ── Artwork isolates — asymmetric: logo left, back graphic right ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
        background: '#050505',
        borderBottom: `1px solid ${GOLD}22`,
      }}>
        {/* UC. logo mark */}
        <div style={{
          borderRight: `1px solid ${GOLD}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 32px',
        }}>
          <img
            src={ucLogo}
            alt="UC. logotype — bold oblique white letterform"
            style={{ width: '80%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        {/* Back design */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px 0',
        }}>
          <img
            src={ucDesignBack}
            alt="UC back artwork — masked crowned figure with gold star and UNDERCOVER. type"
            style={{ width: '68%', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Copy + tags ── */}
      <div style={{
        padding: isMobile ? '24px 20px' : '32px 40px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40,
        background: '#080808',
      }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: GOLD }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 13, margin: 0 }}>
            UC shifts the palette and the energy entirely. Where SOLT came in hot with red and
            aggression, Undercover moves in gold and shadow. The front carries just two letters
            — "UC." — slanted and speed-cut in white: maximum recognition, minimum noise.
            The back tells a deeper story: a hooded, masked figure with identity erased, crowned
            with a raw hand-drawn mark and a halo resting beneath it — holy but anonymous.
            A distressed gold star bleeds across the background. Chain details surface at the
            chest. White claw marks drag below "UNDERCOVER." in warm gold type.
            Royalty that doesn't need to be recognised. Power that moves quietly.
          </p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: GOLD }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: FF, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: `${GOLD}cc`,
                padding: '6px 12px',
                border: `1px solid ${GOLD}33`,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 3 — DESIGNS
═══════════════════════════════════════════════════════════════════════════════ */
function DesignsPage() {
  const isMobile = useMobile()

  return (
    <Page>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: 64,
          }}
        >
          <div>
            <div style={{ ...tx.label, marginBottom: 16 }}>03 / Designs</div>
            <h1 style={{ ...tx.hero, fontSize: 'clamp(44px,7vw,96px)', margin: 0 }}>
              Selected<br />Projects
            </h1>
          </div>
          <div style={{ ...tx.micro, fontSize: 9, paddingBottom: 8 }}>8 Works</div>
        </motion.div>

        {/* ALON — featured project */}
        <AlonFeatured />

        {/* JTD Logistics — featured project */}
        <JTDFeatured />

        {/* ZIYA! SOLT Collection */}
        <SOLTFeatured />

        {/* ZIYA! UC — Undercover Collection */}
        <UCFeatured />

        {/* ZIYA! BLTN — Better Late Than Never */}
        <BLTNFeatured />

        {/* ZIYA! PGDC — Pretty Girls Don't Cry */}
        <PGDCFeatured />

        {/* ZIYA! KLM LNG — Kalma Lang */}
        <KLMLNGFeatured />

        {/* More coming footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 48, paddingBottom: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <span style={{ ...tx.micro, fontSize: 9 }}>More projects in progress</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.18, 0.54, 0.18] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.4, ease: 'easeInOut' }}
                style={{ width: 3, height: 3, borderRadius: '50%', background: '#ff2d2d' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Page>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 4 — EXPERIENCE & EDUCATION
═══════════════════════════════════════════════════════════════════════════════ */
function ExperiencePage() {
  const isMobile = useMobile()
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineIn  = useInView(timelineRef, { once: true, margin: '-60px' })

  const experiences = [
    {
      period: 'Feb 2026 — Present',
      role: 'Social Media Manager',
      company: 'DEIZ Charters',
      location: 'Puerto Princesa, PH',
      desc: 'Manage social media content for a three-apartment rental business. Create promotional posts and respond to inquiries regarding availability, pricing, and accommodations. Communicate with potential customers throughout the inquiry and booking process.',
    },
    {
      period: 'May 2026',
      role: 'Web Developer & UI/UX Designer',
      company: 'ALON — Social Music Platform',
      location: 'Academic Project',
      desc: 'Assisted in developing a social music platform using Python, Django, JavaScript, HTML, CSS, and SQLite. Implemented user authentication, playlists, community posts, and music discovery. Designed the UI/UX and vinyl-inspired visual identity.',
    },
    {
      period: '2025',
      role: 'Brand Designer & Social Media Manager',
      company: 'JTD Logistics',
      location: 'Puerto Princesa, PH',
      desc: 'Designed the company logo, wordmark, and full visual identity. Created and managed the Facebook page, publishing content showcasing completed orders and services. Responded to customer inquiries and communicated with potential clients.',
    },
  ]

  const education = [
    {
      period: 'Jan 2023 — Jul 2027',
      degree: 'BS Information Technology',
      school: 'Palawan State University',
      location: 'Puerto Princesa, PH',
    },
  ]

  const coursework = [
    'Graphics and Visual Computing',
    'Introduction to Human-Computer Interaction',
    'Web Systems and Technologies 1',
    'Multimedia Systems',
    'Information Management 1',
    'Application Development & Emerging Technologies 1',
  ]

  const skills: [string, number][] = [
    ['Graphic Design',            88],
    ['Social Media Management',   85],
    ['HTML / CSS / JavaScript',   82],
    ['Python / Django',           74],
    ['Web Development',           76],
    ['Digital Content Creation',  84],
  ]

  return (
    <Page>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ ...tx.label, marginBottom: 16 }}>04 / Experience & Education</div>
          <h1 style={{ ...tx.hero, fontSize: 'clamp(44px,7vw,96px)', margin: 0 }}>
            Experience<br /><span style={{ color: '#ff2d2d' }}>& Education</span>
          </h1>
        </motion.div>

        {/* Two columns */}
        <motion.div
          ref={timelineRef}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 72 }}
        >
          {/* Experience */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate={timelineIn ? 'show' : 'hidden'}
          >
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 28 }}>
              Work Experience
            </motion.div>

            {experiences.map((e, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  show: {
                    opacity: 1, x: 0,
                    transition: { duration: 0.5, ease: E, delay: i * 0.09 },
                  },
                }}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 24, paddingBottom: 24,
                  display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '130px 1fr', gap: 20,
                }}
              >
                <div style={{ ...tx.micro, fontSize: 9, lineHeight: 1.5 }}>{e.period}</div>
                <div>
                  <div style={{
                    fontFamily: FF, fontSize: 16, fontWeight: 600,
                    color: '#ffffff', letterSpacing: '-0.01em', marginBottom: 4,
                  }}>{e.role}</div>
                  <div style={{ ...tx.label, fontSize: 9, marginBottom: 2 }}>
                    {e.company} — {e.location}
                  </div>
                  <div style={{ ...tx.body, fontSize: 13, marginTop: 10 }}>{e.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education + Skills */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate={timelineIn ? 'show' : 'hidden'}
          >
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 28 }}>
              Education
            </motion.div>

            {education.map((e, i) => (
              <motion.div
                key={i}
                variants={ITEM_UP}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 24, paddingBottom: 24,
                  display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '130px 1fr', gap: 20,
                }}
              >
                <div style={{ ...tx.micro, fontSize: 9 }}>{e.period}</div>
                <div>
                  <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>
                    {e.degree}
                  </div>
                  <div style={{ ...tx.label, fontSize: 9 }}>{e.school}</div>
                  <div style={{ ...tx.micro, fontSize: 9, marginTop: 2 }}>{e.location}</div>
                </div>
              </motion.div>
            ))}

            {/* Relevant Coursework */}
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 16, marginTop: 36 }}>
              Relevant Coursework
            </motion.div>
            <motion.div
              variants={ITEM_UP}
              style={{
                display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 40,
                borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20,
              }}
            >
              {coursework.map(c => (
                <span
                  key={c}
                  style={{
                    fontFamily: FF, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.48)',
                    padding: '5px 10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {c}
                </span>
              ))}
            </motion.div>

            {/* Competencies */}
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 24 }}>
              Competencies
            </motion.div>

            {skills.map(([skill, level], i) => (
              <motion.div key={i} variants={ITEM_UP} style={{ marginBottom: 18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 7 }}>
                  <span style={{ fontFamily:FF, fontSize:12, color:'rgba(255,255,255,0.68)', letterSpacing:'0.04em' }}>
                    {skill}
                  </span>
                  <span style={{ ...tx.micro, fontSize: 9 }}>{level}%</span>
                </div>
                {/* Track */}
                <div style={{ height:1, background:'rgba(255,255,255,0.07)', position:'relative' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={timelineIn ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.1, ease: E, delay: 0.5 + i * 0.1 }}
                    style={{ height: 1, background: '#ff2d2d', position:'absolute', top:0, left:0 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Page>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE 5 — CONTACT
═══════════════════════════════════════════════════════════════════════════════ */
function ContactPage() {
  const isMobile = useMobile()
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const formIn  = useInView(formRef, { once: true, margin: '-60px' })

  const socials = [
    { label: 'Email',    handle: 'mgadielzya@gmail.com',   href: 'mailto:mgadielzya@gmail.com' },
    { label: 'Phone',    handle: '+63 919 704 0927',        href: 'tel:+639197040927' },
    { label: 'GitHub',   handle: 'github.com/gadielzya',   href: '#' },
    { label: 'LinkedIn', handle: 'linkedin.com/in/gadielzya', href: '#' },
  ]

  const inputStyle = (name: string): React.CSSProperties => ({
    fontFamily: FF, fontSize: 14, fontWeight: 400,
    letterSpacing: '0.01em', color: '#ffffff',
    background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused === name ? '#ff2d2d' : 'rgba(255,255,255,0.14)'}`,
    padding: '15px 0', width: '100%', display: 'block',
    transition: 'border-color 0.28s ease',
  })

  const labelStyle = (name: string): React.CSSProperties => ({
    ...tx.micro, fontSize: 9, display: 'block', marginBottom: 0,
    color: focused === name ? '#ff2d2d' : 'rgba(255,255,255,0.26)',
    transition: 'color 0.28s ease',
  })

  return (
    <Page>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        {/* Section stamp */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ ...tx.label, marginBottom: 80 }}
        >
          05 / Contact Me
        </motion.div>

        {/* Oversized email */}
        <motion.a
          href="mailto:mgadielzya@gmail.com"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: E }}
          whileHover={{ color: '#ff2d2d', x: 6 }}
          style={{
            ...tx.hero, fontSize: 'clamp(26px,4.8vw,68px)',
            display: 'block', color: '#ffffff',
            transition: 'color 0.28s ease', marginBottom: 16,
          }}
        >
          mgadielzya@gmail.com
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ ...tx.body, fontSize: 13, marginBottom: 100 }}
        >
          Available for freelance projects, internships & full-time positions.
        </motion.p>

        {/* Bottom grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80,
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: isMobile ? 48 : 72,
        }}>
          {/* Form */}
          <motion.div
            ref={formRef}
            variants={STAGGER}
            initial="hidden"
            animate={formIn ? 'show' : 'hidden'}
          >
            <motion.div variants={ITEM_UP} style={{ ...tx.micro, marginBottom: 36 }}>
              Send a Message
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  padding: '48px 40px', border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}
              >
                <div style={{ ...tx.label, fontSize: 20, marginBottom: 12 }}>✓</div>
                <div style={{ ...tx.body }}>Message received. I'll be in touch soon.</div>
              </motion.div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                {[
                  { name: 'name',  label: 'Full Name',     type: 'text'  },
                  { name: 'email', label: 'Email Address', type: 'email' },
                ].map(f => (
                  <motion.div key={f.name} variants={ITEM_UP}>
                    <label style={labelStyle(f.name)}>{f.label}</label>
                    <input
                      type={f.type} required
                      onFocus={() => setFocused(f.name)}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(f.name)}
                    />
                  </motion.div>
                ))}

                <motion.div variants={ITEM_UP} style={{ marginTop: 20 }}>
                  <label style={labelStyle('message')}>Message</label>
                  <textarea
                    required rows={5}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('message')}
                  />
                </motion.div>

                <motion.div variants={ITEM_UP} style={{ marginTop: 28 }}>
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: '#ff2d2d',
                      boxShadow: '0 0 0 1px #ff2d2d, 0 0 28px rgba(255,45,45,0.22)',
                    }}
                    whileTap={{ scale: 0.94, transition: { duration: 0.07 } }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{
                      ...tx.nav, fontSize: 10,
                      color: '#ffffff', padding: '19px 0',
                      width: '100%', border: '1px solid rgba(255,255,255,0.2)',
                      background: 'transparent', cursor: 'pointer',
                    }}
                  >
                    Send Message
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Socials + info */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate={formIn ? 'show' : 'hidden'}
          >
            <motion.div variants={ITEM_UP} style={{ ...tx.micro, marginBottom: 36 }}>
              Find Me Online
            </motion.div>

            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                variants={ITEM_UP}
                whileHover={{ x: 6, color: '#ff2d2d' }}
                style={{
                  fontFamily: FF, fontSize: 15, fontWeight: 500,
                  color: 'rgba(255,255,255,0.54)', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'color 0.22s ease',
                }}
              >
                <span>{s.label}</span>
                <span style={{ ...tx.micro, fontSize: 9 }}>{s.handle} →</span>
              </motion.a>
            ))}

            {/* Location card */}
            <motion.div
              variants={ITEM_UP}
              style={{
                marginTop: 36, padding: '28px 32px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#0d0d0d',
              }}
            >
              <div style={{ ...tx.micro, fontSize: 9, marginBottom: 12 }}>Based In</div>
              <div style={{
                fontFamily: FF, fontSize: 22, fontWeight: 700,
                color: '#ffffff', letterSpacing: '-0.02em',
              }}>
                Puerto Princesa, Palawan
              </div>
              <div style={{ ...tx.micro, fontSize: 9, marginTop: 8 }}>GMT+8 / PST — Philippines</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Page>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════════════════ */
function AppShell() {
  const location = useLocation()

  return (
    <>
      <GlobalStyles />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<LandingPage />}    />
          <Route path="/about"      element={<AboutPage />}      />
          <Route path="/designs"    element={<DesignsPage />}    />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact"    element={<ContactPage />}    />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
