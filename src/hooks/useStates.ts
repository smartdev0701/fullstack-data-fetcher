import { useEffect, useState } from 'react'

export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

const useStates = () => {
    const [states, setStates] = useState<StateRow[]>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://topaz.datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000'
            )
            const data = await response.json()
            setStates(data.results)
        }
        fetchData()
    }, [])

    return {states}
}

export default useStates
