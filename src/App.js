import React, { useState } from "react";

const features = [
  { icon: "🌱", title: "Crop Care", text: "Get simple crop guidance and farming tips.", key: "crops" },
  { icon: "☁️", title: "Weather", text: "View weather information for your farm.", key: "weather" },
  { icon: "💰", title: "Market Prices", text: "Check useful market price information.", key: "market" },
  { icon: "📍", title: "Locations", text: "Choose your farming location.", key: "locations" },
];

function App() {
  const [screen, setScreen] = useState("welcome");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState("Ravulapalem");
  const [message, setMessage] = useState("");

  const sendOtp = (e) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, "");
    if (clean.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMessage("Demo OTP sent successfully. Use 123456 to continue.");
    setScreen("otp");
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      setMessage("");
      setScreen("dashboard");
    } else {
      setMessage("Invalid OTP. For this demo, enter 123456.");
    }
  };

  const logout = () => {
    setPhone("");
    setOtp("");
    setMessage("");
    setScreen("welcome");
  };

  if (screen === "welcome") {
    return (
      <main className="landing">
        <div className="hero-card">
          <div className="brand-badge">🌾</div>
          <p className="eyebrow">SMART FARMING PLATFORM</p>
          <h1>Smart Agriculture<br /><span>System</span></h1>
          <p className="hero-text">
            Simple digital tools to help farmers understand crops, weather,
            market information and farming locations.
          </p>
          <button className="primary-btn large" onClick={() => setScreen("login")}>
            Get Started <span>→</span>
          </button>
          <div className="trust-row">
            <span>✓ Farmer friendly</span>
            <span>✓ Simple access</span>
            <span>✓ Mobile ready</span>
          </div>
        </div>
      </main>
    );
  }

  if (screen === "login") {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-icon">📱</div>
          <p className="eyebrow">FARMER LOGIN</p>
          <h2>Welcome, Farmer</h2>
          <p className="muted">Login using your mobile number. No password required.</p>

          <form onSubmit={sendOtp}>
            <label htmlFor="phone">Mobile Number</label>
            <div className="phone-input">
              <span>🇮🇳 +91</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength="10"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {message && <div className="notice">{message}</div>}
            <button className="primary-btn full" type="submit">Send OTP</button>
          </form>

          <button className="back-btn" onClick={() => { setMessage(""); setScreen("welcome"); }}>
            ← Back
          </button>
          <p className="small-note">Demo mode: OTP is <b>123456</b></p>
        </section>
      </main>
    );
  }

  if (screen === "otp") {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-icon">🔐</div>
          <p className="eyebrow">VERIFY MOBILE</p>
          <h2>Enter OTP</h2>
          <p className="muted">We sent a 6-digit OTP to +91 {phone}</p>

          <form onSubmit={verifyOtp}>
            <label htmlFor="otp">One-Time Password</label>
            <input
              className="otp-input"
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            {message && <div className="notice">{message}</div>}
            <button className="primary-btn full" type="submit">Verify & Continue</button>
          </form>

          <button className="back-btn" onClick={() => { setOtp(""); setMessage(""); setScreen("login"); }}>
            ← Change number
          </button>
          <p className="small-note">Demo OTP: <b>123456</b></p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="logo">
          <div className="logo-mark">🌾</div>
          <div><strong>Smart Agriculture</strong><small>Farmer Support</small></div>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <section className="dashboard">
        <div className="welcome-panel">
          <div>
            <p className="eyebrow">FARMER DASHBOARD</p>
            <h1>Hello, Farmer 👋</h1>
            <p>Everything you need for smarter farming in one place.</p>
          </div>
          <div className="location-chip">📍 {location}</div>
        </div>

        <div className="quick-title">
          <div>
            <h2>Farm Services</h2>
            <p>Select an option to continue</p>
          </div>
        </div>

        <div className="feature-grid">
          {features.map((item) => (
            <button key={item.key} className="feature-card" onClick={() => setMessage(`${item.title} section selected.`)}>
              <div className="feature-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="arrow">→</span>
            </button>
          ))}
        </div>

        <section className="location-section">
          <div>
            <p className="eyebrow">YOUR FARM LOCATION</p>
            <h2>Choose your location</h2>
            <p className="muted">Location can be used for local weather and farming information.</p>
          </div>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Ravulapalem</option>
            <option>Amalapuram</option>
            <option>Rajahmundry</option>
            <option>Kakinada</option>
            <option>Vijayawada</option>
            <option>Hyderabad</option>
          </select>
        </section>

        {message && <div className="dashboard-notice">{message}</div>}

        <footer>© 2026 Smart Agriculture System • Built for simple, farmer-friendly access</footer>
      </section>
    </main>
  );
}

export default App;