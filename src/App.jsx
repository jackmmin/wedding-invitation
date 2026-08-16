import { sections } from './sections'
import MusicPlayer from './components/MusicPlayer'
import { invitation } from './config/invitation.config'

export default function App() {
  return (
    <div className="bg-white text-stone-800 font-sans max-w-md mx-auto shadow-sm min-h-screen divide-y divide-stone-100">
      {sections.map((Section, i) => (
        <Section key={i} />
      ))}
      <MusicPlayer src={invitation.music.src} />
    </div>
  )
}
