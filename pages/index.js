
import Footer from './components/footer';
import Header from './components/header';
import Hero from './components/Hero';
import ThemeToggle from './components/ThemeToggle';
import Way from './components/waytohistory';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header/>
        <Hero/>
        <ThemeToggle/>
      </div>
      
      <Footer/>
    </div>
  );
}
