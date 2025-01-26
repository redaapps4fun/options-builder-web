import Navbar from '../components/navbar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="">
      <Navbar />

      {children}
    </main>
  );
}
