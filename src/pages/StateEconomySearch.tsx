import React from 'react'
import DataTable from 'react-data-table-component'
import useStateEconomy, { StateEconomyResult } from '../hooks/useStateEconomy'

const baseColumns = [
    {
        name: 'Name',
        selector: (row: StateEconomyResult) => row.name,
    },
]

const economyColumns = [
    {
        name: 'Total Dollar Amount',
        selector: (row: StateEconomyResult) =>
            row.tradeSummary?.totalDollarAmount,
    },
    {
        name: 'Total Tons',
        selector: (row: StateEconomyResult) => row.tradeSummary?.totalTons,
    },
    {
        name: 'Top 5 States in terms of dollars',
        cell: (row: StateEconomyResult) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.tradeSummary?.statesByDollars
                        .slice(0, 5)
                        .map(({ name, amount }) => {
                            return (
                                <div>
                                    {name}: {amount}
                                </div>
                            )
                        })}
                </div>
            )
        },
    },
    {
        name: 'Top 5 States in terms of tons',
        cell: (row: StateEconomyResult) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.tradeSummary?.statesByTons
                        .slice(0, 5)
                        .map(({ name, amount }) => {
                            return (
                                <div>
                                    {name}: {amount}
                                </div>
                            )
                        })}
                </div>
            )
        },
    },
]

const productionColumns = [
    {
        name: 'Top 5 Industries by dollars',
        cell: (row: StateEconomyResult) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.productionSummary?.productionTypeByDollars
                        .slice(0, 5)
                        .map(({ name, amount }) => {
                            return (
                                <div>
                                    {name}: {amount}
                                </div>
                            )
                        })}
                </div>
            )
        },
    },
    {
        name: 'Top 5 industries by tons',
        cell: (row: StateEconomyResult) => {
            return (
                <div style={{ marginTop: '.2rem', marginBottom: '.2rem' }}>
                    {row.productionSummary?.productionTypeByTons
                        .slice(0, 5)
                        .map(({ name, amount }) => {
                            return (
                                <div>
                                    {name}: {amount}
                                </div>
                            )
                        })}
                </div>
            )
        },
    },
]

const employmentColumns = [
    {
        name: 'Top Industry by Average Salary',
        selector: (row: StateEconomyResult) =>
            row.employmentSummary?.topIndustryByAverageSalary.industry,
    },
    {
        name: 'Top Industry by Employee Count',
        selector: (row: StateEconomyResult) =>
            row.employmentSummary?.topIndustryByAverageSalary.industry,
    },
]

const StateEconomySearch = () => {
    const {
        results,
        clearFilter,
        search,
        nameFilter,
        setSummariesToFetch,
        summariesToFetch,
    } = useStateEconomy()

    if (!results) {
        return <div>'Loading state economy data...'</div>
    }
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
            <div>
                <input
                    checked={summariesToFetch?.employment}
                    onChange={() => {
                        if (summariesToFetch) {
                            setSummariesToFetch({
                                ...summariesToFetch,
                                employment: !summariesToFetch.employment,
                            })
                        }
                    }}
                    type="checkbox"
                    id="employment"
                />
                <label htmlFor="employment">Employment</label>
                <input
                    checked={summariesToFetch?.production}
                    onChange={() => {
                        if (summariesToFetch) {
                            setSummariesToFetch({
                                ...summariesToFetch,
                                production: !summariesToFetch.production,
                            })
                        }
                    }}
                    type="checkbox"
                    id="production"
                />
                <label htmlFor="production">Production</label>
                <input
                    checked={summariesToFetch?.trade}
                    onChange={() => {
                        if (summariesToFetch) {
                            setSummariesToFetch({
                                ...summariesToFetch,
                                trade: !summariesToFetch.trade,
                            })
                        }
                    }}
                    type="checkbox"
                    id="trade"
                />
                <label htmlFor="trade">Trade</label>
            </div>
            <DataTable
                title="State List"
                // @ts-ignore
                columns={[
                    ...baseColumns,
                    ...economyColumns,
                    ...productionColumns,
                    ...employmentColumns,
                ]}
                data={results}
                progressPending={results === undefined}
                pagination
            />
        </div>
    )
}

export default StateEconomySearch
