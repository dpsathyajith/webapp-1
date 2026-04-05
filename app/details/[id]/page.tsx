import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

type Garment = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

async function getGarment(id: string): Promise<Garment | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const res = await fetch(`${apiBase}/cakes/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function DetailsPage({ params }: { params: { id: string } }) {
  const garment = await getGarment(params.id);

  if (!garment) {
    notFound();
  }

  return (
    <main className="details-page">
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

        .details-page {
          min-height: 100vh;
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

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          transition: opacity 0.3s;
        }
        
        .nav-link:hover { opacity: 0.6; }

        .product-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .product-image {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--border);
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        }

        .product-image img {
          width: 100%;
          display: block;
          object-fit: cover;
          aspect-ratio: 3/4;
        }

        .product-info {
          display: flex;
          flex-direction: column;
        }

        .category {
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .title {
          font-family: 'Bodoni Moda', serif;
          font-size: 42px;
          margin: 0 0 16px;
          line-height: 1.1;
        }

        .price {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 32px;
        }

        .description {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 40px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        .pincode-checker {
          background: #fff;
          padding: 24px;
          border-radius: 8px;
          border: 1px solid var(--border);
          margin-bottom: 40px;
        }

        .pincode-checker h4 {
          margin: 0 0 12px;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pincode-checker p {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0 0 16px;
          line-height: 1.4;
        }

        .pincode-form {
          display: flex;
          gap: 12px;
        }

        .input {
          flex: 1;
          height: 48px;
          padding: 0 16px;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
        }

        .btn-check {
          background: var(--bg);
          border: 1px solid var(--accent);
          color: var(--accent);
          height: 48px;
          padding: 0 24px;
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-check:hover {
          background: var(--accent);
          color: #fff;
        }

        .actions {
          display: flex;
          gap: 16px;
        }

        .btn-add {
          flex: 1;
          background: var(--accent);
          color: #fff;
          border: none;
          height: 56px;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .btn-add:hover { opacity: 0.85; }

        @media (max-width: 900px) {
          .product-container {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
        }
      `}</style>
      
      <header>
        <Link href="/" className="nav-link">← Back</Link>
        <div className="brand">Vogue</div>
        <div>
          <span className="nav-link">Bag (0)</span>
        </div>
      </header>

      <div className="product-container">
        <div className="product-image">
          <img src={garment.image} alt={garment.name} />
        </div>
        <div className="product-info">
          <div className="category">{garment.category}</div>
          <h1 className="title">{garment.name}</h1>
          <div className="price">\u20B9{garment.price.toLocaleString()}</div>
          
          <div className="description">
            {garment.description}
          </div>

          <div className="pincode-checker">
            <h4>Check Delivery</h4>
            <p>Enter your 6-digit PIN code to check delivery time and payment options.</p>
            <div className="pincode-form">
              <input type="text" className="input" placeholder="Enter PIN code" maxLength={6} />
              <button className="btn-check" type="button">Check</button>
            </div>
          </div>

          <div className="actions">
            <button className="btn-add" type="button">Add to Bag</button>
          </div>
        </div>
      </div>
    </main>
  );
}
