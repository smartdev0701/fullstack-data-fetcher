import React from 'react'
import DataTable from 'react-data-table-component'
import useStates, { StateRow } from '../hooks/useStates'

const columns = [
    {
        name: 'Id',
        selector: (row: StateRow) => row.id,
    },
    {
        name: 'Key',
        selector: (row: StateRow) => row.key,
    },
    {
        name: 'Name',
        selector: (row: StateRow) => row.name,
    },
    {
        name: 'Slug',
        selector: (row: StateRow) => row.slug,
    },
    {
        name: 'Example API Endpoint',
        cell: (row: StateRow) => (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://datausa.io/api/data?Geography=${row.key}&Nativity=2&measure=Total%20Population,Total%20Population%20MOE%20Appx&drilldowns=Birthplace&properties=Country%20Code`}
            >
                Population Example
            </a>
        ),
    },
]
const StateSearch = () => {
    const { states } = useStates()

    if (!states) {
        return <div>'Loading states...'</div>
    }

    return (
        <DataTable
            title="State List"
            columns={columns}
            data={states}
            progressPending={states === undefined}
            pagination
        />
    )
}

export default StateSearch
