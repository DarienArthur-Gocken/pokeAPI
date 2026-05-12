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
                    {capitalize(stat.stat.name)} - {stat.base_stat}
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
    return <p>Height: {height / 10} m</p>
}

function PokemonWeight({ weight }) {
    return <p>Weight: {weight} kg</p>
}

function PokemonAbilities({ abilities }) {
    const hiddenAbilities = abilities.filter(ability => ability.is_hidden)
    const notHiddenAbilities = abilities.filter(ability => !ability.is_hidden)

    return (
        <div>
            <h3> Abilities</h3>
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


export default function Pokemon() {

    const [APIData, setAPIData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cachedPokemon = localStorage.getItem("ditto")

        if (cachedPokemon) {
            setAPIData(JSON.parse(cachedPokemon))
            setLoading(false)
            return
        }
        fetch("https://pokeapi.co/api/v2/pokemon/ditto")
            .then(res => res.json())
            .then(data => {
                setAPIData(data)

                localStorage.setItem("ditto", JSON.stringify(data))
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>

    console.log(APIData);


    return (
        <div>
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