import { useState, useEffect } from "react"

export default function APIFetcher() {
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

    return (
        <div>{ getName() }</div>
    )
}

