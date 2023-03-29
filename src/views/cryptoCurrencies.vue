<template>
    <v-app theme="dark">
        <ComponentHeader />

        <v-main>
            <v-navigation-drawer width="400">
                <v-list>
                    <v-list-item title="Controls" class="small-caps bg-grey"></v-list-item>
                </v-list>

                <v-divider class="mb-4"></v-divider>

                <span class="small-caps ml-4">Select a currency</span>

                <v-row class="ml-4">
                    <v-col cols="6">
                        <v-switch
                            v-model="states.bitcoin"
                            label="BTC"
                            color="purple-accent-2"
                        >
                        </v-switch>
                    </v-col>

                    <v-col cols="6">
                        <v-switch
                            v-model="states.ethereum"
                            label="ETH"
                            color="blue"
                        >
                        </v-switch>
                    </v-col>
                </v-row>

                <v-divider class="mb-8"></v-divider>

                <span class="small-caps ml-4">Select a period</span>

                <v-row class="ml-4">
                    <v-col cols="6">
                        <v-switch
                            v-model="states.week"
                            label="Last week"
                            color="cyan"
                            @click="getPrices(7, 'bitcoin'); getPrices(7, 'ethereum')"
                        >
                        </v-switch>
                    </v-col>

                    <v-col cols="6">
                        <v-switch
                            v-model="states.month"
                            label="Last month"
                            color="cyan"
                            @click="getPrices(30, 'bitcoin'); getPrices(30, 'ethereum')"
                            >
                        </v-switch>
                    </v-col>
                </v-row>

                <span class="small-caps ml-4">... by date</span>

                <v-form @submit.prevent="console.log(date)">
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="date"
                                    :counter="10"
                                    label=""
                                    required
                                    placeholder="e.g. 14-02-2023"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            
            <v-divider class="mb-8"></v-divider>
            
                <span class="small-caps ml-4">Price History</span>

                <v-row class="ml-4">
                    <v-col cols="6">
                        <v-switch
                            v-model="states.history"
                            :label="states.history ? 'Hide' : 'Show'"
                            color="blue-grey"
                        >
                        </v-switch>
                    </v-col>
                </v-row>

                <v-divider class="mb-8"></v-divider>

                <span class="small-caps ml-4">Price Chart</span>

                <v-row class="ml-4">
                    <v-col cols="6">
                        <v-switch
                            v-model="states.chart"
                            :label="states.chart ? 'Hide' : 'Show'"
                            color="blue-grey"
                        >
                        </v-switch>
                    </v-col>
                </v-row>
            </v-navigation-drawer>

            <v-container fluid>
                <v-row v-if="states.bitcoin || states.ethereum" justify="space-around">
                    <v-card width="600" theme="dark" class="mt-8">
                        <v-card-title class="small-caps ma-4">
                            Currency courses (in Eur)
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-btn v-if="states.bitcoin"
                            block
                            class="text-none text-black my-4"
                            color="purple-accent-2"
                            size="x-large"
                            variant="flat"
                            >
                            <template v-slot:prepend>
                                <img alt="Bitcoin" src="../assets/icons/IconBitcoin.svg" width="40" height="40" />
                            </template>

                            <span class="small-caps">Bitcoin (BTC)</span>
                        </v-btn>

                        <v-table v-if="states.bitcoin"
                            bordered
                            fixed-header
                            height="120px"
                        >
                            <thead>
                                <tr class="small-caps">
                                    <th class="text-left">Today</th>
                                    <th v-if="states.week" class="text-left">Last week</th>
                                    <th v-if="states.month" class="text-left">Last month</th>
                                    <th v-if="states.any" class="text-left">At {{ getPastDate() }}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.bitcoin }}</td>
                                    <td v-if="states.week">{{ prices.bitcoin.week }}</td>
                                    <td v-if="states.month">{{ prices.bitcoin.month }}</td>
                                    <td v-if="states.any">Upcoming</td>
                                </tr>
                            </tbody>
                        </v-table>

                        <v-btn v-if="states.ethereum"
                            block
                            class="text-none text-black my-4"
                            color="blue"
                            size="x-large"
                            variant="flat"
                            >
                            <template v-slot:prepend>
                                <img alt="Ethereum" src="../assets/icons/IconEthereum.svg" width="40" height="45" />
                            </template>
                            Ethereum (ETH)
                        </v-btn>

                        <v-table v-if="states.ethereum"
                            bordered
                            fixed-header
                            height="120px"
                        >
                            <thead>
                                <tr class="small-caps">
                                    <th class="text-left">Today</th>
                                    <th v-if="states.week" class="text-left">Last week</th>
                                    <th v-if="states.month" class="text-left">Last month</th>
                                    <th v-if="states.any" class="text-left">At {{ getPastDate() }}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.ethereum }}</td>
                                    <td v-if="states.week">{{ prices.ethereum.week }}</td>
                                    <td v-if="states.month">{{ prices.ethereum.month }}</td>
                                    <td v-if="states.any">Upcoming</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-row>
            </v-container>
        </v-main>

        <ComponentFooter />
    </v-app>
</template>

<script>
import ComponentHeader from '../components/ComponentHeader.vue'
import ComponentFooter from '../components/ComponentFooter.vue'

export default {
    name: 'CryptoCurrencies',
    components: {
        ComponentHeader,
        ComponentFooter
    },
    data() {
        return {
            date: '',
            endpoints: {
                bitcoin: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/bitcoin/history?',
                },
                ethereum: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/ethereum/history?',
                }
            },
            prices: {},
            states: {
                any: false,
                bitcoin: true,
                chart: false,
                ethereum: true,
                history: false,
                month: false,
                week: false
            }
        }
    },
    methods: {
        /*
            get the (past) date and reformat it to match coinGeckos API specs (format: 'dd-mm-yyyy')

            @return <String>
        */
        getPastDate(period = 0) {
            const currentDate = new Date()
            // change date to [period] days in the past
            if (period !== 0) currentDate.setDate(currentDate.getDate() - period)

           return `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
        },
        /*
            define URL to get data from and fetch it from coinGecko

            @param period <Integer>
            @param id <String>
            */
        getPrices(period = 0, id = 'bitcoin') {
            const date = this.getPastDate(period)

            const apiUrl = period === 0
                ? this.endpoints[id].price
                : this.endpoints[id].history = `${this.endpoints[id].history}date=${date}`

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`)
                    }
                    return response.json()
                })
                .then((data) => {
                    if (period === 0) {
                        const { bitcoin, ethereum } = data
                        console.log(data)

                        this.prices[id]['current'] = id === 'bitcoin'
                            ? bitcoin
                            : ethereum
                    } else {
                        const { market_data } = data
                        const { current_price } = market_data
                        const { eur } = current_price
    
                        period === 7
                            ? this.prices[id]['week'] = eur
                            : this.prices[id]['month'] = eur
                    }
                })
                .catch((err) => console.error(`Server error: ${err.message}`))
        },
        init() {
            this.getPrices(0, 'bitcoin')
            this.getPrices(0, 'ethereum')
        }
    },
    computed: {
        weekAgo() {
            return Math.round((this.prices.bitcoin.week / 100))
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>
.small-caps {
    font-variant: small-caps;
    font-weight: bold;
}
</style>
