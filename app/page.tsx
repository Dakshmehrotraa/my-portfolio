"use client";
import { useEffect, useRef } from "react";

type ProjectLink = { code?: string; demo?: string };
type Project = {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  color: string;
  featured?: boolean;
  meta?: string;
  links?: ProjectLink;
};

const projects: Project[] = [
  {
    title: "OpsLens",
    tag: "🏆 Hackathon Winner",
    featured: true,
    meta: "Winner · Schneider Electric HMI Hackathon · 348 tests",
    description:
      "An AI runtime copilot for industrial HMI that reconstructs the story behind an alarm: which readings moved first, an evidence-ranked root cause scored on its own data, and the exact SOP steps copied verbatim from the cited page. Runs fully offline on a local LLM, is read-only by design (never touches a PLC), and won the Schneider Electric HMI Hackathon.",
    stack: ["FastAPI", "React + Vite", "RAG", "OPC UA", "Qdrant / BM25", "Qwen 2.5 (offline)", "Groq"],
    color: "#f2b53c",
    links: { code: "https://github.com/Dakshmehrotraa/opslens" },
  },
  {
    title: "PrepAgent",
    tag: "Agentic RAG",
    description:
      "An interview-prep copilot for data structures, algorithms and SQL. An LLM agent decides for itself which tools to call — classifying a problem into one of 10 algorithmic patterns and retrieving similar problems from a FAISS index — then explains the core insight, approach and complexity without handing over the code. Every tool call is surfaced as a live trace.",
    stack: ["FastAPI", "Next.js", "FAISS", "LoRA DistilBERT", "Groq llama-3.3-70b"],
    color: "#7c6af7",
    links: { code: "https://github.com/Dakshmehrotraa/prepagent", demo: "https://prepagent-green.vercel.app" },
  },
  {
    title: "KanFlow",
    tag: "Full-Stack · MERN",
    description:
      "A Kanban task-management platform with drag-and-drop boards, priority tagging, deadline tracking and multi-user project workspaces. Stateless JWT auth with role-based access control secures every endpoint and isolates each workspace, backed by a RESTful Express / MongoDB API and a reusable, context-driven React component architecture.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    color: "#00c2a8",
    links: { code: "https://github.com/Dakshmehrotraa/Kanflow", demo: "https://dakshmehrotraa.github.io/Kanflow/" },
  },
  {
    title: "PhishGuard",
    tag: "ML · Explainable AI",
    description:
      "A scam and phishing detector for links, SMS and email that returns a risk score, a verdict and the reasons behind it. Separate URL and text models — Logistic Regression, Random Forest and XGBoost soft-vote ensembles — are fused by highest risk, explained with SHAP, and sharpened by a feedback-driven retraining loop.",
    stack: ["scikit-learn", "XGBoost", "TF-IDF", "SHAP", "FastAPI", "Streamlit"],
    color: "#f76a6a",
    links: { code: "https://github.com/Dakshmehrotraa/phishguard", demo: "https://ai-phishing-detector-app.streamlit.app" },
  },
  {
    title: "Multimodal Psychological Screening System",
    tag: "Research · Minor Project",
    description:
      "A screening tool combining audio emotion analysis, PHQ-9 / GAD-7 questionnaire scoring and LLM-generated narrative reports. Built on a FastAPI + Next.js stack with a CNN-Dense hybrid audio model trained on the RAVDESS and CREMA-D datasets.",
    stack: ["FastAPI", "Next.js", "PyTorch", "MFCC", "LLM", "PHQ-9 / GAD-7"],
    color: "#7c6af7",
  },
  {
    title: "Human-AI Emotion Interaction Analyzer",
    tag: "Deep Learning · Multimodal Fusion",
    description:
      "A dual-modality emotion recognition system fusing a fine-tuned RoBERTa (text, GoEmotions) and EfficientNet-B0 (facial, FER-2013) via confidence-weighted late fusion — reaching ~74% accuracy across the 7 Ekman emotions.",
    stack: ["RoBERTa", "EfficientNet-B0", "PyTorch", "Late Fusion", "GoEmotions", "FER-2013"],
    color: "#f76a6a",
  },
  {
    title: "SmartPaste",
    tag: "Developer Tool",
    description:
      "A developer utility for the snippets you copy all day. Paste anything and it works out what you've got — JSON, CSV, a URL, Base64 or code — then offers only the transforms that make sense, with an AI 'Explain' that summarises what you're looking at in a few sentences.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Claude API"],
    color: "#00c2a8",
    links: { code: "https://github.com/Dakshmehrotraa/smart-paste", demo: "https://smart-paste-kohl.vercel.app" },
  },
];

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "AI / ML",
    items: [
      "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face Transformers",
      "RoBERTa", "EfficientNet", "LoRA / PEFT", "XGBoost", "FAISS",
      "RAG", "LLM Agents & Tool Use", "SHAP", "OpenCV", "MFCC / Mel Spectrograms",
    ],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "SQL", "MongoDB"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Tooling & Data",
    items: ["Git", "Docker", "Streamlit", "Qdrant", "Groq / Anthropic APIs", "Pandas", "NumPy"],
  },
];

const highlights = [
  { k: "🏆", v: "Hackathon", s: "Schneider Electric HMI" },
  { k: "7+", v: "Projects", s: "AI/ML · Full-Stack · Security" },
  { k: "∞", v: "Full-Stack", s: "PyTorch → FastAPI → Next.js" },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const GITHUB = "https://github.com/Dakshmehrotraa";
const LINKEDIN = "https://www.linkedin.com/in/dakshmehrotra";
const EMAIL = "dakshmehrotra01@gmail.com";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle constellation background
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 640 ? 45 : 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,106,247,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,106,247,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Scroll-reveal for sections
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #09090f;
          --surface: #111118;
          --border: rgba(255,255,255,0.07);
          --accent: #7c6af7;
          --accent2: #f76a6a;
          --gold: #f2b53c;
          --text: #e8e8f0;
          --muted: #6b6b80;
          --font-display: 'Syne', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: var(--font-display); overflow-x: hidden; }

        .canvas-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .content { position: relative; z-index: 1; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.2rem 3rem; border-bottom: 1px solid var(--border);
          background: rgba(9,9,15,0.7); backdrop-filter: blur(16px);
        }
        .nav-logo { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text); }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a {
          font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted);
          text-decoration: none; transition: color 0.2s; letter-spacing: 0.05em;
        }
        .nav-links a:hover { color: var(--text); }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 3rem 4rem; max-width: 980px;
        }
        .hero-tag {
          font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(20px); animation: fadeUp 0.6s 0.1s forwards;
        }
        .hero h1 {
          font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1.0;
          letter-spacing: -0.03em; margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(30px); animation: fadeUp 0.7s 0.2s forwards;
        }
        .hero h1 .highlight {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub {
          font-size: 1.1rem; color: var(--muted); line-height: 1.7; max-width: 600px; margin-bottom: 2.2rem;
          opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s 0.35s forwards;
        }
        .hero-sub strong { color: #b0b0c8; font-weight: 600; }
        .hero-links {
          display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;
          opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s 0.5s forwards;
        }
        .btn {
          display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem;
          border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem; font-weight: 500;
          text-decoration: none; transition: all 0.2s; letter-spacing: 0.02em; cursor: pointer;
        }
        .btn-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
        .btn-primary:hover { background: #6a58e0; transform: translateY(-2px); }
        .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border); }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
        .icon-btn {
          display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px;
          border-radius: 8px; border: 1px solid var(--border); color: var(--muted); transition: all 0.2s;
        }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* HIGHLIGHTS */
        .highlights {
          display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 3rem;
          opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s 0.65s forwards;
        }
        .hl {
          display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem 1.2rem;
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px; min-width: 190px;
        }
        .hl-k { font-size: 1.5rem; font-weight: 800; line-height: 1; }
        .hl-v { font-size: 0.9rem; font-weight: 700; }
        .hl-s { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); margin-top: 0.15rem; }

        /* SECTIONS */
        section { padding: 6rem 3rem; max-width: 980px; margin: 0 auto; }
        .section-label {
          font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .section-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 3rem; }

        /* reveal */
        .reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.in-view { opacity: 1; transform: none; }

        /* ABOUT */
        .about-text { font-size: 1.05rem; line-height: 1.85; color: #b0b0c8; max-width: 720px; }
        .about-text strong { color: var(--text); }

        /* PROJECTS */
        .projects-grid { display: grid; gap: 1.5rem; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
          padding: 2rem; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          position: relative; overflow: hidden;
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--card-color), transparent); opacity: 0.85;
        }
        .project-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 40%, transparent);
          transform: translateY(-4px);
          box-shadow: 0 18px 50px -24px var(--card-color);
        }
        .project-card.featured {
          border-color: color-mix(in srgb, var(--gold) 35%, transparent);
          background: linear-gradient(180deg, rgba(242,181,60,0.05), var(--surface) 60%);
        }
        .project-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
        .project-title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; }
        .project-tag {
          font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); letter-spacing: 0.04em;
          padding: 0.3rem 0.7rem; border: 1px solid var(--border); border-radius: 100px; white-space: nowrap;
        }
        .project-card.featured .project-tag { color: var(--gold); border-color: color-mix(in srgb, var(--gold) 40%, transparent); }
        .project-meta { font-family: var(--font-mono); font-size: 0.68rem; color: var(--gold); margin-bottom: 1rem; letter-spacing: 0.03em; }
        .project-desc { font-size: 0.92rem; line-height: 1.75; color: #8888a0; margin-bottom: 1.3rem; }
        .stack-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .stack-tag {
          font-family: var(--font-mono); font-size: 0.7rem; padding: 0.25rem 0.6rem;
          background: rgba(124,106,247,0.08); color: var(--accent);
          border-radius: 4px; border: 1px solid rgba(124,106,247,0.15);
        }
        .card-links { display: flex; gap: 0.75rem; margin-top: 1.3rem; flex-wrap: wrap; }
        .card-link {
          display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono);
          font-size: 0.74rem; color: var(--text); text-decoration: none; padding: 0.45rem 0.85rem;
          border: 1px solid var(--border); border-radius: 6px; transition: all 0.2s;
        }
        .card-link:hover { border-color: var(--accent); color: var(--accent); }
        .card-link.primary { background: rgba(124,106,247,0.12); border-color: rgba(124,106,247,0.3); }

        /* SKILLS */
        .skill-group { margin-bottom: 1.8rem; }
        .skill-group-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.8rem; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .skill-pill {
          font-family: var(--font-mono); font-size: 0.78rem; padding: 0.4rem 0.9rem;
          background: var(--surface); border: 1px solid var(--border); border-radius: 100px;
          color: var(--muted); transition: all 0.2s; cursor: default;
        }
        .skill-pill:hover { border-color: var(--accent); color: var(--text); background: rgba(124,106,247,0.08); }

        /* CONTACT */
        .contact-box { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 3rem; text-align: center; }
        .contact-box h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
        .contact-box p { color: var(--muted); font-size: 0.95rem; margin-bottom: 2rem; font-family: var(--font-mono); }
        .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* FOOTER */
        footer {
          display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
          padding: 2rem 3rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted);
          border-top: 1px solid var(--border); max-width: 980px; margin: 0 auto;
        }
        .footer-socials { display: flex; gap: 0.75rem; }

        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 640px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { gap: 1.2rem; }
          .nav-links a:nth-child(3) { display: none; }
          .hero { padding: 7rem 1.5rem 3rem; }
          section { padding: 4rem 1.5rem; }
          .contact-box { padding: 2rem 1.5rem; }
          .hl { min-width: 100%; }
          footer { padding: 2rem 1.5rem; flex-direction: column; }
        }
      `}</style>

      <canvas ref={canvasRef} className="canvas-bg" />

      <div className="content">
        {/* NAV */}
        <nav>
          <div className="nav-logo">Daksh Mehrotra<span>.</span></div>
          <div className="nav-links">
            <a href="#about">about</a>
            <a href="#projects">projects</a>
            <a href="#skills">skills</a>
            <a href="#contact">contact</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-tag">// CS Student · AI/ML + Full-Stack Engineer</div>
          <h1>
            Building systems<br />
            that <span className="highlight">understand</span><br />
            humans.
          </h1>
          <p className="hero-sub">
            I&apos;m Daksh Mehrotra — a computer science student building at the intersection of
            machine intelligence and human experience. I work across <strong>multimodal AI and
            affective computing</strong>, <strong>agentic LLM tools</strong>, and <strong>full-stack
            products</strong> — from training PyTorch models to shipping FastAPI &amp; Next.js apps.
          </p>
          <div className="hero-links">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href={`mailto:${EMAIL}`} className="btn btn-outline">Get in touch</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub"><GitHubIcon /></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${EMAIL}`} className="icon-btn" aria-label="Email"><MailIcon /></a>
          </div>

          <div className="highlights">
            {highlights.map((h) => (
              <div className="hl" key={h.v}>
                <span className="hl-k">{h.k}</span>
                <span>
                  <span className="hl-v">{h.v}</span>
                  <span className="hl-s" style={{ display: "block" }}>{h.s}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="reveal">
          <div className="section-label">01 · about</div>
          <div className="section-title">Who I am</div>
          <p className="about-text">
            I&apos;m a CS student deeply interested in <strong>multimodal AI systems</strong> —
            models that perceive and reason across text, audio and vision at once — and in the
            <strong> agentic LLM tooling</strong> that puts them to work. My projects span
            <strong> emotion recognition, psychological screening, industrial AI and security</strong>,
            and most recently won the <strong>Schneider Electric HMI Hackathon</strong>.
            <br /><br />
            I like owning the whole stack: training neural networks and fine-tuning transformers
            with LoRA, standing up <strong>FastAPI backends and Next.js / React frontends</strong>,
            and wiring in retrieval, evaluation and clean APIs. I care about building things that
            are technically rigorous and genuinely useful.
          </p>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="reveal">
          <div className="section-label">02 · projects</div>
          <div className="section-title">What I&apos;ve built</div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div
                key={p.title}
                className={`project-card${p.featured ? " featured" : ""}`}
                style={{ ["--card-color" as string]: p.color }}
              >
                <div className="project-top">
                  <div className="project-title">{p.title}</div>
                  <div className="project-tag">{p.tag}</div>
                </div>
                {p.meta && <div className="project-meta">{p.meta}</div>}
                <p className="project-desc">{p.description}</p>
                <div className="stack-tags">
                  {p.stack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
                {p.links && (
                  <div className="card-links">
                    {p.links.demo && (
                      <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="card-link primary">
                        <ExternalIcon /> Live demo
                      </a>
                    )}
                    {p.links.code && (
                      <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="card-link">
                        <GitHubIcon /> Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="reveal">
          <div className="section-label">03 · skills</div>
          <div className="section-title">My toolkit</div>
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.label}>
              <div className="skill-group-label">{g.label}</div>
              <div className="skills-grid">
                {g.items.map((s) => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}
        <section id="contact" className="reveal">
          <div className="section-label">04 · contact</div>
          <div className="contact-box">
            <h3>Let&apos;s work together</h3>
            <p>Open to internships, research collaborations, and interesting projects.</p>
            <div className="contact-links">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary"><MailIcon /> {EMAIL}</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><GitHubIcon /> GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><LinkedInIcon /> LinkedIn</a>
            </div>
          </div>
        </section>

        <footer>
          <span>built by daksh mehrotra · {new Date().getFullYear()}</span>
          <span className="footer-socials">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub"><GitHubIcon /></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${EMAIL}`} className="icon-btn" aria-label="Email"><MailIcon /></a>
          </span>
        </footer>
      </div>
    </>
  );
}
