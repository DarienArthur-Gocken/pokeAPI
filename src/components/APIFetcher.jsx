import { useState, useEffect } from "react"

export default function APIFetcher() {
    const [APIData, setAPIData] = useState([])

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/ditto")
            .then(res => res.json())
            .then(data => setAPIData(data))
    }, [])

    console.log(APIData);
}

