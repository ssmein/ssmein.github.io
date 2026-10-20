import Contact from './components/Contact';
import Credentials from './components/Credentials';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Masthead from './components/Masthead';
import Now from './components/Now';
import Path from './components/Path';
import Toolkit from './components/Toolkit';
import Work from './components/Work';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#now"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-[60] focus:bg-paper focus:px-3 focus:py-2 focus:font-body focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Masthead />

      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero />
        <Now />
        <Work />
        <Path />
        <Toolkit />
        <Credentials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
