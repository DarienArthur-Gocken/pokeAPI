import "./Header.css"

export default function Header({ query, setQuery, onSearch }) {
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <header>
            <input
                type="text"
                className="searchInput"
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Pokémon by name"
            />
            <button className="searchBtn" onClick={onSearch}>
                Submit
            </button>
        </header>
    )
}