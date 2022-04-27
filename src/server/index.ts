import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import fetch from 'node-fetch'
import { createSchema } from './db'
import { maxBy, sortBy, reverse } from 'lodash'

let states: State[] | null = null

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    type InterstateTradeForState {
        name: String
        amount: Float
    }

    type InterstateTradeSummary {
        name: String
        totalDollarAmount: Float
        totalTons: Float
        statesByDollars: [InterstateTradeForState]
        statesByTons: [InterstateTradeForState]
    }

    type IndustryByEmployeeSummary {
        industry: String
        employedCount: String
    }

    type IndustryByAverageSalarySummary {
        industry: String
        averageSalary: String
    }

    type EmploymentSummary {
        topIndustryByEmployee: IndustryByEmployeeSummary
        topIndustryByAverageSalary: IndustryByAverageSalarySummary
    }

    type ProductionSummary {
        name: String
        totalDollarAmount: Float
        totalTons: Float
        productionTypeByDollars: [InterstateTradeForState]
        productionTypeByTons: [InterstateTradeForState]
    }

    # State type
    type State {
        id: String
        key: String
        name: String
        slug: String
        tradeSummary: InterstateTradeSummary
        employmentSummary: EmploymentSummary
        productionSummary: ProductionSummary
    }

    type Query {
        states(name: String): [State]
    }
`

interface State {
    id: string
    key: string
    name: string
    slug: string
}

interface InterstateTradeSummary {
    'Millions Of Dollars': number
    'Thousands Of Tons': number
    Origin: string
    'ID Origin': string
    'Destination State': string // the description of what is being produced
    'ID Destination State': string
}

interface DataUsaEmploymentResult {
    'Industry Group': string
    'Total Population': number
    'Average Wage': number
    Geography: string
}

interface DataUsaProductionResult {
    SCTG2: string
    'Millions Of Dollars': number
    'Thousands Of Tons': number
    Origin: 'Virginia'
}

interface EmploymentSummary {
    topIndustryByEmployee: { industry: string; employedCount: number }
    topIndustryByAverageSalary: { industry: string; averageSalary: number }
}

interface InterstateTradeStateResult {
    name: string
    totalDollarAmount: number
    totalTons: number
    statesByDollars: { name: string; amount: number }[]
    statesByTons: { name: string; amount: number }[]
}

interface ProductionSummary {
    name: string
    totalDollarAmount: number
    totalTons: number
    productionTypeByDollars: { name: string; amount: number }[]
    productionTypeByTons: { name: string; amount: number }[]
}

const resolvers = {
    State: {
        tradeSummary: async (parent: State) => {
            const { id } = parent
            const response = await fetch(
                `https://datausa.io/api/data?Origin%20State=${id}&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest`
            )
            const data: any = await response.json()
            const results: InterstateTradeSummary[] = data.data
            const totalTons = results.reduce(
                (totalTons, result) =>
                    (totalTons += result['Thousands Of Tons']),
                0
            )
            const totalDollarAmount = results.reduce(
                (totalTons, result) =>
                    (totalTons += result['Millions Of Dollars']),
                0
            )
            const statesByDollars = reverse(sortBy(
                results.map((result) => {
                    return {
                        name: result['Destination State'],
                        amount: result['Millions Of Dollars'],
                    }
                }),
                'amount'
            ))
            const statesByTons = reverse(sortBy(
                results.map((result) => {
                    return {
                        name: result['Destination State'],
                        amount: result['Thousands Of Tons'],
                    }
                }),
                'amount'
            ))
            
            return {
                name: parent.name,
                totalTons,
                totalDollarAmount,
                statesByDollars,
                statesByTons,
            } as InterstateTradeStateResult
        },
        employmentSummary: async (parent: State) => {
            const { id } = parent
            const response = await fetch(
                `https://datausa.io/api/data?Geography=${id}&measure=Total%20Population,Average%20Wage&drilldowns=Industry%20Group&Year=latest`
            )
            const data: any = await response.json()
            const results: DataUsaEmploymentResult[] = data.data
            const maxByEmployee = maxBy(results, (result) => {
                return result['Total Population']
            })
            const maxBySalary = maxBy(results, (result) => {
                return result['Average Wage']
            })

            return {
                topIndustryByAverageSalary: {
                    industry: maxBySalary?.['Industry Group'],
                    averageSalary: maxBySalary?.['Average Wage'],
                },
                topIndustryByEmployee: {
                    industry: maxByEmployee?.['Industry Group'],
                    employedCount: maxByEmployee?.['Total Population'],
                },
            } as EmploymentSummary
        },
        productionSummary: async (parent: State) => {
            const { id } = parent
            const response = await fetch(
                `https://datausa.io/api/data?Origin%20State=${id}&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=SCTG2&year=latest`
            )
            const data: any = await response.json()
            const results: DataUsaProductionResult[] = data.data
            const totalTons = results.reduce(
                (totalTons, result) =>
                    (totalTons += result['Thousands Of Tons']),
                0
            )
            const totalDollarAmount = results.reduce(
                (totalTons, result) =>
                    (totalTons += result['Millions Of Dollars']),
                0
            )
            const productionTypeByDollars = results.map((result) => {
                return {
                    name: result.SCTG2,
                    amount: result['Millions Of Dollars'],
                }
            })
            const productionTypeByTons = results.map((result) => {
                return {
                    name: result.SCTG2,
                    amount: result['Thousands Of Tons'],
                }
            })
            return {
                name: parent.name,
                totalTons,
                totalDollarAmount,
                productionTypeByDollars,
                productionTypeByTons,
            } as ProductionSummary
        },
    },
    Query: {
        states: async (parent: unknown, args: { name?: string }) => {
            const { name } = args
            if (states) {
                if (name) {
                    return states.filter((state: { name: string }) =>
                        state.name.toLowerCase().startsWith(name.toLowerCase())
                    )
                }
                return states
            } else {
                const response = await fetch(
                    'https://topaz.datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000'
                )
                const data: any = await response.json()
                if (name) {
                    return data.results.filter((state: { name: string }) =>
                        state.name.toLowerCase().startsWith(name.toLowerCase())
                    )
                }
                states = data.results
                return data.results
            }
        },
    },
}

async function startServer() {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await createSchema()
    await server.start()
    server.applyMiddleware({ app })
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
    )
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()
