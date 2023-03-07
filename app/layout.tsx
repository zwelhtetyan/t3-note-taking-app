import './globals.css';

export const metadata = {
  title: 'Blog | Nextjs',
  description:
    'Fullstack blog application using nextjs, prisma, typescript and more...',
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
