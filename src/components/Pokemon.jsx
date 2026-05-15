import { useState, useEffect } from "react"

const capitalize = str => {
    return (
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
};

function PokemonName({ name }) {
    return <p>{name}</p>
}

function PokemonStats({ stats }) {
    return (
        <ul>
            {stats.map(stat =>
                <li key={stat.stat.name}>
                    <strong>{capitalize(stat.stat.name)}:</strong> {stat.base_stat}
                </li>)
            }
        </ul>
    )
}

function PokemonMoves({ moves }) {
    return (
        <ul>
            {moves.map(move =>
                <li key={move.move.name}>
                    {capitalize(move.move.name)}
                </li>)
            }
        </ul>
    )
}

function PokemonImage({ sprite, name }) {
    return <img src={sprite} alt={name} />
}

function PokemonHeight({ height }) {
    return <p><strong>Height:</strong> {height / 10} m</p>
}

function PokemonWeight({ weight }) {
    return <p><strong>Weight:</strong> {weight / 10} kg</p>
}

function PokemonAbilities({ abilities }) {
    const hiddenAbilities = abilities.filter(ability => ability.is_hidden)
    const notHiddenAbilities = abilities.filter(ability => !ability.is_hidden)

    return (
        <div>
            <h3> Main Abilities</h3>
            <ul>
                {notHiddenAbilities.map(ability =>
                    <li key={ability.ability.name}>
                        {capitalize(ability.ability.name)}
                    </li>)
                }
            </ul>
            
            <h3> Hidden Abilities</h3>
            <ul>
                {hiddenAbilities.map(ability =>
                    <li key={ability.ability.name}>
                        {capitalize(ability.ability.name)}
                    </li>)
                }
            </ul>
        </div>
    )
}


export default function Pokemon({ pokemonId }) {

    const [APIData, setAPIData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const id = pokemonId.trim().toLowerCase()
        if (!id) return

        setLoading(true)
        setError('')

        const cachedPokemon = localStorage.getItem(id)
        if (cachedPokemon) {
            setAPIData(JSON.parse(cachedPokemon))
            setLoading(false)
            return
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Pokemon not found')
                }
                return res.json()
            })
            .then(data => {
                setAPIData(data)
                localStorage.setItem(id, JSON.stringify(data))
            })
            .catch(err => {
                setError(err.message)
                setAPIData(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [pokemonId])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!APIData) return <p>No data available.</p>

    return (
        <div className="pokemon-card">
            <h2>Pokemon Name</h2>
            <PokemonName name={APIData.name} />
            <PokemonImage
                sprite={APIData.sprites.front_default}
                name={APIData.name}
            />
            <PokemonHeight height={APIData.height} />
            <PokemonWeight weight={APIData.weight} />

            <h2>Stats</h2>
            <PokemonStats stats={APIData.stats} />

            <h2>Abilities</h2>
            <PokemonAbilities abilities={APIData.abilities} />

            <h2>Moves</h2>
            <PokemonMoves moves={APIData.moves} />
        </div>
    )
}