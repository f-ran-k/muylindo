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
                <v-row justify="space-around">
                    <v-card  v-if="states.bitcoin || states.ethereum"
                        class="mt-8" width="600">
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
                                <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="40" height="40" />
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
                                    <th v-if="states.anytime" class="text-left">Change ({{ getDateFormat(getDayDifference()) }})</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.bitcoin.current }} €</td>

                                    <td v-if="states.week">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.week, 'bitcoin', 'week') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.bitcoin.week ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.month">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.month, 'bitcoin', 'month') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.bitcoin.month ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.anytime">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.anytime, 'bitcoin', 'anytime') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.bitcoin.anytime ? dot.color.red : dot.color.green]"></span>
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
                                <img alt="Ethereum" src="@/assets/icons/IconEthereum.svg" width="40" height="40" />
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
                                    <th v-if="states.anytime" class="text-left">Change ({{ getDateFormat(getDayDifference()) }})</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{{ prices.ethereum.current }} €</td>

                                    <td v-if="states.week">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.week, 'ethereum', 'week') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.ethereum.week ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.month">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.month, 'ethereum', 'month') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.ethereum.month ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.anytime">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.anytime, 'ethereum', 'anytime') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.ethereum.anytime ? dot.color.red : dot.color.green]"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>

                    <v-table v-if="states.history && states.bitcoin"
                        fixed-header
                        height="580px"
                        class="mt-8"
                    >
                        <thead>
                            <tr>
                                <th colspan="3" class="text-center text-h6 small-caps">Price History
                                    <v-btn class="mx-2">
                                        <template v-slot:prepend>
                                            <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="40" height="40" />
                                        </template>
                                    </v-btn>
                                </th>
                            </tr>
                            <tr>
                                <th class="text-left small-caps">Date</th>
                                <th class="text-left small-caps">Time</th>
                                <th class="text-left small-caps">Course
                                    <v-chip
                                        title="Reverse"
                                        label
                                        class="mx-2 bg-grey"
                                        @click="prices.bitcoin.history.reverse()"
                                        >
                                        <template v-slot:prepend>
                                            <img alt="Reverse" src="@/assets/icons/IconReverse.svg" width="32" height="32" />
                                        </template>
                                    </v-chip>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="n in prices.bitcoin.history"
                                :key="n"
                                class="text-center"
                                >
                                <td>{{ getDateFormat(0, n[0]) }}</td>
                                <td>{{ getTime(n[0]) }}</td>
                                <td>{{ +(n[1]).toFixed(2) }} €</td>
                            </tr>
                        </tbody>
                    </v-table>

                    <v-table v-if="states.history && states.ethereum"
                        fixed-header
                        height="580px"
                        class="mt-8"
                    >
                        <thead>
                            <tr>
                                <th colspan="3" class="text-center text-h6 small-caps">Price History
                                    <v-btn class="mx-2">
                                        <template v-slot:prepend>
                                            <img alt="Ethereum" src="@/assets/icons/IconEthereum.svg" width="40" height="40" />
                                        </template>
                                    </v-btn>
                                </th>
                            </tr>
                            <tr>
                                <th class="text-left small-caps">Date</th>
                                <th class="text-left small-caps">Time</th>
                                <th class="text-left small-caps">Course
                                    <v-chip
                                        title="Reverse"
                                        label
                                        class="mx-2 bg-grey"
                                        @click="prices.ethereum.history.reverse()"
                                        >
                                        <template v-slot:prepend>
                                            <img alt="Reverse" src="@/assets/icons/IconReverse.svg" width="32" height="32" />
                                        </template>
                                    </v-chip>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="n in prices.ethereum.history"
                                :key="n"
                                class="text-center"
                                >
                                <td>{{ getDateFormat(0, n[0]) }}</td>
                                <td>{{ getTime(n[0]) }}</td>
                                <td>{{ +(n[1]).toFixed(2) }} €</td>
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
import ComponentHeader from '@/components/ComponentHeader.vue'
import ComponentFooter from '@/components/ComponentFooter.vue'

export default {
    name: 'CryptoCurrencies',
    components: {
        ComponentHeader,
        ComponentFooter
    },
    data() {
        return {
            dot: {
                name: 'dot',
                margin: 'ml-2',
                color: {
                    red: 'bg-red', green: 'bg-green',
                },
            },
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
                },
            },
            percentageState: {
                bitcoin: {
                    week: null, month: null, anytime: null,
                },
                ethereum: {
                    week: null, month: null, anytime: null,
                },
            },
            prices: {
                bitcoin: {
                    current: null, week: null, month: null, anytime: null, history: null,
                },
                ethereum: {
                    current: null, week: null, month: null, anytime: null, history: null,
                },
            },
            states: {
                bitcoin: true, ethereum: true, week: true, month: true, anytime: false, history: false, chart: false,
            },
        }
    },
    methods: {
        /*
            compose API URL

            @param id <String>
            @param period <Integer>
            @param range <Array>

            @return <String>
        */
        getApiUrl(id = 'bitcoin', period = 0, range = []) {
            if (Array.isArray(range) && range.length) {
                const [to, from] = range
                // replace url end to prevent appending the params everytime the function is called
                return this.endpoints[id].range = `${this.endpoints[id].range.replace(/from=.*$/, '')}from=${from}&to=${to}`
            }

            const date = this.getDateFormat(period, false, true)

            return period === 0
                ? this.endpoints[id].price
                : this.endpoints[id].history = `${this.endpoints[id].history.replace(/date=.*$/, '')}date=${date}`
        },
        /*
            get the date and reformat it to comply with coinGecko's API specs (format: 'DD-MM-YYYY')

            @param period <Integer>
            @param seconds <Integer>
            @param url <Boolean>

            @return <String>
        */
        getDateFormat(period = 0, seconds = 0, url = false) {
            const date = seconds
                ? new Date(seconds)
                : new Date()

            if (period !== 0) date.setDate(date.getDate() - period)

            // if <url> ist set, the format has to comply with the API specs
            return url
                ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        },
        /*
            calculate the time difference of two dates in milliseconds => days

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
            extract the time portion from the date, e.g. 09:22:35

            @return <String>
        */
        getTime(timestamp) {
            return new Date(timestamp).toTimeString().slice(0, 8)
        },
        /*
            get time in seconds
            defines the "range boundaries" (from, to) to assemble the endpoint

            @return <Array>
        */
        getTimeRange() {
            const currentDate = new Date().getTime() / 1000
            const pastDate = new Date(document.getElementById('upto').value).getTime() / 1000

            return [Math.floor(currentDate), Math.floor(pastDate)]
        },
        /*
            calculate the ratio between the current price and the past one

            @param currentprice <Float>
            @param pastPrice <Float>
            @param id <String>
            @param period <String>

            @return <String>
        */
        getPercentage(currentPrice, pastPrice, id, period) {
            // the prepended '+' gets rid of trailing zeros; e.g. 1.50 ==> 1.5
            const percent = +((currentPrice / pastPrice * 100) - 100).toFixed(2)

            this.percentageState[id][period] = percent > 0 ? true : false

            return percent
        },
        /*
            fetch data from coinGecko

            @param id <String> :: denotes the currency; e.g. bitcoin
            @param period <Integer> :: past time; e.g. 0 === current | 7 === last week | 30 === last month
            @param range <Array>
        */
        getPrices(id = 'bitcoin', period = 0, range = []) {
            const apiUrl = this.getApiUrl(id, period, range)

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`)
                    }
                    return response.json()
                })
                .then((data) => {
                    // get price history bulk data
                    if (range.length) {
                        const { prices } = data
                        this.prices[id].history = prices.slice(0, 20)

                        return
                    }
                    // ... otherwise get a single course; either the current course (today)
                    if (period === 0) {
                        if (id === 'bitcoin') {
                            const { bitcoin } = data
                            const { eur } = bitcoin

                            this.prices[id].current = Math.round(eur)
                        }
                        else {
                            const { ethereum } = data
                            const { eur } = ethereum

                            this.prices[id].current = Math.round(eur)
                        }
                    }
                    // ...or the past course according to the period given
                    else {
                        const { market_data } = data
                        const { current_price } = market_data
                        const { eur } = current_price

                        switch (period) {
                            case 7:
                                this.prices[id].week = Math.round(eur)
                            break
                            case 30:
                                this.prices[id].month = Math.round(eur)
                            break
                            default:
                                this.prices[id].anytime = Math.round(eur)
                        }
                    }
                })
                .catch((err) => console.error(`Server error: ${err.message}`))
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
.dot {
    display: inline-block;
    border-radius: 50%;
    height: 16px;
    width: 16px;
}
.small-caps {
    font-variant: small-caps;
    font-weight: bold;
}
</style>
