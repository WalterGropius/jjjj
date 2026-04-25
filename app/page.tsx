import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Nav } from '@/components/Nav'
import { ServicesSection } from '@/components/ServicesSection'
import { SpaceSection } from '@/components/SpaceSection'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="pt-0">
        <Hero />
        <AboutSection />
        <Marquee />
        <ServicesSection />
        <SpaceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
