import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { Cursor } from '@/components/Cursor'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Nav } from '@/components/Nav'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ServicesSection } from '@/components/ServicesSection'
import { SpaceSection } from '@/components/SpaceSection'

export default function HomePage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
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
