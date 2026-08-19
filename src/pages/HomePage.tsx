import { CareerSignals } from '../components/home/CareerSignals'
import { CareerTimeline } from '../components/home/CareerTimeline'
import { CurrentChapter } from '../components/home/CurrentChapter'
import { Hero } from '../components/home/Hero'
import { SelectedWork } from '../components/home/SelectedWork'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <CareerSignals />
      <SelectedWork />
      <CareerTimeline />
      <CurrentChapter />
    </div>
  )
}
