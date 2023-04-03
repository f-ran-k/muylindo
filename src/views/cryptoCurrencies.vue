<template>
    <v-app theme="dark">
        <ComponentHeader />

        <v-main>
<!-- Controls -->
            <v-navigation-drawer height="auto" width="400">
                <v-list>
                    <v-list-item class="bg-grey text-h6 small-caps">Controls</v-list-item>
                </v-list>

                <v-divider class="mb-4"></v-divider>
<!-- Currency -->
                <span class="small-caps ml-4">Select a currency</span>

                <v-row class="ml-4">
                    <v-col>
                        <v-switch
                            v-model="states.bitcoin"
                            label="BTC"
                            color="purple"
                        >
                        </v-switch>
                    </v-col>

                    <v-col>
                        <v-switch
                            v-model="states.ethereum"
                            label="ETH"
                            color="blue"
                        >
                        </v-switch>
                    </v-col>
                </v-row>
<!-- Currency end -->
                <v-divider class="mb-4"></v-divider>
<!-- Period -->
                <span class="small-caps ml-4">Select a period</span>

                <v-row class="ml-4">
                    <v-col>
                        <v-switch
                            v-model="states.week"
                            label="Last week"
                            color="cyan"
                            >
                        </v-switch>
                    </v-col>
                    
                    <v-col>
                        <v-switch
                            v-model="states.month"
                            label="Last month"
                            color="cyan"
                            >
                        </v-switch>
                    </v-col>
                </v-row>
<!-- Date Picker -->
                <span class="small-caps ml-4">Select a date</span>

                <v-row class="ml-4">
                    <v-col>
                        <v-switch
                            v-model="states.anytime"
                            :label="states.anytime ? 'Hide' : 'Show'"
                            color="cyan"
                        >
                        </v-switch>
                    </v-col>

                    <v-col v-if="states.anytime">
                        <v-form @submit.prevent>
                            <input id="datetime" type="date" value="2023-01-01" />

                            <v-btn
                                class="small-caps"
                                color="grey"
                                size="small"
                                title="Send"
                                @click="
                                    getPrices('bitcoin', getDayDifference());
                                    getPrices('ethereum', getDayDifference());
                                    getPrices('bitcoin', 100, getTimeRange());
                                    getPrices('ethereum', 100, getTimeRange())"
                                >Go
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
<!-- Date Picker && Period end -->
                <v-divider class="mb-4"></v-divider>
<!-- History -->
                <span class="small-caps ml-4">Price History</span>

                <v-row class="ml-4">
                    <v-col>
                        <v-switch
                            v-model="states.history"
                            color="blue-grey"
                            :label="states.history ? 'Hide' : 'Show'"
                        >
                        </v-switch>
                    </v-col>
                </v-row>

                <v-row v-if="states.history && !prices.bitcoin.history" class="ma-4 mt-0">
                    <v-col>
                        <v-alert
                            border="start"
                            border-color="warning"
                            elevation="2"
                            title="NO DATA FETCHED YET!"
                        >
                        Please select a date from the date picker above to display the price history.
                        </v-alert>
                    </v-col>
                </v-row>
<!-- History end -->
                <v-divider class="mb-4"></v-divider>
<!-- Chart -->
                <span class="small-caps ml-4">Price Chart</span>

                <v-row class="ml-4">
                    <v-col>
                        <v-switch
                            v-model="states.chart"
                            color="blue-grey"
                            :label="states.chart ? 'Hide' : 'Show'"
                        >
                        </v-switch>
                    </v-col>
                </v-row>

                <v-row v-if="states.chart && !prices.bitcoin.history" class="ma-4">
                    <v-col>
                        <v-alert
                            border="start"
                            border-color="warning"
                            elevation="2"
                            title="NO DATA FETCHED YET!"
                        >
                        Please select a date from the date picker above to display the price chart.
                        </v-alert>
                    </v-col>
                </v-row>
<!-- Chart end -->
            </v-navigation-drawer>
<!-- Controls end -->

<!-- Main View -->
            <v-container fluid>
                <v-row justify="space-around">
<!-- Single courses BTC -->
                    <v-card v-if="states.bitcoin || states.ethereum"
                        class="ma-8" height="auto" width="auto">
                        <v-card-title class="small-caps bg-grey">
                            Currency courses
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-btn v-if="states.bitcoin"
                            block
                            class="text-none text-black"
                            color="purple"
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

                                    <td v-if="states.anytime && prices.bitcoin.history">
                                        {{ getPercentage(prices.bitcoin.current, prices.bitcoin.anytime, 'bitcoin', 'anytime') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.bitcoin.anytime ? dot.color.red : dot.color.green]"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
<!-- Single courses BTC end -->

<!-- Single courses ETH -->
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

                            <span class="small-caps">Ethereum (ETH)</span>
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

                                    <td v-if="states.anytime && prices.ethereum.history">
                                        {{ getPercentage(prices.ethereum.current, prices.ethereum.anytime, 'ethereum', 'anytime') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState.ethereum.anytime ? dot.color.red : dot.color.green]"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
<!-- Single courses ETH end -->

<!-- Price history BTC -->
                    <v-table v-if="states.history && prices.bitcoin.history"
                        fixed-header
                        height="600px"
                        class="mt-8"
                    >
                        <thead>
                            <tr>
                                <th class="bg-grey">
                                    <v-btn class="mx-2 bg-grey" elevation="0">
                                        <template v-slot:prepend>
                                            <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="40" height="40" />
                                        </template>
                                    </v-btn>
                                </th>

                                <th colspan="2" class="text-left text-h6 small-caps bg-grey">Price History</th>
                            </tr>

                            <tr>
                                <th class="text-left small-caps">Date</th>
                                <th class="text-left small-caps">Time</th>
                                <th class="text-left small-caps">Course
                                    <v-chip
                                        v-if="prices.bitcoin.history"
                                        title="Sort by Price"
                                        label
                                        class="mx-2 bg-purple"
                                        @click="prices.bitcoin.history.sort((a, b) => b[1] - a[1])"
                                        >
                                        <template v-slot:prepend>
                                            <img alt="Sort" src="@/assets/icons/IconSort.svg" width="32" height="32" />
                                        </template>
                                    </v-chip>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="n in prices.bitcoin.history"
                                :key="n"
                                class="text-left"
                                >
                                <td>{{ getDateFormat(0, n[0]) }}</td>
                                <td>{{ getTime(n[0]) }}</td>
                                <td>{{ +(n[1]).toFixed(2) }} €</td>
                            </tr>
                        </tbody>
                    </v-table>
<!-- Price history BTC end -->

<!-- Price history ETH -->
                    <v-table v-if="states.history && prices.ethereum.history"
                        fixed-header
                        height="600px"
                        class="mt-8"
                    >
                        <thead>
                            <tr>
                                <th class="bg-grey">
                                    <v-btn class="mx-2 bg-grey" elevation="0">
                                        <template v-slot:prepend>
                                            <img alt="Bitcoin" src="@/assets/icons/IconEthereum.svg" width="40" height="40" />
                                        </template>
                                    </v-btn>
                                </th>

                                <th colspan="2" class="text-left text-h6 small-caps bg-grey">Price History</th>
                            </tr>

                            <tr>
                                <th class="text-left small-caps">Date</th>
                                <th class="text-left small-caps">Time</th>
                                <th class="text-left small-caps">Course
                                    <v-chip
                                        v-if="prices.ethereum.history"
                                        title="Sort by Price"
                                        label
                                        class="mx-2 bg-blue"
                                        @click="prices.ethereum.history.sort((a, b) => b[1] - a[1])"
                                        >
                                        <template v-slot:prepend>
                                            <img alt="Sort" src="@/assets/icons/IconSort.svg" width="32" height="32" />
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
<!-- Price history ETH end -->
                </v-row>

                <v-row>
<!-- Price chart BTC -->
                    <v-card v-if="states.chart && prices.ethereum.history" class="ma-8" height="auto" width="auto">
                        <v-card-title class="small-caps bg-grey">
                            <v-btn class="bg-grey" elevation="0">
                                <template v-slot:prepend>
                                    <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="32" height="32" />
                                </template>
                            </v-btn>
                            Price Chart
                        </v-card-title>    

                        <v-divider></v-divider>
                        <!-- vertical margin diretions get exchanged due to rotation; e.g. mb === mt and vice versa -->
                        <v-row class="ma-4" style="transform: rotate(180deg);">
                            <div v-for="(values, index) in prices.bitcoin.history" :key="index"
                                class="bar bg-purple ml-2" :style="{ height: getBarHeight('bitcoin', values[1]) + 'px'}">
                                <span class="small-caps mx-2 mt-8">{{ values[1].toFixed(0) }} €</span>
                            </div>
                        </v-row>
                    </v-card>
<!-- Price chart BTC end -->

<!-- Price chart ETH -->
                    <v-card v-if="states.chart && prices.bitcoin.history" class="ma-8" height="auto" width="auto">
                        <v-card-title class="small-caps bg-grey">
                            <v-btn class="bg-grey" elevation="0">
                                <template v-slot:prepend>
                                    <img alt="Ethereum" src="@/assets/icons/IconEthereum.svg" width="32" height="32" />
                                </template>
                            </v-btn>
                            Price Chart
                        </v-card-title>    

                        <v-divider></v-divider>
                        <!-- vertical margin diretions get exchanged due to rotation; e.g. mb === mt and vice versa -->
                        <v-row class="ma-4" style="transform: rotate(180deg);">
                            <div v-for="(values, index) in prices.ethereum.history" :key="index"
                                class="bar bg-blue ml-2" :style="{ height: getBarHeight('ethereum', values[1]) + 'px'}">
                                <span class="small-caps mx-2 mt-8">{{ values[1].toFixed(0) }} €</span>
                            </div>
                        </v-row>
                    </v-card>
<!-- Price chart ETH end -->
                </v-row>
            </v-container>
<!-- Main View end -->
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
            bulkLimit: 20,
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
            const pastDate = new Date(document.getElementById('datetime').value).getTime() / 1000

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
                        this.prices[id].history = prices.slice(0, this.bulkLimit)

                        return
                    }
                    // ... otherwise get a single course; either the current course (today)
                    if (period === 0) {
                        const { bitcoin, ethereum } = data

                        const { eur } = id === 'bitcoin'
                            ? bitcoin
                            : ethereum

                        this.prices[id].current = Math.round(eur)
                    }
                    // ...or the past course according to the period given
                    else {
                        this.getPriceByPeriod(id, period, data)
                    }
                })
                .catch((err) => console.error(`Server error: ${err.message}`))
        },
        /*
            @param id <String>
            @param period <Integer>
            @param data <Object>
        */
        getPriceByPeriod(id, period, data) {
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
        },
        /*
            get individual bar heights in pixels

            @param id <String> e.g 'bitcoin' || 'ethereum'
            @param price <Integer>

            @return <Integer>
        */
        getBarHeight(id, price) {
            // add a minimum height for each bar
            const minHeight = 100

            return id === 'bitcoin'
                ? price < 1000
                    ? (price / 20) + minHeight
                    : price / 200
                : price < 2000
                    ? (price / 10) + minHeight
                    : price / 20
        },
        init() {
            const periods = [0, 7, 30]

            for (let period of periods) {
                this.getPrices('bitcoin', period)
                this.getPrices('ethereum', period)
            }
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style>
.bar {
    display: inline-block;
    width: 24px;
    writing-mode: vertical-rl;
}
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
