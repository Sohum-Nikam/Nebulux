"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonButton } from "@/components/nebulux/neon-button"
import { GlassCard } from "@/components/nebulux/glass-card"
import { Countdown } from "@/components/nebulux/countdown"
import { PartnersMarquee } from "@/components/nebulux/partners-marquee"
import { Preloader } from "@/components/nebulux/preloader"
import HeroVideoBg from "@/components/nebulux/hero-video-bg"
import { supabase } from "@/lib/supabase"

const nav = [
  { href: "#collabs", label: "Collabs" },
  { href: "#partners", label: "Our Partners" },
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
            className="font-jersey text-xl md:text-2xl font-semibold tracking-tight text-balance text-white glow-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-white"
            aria-label="Nebulux home"
          >
            Nebulux
          </a>
          <nav aria-label="Primary">
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
              className="font-jersey text-pretty text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.02em] text-white glow-white"
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
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
        <Section id="collabs" title="Collabs" headingClassName="font-jersey">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {[
              { title: "Creators", desc: "Let’s shape focused experiences together." },
              { title: "Studios", desc: "Co-develop high-performance initiatives." },
              { title: "Brands", desc: "Partner on meaningful milestones." },
              { title: "Institutions", desc: "Build durable frameworks for growth." },
            ].map((c, idx) => (
              <div key={c.title} className="mb-4 break-inside-avoid">
                <CollabCard index={idx} title={c.title} desc={c.desc} />
              </div>
            ))}
          </div>
        </Section>

        {/* Partners */}
        <Section id="partners" title="Our Partners" headingClassName="font-jersey">
          <PartnersMarquee
            partners={[
              { name: "SoftBank", desc: "Global technology investor supporting category leaders." },
              { name: "JP Morgan", desc: "Leading global financial services and innovation partner." },
              { name: "Unity", desc: "Real-time tools powering interactive experiences." },
              { name: "X", desc: "Real-time conversations and reach at global scale." },
              { name: "Tensor", desc: "Open infrastructure and scalable tooling." },
              { name: "Vireon", desc: "Marketing and growth consultancy." },
              { name: "Lenovo", desc: "Intelligent devices and solutions powering progress." }, // changed from Meta
            ]}
          />
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact Us" headingClassName="font-jersey">
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

function CollabCard({ title, desc }: { title: string; desc: string; index: number }) {
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
        <div className="relative z-10 flex min-h-28 flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white glow-white">{title}</h3>
            <p className="mt-2 text-sm text-white/75">{desc}</p>
          </div>
          <div className="mt-4">
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
      // Insert form data into Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: form.name,
            email: form.email,
            message: form.message,
            notify: form.notify,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Error submitting form:', error)
        // You could add error handling here if needed
      }
      
      setSuccess(true)
      setForm({ name: "", email: "", message: "", notify: true, company: "" })
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
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
          "pointer-events-none fixed bottom-4 right-4 z-50 transition-all",
          success ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
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
