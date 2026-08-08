import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-indigo-900/5">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
