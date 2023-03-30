<template>
    <v-app theme="dark">
        <ComponentHeader />

        <v-main>
            <v-navigation-drawer width="400">
                <v-list>
                    <v-list-item class="small-caps text-h6 bg-grey">Controls</v-list-item>
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
                            >
                        </v-switch>
                    </v-col>
                    
                    <v-col cols="6">
                        <v-switch
                            v-model="states.month"
                            label="Last month"
                            color="cyan"
                            >
                        </v-switch>
                    </v-col>
                </v-row>

                <span class="small-caps ml-4">... by date</span>

                <v-row class="ml-4">
                    <v-col cols="6">
                        <v-switch
                            v-model="states.anytime"
                            :label="states.anytime ? 'Hide' : 'Show'"
                            color="blue-grey"
                        >
                        </v-switch>
                    </v-col>
                </v-row>

                <v-form @submit.prevent>
                    <v-container v-if="states.anytime">
                        <v-row>
                            <v-col
                                cols="12"
                                md="12"
                            >
                            <input id="datetime" type="date" value="2023-01-01" />

                            <v-btn
                                inline
                                class="small-caps text-white ml-4"
                                color="grey"
                                size="small"
                                variant="flat"
                                @click="getPrices('bitcoin', getDayDifference()); getPrices('ethereum', getDayDifference())"
                                >Send
                            </v-btn>
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

                <v-form @submit.prevent>
                    <v-container v-if="states.history">
                        <v-row>
                            <v-col
                                cols="12"
                                md="12"
                            >
                            <input id="upto" type="date" value="2023-03-01" />

                            <v-btn
                                inline
                                class="small-caps text-white ml-4"
                                color="grey"
                                size="small"
                                variant="flat"
                                @click="getPrices('bitcoin', 100, getTimeRange()); getPrices('ethereum', 100, getTimeRange())"
                                >Send
                            </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>


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
                            Currency courses
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
                                    <th v-if="states.week" class="text-left">Change (week)</th>
                                    <th v-if="states.month" class="text-left">Change (month)</th>
                                    <th v-if="states.anytime" class="text-left">Change ({{ getPastDate(getDayDifference()) }})</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.bitcoin.current }} €</td>

                                    <td v-if="states.week">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.week) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>

                                    <td v-if="states.month">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.month) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>

                                    <td v-if="states.anytime">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.anytime) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>
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
                                <img alt="Ethereum" src="../assets/icons/IconEthereum.svg" width="40" height="40" />
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
                                    <th v-if="states.week" class="text-left">Change (week)</th>
                                    <th v-if="states.month" class="text-left">Change (month)</th>
                                    <th v-if="states.anytime" class="text-left">Change ({{ getPastDate(getDayDifference()) }})</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.ethereum.current }} €</td>

                                    <td v-if="states.week">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.week) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>

                                    <td v-if="states.month">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.month) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>

                                    <td v-if="states.anytime">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.anytime) }} %
                                        <v-chip label>
                                            <template v-slot:append>
                                                <img alt="" :src="iconPaths.up" width="32" height="32" />
                                            </template>
                                        </v-chip>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                    
                    <v-table v-if="states.history"
                        fixed-header
                        height="580px"
                        class="mt-8"
                    >
                        <thead>
                            <tr>
                                <th colspan="3" class="text-center text-h6 small-caps">Courses up to {{ getPastDate(getDayDifference()) }}</th>
                            </tr>
                            <tr>
                                <th class="text-left small-caps">Date</th>
                                <th class="text-left small-caps">Bitcoin</th>
                                <th class="text-left small-caps">Ethereum</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="n in prices.bitcoin.history"
                                :key="n"
                                >
                                <td>{{ n[0] }}</td>
                                <td>{{ n[1] }}</td>
                                <td>B</td>
                            </tr>
                        </tbody>
                    </v-table>
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
            endpoints: {
                bitcoin: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/bitcoin/history?',
                    range: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&',
                },
                ethereum: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/ethereum/history?',
                    range: 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=eur&',
                }
            },
            iconPaths: {
                up: '/src/assets/icons/IconUpArrow.svg',
                down: '/src/assets/icons/IconDownArrow.svg'
            },
            prices: {
                bitcoin: {
                    current: null,
                    week: null,
                    month: null,
                    anytime: null,
                    history: null
                },
                ethereum: {
                    current: null,
                    week: null,
                    month: null,
                    anytime: null,
                    history: null
                },
            },
            states: {
                anytime: false,
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
            compose API URL to fetch data from

            @param id <String>
            @param period <Integer>

            @return <String>
        */
        getApiUrl(id = 'bitcoin', period = 0) {
            const date = this.getPastDate(period)

            return period === 0
                ? this.endpoints[id].price
                // it's necessary to replace the date portion here, otherwise the date gets appended everytime the function is called
                : this.endpoints[id].history = `${this.endpoints[id].history.replace(/date=.*$/, '')}date=${date}`
        },
        /*
            @return <Array>
        */
        getTimeRange() {
            const currentDate = new Date().getTime() / 1000
            const pastDate = new Date(document.getElementById('upto').value).getTime() / 1000

            return [Math.floor(currentDate), Math.floor(pastDate)]
        },
        /*
            get the date and reformat it to match coinGecko's API specs (format: 'dd-mm-yyyy')

            @param period <Integer>

            @return <String>
        */
        getPastDate(period = 0) {
            const currentDate = new Date()
            // change date to [period] days in the past
            if (period !== 0) currentDate.setDate(currentDate.getDate() - period)

            return `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
        },
        /*
            calculate the time difference of two dates in milliseconds

            @return <Integer>
        */
        getDayDifference() {
            const date = document.getElementById('datetime').value

            const currentDate = new Date()
            const pastDate = new Date(date)

            const differenceTime = currentDate.getTime() - pastDate.getTime()
            // calculate the number of days ==> ms * sec * min * h
            return Math.round(differenceTime / (1000 * 60 * 60 * 24) - 1)
        },
        /*
            fetch data from coinGecko

            @param id <String> :: denotes the currency; e.g. bitcoin
            @param period <Integer> :: past time; e.g. 0 === current | 7 === last week | 30 === last month
        */
        getPrices(id = 'bitcoin', period = 0, range = []) {
            let apiUrl = this.getApiUrl(id, period)

            if (range.length) {
                const [to, from] = range

                apiUrl =  this.endpoints[id].range = `${this.endpoints[id].range.replace(/from=.*$/, '')}from=${from}&to=${to}`
            }

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`)
                    }
                    return response.json()
                })
                .then((data) => {
                    const currency = id === 'bitcoin'
                        ? 'bitcoin'
                        : 'ethereum'

                    if (range.length) {
                        const { prices } = data
                        this.prices[currency].history = prices
                        console.log(prices)
                        return
                    }
                    if (period === 0) {
                        if (id === 'bitcoin') {
                            const { bitcoin } = data
                            const { eur } = bitcoin

                            this.prices[currency].current = Math.round(eur)
                        }
                        else {
                            const { ethereum } = data
                            const { eur } = ethereum

                            this.prices[currency].current = Math.round(eur)
                        }
                    }
                    else {
                        const { market_data } = data
                        const { current_price } = market_data
                        const { eur } = current_price

                        switch (period) {
                            case 7:
                                this.prices[currency].week = Math.round(eur)
                            break
                            case 30:
                                this.prices[currency].month = Math.round(eur)
                            break
                            default:
                                this.prices[currency].anytime = Math.round(eur)
                        }
                    }
                })
                .catch((err) => console.error(`Server error: ${err.message}`))
        },
        /*
            calculate the ratio between the current priceand the past one

            @param currentprice <Float>
            @param pastPrice <Float>

            @return <String>
        */
        getPercentage(currentPrice, pastPrice) {
            // the prepended '+' gets rid of trailing zeros; e.g. 1.50 ==> 1.5
            return +((currentPrice / pastPrice * 100) - 100).toFixed(2)
        },
        init() {
            const periods = [0, 7, 30]

            for (let period of periods) {
                this.getPrices('bitcoin', period)
                this.getPrices('ethereum', period)
            }
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>
.gradient {
    background-image: linear-gradient(to right, purple , blue);
}
.small-caps {
    font-variant: small-caps;
    font-weight: bold;
}
</style>
