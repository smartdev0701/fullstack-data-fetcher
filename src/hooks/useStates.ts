import { useEffect, useState } from 'react'

export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

const useStates = () => {
    const [results, setResults] = useState<StateRow[]>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://topaz.datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000'
            )
            const data = await response.json()
            setResults(data.results)
        }
        fetchData()
    }, [])

    return results
}

export default useStates
