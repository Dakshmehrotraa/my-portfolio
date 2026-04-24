"use client";
import { useEffect, useRef, useState } from "react";

const skills = [
  "Python", "FastAPI", "Next.js", "TypeScript", "React",
  "PyTorch", "TensorFlow", "scikit-learn", "RoBERTa", "EfficientNet",
  "Pandas", "NumPy", "OpenCV", "MFCC / Mel Spectrograms",
  "REST APIs", "Git", "Node.js", "SQL", "Docker (basics)",
];

const projects = [
  {
    title: "Multimodal Psychological Screening System",
    tag: "Minor Project · Research",
    description:
      "A clinical-grade screening tool combining audio emotion analysis, PHQ-9 / GAD-7 questionnaire scoring, and LLM-generated narrative reports. Built on a FastAPI + Next.js stack with a CNN-Dense hybrid audio model trained on RAVDESS & CREMA-D datasets.",
    stack: ["FastAPI", "Next.js", "PyTorch", "MFCC", "LLM", "PHQ-9/GAD-7"],
    color: "#7c6af7",
  },
  {
    title: "Human-AI Emotion Interaction Analyzer",
    tag: "Deep Learning · Multimodal Fusion",
    description:
      "A dual-modality emotion recognition system fusing fine-tuned RoBERTa (text, GoEmotions) and EfficientNet-B0 (facial, FER-2013) via confidence-weighted late fusion — achieving ~74% accuracy across 7 Ekman emotions.",
    stack: ["RoBERTa", "EfficientNet-B0", "PyTorch", "Late Fusion", "GoEmotions", "FER-2013"],
    color: "#f76a6a",
  },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  // Particle background
  useEffect(() => {
    setVisible(true);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

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
      // Draw connections
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
          --text: #e8e8f0;
          --muted: #6b6b80;
          --font-display: 'Syne', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-display);
          overflow-x: hidden;
        }

        .canvas-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 3rem;
          border-bottom: 1px solid var(--border);
          background: rgba(9,9,15,0.7);
          backdrop-filter: blur(16px);
        }
        .nav-logo {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.05em;
        }
        .nav-links a:hover { color: var(--text); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8rem 3rem 4rem;
          max-width: 900px;
        }
        .hero-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s 0.1s forwards;
        }
        .hero h1 {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.7s 0.2s forwards;
        }
        .hero h1 .highlight {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.1rem;
          color: var(--muted);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.35s forwards;
        }
        .hero-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.5s forwards;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.02em;
          cursor: pointer;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: 1px solid var(--accent);
        }
        .btn-primary:hover { background: #6a58e0; transform: translateY(-2px); }
        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* SECTIONS */
        section {
          padding: 6rem 3rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .section-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 3rem;
        }

        /* ABOUT */
        .about-text {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #b0b0c8;
          max-width: 680px;
        }
        .about-text strong { color: var(--text); }

        /* PROJECTS */
        .projects-grid { display: grid; gap: 1.5rem; }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          transition: border-color 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--card-color), transparent);
          opacity: 0.8;
        }
        .project-card:hover {
          border-color: rgba(124,106,247,0.35);
          transform: translateY(-4px);
        }
        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .project-title {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .project-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.05em;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          white-space: nowrap;
        }
        .project-desc {
          font-size: 0.92rem;
          line-height: 1.75;
          color: #8888a0;
          margin-bottom: 1.5rem;
        }
        .stack-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .stack-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 0.25rem 0.6rem;
          background: rgba(124,106,247,0.08);
          color: var(--accent);
          border-radius: 4px;
          border: 1px solid rgba(124,106,247,0.15);
        }

        /* SKILLS */
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .skill-pill {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.4rem 0.9rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--muted);
          transition: all 0.2s;
          cursor: default;
        }
        .skill-pill:hover {
          border-color: var(--accent);
          color: var(--text);
          background: rgba(124,106,247,0.08);
        }

        /* CONTACT */
        .contact-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
        }
        .contact-box h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .contact-box p {
          color: var(--muted);
          font-size: 0.95rem;
          margin-bottom: 2rem;
          font-family: var(--font-mono);
        }
        .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* FOOTER */
        footer {
          text-align: center;
          padding: 2rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--muted);
          border-top: 1px solid var(--border);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { gap: 1.2rem; }
          .hero { padding: 7rem 1.5rem 3rem; }
          section { padding: 4rem 1.5rem; }
          .contact-box { padding: 2rem 1.5rem; }
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
          <div className="hero-tag">// CS Student · AI/ML Engineer</div>
          <h1>
            Building systems<br />
            that <span className="highlight">understand</span><br />
            humans.
          </h1>
          <p className="hero-sub">
            I'm Daksh Mehrotra — a computer science student passionate about AI based applications , affective computing, and building tools that sit at the intersection of machine intelligence and human experience.
          </p>
          <div className="hero-links">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="https://github.com/Dakshmehrotraa" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
            <a href="https://www.linkedin.com/in/dakshmehrotra" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about">
          <div className="section-label">01 · about</div>
          <div className="section-title">Who I am</div>
          <p className="about-text">
            I'm a CS student deeply interested in <strong>multimodal AI systems</strong> — building models that can perceive and reason across text, audio, and vision simultaneously. My work spans <strong>emotion recognition, psychological screening, and affective computing</strong>, grounded in real clinical frameworks like PHQ-9 and GAD-7.
            <br /><br />
            I enjoy the full stack: from training neural networks in PyTorch and fine-tuning transformers, to shipping clean <strong>FastAPI backends and Next.js frontends</strong>. I care about building things that are both technically rigorous and genuinely useful.
          </p>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-label">02 · projects</div>
          <div className="section-title">What I've built</div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div
                key={p.title}
                className="project-card"
                style={{ ["--card-color" as string]: p.color }}
              >
                <div className="project-top">
                  <div className="project-title">{p.title}</div>
                  <div className="project-tag">{p.tag}</div>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="stack-tags">
                  {p.stack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="section-label">03 · skills</div>
          <div className="section-title">My toolkit</div>
          <div className="skills-grid">
            {skills.map((s) => (
              <span key={s} className="skill-pill">{s}</span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="section-label">04 · contact</div>
          <div className="contact-box">
            <h3>Let's work together</h3>
            <p>Open to internships, research collaborations, and interesting projects.</p>
            <div className="contact-links">
              <a href="mailto:dakshmehrotra01@gmail.com" className="btn btn-primary">dakshmehrotra01@gmail.com</a>
              <a href="https://github.com/Dakshmehrotraa" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
              <a href="https://www.linkedin.com/in/dakshmehrotra" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
            </div>
          </div>
        </section>

        <footer>
          <p>built by daksh mehrotra · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
