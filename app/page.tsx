export const dynamic = "force-dynamic";
import Link from 'next/link';

type Garment = {
  id: string;
  name: string;
  category: "saree" | "churidhar" | "jeans" | "top";
  price: number;
  description: string;
  image: string;
};

async function getGarments(): Promise<Garment[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  // Keeping the connection/URL the same as requested
  const res = await fetch(`${apiBase}/cakes`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const garments = await getGarments();

  const sarees = garments.filter(g => g.category === 'saree');
  const churidhars = garments.filter(g => g.category === 'churidhar');
  const jeans = garments.filter(g => g.category === 'jeans');
  const tops = garments.filter(g => g.category === 'top');

  const categories = [
    { title: "Sarees", data: sarees },
    { title: "Churidhars", data: churidhars },
    { title: "Jeans", data: jeans },
    { title: "Tops", data: tops },
  ];

  return (
    <main className="page">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;600;700&family=Inter:wght@300;400;500;600&display=swap");

        :root {
          --bg: #fafafa;
          --text-main: #111111;
          --text-muted: #666666;
          --accent: #222222;
          --border: #eaeaea;
        }

        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); color: var(--text-main); font-family: 'Inter', sans-serif; }
        a { text-decoration: none; color: inherit; }

        .page {
          min-height: 100vh;
          padding-bottom: 80px;
        }

        header {
          padding: 24px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          font-family: 'Bodoni Moda', serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hero {
          position: relative;
          height: 70vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80') center/cover;
          opacity: 0.85;
          z-index: -1;
        }
        
        .hero::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(250,250,250,0.2), var(--bg));
          z-index: -1;
        }

        .hero-content {
          max-width: 800px;
          padding: 40px;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(40px, 6vw, 76px);
          margin: 0 0 16px;
          font-weight: 600;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #333;
          margin-bottom: 32px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          padding: 16px 36px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          border-radius: 4px;
          transition: all 0.3s ease;
          border: 1px solid var(--accent);
        }

        .btn-primary:hover {
          background: transparent;
          color: var(--accent);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px;
          margin-top: -40px;
          position: relative;
          z-index: 10;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .section-title {
          font-family: 'Bodoni Moda', serif;
          font-size: 32px;
          margin: 0 0 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 32px;
        }

        .card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid var(--border);
          color: var(--text-main);
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .card-img-wrapper {
          position: relative;
          width: 100%;
          padding-top: 130%; 
          overflow: hidden;
        }

        .card img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .card:hover img {
          transform: scale(1.05);
        }

        .card-details {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-name {
          font-size: 15px;
          font-weight: 500;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .card-price {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
        }

        .login-box {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .login-title {
          font-family: 'Bodoni Moda', serif;
          font-size: 24px;
          margin: 0 0 8px;
        }
        
        .login-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.3s;
          background: var(--bg);
        }

        .input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .btn-full {
          width: 100%;
          background: var(--accent);
          color: #fff;
          border: none;
          height: 48px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.3s;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .btn-full:hover {
          opacity: 0.85;
        }

        .otp-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
          .sidebar {
            position: relative;
            top: 0;
            order: -1;
          }
        }
      `}</style>

      <header>
        <div className="brand">Vogue</div>
        <div>
          <span>Bag (0)</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">The Fall Edit</h1>
          <p className="hero-subtitle">Discover the new standard in modern elegance. Premium fabrics hand-picked for the season.</p>
          <a href="#collections" className="btn-primary">Shop Collection</a>
        </div>
      </section>

      <div className="container" id="collections">
        <div className="main-content">
          {categories.map((cat) => (
            cat.data.length > 0 && (
              <section key={cat.title}>
                <h2 className="section-title">{cat.title}</h2>
                <div className="grid">
                  {cat.data.map((item) => (
                    <Link href={`/details/${item.id}`} key={item.id} className="card">
                      <div className="card-img-wrapper">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                      <div className="card-details">
                        <h3 className="card-name">{item.name}</h3>
                        <div className="card-price">\u20B9{item.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>

        <aside className="sidebar">
          <div className="login-box">
            <h3 className="login-title">Sign In</h3>
            <p className="login-subtitle">Unlock personalized recommendations and faster checkout with your mobile number.</p>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" className="input" type="tel" placeholder="+91" />
            </div>
            
            <button className="btn-full" type="button">Send OTP</button>

            <div style={{ marginTop: '24px', opacity: 0.5, pointerEvents: 'none' }}>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input id="otp" className="input" type="text" placeholder="----" />
              </div>
              <button className="btn-full" type="button" style={{ background: '#000', color: '#fff' }}>Verify</button>
            </div>
            
            <div className="otp-actions">
              <button className="btn-text" type="button">Resend Code</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
