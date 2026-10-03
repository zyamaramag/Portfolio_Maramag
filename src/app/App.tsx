import { motion, AnimatePresence, useInView, type Variants } from 'motion/react'
import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from 'react'
import { Sun, Moon, X } from 'lucide-react'
import alonBg          from '../imports/ALON_BACKGROUND.png'
import alonIcon        from '../imports/ALON_app_icon.png'
import alonPost        from '../imports/ALON.png'
import portrait        from '../imports/3cad1233-a651-419e-9f6b-f426bcfcea03.jpg'
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
import jtdHero         from '../imports/JTD_Business_Card.png'
import jtdCube         from '../imports/Logo.png'
import jtdMono         from '../imports/Word_Logo.png'
import jtdWordmark     from '../imports/Text.png'

/* ─── Theme ──────────────────────────────────────────────────────────────── */
const darkT = {
  bg: '#080808', bgCard: '#0d0d0d', bgAlt: '#0a0a0a',
  fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.68)', fgDim: 'rgba(255,255,255,0.30)',
  border: 'rgba(255,255,255,0.06)', borderMid: 'rgba(255,255,255,0.12)',
  navBg: 'rgba(8,8,8,0.94)', accent: '#ff2d2d',
  inputBorder: 'rgba(255,255,255,0.14)', placeholderColor: 'rgba(255,255,255,0.20)',
  isDark: true,
}
const lightT = {
  bg: '#f0efe9', bgCard: '#e5e4de', bgAlt: '#eae9e3',
  fg: '#0a0a0a', fgMuted: 'rgba(0,0,0,0.65)', fgDim: 'rgba(0,0,0,0.40)',
  border: 'rgba(0,0,0,0.08)', borderMid: 'rgba(0,0,0,0.14)',
  navBg: 'rgba(240,239,233,0.94)', accent: '#ff2d2d',
  inputBorder: 'rgba(0,0,0,0.18)', placeholderColor: 'rgba(0,0,0,0.28)',
  isDark: false,
}
type TK = typeof darkT

interface ThemeCtxType { tk: TK; isDark: boolean; toggle: () => void }
const ThemeCtx = createContext<ThemeCtxType>({ tk: darkT, isDark: true, toggle: () => {} })
const useTheme = () => useContext(ThemeCtx)

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
const LightboxCtx = createContext<(src: string, alt?: string) => void>(() => {})
const useLightbox = () => useContext(LightboxCtx)

function LightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null)
  const openLb = (src: string, alt = '') => setOpen({ src, alt })
  const closeLb = () => setOpen(null)
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLb() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])
  return (
    <LightboxCtx.Provider value={openLb}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLb}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.93)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out', padding: '32px',
            }}
          >
            <button
              onClick={closeLb}
              style={{
                position: 'absolute', top: 24, right: 24,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', cursor: 'pointer',
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 0,
              }}
            ><X size={18} /></button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              src={open.src} alt={open.alt}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', cursor: 'default', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
            />
            <div style={{
              position: 'absolute', bottom: 24,
              fontFamily: FF, fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            }}>
              Click anywhere or press ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxCtx.Provider>
  )
}

/* ─── Clickable image ────────────────────────────────────────────────────── */
function LbImg({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const openLb = useLightbox()
  return (
    <img
      src={src} alt={alt}
      onClick={() => openLb(src, alt)}
      title="Click to view full image"
      style={{ cursor: 'zoom-in', ...style }}
    />
  )
}

/* ─── Typography factory ─────────────────────────────────────────────────── */
const FF = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif"

function makeTx(tk: TK) {
  return {
    label: { fontFamily: FF, fontSize: 10, fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase' as const, color: tk.accent },
    micro: { fontFamily: FF, fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: tk.fgDim },
    hero:  { fontFamily: FF, fontWeight: 900, letterSpacing: '-0.042em', lineHeight: 0.87, color: tk.fg },
    body:  { fontFamily: FF, fontSize: 15, fontWeight: 400, lineHeight: 1.82, letterSpacing: '0.01em', color: tk.fgMuted },
    nav:   { fontFamily: FF, fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' as const },
  }
}

/* ─── Motion constants ───────────────────────────────────────────────────── */
const E = [0.22, 1, 0.36, 1] as [number, number, number, number]
const STAGGER: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }
const ITEM_UP: Variants = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.56, ease: E } } }
const ITEM_LEFT: Variants = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.52, ease: E } } }

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 68, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed(''); setDone(false)
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++; setDisplayed(text.slice(0, i))
        if (i >= text.length) { setDone(true); clearInterval(interval) }
      }, speed)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [text, speed, startDelay])
  return { displayed, done }
}

function useMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

/* ─── Scroll utility ─────────────────────────────────────────────────────── */
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

/* ─── Global styles ──────────────────────────────────────────────────────── */
function GlobalStyles({ tk }: { tk: TK }) {
  return (
    <style>{`
      @keyframes blink { 0%,48%{opacity:1} 50%,100%{opacity:0} }
      @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      .ticker-track { animation: ticker 28s linear infinite; }
      .ticker-track:hover { animation-play-state: paused; }
      html { scroll-behavior: smooth; }
      input::placeholder, textarea::placeholder {
        color: ${tk.placeholderColor};
        font-family: ${FF};
      }
      textarea { resize: none; }
      a { text-decoration: none; color: inherit; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,45,45,0.25); }
    `}</style>
  )
}

/* ─── Contour background ─────────────────────────────────────────────────── */
function ContourBackground() {
  const { tk } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number, t = 0
    const resize = () => {
      const p = canvas.parentElement
      canvas.width  = p ? p.clientWidth  : window.innerWidth
      canvas.height = p ? p.clientHeight : window.innerHeight
    }
    const timer = setTimeout(resize, 0)
    window.addEventListener('resize', resize)
    const isLight = !tk.isDark
    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < 22; i++) {
        const yBase = (H / 21) * i
        ctx.beginPath()
        for (let x = 0; x <= W + 4; x += 3) {
          const nx = x / W
          const y = yBase
            + Math.sin(nx * 2.8 + t * 0.6 + i * 0.38) * 28
            + Math.sin(nx * 6.1 - t * 0.4 + i * 0.22) * 12
            + Math.sin(nx * 11.3 + t * 0.25 + i * 0.55) * 5
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        const isAccent = i % 4 === 2
        const base = isAccent ? 0.07 + Math.sin(i * 0.9 + t * 0.18) * 0.02 : 0.05 + Math.sin(i * 0.6 + t * 0.12) * 0.015
        const opacity = isLight ? base * 0.5 : base
        ctx.strokeStyle = isAccent
          ? `rgba(255,45,45,${opacity})`
          : isLight ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`
        ctx.lineWidth = isAccent ? 1 : 0.7
        ctx.stroke()
      }
      t += 0.006
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { clearTimeout(timer); cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [tk])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'block', zIndex: 0 }} />
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { id: 'landing',    label: 'Index'      },
  { id: 'about',      label: 'About'      },
  { id: 'designs',    label: 'Designs'    },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
]

function Nav() {
  const { tk, isDark, toggle } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('landing')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.25, rootMargin: '-64px 0px -40% 0px' }
    )
    NAV_LINKS.forEach(l => { const el = document.getElementById(l.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => { scrollTo(id); setMenuOpen(false) }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 48px',
        background: tk.navBg, backdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${tk.border}`, transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <button onClick={() => go('landing')} style={{ ...tx.nav, fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', color: tk.fg, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          G.Z Maramag
        </button>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.fgDim, display: 'flex', padding: 4 }}>
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5 }} aria-label="Menu">
              <motion.div animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} style={{ width: 20, height: 1, background: tk.fg }} />
              <motion.div animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} style={{ width: 20, height: 1, background: tk.fg }} />
              <motion.div animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} style={{ width: 20, height: 1, background: tk.fg }} />
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 36 }}>
              {NAV_LINKS.map(l => (
                <button key={l.id} onClick={() => go(l.id)} style={{ ...tx.nav, cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: active === l.id ? tk.accent : tk.fgDim, transition: 'color 0.18s' }}>
                  {l.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.fgDim, display: 'flex', padding: 4, transition: 'color 0.2s' }}>
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e88' }} />
                <span style={{ ...tx.micro, fontSize: 9 }}>Available</span>
              </div>
            </div>
          </>
        )}
      </nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: E }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 499,
              background: isDark ? 'rgba(8,8,8,0.97)' : 'rgba(240,239,233,0.97)',
              backdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', padding: '48px 20px',
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                onClick={() => go(l.id)}
                style={{
                  fontFamily: FF, fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em',
                  color: active === l.id ? tk.accent : tk.fg,
                  padding: '16px 0', borderBottom: `1px solid ${tk.border}`, cursor: 'pointer',
                }}
              >{l.label}</motion.div>
            ))}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e88' }} />
                <span style={{ ...tx.micro, fontSize: 9 }}>Available for work</span>
              </div>
              <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tk.fgDim, display: 'flex' }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   LANDING SECTION
════════════════════════════════════════════════════════════════════════════ */
function LandingSection() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()
  const { displayed: w1, done: d1 } = useTypewriter('DESIGN', 68, 600)
  const { displayed: w2, done: d2 } = useTypewriter('BEYOND', 68, d1 ? 80 : 999999)
  const { displayed: w3 }           = useTypewriter('LIMITS.', 68, d2 ? 80 : 999999)

  const previews = [
    { src: alonBg,    alt: 'ALON Platform'    },
    { src: jtdHero,   alt: 'JTD Logistics'   },
    { src: soltFront, alt: 'SOLT Collection' },
    { src: klmBack,   alt: 'KLM LNG'         },
  ]

  return (
    <section id="landing" style={{
      minHeight: '100vh', paddingTop: 64,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      borderBottom: `1px solid ${tk.border}`,
      background: tk.bg, transition: 'background 0.3s ease',
    }}>
      <ContourBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        padding: isMobile ? '48px 20px 60px' : '48px 48px 80px',
        gap: isMobile ? 48 : 48,
        minHeight: 'calc(100vh - 64px)',
      }}>

        {/* Left — hero */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ ...tx.label, marginBottom: 44 }}
          >
            Portfolio 2026 — Information Technology
          </motion.div>

          <div style={{ ...tx.hero, fontSize: 'clamp(58px,10vw,164px)', marginBottom: 52 }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '100%' }} animate={{ y: w1.length > 0 ? '0%' : '100%' }} transition={{ duration: 0.01 }} style={{ display: 'inline-block' }}>
                {w1}
                {!d1 && <span style={{ color: tk.accent, animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>}
              </motion.div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'inline-block' }}>
                {d1 ? w2 : ' '}
                {d1 && !d2 && <span style={{ color: tk.accent, animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'inline-block', color: d2 ? tk.accent : tk.fg }}>
                {d2 ? w3 : ' '}
                {d2 && w3.length < 7 && <span style={{ animation: 'blink 0.85s step-start infinite', fontWeight: 300 }}>│</span>}
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.55, ease: E }}
            style={{ ...tx.body, fontSize: 17, maxWidth: 420, marginBottom: 44 }}
          >
            IT Student & Creative<br />Graphic design, web development, and digital content creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.95, duration: 0.55, ease: E }}
            style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            {[{ label: 'About Me', id: 'about' }, { label: 'Designs', id: 'designs' }, { label: 'Contact', id: 'contact' }].map(btn => (
              <motion.button
                key={btn.id}
                onClick={() => scrollTo(btn.id)}
                whileHover={{ scale: 1.035, backgroundColor: tk.accent, boxShadow: `0 0 0 1px ${tk.accent}, 0 0 28px rgba(255,45,45,0.22)` }}
                whileTap={{ scale: 0.93, transition: { duration: 0.07 } }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ ...tx.nav, fontSize: 10, color: tk.fg, padding: '19px 44px', border: `1px solid ${tk.borderMid}`, background: 'transparent', cursor: 'pointer' }}
              >
                {btn.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Right — stats + preview grid (desktop only) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.9, ease: E }}
            style={{ width: '36%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: `1px solid ${tk.border}` }}>
              {[{ num: '7+', label: 'Designs' }, { num: '2', label: 'Clients' }, { num: '4+', label: 'Years' }].map((s, i) => (
                <div key={i} style={{ padding: '20px 16px', borderRight: i < 2 ? `1px solid ${tk.border}` : 'none' }}>
                  <div style={{ fontFamily: FF, fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', color: tk.fg, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ ...tx.micro, fontSize: 8, marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* 2x2 image grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {previews.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => scrollTo('designs')}
                  style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${tk.border}` }}
                >
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.div>
              ))}
            </div>
            <div style={{ ...tx.micro, fontSize: 8, textAlign: 'right', color: tk.fgDim }}>
              ↑ Click images to view designs
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 0.5 }}
        style={{ position: 'absolute', bottom: 36, left: isMobile ? 20 : 48, ...tx.micro, fontSize: 9, zIndex: 1 }}
      >
        01 / 05
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
════════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()
  const rightRef = useRef<HTMLDivElement>(null)
  const rightIn  = useInView(rightRef, { once: true, margin: '-60px' })

  const tools = ['Python','Django','JavaScript','HTML / CSS','Bootstrap','SQLite','Canva','Affinity','Microsoft Apps','Google Apps','Git / GitHub','VS Code','AI Workflows']

  const textBlocks = [
    { label: 'Biography', highlight: false, text: "I'm Gadiel Zya Maramag — a 4th-year Bachelor of Science in Information Technology student at Palawan State University with hands-on experience in graphic design, digital content creation, social media management, and web development." },
    { label: 'Focus', highlight: true, text: 'I work at the intersection of design and technology: building functional web systems, crafting minimalist visual identities, and producing content that communicates clearly and looks considered.' },
    { label: 'Approach', highlight: true, text: 'Seeking opportunities to apply technical and creative skills in a professional environment — every project is a chance to solve a real problem, learn something new, and produce work that earns its place.' },
  ]

  return (
    <section id="about" style={{ background: tk.bg, borderBottom: `1px solid ${tk.border}`, transition: 'background 0.3s ease' }}>
      {/* Ticker — at top */}
      <div style={{ borderBottom: `1px solid ${tk.border}`, paddingTop: 20, paddingBottom: 20, overflow: 'hidden' }}>
        <div style={{ paddingLeft: isMobile ? 20 : 48, marginBottom: 14 }}>
          <span style={tx.micro}>Tools & Technologies</span>
        </div>
        <div style={{ overflow: 'hidden', cursor: 'default' }}>
          <div className="ticker-track" style={{ display: 'flex', gap: 56, width: 'max-content', alignItems: 'center' }}>
            {[...tools, ...tools].map((tool, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 56, flexShrink: 0 }}>
                <span style={{ fontFamily: FF, fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: tk.fgDim, whiteSpace: 'nowrap' }}>{tool}</span>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: tk.accent, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 80px' }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ ...tx.label, marginBottom: 64 }}
        >
          02 / About Me
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          {/* Portrait */}
          <motion.div initial={{ opacity: 0, x: -44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, ease: E, delay: 0.18 }}>
            <div style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
              <img src={portrait} alt="Gadiel Zya Maramag" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', filter: 'grayscale(18%) contrast(1.06)' }} />
            </div>
            <div style={{ marginTop: 20, borderTop: `1px solid ${tk.border}`, paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...tx.micro, fontSize: 9 }}>Gadiel Zya Maramag</span>
              <span style={{ ...tx.micro, fontSize: 9 }}>Puerto Princesa, PH</span>
            </div>
          </motion.div>

          {/* Text blocks */}
          <motion.div ref={rightRef} variants={STAGGER} initial="hidden" animate={rightIn ? 'show' : 'hidden'}>
            <motion.h1 variants={ITEM_UP} style={{ ...tx.hero, fontSize: 'clamp(36px,4.5vw,64px)', marginBottom: 48 }}>
              IT Student<br /><span style={{ color: tk.accent }}>& Creative Designer</span>
            </motion.h1>

            {textBlocks.map((b, i) => (
              <motion.div
                key={i}
                variants={ITEM_UP}
                style={{
                  borderTop: `1px solid ${tk.border}`,
                  paddingTop: 24, paddingBottom: 24,
                  ...(b.highlight ? {
                    borderLeft: `3px solid ${tk.accent}`,
                    paddingLeft: 20,
                    marginLeft: -20,
                    background: tk.isDark ? 'rgba(255,45,45,0.04)' : 'rgba(255,45,45,0.04)',
                  } : {}),
                }}
              >
                <div style={{ ...tx.label, fontSize: 9, marginBottom: 14 }}>{b.label}</div>
                <p style={{ ...tx.body, margin: 0 }}>{b.text}</p>
              </motion.div>
            ))}

            <motion.div variants={ITEM_UP} style={{ borderTop: `1px solid ${tk.border}`, paddingTop: 28, paddingBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 12px #22c55e88', flexShrink: 0 }} />
              <span style={{ ...tx.body, fontSize: 14 }}>Available for freelance & internships — mgadielzya@gmail.com</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   FEATURED PROJECT COMPONENTS
════════════════════════════════════════════════════════════════════════════ */
function AlonFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const stack = ['Python','Django','SQLite','JavaScript','HTML','CSS','Bootstrap','Django-allauth']
  const bullets = [
    'Developed a social music platform allowing users to upload music, create playlists, and interact through a community feed.',
    'Implemented user authentication, personal music libraries, community posts, and music discovery via an external music API.',
    'Designed the platform UI/UX and visual identity — a responsive, vinyl-inspired interface centred on music culture.',
  ]
  return (
    <motion.div id="proj-alon" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E }} style={{ marginBottom: 72, border: `1px solid ${tk.border}`, overflow: 'hidden' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(220px, 38vw, 480px)' }}>
        <LbImg src={alonBg} alt="ALON hero background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,8,8,.12),rgba(8,8,8,.6))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 24, left: 28, ...tx.label, fontSize: 9 }}>Featured — Web Platform</div>
        <div style={{ position: 'absolute', bottom: 24, right: 28, ...tx.micro, fontSize: 9 }}>01 / Academic Project</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderTop: `1px solid ${tk.border}` }}>
        <div style={{ padding: isMobile ? '28px 20px' : '36px 40px', borderRight: isMobile ? 'none' : `1px solid ${tk.border}`, borderBottom: isMobile ? `1px solid ${tk.border}` : 'none', display: 'flex', flexDirection: 'column', gap: 28, background: tk.bgAlt }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <LbImg src={alonIcon} alt="ALON icon" style={{ width: 64, height: 64, objectFit: 'cover', border: `1px solid ${tk.borderMid}`, flexShrink: 0 }} />
            <div>
              <div style={{ ...tx.label, fontSize: 9, marginBottom: 6 }}>2024 — Python / Django / JavaScript</div>
              <div style={{ fontFamily: FF, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, letterSpacing: '-0.03em', color: tk.fg, lineHeight: 1 }}>ALON</div>
              <div style={{ ...tx.body, fontSize: 13, marginTop: 4 }}>Social Music Platform</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: tk.accent, marginTop: 7, flexShrink: 0 }} />
                <p style={{ ...tx.body, fontSize: 14, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ ...tx.micro, fontSize: 9, marginBottom: 14 }}>Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {stack.map(s => <span key={s} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: tk.fgMuted, padding: '6px 12px', border: `1px solid ${tk.borderMid}` }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden', maxHeight: isMobile ? 300 : 540, background: tk.bgCard }}>
          <LbImg src={alonPost} alt="ALON showcase" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        </div>
      </div>
    </motion.div>
  )
}

function JTDFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const deliverables = ['Logo Design','Brand Identity','Wordmark','Social Media','Facebook Management','Customer Engagement']
  const bullets = [
    "Conceived the visual identity from scratch — a geometric JTD lettermark and isometric cube mark that signal reliability and precision without a single wasted element.",
    "Established brand colour system: deep navy (#1a2a6e) for authority, steel-grey for balance — a palette legible across digital and print.",
    "Created and managed the company's Facebook presence, publishing order showcases and service content; acted as primary point of contact for customer inquiries.",
  ]
  return (
    <motion.div id="proj-jtd" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.08 }} style={{ marginBottom: 72, border: `1px solid ${tk.border}`, overflow: 'hidden' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(200px,32vw,400px)' }}>
        <LbImg src={jtdHero} alt="JTD hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,8,8,.05),rgba(8,8,8,.55))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 24, left: 28, ...tx.label, fontSize: 9 }}>Featured — Brand Identity</div>
        <div style={{ position: 'absolute', bottom: 24, right: 28, ...tx.micro, fontSize: 9 }}>02 / Freelance Project</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderTop: `1px solid ${tk.border}` }}>
        <div style={{ padding: isMobile ? '28px 20px' : '36px 40px', borderRight: isMobile ? 'none' : `1px solid ${tk.border}`, borderBottom: isMobile ? `1px solid ${tk.border}` : 'none', display: 'flex', flexDirection: 'column', gap: 28, background: tk.bgAlt }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <LbImg src={jtdCube} alt="JTD cube mark" style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div style={{ ...tx.label, fontSize: 9, marginBottom: 6 }}>2024 — Branding / Social Media</div>
              <div style={{ fontFamily: FF, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, letterSpacing: '-0.03em', color: tk.fg, lineHeight: 1 }}>JTD</div>
              <div style={{ ...tx.body, fontSize: 13, marginTop: 4 }}>Logistics — Brand Identity</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: tk.accent, marginTop: 7, flexShrink: 0 }} />
                <p style={{ ...tx.body, fontSize: 14, margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ ...tx.micro, fontSize: 9, marginBottom: 14 }}>Deliverables</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {deliverables.map(d => <span key={d} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: tk.fgMuted, padding: '6px 12px', border: `1px solid ${tk.borderMid}` }}>{d}</span>)}
            </div>
          </div>
        </div>
        {/* Brand sheet panel — always white */}
        <div style={{ background: '#f8f8f8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '32px 20px' : '40px 48px', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 20, left: 24, fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.22)' }}>Brand System</div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 24, borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 28 }}>
            <LbImg src={jtdMono} alt="JTD lettermark" style={{ width: 'clamp(100px,40%,180px)', objectFit: 'contain' }} />
          </div>
          <LbImg src={jtdWordmark} alt="JTD wordmark" style={{ width: 'clamp(140px,70%,280px)', objectFit: 'contain' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 36 }}>
            {[{ hex: '#1a2a6e', label: 'Navy' }, { hex: '#8a8a9a', label: 'Steel' }, { hex: '#ffffff', label: 'White', border: '1px solid rgba(0,0,0,0.12)' }].map(c => (
              <div key={c.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 32, height: 32, background: c.hex, border: (c as any).border ?? 'none' }} />
                <span style={{ fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SOLTFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const tags = ['Streetwear','Graphic Tee','Brand Identity','ZIYA!','Apparel Design','Typography']
  return (
    <motion.div id="proj-solt" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.06 }} style={{ marginBottom: 72, border: `1px solid ${tk.border}`, overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', background: tk.bgAlt, borderBottom: `1px solid ${tk.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12 }}>03 / Fashion Design — Apparel</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', color: tk.fg, lineHeight: 1 }}>ZIYA!</span>
            <span style={{ fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', color: tk.fgDim, lineHeight: 1 }}>SOLT Collection</span>
          </div>
          <div style={{ ...tx.body, fontSize: 13, marginTop: 8 }}>Swagged Out Like This — Debut streetwear drop</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['#0a0a0a','rgba(255,255,255,0.18)'],['#ffffff','rgba(0,0,0,0.1)'],['#ff2d2d','none']].map(([bg, border], i) => (
            <div key={i} style={{ width: 16, height: 16, background: bg, border: `1px solid ${border}` }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderBottom: `1px solid ${tk.border}` }}>
        {[{ src: soltFront, label: 'Front' }, { src: soltBack, label: 'Back' }].map((s, i) => (
          <div key={i} style={{ background: '#f4f4f4', borderRight: i === 0 ? `1px solid ${tk.border}` : 'none', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, left: 20, fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>{s.label}</div>
            <LbImg src={s.src} alt={`SOLT ${s.label}`} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: '#080808', borderBottom: `1px solid ${tk.border}` }}>
        {[{ src: soltDesignFront, alt: 'SOLT front artwork' }, { src: soltDesignBack, alt: 'SOLT back artwork' }].map((s, i) => (
          <div key={i} style={{ borderRight: i === 0 ? `1px solid ${tk.border}` : 'none', padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LbImg src={s.src} alt={s.alt} style={{ width: '72%', objectFit: 'contain', display: 'block' }} />
          </div>
        ))}
      </div>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, background: tk.bgAlt }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 14, margin: 0 }}>SOLT keeps the front restrained — a compact chest logo, "S.O.L.T." in bold italic white with a red star badge cutting through the "O". The back is where the drop makes its statement: a high-contrast halftone figure, hand raised palm-out, fractured red stars layered across the face. Two sides, two moods — quiet confidence up front, full attitude behind.</p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => <span key={t} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: tk.fgMuted, padding: '6px 12px', border: `1px solid ${tk.borderMid}` }}>{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function UCFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const GOLD = '#c4a55a'
  const tags = ['Streetwear','Graphic Tee','Brand Identity','ZIYA!','Apparel Design','Anonymity']
  return (
    <motion.div id="proj-uc" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.06 }} style={{ marginBottom: 72, border: `1px solid ${tk.border}`, overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', background: '#080808', borderBottom: `1px solid ${GOLD}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: GOLD }}>05 / Fashion Design — Apparel</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1 }}>ZIYA!</span>
            <span style={{ fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.28)', lineHeight: 1 }}>UC Collection</span>
          </div>
          <div style={{ ...tx.body, fontSize: 13, marginTop: 8, color: 'rgba(255,255,255,0.55)' }}>Undercover — Royalty without recognition</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['#0a0a0a','rgba(255,255,255,0.18)'],['#ffffff','rgba(255,255,255,0.06)'],[GOLD,'none']].map(([bg, border], i) => (
            <div key={i} style={{ width: 16, height: 16, background: bg, border: `1px solid ${border}` }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderBottom: `1px solid ${GOLD}22` }}>
        {[{ src: ucFront, label: 'Front' }, { src: ucBack, label: 'Back' }].map((s, i) => (
          <div key={i} style={{ background: '#f0ede8', borderRight: i === 0 ? `1px solid ${GOLD}22` : 'none', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, left: 20, fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>{s.label}</div>
            <LbImg src={s.src} alt={`UC ${s.label}`} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr', background: '#050505', borderBottom: `1px solid ${GOLD}22` }}>
        <div style={{ borderRight: `1px solid ${GOLD}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
          <LbImg src={ucLogo} alt="UC logotype" style={{ width: '80%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
          <LbImg src={ucDesignBack} alt="UC back artwork" style={{ width: '68%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, background: '#080808' }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: GOLD }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 14, margin: 0, color: 'rgba(255,255,255,0.62)' }}>UC shifts the palette entirely. Where SOLT came in hot with red and aggression, Undercover moves in gold and shadow. The front carries just "UC." — slanted in white. The back tells a deeper story: a hooded masked figure, crowned and anonymous. A distressed gold star bleeds across the background. Power that moves quietly.</p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: GOLD }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => <span key={t} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${GOLD}cc`, padding: '6px 12px', border: `1px solid ${GOLD}33` }}>{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BLTNFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const tags = ['Streetwear','Two Colorways','Brand Identity','ZIYA!','Apparel Design','Editorial']
  return (
    <motion.div id="proj-bltn" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.06 }} style={{ marginBottom: 72, border: `1px solid ${tk.border}`, overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', background: tk.bgAlt, borderBottom: `1px solid ${tk.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12 }}>06 / Fashion Design — Apparel</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', color: tk.fg, lineHeight: 1 }}>ZIYA!</span>
            <span style={{ fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', color: tk.fgDim, lineHeight: 1 }}>BLTN Collection</span>
          </div>
          <div style={{ ...tx.body, fontSize: 13, marginTop: 8 }}>Better Late Than Never — Two colorways, one mark</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {[{ bg: '#ffffff', border: 'rgba(255,255,255,0.12)', label: 'White' }, { bg: '#0a0a0a', border: 'rgba(255,255,255,0.18)', label: 'Black' }].map(c => (
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 16, background: c.bg, border: `1px solid ${c.border}` }} />
              <span style={{ ...tx.micro, fontSize: 7 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        {[{ src: bltnWhite, label: 'White' }, { src: bltnBlack, label: 'Black' }].map((s, i) => (
          <div key={i} style={{ borderRight: i === 0 ? `1px solid ${tk.border}` : 'none', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, left: 20, zIndex: 1, fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: i === 0 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)' }}>{s.label}</div>
            <LbImg src={s.src} alt={`BLTN ${s.label}`} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, background: tk.bgAlt, borderTop: `1px solid ${tk.border}` }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 14, margin: 0 }}>BLTN strips everything back. No full-back graphic, no aggressive type. Just a crescent moon and three words — "better / late than / never." — stacked in clean lowercase beside it. The serif typeface is a deliberate break from SOLT and UC — less streetwear, more editorial. ZIYA!'s most wearable piece. It doesn't announce itself. It waits to be read.</p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16 }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => <span key={t} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: tk.fgMuted, padding: '6px 12px', border: `1px solid ${tk.borderMid}` }}>{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PGDCFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const PINK = '#e07ab0'
  const tags = ['Streetwear','Two Colorways','Brand Identity','ZIYA!','Apparel Design','Hand-Lettered']
  return (
    <motion.div id="proj-pgdc" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.06 }} style={{ marginBottom: 72, border: `1px solid ${PINK}33`, overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', background: '#0a0a0a', borderBottom: `1px solid ${PINK}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: PINK }}>07 / Fashion Design — Apparel</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1 }}>ZIYA!</span>
            <span style={{ fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.28)', lineHeight: 1 }}>PGDC Collection</span>
          </div>
          <div style={{ ...tx.body, fontSize: 13, marginTop: 8, color: 'rgba(255,255,255,0.55)' }}>Pretty Girls Don't Cry — Two colorways, one declaration</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {[{ bg: '#ffffff', border: 'rgba(255,255,255,0.12)', label: 'White' }, { bg: '#0a0a0a', border: 'rgba(255,255,255,0.18)', label: 'Black' }, { bg: PINK, border: 'none', label: 'Pink' }].map(c => (
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 16, background: c.bg, border: `1px solid ${c.border}` }} />
              <span style={{ ...tx.micro, fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        {[{ src: pgdcWhite, label: 'White' }, { src: pgdcBlack, label: 'Black' }].map((s, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative', borderRight: i === 0 ? `1px solid ${PINK}22` : 'none' }}>
            <div style={{ position: 'absolute', top: 16, left: 20, zIndex: 1, fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: i === 0 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)' }}>{s.label}</div>
            <LbImg src={s.src} alt={`PGDC ${s.label}`} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, background: '#0a0a0a', borderTop: `1px solid ${PINK}22` }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: PINK }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 14, margin: 0, color: 'rgba(255,255,255,0.62)' }}>PGDC leaves the dark palette entirely. A dusty pink field scattered with lip prints and "Pretty girls dont cry!" written large in loose hand-lettered script. The typography is expressive, fast, personal — like the thought was written down the moment it landed. On white the kiss marks read soft and warm in mauve; on black they deepen to crimson. Same defiance, different edge.</p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: PINK }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => <span key={t} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${PINK}cc`, padding: '6px 12px', border: `1px solid ${PINK}33` }}>{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function KLMLNGFeatured() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useMobile()
  const SUN = '#d4a43a'
  const tags = ['Streetwear','Bestseller','Retro Cartoon','ZIYA!','Filipino Culture','Apparel Design','Illustration']
  return (
    <motion.div id="proj-klm" ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E, delay: 0.06 }} style={{ marginBottom: 72, border: `1px solid ${SUN}44`, overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', background: '#080808', borderBottom: `1px solid ${SUN}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 12, color: SUN }}>08 / Fashion Design — Apparel · Bestseller</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: FF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1 }}>ZIYA!</span>
            <span style={{ fontFamily: FF, fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.28)', lineHeight: 1 }}>KLM LNG Collection</span>
          </div>
          <div style={{ ...tx.body, fontSize: 13, marginTop: 8, color: 'rgba(255,255,255,0.55)' }}>Kalma Lang — Chill out, Kaibigan</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <div style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#080808', background: SUN, padding: '6px 14px' }}>Most Sold</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ bg: '#ffffff', border: 'rgba(255,255,255,0.12)' }, { bg: '#080808', border: 'rgba(255,255,255,0.18)' }, { bg: SUN, border: 'none' }].map((c, i) => (
              <div key={i} style={{ width: 16, height: 16, background: c.bg, border: `1px solid ${c.border}` }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderBottom: `1px solid ${SUN}22` }}>
        {[{ src: klmFront, label: 'Front' }, { src: klmBack, label: 'Back' }].map((s, i) => (
          <div key={i} style={{ background: '#0d0d0d', borderRight: i === 0 ? `1px solid ${SUN}22` : 'none', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, left: 20, zIndex: 1, fontFamily: FF, fontSize: 8, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${SUN}99` }}>{s.label}</div>
            <LbImg src={s.src} alt={`KLM LNG ${s.label}`} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr', borderBottom: `1px solid ${SUN}22` }}>
        <div style={{ background: '#050505', borderRight: `1px solid ${SUN}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
          <LbImg src={klmArtwork} alt="KLM LNG back artwork" style={{ width: '72%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div style={{ background: '#fdf8ee', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', gap: 16, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 20, left: 24, fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.22)' }}>Logotype</div>
          <LbImg src={klmLogo} alt="KLM LNG logotype" style={{ width: '80%', objectFit: 'contain', display: 'block' }} />
          <div style={{ fontFamily: FF, fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>"Calm down, friend."</div>
        </div>
      </div>
      <div style={{ padding: isMobile ? '24px 20px' : '32px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, background: '#080808' }}>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: SUN }}>Design Notes</div>
          <p style={{ ...tx.body, fontSize: 14, margin: 0, color: 'rgba(255,255,255,0.62)' }}>KLM LNG is ZIYA!'s most culturally rooted piece — and the brand's bestseller. "Kalma lang" is Filipino for "calm down, take it easy." A grinning retro sun mascot strolls between clouds wearing sneakers. Above it, "KALMA LANG" echoes three times in stacked gold and fading grey, like a mantra repeating until it lands. It's a shirt that speaks Filipino and smiles doing it.</p>
        </div>
        <div>
          <div style={{ ...tx.label, fontSize: 9, marginBottom: 16, color: SUN }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(t => <span key={t} style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${SUN}cc`, padding: '6px 12px', border: `1px solid ${SUN}44` }}>{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   DESIGNS SECTION
════════════════════════════════════════════════════════════════════════════ */
const PROJ_LINKS = [
  { id: 'proj-alon', label: 'ALON' },
  { id: 'proj-jtd',  label: 'JTD'  },
  { id: 'proj-solt', label: 'SOLT' },
  { id: 'proj-uc',   label: 'UC'   },
  { id: 'proj-bltn', label: 'BLTN' },
  { id: 'proj-pgdc', label: 'PGDC' },
  { id: 'proj-klm',  label: 'KLM LNG' },
]

function DesignsSection() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()

  return (
    <section id="designs" style={{ background: tk.bg, borderBottom: `1px solid ${tk.border}`, transition: 'background 0.3s ease' }}>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}
        >
          <div>
            <div style={{ ...tx.label, marginBottom: 16 }}>03 / Designs</div>
            <h1 style={{ ...tx.hero, fontSize: 'clamp(44px,7vw,96px)', margin: 0 }}>Selected<br />Projects</h1>
          </div>
          <div style={{ ...tx.micro, fontSize: 9, paddingBottom: 8 }}>8 Works</div>
        </motion.div>

        {/* Project jump nav */}
        <div style={{ marginBottom: 56, overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ display: 'flex', gap: 6, width: 'max-content' }}>
            {PROJ_LINKS.map(p => (
              <motion.button
                key={p.id}
                onClick={() => scrollTo(p.id)}
                whileHover={{ backgroundColor: tk.accent, color: '#ffffff', borderColor: tk.accent }}
                transition={{ duration: 0.18 }}
                style={{
                  ...tx.nav, fontSize: 9, cursor: 'pointer',
                  padding: '8px 18px',
                  border: `1px solid ${tk.borderMid}`,
                  background: 'transparent', color: tk.fgDim,
                  whiteSpace: 'nowrap',
                }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </div>

        <AlonFeatured />
        <JTDFeatured />
        <SOLTFeatured />
        <UCFeatured />
        <BLTNFeatured />
        <PGDCFeatured />
        <KLMLNGFeatured />

        {/* More projects — centered, bigger */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: 24, borderTop: `1px solid ${tk.border}`,
            paddingTop: 64, paddingBottom: 48,
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: FF, fontSize: 'clamp(20px,3.5vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', color: tk.fg, marginBottom: 16 }}>
            More Projects In Progress
          </div>
          <div style={{ ...tx.body, fontSize: 14, marginBottom: 28 }}>New work incoming — check back soon.</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.18, 0.6, 0.18] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.4, ease: 'easeInOut' }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: tk.accent }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPERIENCE SECTION
════════════════════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  const { tk } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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

  const coursework = [
    'Graphics and Visual Computing',
    'Human-Computer Interaction',
    'Web Systems and Technologies',
    'Multimedia Systems',
    'Information Management',
    'Application Development & Emerging Technologies',
  ]

  const skills: [string, number][] = [
    ['Graphic Design',           88],
    ['Social Media Management',  85],
    ['HTML / CSS / JavaScript',  82],
    ['Python / Django',          74],
    ['Web Development',          76],
    ['Digital Content Creation', 84],
  ]

  return (
    <section id="experience" style={{ background: tk.bg, borderBottom: `1px solid ${tk.border}`, transition: 'background 0.3s ease' }}>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} style={{ marginBottom: 80 }}>
          <div style={{ ...tx.label, marginBottom: 16 }}>04 / Experience & Education</div>
          <h1 style={{ ...tx.hero, fontSize: 'clamp(44px,7vw,96px)', margin: 0 }}>
            Experience<br /><span style={{ color: tk.accent }}>& Education</span>
          </h1>
        </motion.div>

        <motion.div ref={ref} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 72 }}>
          {/* Work experience */}
          <motion.div variants={STAGGER} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 28 }}>Work Experience</motion.div>
            {experiences.map((e, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: E, delay: i * 0.09 } } }}
                style={{ borderTop: `1px solid ${tk.border}`, paddingTop: 24, paddingBottom: 24, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '130px 1fr', gap: 20 }}
              >
                <div style={{ ...tx.micro, fontSize: 9, lineHeight: 1.5 }}>{e.period}</div>
                <div>
                  <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 600, color: tk.fg, letterSpacing: '-0.01em', marginBottom: 5 }}>{e.role}</div>
                  <div style={{ ...tx.label, fontSize: 9, marginBottom: 2 }}>{e.company} — {e.location}</div>
                  <div style={{ ...tx.body, fontSize: 14, marginTop: 12 }}>{e.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education + skills */}
          <motion.div variants={STAGGER} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 28 }}>Education</motion.div>
            <motion.div variants={ITEM_UP} style={{ borderTop: `1px solid ${tk.border}`, paddingTop: 24, paddingBottom: 24, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '130px 1fr', gap: 20 }}>
              <div style={{ ...tx.micro, fontSize: 9 }}>Jul 2023 — Jul 2027</div>
              <div>
                <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 600, color: tk.fg, marginBottom: 5 }}>BS Information Technology</div>
                <div style={{ ...tx.label, fontSize: 9 }}>Palawan State University</div>
                <div style={{ ...tx.micro, fontSize: 9, marginTop: 2 }}>Puerto Princesa, PH</div>
              </div>
            </motion.div>

            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 16, marginTop: 36 }}>Relevant Coursework</motion.div>
            <motion.div variants={ITEM_UP} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 40, borderTop: `1px solid ${tk.border}`, paddingTop: 20 }}>
              {coursework.map(c => (
                <span key={c} style={{ fontFamily: FF, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: tk.fgMuted, padding: '6px 12px', border: `1px solid ${tk.border}` }}>{c}</span>
              ))}
            </motion.div>

            <motion.div variants={ITEM_LEFT} style={{ ...tx.micro, marginBottom: 24 }}>Competencies</motion.div>
            {skills.map(([skill, level], i) => (
              <motion.div key={i} variants={ITEM_UP} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: FF, fontSize: 14, color: tk.fgMuted, letterSpacing: '0.02em' }}>{skill}</span>
                  <span style={{ ...tx.micro, fontSize: 9 }}>{level}%</span>
                </div>
                <div style={{ height: 1, background: tk.border, position: 'relative' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.1, ease: E, delay: 0.5 + i * 0.1 }}
                    style={{ height: 1, background: tk.accent, position: 'absolute', top: 0, left: 0 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   CONTACT SECTION
════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const { tk, isDark } = useTheme()
  const tx = makeTx(tk)
  const isMobile = useMobile()
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const formIn  = useInView(formRef, { once: true, margin: '-60px' })

  const socials = [
    { label: 'Email',     handle: 'mgadielzya@gmail.com',   href: 'mailto:mgadielzya@gmail.com',        sub: 'Opens your email app' },
    { label: 'WhatsApp',  handle: '+63 919 704 0927',        href: 'https://wa.me/639197040927',          sub: 'Chat on WhatsApp' },
    { label: 'Instagram', handle: '@404.ziy_',               href: 'https://instagram.com/404.ziy_',      sub: 'View profile' },
    { label: 'GitHub',    handle: 'github.com/zyamaramag',   href: 'https://github.com/zyamaramag',       sub: 'View repositories' },
  ]

  const inputStyle = (name: string): React.CSSProperties => ({
    fontFamily: FF, fontSize: 15, fontWeight: 400, letterSpacing: '0.01em', color: tk.fg,
    background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused === name ? tk.accent : tk.inputBorder}`,
    padding: '15px 0', width: '100%', display: 'block',
    transition: 'border-color 0.28s ease',
    outline: 'none',
  })
  const labelStyle = (name: string): React.CSSProperties => ({
    ...tx.micro, fontSize: 9, display: 'block', marginBottom: 0,
    color: focused === name ? tk.accent : tk.fgDim,
    transition: 'color 0.28s ease',
  })

  return (
    <section id="contact" style={{ background: tk.bg, transition: 'background 0.3s ease' }}>
      <div style={{ padding: isMobile ? '60px 20px 80px' : '72px 48px 120px' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} style={{ ...tx.label, marginBottom: 80 }}>
          05 / Contact Me
        </motion.div>

        {/* Oversized email */}
        <motion.a
          href="mailto:mgadielzya@gmail.com"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.7, ease: E }}
          whileHover={{ color: tk.accent, x: 6 }}
          style={{ ...tx.hero, fontSize: 'clamp(22px,4.2vw,60px)', display: 'block', color: tk.fg, transition: 'color 0.28s ease', marginBottom: 16 }}
        >
          mgadielzya@gmail.com
        </motion.a>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} style={{ ...tx.body, fontSize: 15, marginBottom: 80 }}>
          Available for freelance projects, internships & full-time positions.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, borderTop: `1px solid ${tk.border}`, paddingTop: isMobile ? 48 : 72 }}>
          {/* Contact form */}
          <motion.div ref={formRef} variants={STAGGER} initial="hidden" animate={formIn ? 'show' : 'hidden'}>
            <motion.div variants={ITEM_UP} style={{ ...tx.micro, marginBottom: 36 }}>Send a Message</motion.div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ padding: '48px 40px', border: `1px solid ${tk.border}`, textAlign: 'center' }}>
                <div style={{ ...tx.label, fontSize: 20, marginBottom: 12 }}>✓</div>
                <div style={tx.body}>Message received. I'll be in touch soon.</div>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[{ name: 'name', label: 'Full Name', type: 'text' }, { name: 'email', label: 'Email Address', type: 'email' }].map(f => (
                  <motion.div key={f.name} variants={ITEM_UP}>
                    <label style={labelStyle(f.name)}>{f.label}</label>
                    <input type={f.type} required onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} style={inputStyle(f.name)} />
                  </motion.div>
                ))}
                <motion.div variants={ITEM_UP} style={{ marginTop: 20 }}>
                  <label style={labelStyle('message')}>Message</label>
                  <textarea required rows={5} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} style={inputStyle('message')} />
                </motion.div>
                <motion.div variants={ITEM_UP} style={{ marginTop: 28 }}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, backgroundColor: tk.accent, boxShadow: `0 0 0 1px ${tk.accent}, 0 0 28px rgba(255,45,45,0.22)` }}
                    whileTap={{ scale: 0.94, transition: { duration: 0.07 } }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{ ...tx.nav, fontSize: 10, color: tk.fg, padding: '19px 0', width: '100%', border: `1px solid ${tk.borderMid}`, background: 'transparent', cursor: 'pointer' }}
                  >
                    Send Message
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Socials + map */}
          <motion.div variants={STAGGER} initial="hidden" animate={formIn ? 'show' : 'hidden'}>
            <motion.div variants={ITEM_UP} style={{ ...tx.micro, marginBottom: 36 }}>Find Me Online</motion.div>

            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                variants={ITEM_UP}
                whileHover={{ x: 6, color: tk.accent }}
                style={{
                  fontFamily: FF, fontSize: 15, fontWeight: 500, color: tk.fgMuted,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', borderBottom: `1px solid ${tk.border}`,
                  transition: 'color 0.22s ease', cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontFamily: FF, fontSize: 15, fontWeight: 600, color: 'inherit' }}>{s.label}</div>
                  <div style={{ ...tx.micro, fontSize: 8, marginTop: 2 }}>{s.sub}</div>
                </div>
                <span style={{ ...tx.micro, fontSize: 9 }}>{s.handle} →</span>
              </motion.a>
            ))}

            {/* Location + map */}
            <motion.div variants={ITEM_UP} style={{ marginTop: 36 }}>
              <div style={{ ...tx.micro, fontSize: 9, marginBottom: 16 }}>Based In</div>
              <div style={{ fontFamily: FF, fontSize: 22, fontWeight: 700, color: tk.fg, letterSpacing: '-0.02em', marginBottom: 4 }}>
                Puerto Princesa, Palawan
              </div>
              <div style={{ ...tx.micro, fontSize: 9, marginBottom: 20 }}>GMT+8 / PST — Philippines</div>

              {/* OpenStreetMap embed */}
              <div style={{ overflow: 'hidden', border: `1px solid ${tk.border}` }}>
                <iframe
                  title="Puerto Princesa, Palawan on the map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=118.6353%2C9.6892%2C118.8353%2C9.7892&layer=mapnik&marker=9.7392%2C118.7353"
                  style={{
                    border: 'none', width: '100%', height: 240, display: 'block',
                    filter: isDark ? 'invert(0.88) hue-rotate(180deg) brightness(0.9)' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${tk.border}`, padding: isMobile ? '24px 20px' : '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ ...tx.micro, fontSize: 9 }}>© 2026 Gadiel Zya Maramag</span>
        <span style={{ ...tx.micro, fontSize: 9 }}>Puerto Princesa, Palawan, PH</span>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════════════════════════════════ */
function AppShell() {
  const [isDark, setIsDark] = useState(true)
  const toggle = () => setIsDark(d => !d)
  const tk = isDark ? darkT : lightT

  return (
    <ThemeCtx.Provider value={{ tk, isDark, toggle }}>
      <LightboxProvider>
        <GlobalStyles tk={tk} />
        <div style={{ background: tk.bg, minHeight: '100vh', transition: 'background 0.3s ease, color 0.3s ease' }}>
          <Nav />
          <div style={{ paddingTop: 64 }}>
            <LandingSection />
            <AboutSection />
            <DesignsSection />
            <ExperienceSection />
            <ContactSection />
          </div>
        </div>
      </LightboxProvider>
    </ThemeCtx.Provider>
  )
}

export default function App() {
  return <AppShell />
}
