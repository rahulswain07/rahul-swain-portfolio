import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, Play, X, Youtube } from "lucide-react";
import { contentReasons, process, profile, topics, videos } from "./data";

const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function Reveal({ children, className = "", delay = 0, amount = 0.16 }: { children: React.ReactNode; className?: string; delay?: number; amount?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount }} transition={reduceMotion ? { duration: 0 } : { delay }}>{children}</motion.div>;
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const seen = sessionStorage.getItem("rahul-intro-seen");
    if (seen) { setVisible(false); onDone(); return; }
    const t = window.setTimeout(() => {
      sessionStorage.setItem("rahul-intro-seen", "1");
      setVisible(false);
      onDone();
    }, 1400);
    return () => window.clearTimeout(t);
  }, [onDone]);
  if (!visible) return null;
  return (
    <motion.div className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="intro-grid" />
      <motion.div className="intro-content">
        <motion.div className="intro-photo-wrap" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .7 }}>
          <img src="/images/rahul-hero.jpeg" alt="Rahul Swain" onError={(e) => (e.currentTarget.style.display = "none")} />
        </motion.div>
        <motion.div className="eyebrow" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .35 }}>RAHUL SWAIN</motion.div>
        <motion.div className="intro-role" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .5 }}>TECH ENTREPRENEUR · CONTENT CREATOR</motion.div>
        <motion.div className="intro-scan" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .75, duration: .6 }} />
      </motion.div>
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const links = [["Home", "home"], ["About", "about"], ["Explore", "explore"], ["My Vision", "vision"], ["Build in Public", "build"], ["Connect", "connect"]];
  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const marker = window.innerHeight * .35;
      const current = sections.filter((section) => section.getBoundingClientRect().top <= marker).at(-1);
      if (current) setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className="nav">
      <a className="brand" href="#home">RAHUL SWAIN</a>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map(([label, id]) => <a className={active === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="talk-btn desktop" href="#connect">LET'S TALK <ArrowUpRight size={15} /></a>
      <button className="menu-btn" aria-label="Open navigation" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, .2], [0, -60]);
  const portrait = useRef<HTMLDivElement>(null);
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !portrait.current) return;
    const bounds = portrait.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
    const yOffset = ((event.clientY - bounds.top) / bounds.height - .5) * 5;
    portrait.current.style.setProperty("--pointer-x", `${x}px`);
    portrait.current.style.setProperty("--pointer-y", `${yOffset}px`);
  };
  const resetPointer = () => {
    portrait.current?.style.setProperty("--pointer-x", "0px");
    portrait.current?.style.setProperty("--pointer-y", "0px");
  };
  return (
    <section id="home" className="hero section-grid">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><motion.span className="hero-accent-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={reduceMotion ? { duration: 0 } : { delay: .08, duration: .35, ease: "easeOut" }} /><motion.span className="hero-eyebrow-text" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={reduceMotion ? { duration: 0 } : { delay: .22, duration: .5, ease: "easeOut" }}>RAHUL SWAIN / TECH ENTREPRENEUR / CONTENT CREATOR</motion.span></div>
        <motion.h1 initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: reduceMotion ? { duration: 0 } : { staggerChildren: .1, delayChildren: .3 } } }}>
          {[
            "Exploring the",
            "science behind",
            "technology.",
            "Building",
            "something",
            "innovative that",
            "matters.",
          ].map((line, index) => <motion.span key={line} className={`hero-line${index > 2 ? " muted-line" : ""}`} variants={{ hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: reduceMotion ? 0 : .62, ease: "easeOut" } } }}>{line}</motion.span>)}
        </motion.h1>
        <Reveal delay={1.02}><p className="lead">I explore artificial intelligence, machine learning, computer science and emerging technologies — learning deeply, creating content, and building toward innovative products that solve real-world problems.</p></Reveal>
        <Reveal delay={1.18}><div className="hero-actions">
          <a className="btn primary" href="#vision">EXPLORE MY VISION <ArrowUpRight size={17} /></a>
          <a className="btn" href="#connect">CONNECT WITH ME <ArrowUpRight size={17} /></a>
        </div></Reveal>
      </div>
      <motion.div ref={portrait} className="hero-portrait" style={{ y }} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={reduceMotion ? { duration: 0 } : { delay: .85, duration: .9, ease: "easeOut" }}>
        <img src="/images/rahul-hero.jpeg" alt="Rahul Swain portrait" />
        <div className="location-chip"><span className="dot" /> KENDRAPARA, ODISHA, INDIA</div>
        <div className="tech-float tf4">ENTREPRENEUR</div>
      </motion.div>
    </section>
  );
}

export function PersonalStatement() {
  return <section className="statement"><Reveal><p>I don't just want to use technology.</p><p>I want to understand it.</p><p>Build with it.</p><p>And create something <em>meaningful</em> with it.</p></Reveal></section>;
}

export function About() {
  return (
    <section id="about" className="section section-grid">
      <div className="two-col">
        <Reveal><div><div className="eyebrow"><span /> 01 / ABOUT ME</div><h2>Curiosity became a direction.</h2></div></Reveal>
        <Reveal><div className="body-copy">
          <p>My name is Rahul Swain. I am from Kendrapara, Odisha, India, and I am currently pursuing a B.Sc. in Computer Science.</p>
          <p>I come from a middle-class family. My father runs a grocery shop, and my family includes my father and mother, my elder sister, my grandmother and me.</p>
          <p>Growing up, I did not have everything figured out, but I always had a strong sense of curiosity. That curiosity led me toward technology, AI, machine learning, computer science and the idea of building something meaningful with what I learn.</p>
          <p>Today, I am learning deeply, creating technology content, and working toward building products and ideas that can grow into future entrepreneurship and innovation.</p>
          <strong>I want to turn learning into useful work and build in public with purpose.</strong>
        </div></Reveal>
      </div>
      <Reveal className="family-photo"><img src="/images/family.jpeg" alt="Rahul Swain with family" /><div><span>Where I come from</span><b>The people behind the journey.</b></div></Reveal>
    </section>
  );
}

export function Origin() {
  return (
    <section className="section origin">
      <Reveal><div className="eyebrow"><span /> WHERE IT BEGINS</div><h2>Every big vision has<br />a small beginning.</h2><p className="lead narrow">Mine begins in Kendrapara, Odisha. In Class 12, hearing the story of Steve Jobs changed the way I looked at technology and entrepreneurship.</p></Reveal>
      <div className="origin-grid">
        <div className="origin-gallery">
          <Reveal><div className="origin-image"><img src="/images/journey-01.jpeg" alt="Rahul's journey" /></div></Reveal>
          <Reveal><div className="origin-image"><img src="/images/journey-02.jpeg" alt="Rahul's journey continues" /></div></Reveal>
        </div>
        <Reveal><div className="origin-story">
          <p>It made me realize that technology is not only something we use. It can also be something we create.</p>
          <p>That story gave me a direction. I wanted to become an entrepreneur, an innovator and a builder of technology products.</p>
          <div className="story-line"><span>CLASS 12</span><i>→</i><span>TECHNOLOGY</span><i>→</i><span>ENTREPRENEURSHIP</span><i>→</i><span>INNOVATION</span></div>
        </div></Reveal>
      </div>
    </section>
  );
}

export function Explore() {
  return (
    <section id="explore" className="section section-grid">
      <Reveal><div className="eyebrow"><span /> 02 / EXPLORING</div><h2>What I'm exploring.</h2></Reveal>
      <div className="topic-grid">
        {topics.map(([num, title, desc]) => <Reveal key={num}><article className="topic"><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={19} /></article></Reveal>)}
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="section vision">
      <Reveal><div className="eyebrow center"><span /> 03 / MY VISION</div><h2 className="center-title">From a small town<br />to a global vision.</h2></Reveal>
      <Reveal><div className="vision-copy"><p>My long-term goal is to become one of India's leading technology entrepreneurs and build innovative technology startups that solve meaningful real-world problems.</p><p>I want to build from India. I want to create products that can reach global users. And I want my work to represent India on the global technology stage through innovation.</p></div></Reveal>
      <div className="origin-path"><span>KENDRAPARA</span><i>→</i><span>ODISHA</span><i>→</i><span>INDIA</span><i>→</i><span>GLOBAL</span></div>
      <div className="big-words"><span>LEARN</span><span>BUILD</span><span>SOLVE</span><span>SCALE</span><span>IMPACT</span></div>
      <Reveal><div className="current-grid"><div><div className="eyebrow"><span /> WHERE I AM NOW</div><h3>Learning. Creating. Building.</h3></div><p>Today I am learning AI, machine learning, computer science, mathematics, software and emerging technologies. I am creating technology content, building products, experimenting with ideas and learning how entrepreneurship actually works.</p></div></Reveal>
      <Reveal><div className="global-banner">BUILD FROM INDIA. <span>CREATE FOR THE WORLD.</span></div></Reveal>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section-grid">
      <Reveal><div className="eyebrow"><span /> HOW I WANT TO BUILD</div><h2>Ideas become products<br />through a process.</h2></Reveal>
      <div className="process">
        {process.map(([n, title, desc]) => <Reveal key={n}><div className="process-row"><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={18} /></div></Reveal>)}
      </div>
    </section>
  );
}

export function BuildInPublic() {
  return (
    <section id="build" className="section build">
      <Reveal><div className="eyebrow"><span /> 04 / BUILD IN PUBLIC</div><h2>I'm building in public.</h2><p className="lead narrow">Learning, building and sharing the process — not only the final result.</p></Reveal>
      <div className="social-profile">
        <img src="/images/rahul-hero.jpeg" alt="Rahul Swain" />
        <div>
          <h3>Rahul Swain</h3>
          <p>Content Creator • Tech Entrepreneur • B.Sc. Computer Science Student</p>
        </div>
      </div>
      <div className="social-grid">
        <Reveal delay={.08}><a className="social-card" href={profile.instagram} target="_blank" rel="noopener noreferrer">
          <div className="social-card-top">
            <span className="social-avatar"><img src="/images/instagram-profile.png" alt="Instagram profile" onError={(e) => { const target = e.currentTarget as HTMLImageElement; target.style.display = "none"; const parent = target.parentElement as HTMLElement | null; if (parent) parent.classList.add("fallback"); }} /></span>
            <Instagram />
          </div>
          <span>INSTAGRAM</span><b>@rahulswain._</b><p>Technology, AI, ideas and the journey of building.</p><strong>FOLLOW ON INSTAGRAM <ArrowUpRight size={16} /></strong>
        </a></Reveal>
        <Reveal delay={.16}><a className="social-card" href={profile.youtube} target="_blank" rel="noopener noreferrer">
          <div className="social-card-top">
            <span className="social-avatar"><img src="/images/yt-profile.png" alt="YouTube profile" onError={(e) => { const target = e.currentTarget as HTMLImageElement; target.style.display = "none"; const parent = target.parentElement as HTMLElement | null; if (parent) parent.classList.add("fallback"); }} /></span>
            <Youtube />
          </div>
          <span>YOUTUBE</span><b>Rahul Swain</b><p>Technology, AI, entrepreneurship, learning and building.</p><strong>WATCH ON YOUTUBE <ArrowUpRight size={16} /></strong>
        </a></Reveal>
        <Reveal delay={.24}><a className="social-card" href={profile.github} target="_blank" rel="noopener noreferrer"><Github /><span>GITHUB</span><b>rahulswain07</b><p>Projects, experiments and things I build while learning.</p><strong>VIEW GITHUB <ArrowUpRight size={16} /></strong></a></Reveal>
      </div>
    </section>
  );
}

export function ContentCreation() {
  return (
    <section className="section section-grid">
      <Reveal><div className="eyebrow"><span /> WHY I CREATE</div><h2>Content is part of<br />my entrepreneurial journey.</h2><p className="lead narrow">I started creating technology content because explaining something forces me to understand it more deeply.</p></Reveal>
      <div className="reason-grid">
        {contentReasons.map(([n, title, desc]) => <Reveal key={n}><article className="reason"><span>{n}</span><h3>{title}</h3><p>{desc}</p></article></Reveal>)}
      </div>
      <div className="learn-chain">LEARN <i>→</i> UNDERSTAND <i>→</i> EXPLAIN <i>→</i> CREATE <i>→</i> SHARE <i>→</i> CONNECT <i>→</i> BUILD</div>
    </section>
  );
}

function VideoCard({ item }: { item: typeof videos[number] }) {
  const isFirstNeuralink = item.id === "frlTggRgCxM";
  const candidates = isFirstNeuralink
    ? [
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${item.id}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${item.id}/default.jpg`,
      ]
    : [
        `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${item.id}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${item.id}/default.jpg`,
      ];

  return (
    <article className="video-card">
      <a className="video-frame" href={item.originalUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title}`}>
        <img
          className="video-thumb"
          src={candidates[0]}
          alt={item.title}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            const current = target.currentSrc || target.src;
            const currentIndex = candidates.indexOf(current);
            const next = candidates[currentIndex + 1] ?? candidates[candidates.length - 1];
            target.src = next;
            target.onerror = null;
          }}
        />
        <span className="play"><Play fill="currentColor" size={18} /></span>
      </a>
      <div className="video-meta"><span>{item.title}</span><small>{item.topic}</small></div>
    </article>
  );
}

export function Videos() {
  return (
    <section className="section video-section">
      <Reveal><div className="eyebrow"><span /> FROM IDEAS TO SCREENS</div><h2>What I'm sharing.</h2><p className="lead narrow">Short-form technology content — built around what I'm learning, exploring and questioning.</p></Reveal>
      <div className="video-scroller">{videos.map((v, index) => <Reveal key={v.id} delay={index * .08}><VideoCard item={v} /></Reveal>)}</div>
      <div className="hero-actions"><a className="btn" href={profile.instagram} target="_blank" rel="noopener noreferrer">WATCH ON INSTAGRAM <ArrowUpRight size={17} /></a><a className="btn" href={profile.youtube} target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE <ArrowUpRight size={17} /></a></div>
    </section>
  );
}

export function Connect() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [state, handleSubmit] = useForm("xoevwpbd");
  const hasFormErrors = !!state.errors && Object.keys(state.errors).length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    await handleSubmit(event);
  };

  return (
    <section id="connect" className="section connect">
      <Reveal><div className="eyebrow"><span /> 05 / CONNECT</div><h2>Let's build something<br /><em>meaningful.</em></h2><p className="lead narrow">Have an idea? Want to talk technology, AI, product building or simply say hello?</p></Reveal>
      <div className="connect-grid">
        <form onSubmit={onSubmit} className="contact-form">
          <Reveal delay={.08}><label>Name<input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" /></label>
          <ValidationError prefix="Name" field="name" errors={state.errors} /></Reveal>

          <Reveal delay={.16}><label>Email<input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" /></label>
          <ValidationError prefix="Email" field="email" errors={state.errors} /></Reveal>

          <Reveal delay={.24}><label>Message<textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="What would you like to talk about?" /></label>
          <ValidationError prefix="Message" field="message" errors={state.errors} /></Reveal>

          <Reveal delay={.32}><button className="btn primary" type="submit" disabled={state.submitting}>
            {state.submitting ? "SENDING..." : state.succeeded ? "MESSAGE SENT ✓" : "SEND MESSAGE"} <ArrowUpRight size={17} />
          </button></Reveal>

          {state.succeeded && <p className="form-note">Message sent successfully. I'll get back to you soon.</p>}
          {errorMessage && <p className="form-note" style={{ color: "#f4bc18" }}>{errorMessage}</p>}
          {!state.succeeded && !errorMessage && hasFormErrors && (
            <p className="form-note" style={{ color: "#f4bc18" }}>Something went wrong. Please try again.</p>
          )}
        </form>
        <Reveal className="contact-side" delay={.18}>
          <a href={`mailto:${profile.email}`}><Mail /><span>EMAIL</span><b>{profile.email}</b><ArrowUpRight /></a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer"><Instagram /><span>INSTAGRAM</span><b>@rahulswain._</b><ArrowUpRight /></a>
          <a href={profile.youtube} target="_blank" rel="noopener noreferrer"><Youtube /><span>YOUTUBE</span><b>Rahul Swain</b><ArrowUpRight /></a>
        </Reveal>
      </div>
    </section>
  );
}

export function CommunityFooter() {
  return (
    <>
      <section className="community"><Reveal><div className="eyebrow center"><span /> COMING SOON</div><h2>A community for people<br />curious about technology.</h2><p>Eventually, I want this journey to become a community for people exploring technology, AI, building products and entrepreneurship.</p></Reveal></section>
      <footer><div><b>RAHUL SWAIN</b><span>TECH ENTREPRENEUR · CONTENT CREATOR · B.SC. COMPUTER SCIENCE STUDENT</span></div><div className="footer-links"><a href={profile.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a><a href={profile.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={18} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18} /></a><a href={`mailto:${profile.email}`}><Mail size={18} /></a></div><p>© 2026 Rahul Swain. Built from curiosity.</p></footer>
    </>
  );
}