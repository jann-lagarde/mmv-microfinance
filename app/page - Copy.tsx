"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Home,
  LockKeyhole,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";

import LoanCalculator from "@/components/LoanCalculator";

const MESSENGER_URL = "https://m.me/100077766347870";

const faqs = [
  {
    keywords: ["interest", "rate", "15", "percent", "magkano"],
    question: "How much is the interest?",
    answer:
      "The stated loan interest is 15% per month. Your total repayment depends on the principal amount and selected term. Final terms should be confirmed in your loan agreement.",
  },
  {
    keywords: [
      "term",
      "terms",
      "months",
      "month",
      "1 month",
      "2 month",
      "3 month",
      "4 month",
    ],
    question: "What loan terms are available?",
    answer:
      "MMV currently lists loan terms from 1 month to 4 months. The repayment schedule is aligned with the agreed payroll or cutoff schedule.",
  },
  {
    keywords: [
      "requirement",
      "requirements",
      "documents",
      "id",
      "payslip",
      "atm",
    ],
    question: "What are the requirements?",
    answer:
      "The listed requirements are two valid government IDs, Company ID, your latest 2 to 3 cut-offs of payslips, proof of billing, and an active BPO payroll ATM for the agreed setup.",
  },
  {
    keywords: ["apply", "application", "how", "process", "paano"],
    question: "How do I apply?",
    answer:
      "The process has four stages: KYC evaluation, loan terms acknowledgement, requirements preparation, then Home Credit Investigation and contract signing before the scheduled release.",
  },
  {
    keywords: ["bpo", "call center", "employee", "qualified"],
    question: "Who can apply?",
    answer:
      "MMV's services are designed around BPO and Call Center professionals. Eligibility and final approval are subject to the company's evaluation and applicable requirements.",
  },
  {
    keywords: [
      "computation",
      "calculate",
      "payment",
      "hulog",
      "amortization",
    ],
    question: "How is my payment calculated?",
    answer:
      "The website calculator provides an illustration using the stated 15% monthly interest. For example, a ₱10,000 loan for 2 months has ₱3,000 total interest and ₱13,000 total repayment, or ₱3,250 across four semi-monthly cut-offs.",
  },
  {
    keywords: ["office", "address", "location", "where"],
    question: "Where is the MMV office?",
    answer:
      "MMV Microfinance & Lending is located at B14 L57 PH1 East Bellevue, San Isidro, Rodriguez, Rizal 1860.",
  },
  {
    keywords: ["contact", "phone", "number", "call"],
    question: "How can I contact MMV?",
    answer:
      "You can call 0919 097 6018 or the landline at (02) 8926 2147. You can also use the Messenger button to chat with the team.",
  },
];

const quickQuestions = [
  "What are the requirements?",
  "How much is the interest?",
  "How do I apply?",
  "What loan terms are available?",
];

const steps = [
  {
    number: "01",
    title: "KYC Evaluation",
    text: "Tell us about yourself and let our team evaluate your initial eligibility.",
    icon: UserCheck,
  },
  {
    number: "02",
    title: "Review Your Terms",
    text: "Understand the loan amount, interest, term and repayment schedule.",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Prepare Requirements",
    text: "Prepare the documents needed for verification and processing.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Home CI & Release",
    text: "Our team coordinates the home visit, contract signing and scheduled release.",
    icon: Home,
  },
];

function findFaq(message: string) {
  const lower = message.toLowerCase();

  return faqs.find((faq) =>
    faq.keywords.some((keyword) => lower.includes(keyword))
  );
}

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [messages, setMessages] = useState<
    { from: "bot" | "user"; text: string }[]
  >([
    {
      from: "bot",
      text:
        "Hi! I'm the MMV Concierge 👋 I can answer common questions about rates, requirements, loan terms and the application process.",
    },
  ]);

  const [input, setInput] = useState("");

  function askQuestion(question: string) {
    const faq = findFaq(question);

    setMessages((current) => [
      ...current,
      {
        from: "user",
        text: question,
      },
      {
        from: "bot",
        text:
          faq?.answer ??
          "I don't have enough information to answer that accurately. You can chat directly with the MMV team through Messenger for assistance.",
      },
    ]);
  }

  function sendMessage() {
    const trimmed = input.trim();

    if (!trimmed) return;

    askQuestion(trimmed);
    setInput("");
  }

  function closeMobileMenu() {
    setMobileMenu(false);
  }

  return (
    <>
      {/* ================================
          NAVIGATION
      ================================= */}

      <header className="site-header">
        <div className="container nav">
          <Link href="/" className="brand">
            <div className="brand-symbol">
              <span>M</span>
            </div>

            <div>
              <strong>MMV</strong>
              <small>MICROFINANCE & LENDING</small>
            </div>
          </Link>

          <nav className={`desktop-nav ${mobileMenu ? "mobile-open" : ""}`}>
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>

            <a href="#loans" onClick={closeMobileMenu}>
              Loan Options
            </a>

            <a href="#process" onClick={closeMobileMenu}>
              How It Works
            </a>

            <a href="#requirements" onClick={closeMobileMenu}>
              Requirements
            </a>

            <Link href="/privacy" onClick={closeMobileMenu}>
              Privacy
            </Link>

            <a
              href="#apply"
              className="mobile-nav-cta"
              onClick={closeMobileMenu}
            >
              Apply Now
              <ArrowRight size={16} />
            </a>
          </nav>

          <a href="#apply" className="nav-cta">
            Apply Now
            <ArrowRight size={16} />
          </a>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={22} /> : <ChevronDown size={22} />}
          </button>
        </div>
      </header>

      {/* ================================
          HERO
      ================================= */}

      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />

        <div className="container hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <span />
              BUILT FOR BPO PROFESSIONALS
            </div>

            <h1>
              When payday
              <br />
              isn't quite <em>enough.</em>
            </h1>

            <p className="hero-lead">
              Accessible financial assistance designed around the work,
              schedule and needs of BPO and Call Center professionals.
            </p>

            <div className="hero-buttons">
              <a href="#calculator" className="primary-button">
                Calculate a Loan
                <ArrowRight size={18} />
              </a>

              <button
                className="chat-button"
                onClick={() => setChatOpen(true)}
              >
                <MessageCircle size={18} />
                Ask MMV Concierge
              </button>
            </div>

            <div className="hero-trust">
              <div>
                <Check />
                <span>Clear terms</span>
              </div>

              <div>
                <Check />
                <span>Simple process</span>
              </div>

              <div>
                <Check />
                <span>Privacy focused</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="visual-glow" />

            <div className="hero-info-card">
              <div className="hero-info-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <small>MMV LOAN TERMS</small>
                <strong>15% monthly interest</strong>
                <span>Available terms from 1 to 4 months</span>
              </div>
            </div>

            <div className="hero-main-card">
              <div className="hero-card-top">
                <div className="hero-card-number">01</div>

                <div>
                  <small>DESIGNED AROUND YOU</small>
                  <h3>Simple. Clear. Personal.</h3>
                </div>
              </div>

              <div className="hero-card-line" />

              <div className="hero-card-feature">
                <div>
                  <Clock3 size={18} />
                </div>

                <span>
                  Repayment schedule aligned with your agreed payroll or
                  cutoff schedule.
                </span>
              </div>

              <div className="hero-card-feature">
                <div>
                  <LockKeyhole size={18} />
                </div>

                <span>
                  Personal information handled for legitimate evaluation and
                  processing purposes.
                </span>
              </div>

              <div className="hero-card-feature">
                <div>
                  <MessageCircle size={18} />
                </div>

                <span>
                  Ask the MMV Concierge or connect directly with the team.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================
          TRUST STRIP
      ================================= */}

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <div>
            <ShieldCheck />
            <span>
              <strong>Transparent</strong>
              loan information
            </span>
          </div>

          <div>
            <Clock3 />
            <span>
              <strong>Flexible</strong>
              1 to 4 month terms
            </span>
          </div>

          <div>
            <LockKeyhole />
            <span>
              <strong>Privacy</strong>
              focused process
            </span>
          </div>

          <div>
            <MessageCircle />
            <span>
              <strong>Personal</strong>
              support available
            </span>
          </div>
        </div>
      </section>

      {/* ================================
          ABOUT
      ================================= */}

      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-intro">
            <div>
              <div className="eyebrow-dark">WHY MMV</div>

              <h2>
                Financial help without
                <span> unnecessary complexity.</span>
              </h2>
            </div>

            <p>
              MMV Microfinance & Lending aims to provide accessible and
              transparent lending services for BPO and Call Center
              professionals.
            </p>
          </div>

          <div className="about-bento">
            <div className="bento-main">
              <div className="bento-number">01</div>

              <div>
                <span className="bento-label">OUR VISION</span>

                <h3>
                  A trusted financial partner for the people behind the
                  customer experience.
                </h3>

                <p>
                  Maging pangunahing katuwang at pinakakaraniwang pagpipilian
                  ng mga BPO at Call Center professional sa Pilipinas para sa
                  mabilis, ligtas, at maaasahang tulong-pinansyal.
                </p>
              </div>
            </div>

            <div className="bento-side">
              <span className="bento-label">OUR MISSION</span>

              <p>
                Magbigay ng accessible at transparent na serbisyong pautang
                gamit ang simpleng proseso at ligtas na Payroll ATM setup.
              </p>

              <a href="#process">
                See how it works
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="values">
            <div>
              <span>01</span>
              <h3>Integrity</h3>
              <p>
                Malinaw at walang nakatagong charges sa bawat loan agreement.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Speed & Efficiency</h3>
              <p>
                Mabilis na evaluation at coordinated loan release process.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Customer-Centricity</h3>
              <p>
                Pag-unawa sa natatanging pangangailangan ng BPO workers.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Trust & Security</h3>
              <p>
                Ligtas at maingat na pangangalaga sa sensitibong impormasyon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          CALCULATOR
      ================================= */}

      <LoanCalculator />

      {/* ================================
          LOAN OPTIONS
      ================================= */}

      <section id="loans" className="loan-section">
        <div className="container">
          <div className="loan-heading">
            <div>
              <div className="eyebrow-light">LOAN OPTIONS</div>

              <h2>
                Know the numbers
                <br />
                <span>before you decide.</span>
              </h2>
            </div>

            <p>
              Illustrative examples based on a ₱10,000 principal and the
              stated 15% monthly interest.
            </p>
          </div>

          <div className="loan-cards">
            {[
              {
                month: "01",
                title: "1 Month",
                text: "Short-term financial needs.",
                example: "₱11,500",
              },
              {
                month: "02",
                title: "2 Months",
                text: "Spread repayment across two months.",
                example: "₱13,000",
              },
              {
                month: "03",
                title: "3 Months",
                text: "Balanced repayment across three months.",
                example: "₱14,500",
              },
              {
                month: "04",
                title: "4 Months",
                text: "Longer term with lower payment per cutoff.",
                example: "₱16,000",
              },
            ].map((loan) => (
              <div className="loan-option" key={loan.month}>
                <div className="loan-number">{loan.month}</div>

                <h3>{loan.title}</h3>

                <p>{loan.text}</p>

                <div className="loan-example">
                  <small>₱10K SAMPLE TOTAL</small>
                  <strong>{loan.example}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="rate-notice">
            <Sparkles size={18} />

            <p>
              <strong>Important:</strong> Sample figures are illustrative
              calculations based on the stated 15% monthly interest. They are
              not a loan offer or approval. Final terms, charges, schedules
              and applicable disclosures should be confirmed in the official
              loan agreement.
            </p>
          </div>
        </div>
      </section>

      {/* ================================
          PROCESS
      ================================= */}

      <section id="process" className="section process-section">
        <div className="container">
          <div className="section-intro centered">
            <div>
              <div className="eyebrow-dark">THE PROCESS</div>

              <h2>
                Four steps.
                <span> One clear journey.</span>
              </h2>
            </div>

            <p>
              From initial evaluation to scheduled release, we keep the
              process straightforward.
            </p>
          </div>

          <div className="process-line">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  className="process-step"
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="process-icon">
                    <Icon />
                  </div>

                  <span>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================
          REQUIREMENTS
      ================================= */}

      <section id="requirements" className="requirements-section">
        <div className="container requirements-grid">
          <div className="requirements-copy">
            <div className="eyebrow-dark">BE PREPARED</div>

            <h2>
              Get your documents
              <span> ready.</span>
            </h2>

            <p>
              Prepare clear and valid copies of the required documents for
              verification.
            </p>

            <a href="#apply" className="primary-button">
              Start the Process
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="requirements-list">
            {[
              "Two valid government-issued IDs",
              "Company ID",
              "Latest payslip, last 2 to 3 cut-offs",
              "Proof of billing",
              "Active BPO payroll ATM for the agreed setup",
            ].map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <Check />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          APPLY / CTA
      ================================= */}

      <section id="apply" className="cta-section">
        <div className="container cta-card">
          <div className="cta-decoration decoration-one" />
          <div className="cta-decoration decoration-two" />

          <div className="cta-content">
            <div className="eyebrow-light">READY WHEN YOU ARE</div>

            <h2>
              Let's talk about
              <br />
              what you need.
            </h2>

            <p>
              Have a question before applying? Ask our MMV Concierge or talk
              directly with our team.
            </p>

            <div className="cta-actions">
              <button
                className="white-button"
                onClick={() => setChatOpen(true)}
              >
                <Bot size={18} />
                Ask MMV Concierge
              </button>

              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-button"
              >
                <MessageCircle size={18} />
                Chat on Messenger
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          PRIVACY NOTICE
      ================================= */}

      <section className="privacy-bar">
        <div className="container">
          <LockKeyhole size={22} />

          <div>
            <strong>Your information matters.</strong>

            <p>
              Personal information should only be collected and processed for
              legitimate, declared purposes with appropriate safeguards.
            </p>
          </div>

          <Link href="/privacy">Read Privacy Policy</Link>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}

      <footer>
        <div className="container footer-grid">
          <div>
            <Link href="/" className="brand footer-brand">
              <div className="brand-symbol">
                <span>M</span>
              </div>

              <div>
                <strong>MMV</strong>
                <small>MICROFINANCE & LENDING</small>
              </div>
            </Link>

            <p>
              Accessible and transparent financial assistance for BPO and
              Call Center professionals.
            </p>
          </div>

          <div>
            <h4>Explore</h4>

            <a href="#about">About MMV</a>
            <a href="#loans">Loan Options</a>
            <a href="#process">How It Works</a>
            <a href="#requirements">Requirements</a>
            <Link href="/privacy">Privacy Policy</Link>
          </div>

          <div>
            <h4>Contact</h4>

            <a href="tel:09190976018">
              <Phone size={14} />
              0919 097 6018
            </a>

            <a href="tel:0289262147">
              <Phone size={14} />
              (02) 8926 2147
            </a>

            <span className="footer-address">
              B14 L57 PH1 East Bellevue
              <br />
              San Isidro, Rodriguez
              <br />
              Rizal 1860
            </span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} MMV Microfinance & Lending</span>

          <Link href="/privacy">Privacy Policy</Link>

          <span>
            Website designed and developed by <Link href="https://core-xperts.com" target="_blank">Core Xperts</Link>
          </span>

          <span>
            Website information is subject to applicable agreements and
            disclosures.
          </span>
        </div>
      </footer>

      {/* ================================
          CONCIERGE CHAT
      ================================= */}

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="concierge-window"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
          >
            <div className="concierge-header">
              <div className="concierge-avatar">
                <Bot size={19} />
              </div>

              <div>
                <strong>MMV Concierge</strong>
                <span>FAQ Assistant</span>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                <X size={19} />
              </button>
            </div>

            <div className="chat-body">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.from}`}
                >
                  {message.text}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="quick-questions">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => askQuestion(question)}
                    >
                      {question}
                      <ArrowRight size={13} />
                    </button>
                  ))}
                </div>
              )}

              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="live-agent"
              >
                <MessageCircle size={16} />
                Chat with our team on Messenger
              </a>
            </div>

            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask about MMV..."
                aria-label="Ask MMV Concierge"
              />

              <button onClick={sendMessage} aria-label="Send message">
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!chatOpen && (
        <motion.button
          className="floating-concierge"
          onClick={() => setChatOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-label="Open MMV Concierge"
        >
          <span className="chat-pulse" />
          <Bot size={22} />
          <span>Ask MMV</span>
        </motion.button>
      )}
    </>
  );
}