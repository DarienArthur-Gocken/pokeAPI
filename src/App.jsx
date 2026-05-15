import './App.css'
import { useState } from 'react'
import Header from './components/Header.jsx'
import Pokemon from './components/Pokemon.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [query, setQuery] = useState('')
  const [pokemonId, setPokemonId] = useState('ditto')

  const handleSearch = () => {
    const formattedQuery = query.trim().toLowerCase()
    if (!formattedQuery) return
    setPokemonId(formattedQuery)
  }

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
      <Pokemon pokemonId={pokemonId} />
      <Footer />
    </>
  )
}

export default App
