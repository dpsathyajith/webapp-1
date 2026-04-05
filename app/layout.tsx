export const metadata = {
  title: "Clothiq | ക്ലോത്തിക്",
  description: "Next.js frontend for premium garments shopping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
