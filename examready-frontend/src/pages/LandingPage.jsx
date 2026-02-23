import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import "./LandingPage.css";

const FEATURES = [
  { icon: "🎯", title: "Targeted Practice",   desc: "Select specific subjects and topics to focus on your weak areas and build mastery where it matters most." },
  { icon: "⚡", title: "Instant Feedback",    desc: "Get immediate results with detailed explanations for every question, so you learn from every attempt." },
  { icon: "📊", title: "Progress Tracking",   desc: "Monitor your improvement over time with visual dashboards that highlight growth and areas needing attention." },
  { icon: "🌍", title: "African Curriculum",  desc: "Questions aligned with national exam syllabi across East, West, and Southern Africa." },
  { icon: "📱", title: "Study Anywhere",      desc: "Access ExamReady on any device — your preparation continues whether you're at home or on the go." },
  { icon: "🆓", title: "Completely Free",     desc: "Every feature is free for all students. No subscriptions, no paywalls — just quality exam preparation." },
];

function LandingPage({ setPage }) {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">For High School Students Across Africa</div>
          <h1>Prepare Smarter.<br />Pass with <em>Confidence.</em></h1>
          <p>
            ExamReady gives every student access to structured exam practice, instant feedback,
            and progress tracking — completely free, built for African syllabi.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => setPage("auth")}>
              Start Practising Free →
            </button>
            <button className="btn btn-outline" onClick={() => setPage("quiz")}>
              Try a Sample Quiz
            </button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-val">5,000+</div><div className="stat-lbl">Practice Questions</div></div>
            <div><div className="stat-val">12+</div><div className="stat-lbl">Subjects Covered</div></div>
            <div><div className="stat-val">Free</div><div className="stat-lbl">Always &amp; Forever</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-label">Why ExamReady</div>
        <div className="section-title">Everything you need to excel</div>
        <div className="section-sub">Purpose-built for the African student experience</div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to ace your exams?</h2>
        <p>Join thousands of students already using ExamReady to prepare smarter.</p>
        <button className="btn btn-gold" onClick={() => setPage("auth")}>
          Create Your Free Account
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;