import React from 'react'
import DataTable from 'react-data-table-component'
import useStatesInterstateTrade from '../hooks/useInterstateTrade'

interface StateInterstateTradeRow {
    name: string
    totalDollarAmount: number
    totalTons: number
    statesByDollars: [string, number][]
    statesByTons: [string, number][]
}

const columns = [
    {
        name: 'Name',
        selector: (row: StateInterstateTradeRow) => row.name,
    },
    {
        name: 'Total Dollar Amount',
        selector: (row: StateInterstateTradeRow) => row.totalDollarAmount,
    },
    {
        name: 'Total Tons',
        selector: (row: StateInterstateTradeRow) => row.totalTons,
    },
    {
        name: 'Top 5 States in terms of dollars',
        cell: (row: StateInterstateTradeRow) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.statesByDollars.slice(0, 5).map(([state, number]) => {
                        return (
                            <div>
                                {state}: {number}
                            </div>
                        )
                    })}
                </div>
            )
        },
    },
    {
        name: 'Top 5 States in terms of tons',
        cell: (row: StateInterstateTradeRow) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.statesByTons.slice(0, 5).map(([state, number]) => {
                        return (
                            <div>
                                {state}: {number}
                            </div>
                        )
                    })}
                </div>
            )
        },
    },
]

const InterstateTrade = () => {
    const { results, clearFilter, search, nameFilter } =
        useStatesInterstateTrade()

    if (!results) {
        return <div>'Loading interstate trade data...'</div>
    }

    const rows = results.reduce(
        (acc: { [key: string]: StateInterstateTradeRow }, result) => {
            if (acc[result.Origin]) {
                const currentValue = acc[result.Origin]

                acc[result.Origin] = {
                    ...currentValue,
                    totalDollarAmount:
                        currentValue.totalDollarAmount +
                        result['Millions Of Dollars'],
                    totalTons:
                        currentValue.totalTons + result['Thousands Of Tons'],
                    statesByDollars: [
                        ...currentValue.statesByDollars,
                        [
                            result['Destination State'],
                            result['Millions Of Dollars'],
                        ],
                    ],
                    statesByTons: [
                        ...currentValue.statesByTons,
                        [
                            result['Destination State'],
                            result['Thousands Of Tons'],
                        ],
                    ],
                }
                acc[result.Origin].statesByDollars.sort(
                    ([stateNameA, dollarsA], [stateNameB, dollarsB]) =>
                        dollarsB - dollarsA
                )
                acc[result.Origin].statesByTons.sort(
                    ([stateNameA, tonsA], [stateNameB, tonsB]) => tonsB - tonsA
                )
                return acc
            }

            acc[result.Origin] = {
                name: result.Origin,
                totalDollarAmount: result['Millions Of Dollars'],
                totalTons: result['Thousands Of Tons'],
                statesByDollars: [
                    [
                        result['Destination State'],
                        result['Millions Of Dollars'],
                    ],
                ],
                statesByTons: [
                    [result['Destination State'], result['Thousands Of Tons']],
                ],
            }
            return acc
        },
        {}
    )
    console.log(results)

    return (
        <div>
            <div>
                <label htmlFor="state">Search for a state</label>
                <input
                    value={nameFilter}
                    onChange={(evt) => search(evt.target.value)}
                    name="state"
                    type="text"
                />
                <button onClick={clearFilter}>Clear Search</button>
            </div>
            <DataTable
                title="State List"
                columns={columns}
                data={Object.values(rows)}
                progressPending={results === undefined}
                pagination
            />
        </div>
    )
}

export default InterstateTrade
