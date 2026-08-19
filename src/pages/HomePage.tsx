import { CareerSignals } from '../components/home/CareerSignals'
import { Hero } from '../components/home/Hero'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <CareerSignals />
    </div>
  )
}
