"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonButton } from "@/components/nebulux/neon-button"
import { GlassCard } from "@/components/nebulux/glass-card"
import { Preloader } from "@/components/nebulux/preloader"
import HeroVideoBg from "@/components/nebulux/hero-video-bg"
import { supabase } from "@/lib/supabase"
import { usePlayfulNotification } from "@/lib/notifications"
import { Countdown } from "@/components/nebulux/countdown"

// Set your target date here (year, month (0-indexed), day, hour, minute, second)
const TARGET_DATE = new Date('2025-12-31T00:00:00').getTime()

const nav = [
  { href: "#collabs", label: "Collabs" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
]

const containerVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
}
const childVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
}
const headingVariants = childVariants
const subheadingVariants = childVariants

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 400], [0, -24])

  useEffect(() => {
    function onLoad() {
      setLoaded(true)
    }
    if (document.readyState === "complete") {
      setLoaded(true)
    } else {
      window.addEventListener("load", onLoad, { once: true })
    }
    return () => window.removeEventListener("load", onLoad)
  }, [])

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = (e.currentTarget.getAttribute("href") || "").replace("#", "")
    const el = document.getElementById(href)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.replaceState(null, "", `#${href}`)
    }
  }

  return (
    <div className="relative overflow-clip">
      <Preloader show={!loaded} />

      {/* Background: black → dark blue gradient + subtle vignette, monochrome */}
      <div aria-hidden className="fixed inset-0 z-0 bg-[linear-gradient(180deg,#000000_0%,#0b1220_100%)]" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Header */}
      <motion.header
        initial={false}
        animate={{ backdropFilter: scrolled ? "blur(10px)" : "blur(0px)" }}
        className={cn(
          "sticky top-0 z-50 border-b border-white/5",
          "supports-[backdrop-filter]:bg-black/30 bg-black/60",
          scrolled ? "py-3" : "py-4", // was py-2 / py-3
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <a
            href="#hero"
            onClick={handleAnchor}
            className="font-press-start text-xl md:text-2xl font-semibold tracking-tight text-balance text-white glow-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-white"
            aria-label="Nebulux home"
          >
            Nebulux
          </a>
          
          {/* Desktop Navigation - hidden on mobile */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-4 md:gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleAnchor}
                    className="text-base md:text-[17px] text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1.5 py-1.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation - Sliding panel */}
        <div 
          className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black/90 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-press-start text-lg text-white">Menu</span>
              <button
                className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        handleAnchor(e);
                        setMobileMenuOpen(false);
                      }}
                      className="block py-3 px-4 text-lg text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-white/10">
              <div className="text-sm text-white/60">
                <p>Mumbai-India</p>
                <p>
                  <a 
                    href="mailto:nebulux.team@gmail.com" 
                    className="hover:text-white transition-colors"
                  >
                    nebulux.team@gmail.com
                  </a>
                </p>
              </div>
              <p className="mt-3 text-xs text-white/50">
                © {new Date().getFullYear()} Nebulux. All rights reserved.
              </p>
            </div>
          </div>
        </div>
        
        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </motion.header>

      <main
        id="hero"
        className={cn(
          "relative z-10 transition-opacity motion-safe:transition-transform duration-700 ease-out",
          loaded ? "opacity-100 motion-safe:translate-y-0" : "opacity-0 motion-safe:translate-y-2",
        )}
      >
        {/* Hero */}
        <section className="relative flex min-h-[88svh] items-center">
          <HeroVideoBg />
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 place-items-center gap-8 px-4 py-16 text-center">
            <motion.h1
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={headingVariants}
              transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
              style={reduce ? undefined : { y: parallaxY }}
              className="font-press-start text-pretty text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-white glow-white"
            >
              Nebulux
            </motion.h1>
            <motion.p
              variants={subheadingVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.05, ease: "easeOut" }}
              className="text-lg md:text-xl text-white/80 text-sheen pixel-text"
            >
              Stay Tuned...
            </motion.p>

            <div className="mt-4">
              <Countdown />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <NeonButton
                className="group active:scale-[0.98] transition"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("about")
                  el?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span>Explore more</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </NeonButton>
              <NeonButton
                className="active:scale-[0.98] transition"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("contact")
                  el?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                Get updates
              </NeonButton>
            </div>
          </div>
        </section>

        {/* About */}
        <Section
          id="about"
          title="About Us"
          headingClassName="font-jersey text-center text-3xl md:text-4xl lg:text-5xl"
        >
          <div className="mx-auto max-w-4xl text-center space-y-5">
            <p className="text-pretty text-base md:text-lg text-white/80">
              Nebulux began with a belief that the strongest connections are forged through challenges, teamwork, and
              resilience. We&apos;re building something that rewards dedication and celebrates progress. Thanks for being
              early.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 mx-auto max-w-4xl">
            {[
              { title: "Craft", desc: "Precision as a habit." },
              { title: "Community", desc: "Progress together." },
              { title: "Progress", desc: "Momentum rewarded." },
            ].map((p) => (
              <GlassCard key={p.title} className="group p-6 md:p-7 min-h-40">
                <div className="flex flex-col items-center text-center gap-3">
                  <h3 className="font-jersey text-2xl md:text-3xl font-semibold text-white glow-white">{p.title}</h3>
                  <p className="text-sm md:text-base text-white/75">{p.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* Collabs */}
        <Section id="collabs" title="Collabs" headingClassName="font-jersey text-center">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto max-w-4xl">
            {[
              { title: "Creators", desc: "Let’s shape focused experiences together." },
              { title: "Studios", desc: "Co-develop high-performance initiatives." },
              { title: "Brands", desc: "Partner on meaningful milestones." },
              { title: "Institutions", desc: "Build durable frameworks for growth." },
            ].map((c, idx) => (
              <div key={c.title} className="break-inside-avoid">
                <CollabCard index={idx} title={c.title} desc={c.desc} />
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact Us" headingClassName="font-jersey text-center">
          <ContactForm />
        </Section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t">
        <div aria-hidden className="h-px w-full bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <nav aria-label="Footer" className="mb-3">
            <ul className="flex items-center justify-center gap-5 text-sm text-white/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleAnchor}
                    className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1 py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mb-3 text-sm text-white/60">
            <p>Mumbai-India</p>
            <p>
              <a 
                href="mailto:nebulux.team@gmail.com" 
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1"
              >
                nebulux.team@gmail.com
              </a>
            </p>
          </div>
          <p className="text-xs text-white/80 glow-white/30">
            © {new Date().getFullYear()} Nebulux. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function Section({
  id,
  title,
  headingClassName,
  children,
}: {
  id: string
  title: string
  headingClassName?: string
  children: React.ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <section id={id} className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
      >
        <motion.h2
          variants={childVariants}
          className={cn(
            "mb-6 text-2xl md:text-3xl font-semibold tracking-[-0.01em] text-white glow-white",
            headingClassName,
          )}
        >
          {title}
        </motion.h2>
        <motion.div variants={childVariants}>{children}</motion.div>
      </motion.div>
    </section>
  )
}

function CollabCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <div className="relative group">
      <GlassCard
        className={cn(
          "relative p-5 rounded-xl overflow-hidden",
          // extra glass layers
          "before:!inset-[0.5px] after:!shadow-[0_0_40px_-12px_rgba(255,255,255,0.55)]",
        )}
      >
        {/* subtle diagonal highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.00) 60%)",
          }}
        />
        {/* corner ping glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute size-3 rounded-full top-2 right-2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 60%, transparent 70%)",
            animation: "cornerGlow 3.2s ease-in-out infinite",
          }}
        />
        <div className="relative z-10 flex min-h-28 flex-col justify-between text-center">
          <div>
            <h3 className="text-lg font-semibold text-white glow-white">{title}</h3>
            <p className="mt-2 text-sm text-white/75">{desc}</p>
          </div>
          <div className="mt-4 flex justify-center">
            <a
              href="#contact"
              className="text-sm font-medium text-white/90 underline decoration-white/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
            >
              Request a collab
            </a>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [form, setForm] = useState({ name: "", email: "", message: "", notify: true, company: "" })
  const { showPlayfulNotification } = usePlayfulNotification()

  function validate() {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = "Please enter your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email."
    if (!form.message.trim()) e.message = "Please enter a message."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.company.trim().length > 0) {
      return
    }
    if (!validate()) return
    setLoading(true)
    
    try {
      // Log the data we're trying to insert
      const formData = {
        name: form.name,
        email: form.email,
        message: form.message,
        notify: form.notify,
        created_at: new Date().toISOString()
      };
      
      console.log('Attempting to insert data:', formData);
      
      // Insert form data into Supabase
      const { data, error } = await supabase
        .from('Client Table')
        .insert([formData])
        .select()

      if (error) {
        console.error('Error submitting form:', error)
        // Check if it's an RLS error
        if (error.message.includes('row-level security')) {
          alert('Database configuration error: Please ask your developer to enable proper RLS policies for the "Client Table". The table requires specific permissions to allow form submissions.')
        } else {
          alert(`Error submitting form: ${error.message}`)
        }
        // You could add error handling here if needed
      } else {
        console.log('Form submitted successfully:', data)
        setSuccess(true)
        showPlayfulNotification() // Show our playful notification
        setForm({ name: "", email: "", message: "", notify: true, company: "" })
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error)
      alert(`Unexpected error submitting form: ${(error as Error).message}`)
      // You could add error handling here if needed
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all",
          success ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        )}
      >
        <div className="rounded-lg border border-white/10 bg-black/70 px-4 py-3 shadow-[0_0_30px_-10px_rgba(0,255,128,0.5)] backdrop-blur-md">
          <p className="text-sm">
            <span className="text-transparent bg-clip-text gradient-b font-medium">Thanks!</span> We’ll be in touch.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mx-auto grid max-w-2xl gap-4">
        <label className="hidden" aria-hidden>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          />
        </label>

        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-white/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={cn(
              "rounded-lg border bg-black/40 px-3 py-2 outline-none backdrop-blur-md text-white placeholder:text-white/60",
              "focus-visible:ring-2 focus-visible:ring-white",
              errors.name ? "ring-2 ring-red-500/70" : "border-white/10",
            )}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-white/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={cn(
              "rounded-lg border bg-black/40 px-3 py-2 outline-none backdrop-blur-md text-white placeholder:text-white/60",
              "focus-visible:ring-2 focus-visible:ring-white",
              errors.email ? "ring-2 ring-red-500/70" : "border-white/10",
            )}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm text-white/80">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={cn(
              "min-h-28 rounded-lg border bg-black/40 px-3 py-2 outline-none backdrop-blur-md text-white placeholder:text-white/60",
              "focus-visible:ring-2 focus-visible:ring-white",
              errors.message ? "ring-2 ring-red-500/70" : "border-white/10",
            )}
            placeholder="Tell us how excited you are!"
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-400">
              {errors.message}
            </p>
          )}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.notify}
            onChange={(e) => setForm((f) => ({ ...f, notify: e.target.checked }))}
            className="accent-white"
          />
          Notify me when we launch
        </label>
        <div className="pt-2">
          <NeonButton variant="primary" disabled={loading} className={cn(success && "animate-shadowPulse")}>
            <span className="relative inline-flex items-center gap-2">
              {loading ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"
                    aria-hidden
                  />
                  <span>Sending</span>
                </>
              ) : success ? (
                <>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Notified!</span>
                </>
              ) : (
                <span>Get notified</span>
              )}
            </span>
          </NeonButton>
        </div>
      </form>
    </div>
  )
}

