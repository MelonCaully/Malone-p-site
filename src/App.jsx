import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import GamesSection from './components/GamesSection'
import CredentialsSection from './components/CredentialsSection'
import ContactSection from './components/ContactSection'
import SectionReveal from './components/SectionReveal'
import './App.css'

export default function App() {
  return (
    <div style={{ background: '#0d0d0d', color: '#f0ede8', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero stays sticky — subsequent sections slide over it */}
      <div id="hero" style={{ position: 'sticky', top: 0, zIndex: 0, height: '100vh' }}>
        <HeroSection />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal id="about"       bg="#141414"><AboutSection /></SectionReveal>
        <SectionReveal id="projects"    bg="#0d0d0d"><ProjectsSection /></SectionReveal>
        <SectionReveal id="games"       bg="#0a0a0a"><GamesSection /></SectionReveal>
        <SectionReveal id="credentials" bg="#141414"><CredentialsSection /></SectionReveal>
        <SectionReveal id="contact"     bg="#0d0d0d"><ContactSection /></SectionReveal>
      </div>
    </div>
  )
}
