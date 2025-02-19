import { useState } from 'react'
import './App.css'
import Carrusel from './assets/components/Carrusel'
import TextLove from './assets/components/TextLove'
import ButtonStart from './assets/components/ButtonStart'

function App() {
  const [view, setView] = useState(false)

  return (
    <>
      <ButtonStart />
      <main className="none">
        <Carrusel />
        <TextLove />

      </main>
    </>
  )
}

export default App
