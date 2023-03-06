import './globals.css';

export const metadata = {
  title: 'Fullstack | Nextjs',
  description: 'Fullstack application using nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
