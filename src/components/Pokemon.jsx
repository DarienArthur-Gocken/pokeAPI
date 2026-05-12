import { useState, useEffect } from "react"

export default function Pokemon() {


    const [APIData, setAPIData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/ditto")
            .then(res => res.json())
            .then(data => {
                setAPIData(data)
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>

    console.log(APIData);

    function getName() {
        const pokemonName = APIData.name
        return <p>{pokemonName}</p>
    }

    function Stats() {
        const pokeStats = APIData.stats.map(stat => <li>{stat.base_stat}</li>)
        return pokeStats
    }

    function Moves() {
        const pokeMoves = APIData.moves.map(move => <li>{move.move.name}</li>)
        return pokeMoves
    }

    function Img() {
        const pokeImg = <img src={ APIData.sprites.front_default }></img>
        return pokeImg
    }

    return (
        <div>
            Pokemon Name: { getName() }
            Image: { Img() }
            Stats: { Stats() }
            Moves: { Moves() }
        </div>
    )
}