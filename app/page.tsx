export const dynamic = "force-dynamic";

type Cake = {
  name: string;
  price: number;
};

async function getCakes(): Promise<Cake[]> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const res = await fetch(`${apiBase}/cakes`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const cakes = await getCakes();

  return (
    <main className="page">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap");

        :root {
          color-scheme: light;
        }

        * { box-sizing: border-box; }
        body { margin: 0; }

        .page {
          font-family: "Work Sans", "Segoe UI", sans-serif;
          color: #1b1b1b;
          min-height: 100vh;
          background:
            radial-gradient(1200px 500px at 10% -10%, #ffe7d6 0%, transparent 60%),
            radial-gradient(900px 500px at 90% 10%, #dff4ff 0%, transparent 60%),
            #fffaf6;
          padding: 40px 20px 64px;
        }

        .shell {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 28px;
        }

        .hero {
          display: grid;
          gap: 20px;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: clamp(32px, 4vw, 56px);
          margin: 0 0 12px;
          letter-spacing: 0.3px;
        }

        .subtitle {
          margin: 0 0 20px;
          font-size: 16px;
          color: #4f4f4f;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 10px 16px;
          background: #1d1d1d;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .pill.secondary {
          background: #fff;
          color: #1d1d1d;
          border: 1px solid #e5e0db;
          box-shadow: none;
        }

        .hero-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 280px;
          box-shadow: 0 24px 60px rgba(36, 24, 12, 0.18);
          background: #f6efe8;
        }

        .hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.05);
        }

        .hero-card .badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(255,255,255,0.9);
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(12, 1fr);
        }

        .section {
          background: rgba(255,255,255,0.85);
          border: 1px solid #efe7df;
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 18px 40px rgba(34, 20, 6, 0.08);
        }

        .cakes {
          grid-column: span 7;
          display: grid;
          gap: 16px;
        }

        .cakes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cakes-title {
          font-family: "Playfair Display", serif;
          margin: 0;
          font-size: 26px;
        }

        .cake-list {
          display: grid;
          gap: 12px;
        }

        .cake {
          display: grid;
          grid-template-columns: 90px 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid #f0e6de;
        }

        .cake img {
          width: 90px;
          height: 72px;
          object-fit: cover;
          border-radius: 12px;
        }

        .cake h4 {
          margin: 0 0 4px;
          font-size: 16px;
        }

        .cake p {
          margin: 0;
          color: #6a6158;
          font-size: 13px;
        }

        .price {
          font-weight: 700;
          background: #1d1d1d;
          color: #fff;
          padding: 8px 12px;
          border-radius: 12px;
          white-space: nowrap;
        }

        .login {
          grid-column: span 5;
          display: grid;
          gap: 14px;
          align-content: start;
        }

        .login h3 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: 24px;
        }

        .field {
          display: grid;
          gap: 6px;
        }

        .field label {
          font-size: 13px;
          color: #5a5048;
          font-weight: 600;
        }

        .input {
          height: 44px;
          border-radius: 12px;
          border: 1px solid #e7ddd4;
          padding: 0 12px;
          font-size: 14px;
          background: #fff;
        }

        .otp-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
        }

        .btn {
          height: 44px;
          padding: 0 18px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          background: #ff8a3d;
          color: #fff;
          cursor: pointer;
        }

        .btn.ghost {
          background: #fff;
          color: #1d1d1d;
          border: 1px solid #e5dfd8;
        }

        .login small {
          color: #7b726a;
          line-height: 1.5;
        }

        .gallery {
          grid-column: span 12;
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .gallery img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid #efe2d8;
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .cakes, .login {
            grid-column: span 12;
          }
        }
      `}</style>

      <div className="shell">
        <section className="hero">
          <div>
            <h1 className="title">Cake Shop</h1>
            <p className="subtitle">
              Fresh bakes, handcrafted frosting, and same-day delivery.
              A simple Next.js frontend calling FastAPI, now with a sweeter
              look and a quick mobile OTP login.
            </p>
            <div className="hero-actions">
              <a className="pill" href="#">
                Order Today
              </a>
              <a className="pill secondary" href="#">
                View Menu
              </a>
            </div>
          </div>
          <div className="hero-card">
            <img
              src="https://images.unsplash.com/photo-1542826438-7d8b0aa85e6b?auto=format&fit=crop&w=900&q=80"
              alt="Assorted cakes"
              loading="lazy"
            />
            <span className="badge">Bestsellers this week</span>
          </div>
        </section>

        <section className="grid">
          <div className="section cakes">
            <div className="cakes-header">
              <h2 className="cakes-title">Featured Cakes</h2>
              <span>Today&apos;s picks</span>
            </div>
            <div className="cake-list">
              {cakes.map((c) => (
                <div className="cake" key={c.name}>
                  <img
                    src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=300&q=80"
                    alt={c.name}
                    loading="lazy"
                  />
                  <div>
                    <h4>{c.name}</h4>
                    <p>Soft crumb, silky ganache, made today.</p>
                  </div>
                  <div className="price">\u20B9{c.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section login">
            <h3>Login with Mobile OTP</h3>
            <div className="field">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                className="input"
                type="tel"
                placeholder="e.g. 98765 43210"
              />
            </div>
            <div className="otp-row">
              <button className="btn" type="button">
                Send OTP
              </button>
              <button className="btn ghost" type="button">
                Resend
              </button>
            </div>
            <div className="field">
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                className="input"
                type="text"
                placeholder="6-digit code"
              />
            </div>
            <button className="btn" type="button">
              Verify & Login
            </button>
            <small>
              By continuing, you agree to receive a one-time password on your
              phone for quick sign-in.
            </small>
          </div>
        </section>

        <section className="section gallery">
          <img
            src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=500&q=80"
            alt="Chocolate cake slice"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80"
            alt="Berry tart"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1505253216365-7c6f4eb22f73?auto=format&fit=crop&w=500&q=80"
            alt="Creamy cupcake"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=500&q=80"
            alt="Red velvet cake"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
}
