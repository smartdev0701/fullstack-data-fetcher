import { useState, useEffect, useCallback } from 'react'
export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

const useStates = () => {
    const [states, setStates] = useState<StateRow[]>()

    const [nameSearchString, setNameSearchString] = useState<string>('')
    const clearFilter = useCallback(() => {
        setNameSearchString('')
    }, [])
    const search = useCallback((searchString: string) => {
        setNameSearchString(searchString)
    }, [])

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

    if (nameSearchString.trim() !== '' && states) {
        return {
            states: states?.filter((state) =>
            state.name
                    .toLowerCase()
                    .startsWith(nameSearchString.toLowerCase())
            ),
            clearFilter,
            search,
            nameFilter: nameSearchString,
        }
    }

    return { states, clearFilter, search, nameFilter: nameSearchString }
}

export default useStates
