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
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Cake Shop</h1>
      <p style={{ marginTop: 0 }}>
        Simple Next.js frontend calling FastAPI.
      </p>
      <ul>
        {cakes.map((c) => (
          <li key={c.name}>
            {c.name} - ₹{c.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
