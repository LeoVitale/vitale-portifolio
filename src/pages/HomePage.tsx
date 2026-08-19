import { CareerSignals } from '../components/home/CareerSignals'
import { Hero } from '../components/home/Hero'
import { SelectedWork } from '../components/home/SelectedWork'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <CareerSignals />
      <SelectedWork />
    </div>
  )
}
