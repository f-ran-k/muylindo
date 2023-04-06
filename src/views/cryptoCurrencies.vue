<template>
    <ControlPanel :prices="prices" :states="states" @update-price="updatePrice()" />

    <v-main>
        <v-container fluid>
<!-- Single courses -->
            <v-row justify="space-around">
                <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
                    <v-card v-if="states.bitcoin || states.ethereum" class="mt-8" height="auto" width="auto">
                        <v-btn v-if="states[currency]"
                            block
                            class="small-caps text-black mb-2"
                            :color="currencyProps[currency].color"
                            size="x-large"
                            variant="flat"
                            >
                            <template v-slot:prepend>
                                <img :alt="currencyProps[currency].altTag" :src="currencyProps[currency].path" width="40" height="40" />
                            </template>

                            <span class="small-caps">{{ currencyProps[currency].heading }}</span>
                        </v-btn>

                        <v-divider></v-divider>

                        <v-table v-if="states[currency]"
                            fixed-header
                        >
                            <thead>
                                <tr class="small-caps no-wrap">
                                    <th>Today</th>
                                    <th v-if="states.week">Change (week)</th>
                                    <th v-if="states.month">Change (month)</th>

                                    <th v-if="states.anytime">Change ({{ getDateFormat(getDayDifference()) }})</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr class="no-wrap">
                                    <td>{{ prices[currency].current }} €</td>

                                    <td v-if="states.week">
                                        {{ getPercentage(prices[currency].current, prices[currency].week, currency, 'week') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState[currency].week ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.month">
                                        {{ getPercentage(prices[currency].current, prices[currency].month, currency, 'month') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState[currency].month ? dot.color.red : dot.color.green]"></span>
                                    </td>

                                    <td v-if="states.anytime && prices[currency].history">
                                        {{ getPercentage(prices[currency].current, prices[currency].anytime, currency, 'anytime') }} %
                                        <span :class="[dot.name, dot.margin, !percentageState[currency].anytime ? dot.color.red : dot.color.green]"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </div>
            </v-row>
<!-- Single courses end -->

            <PriceHistory :prices="prices" :states="states" :dateFormat="getDateFormat" />

            <PriceChart :prices="prices" :states="states" />
        </v-container>
    </v-main>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue'
import PriceHistory from '@/components/PriceHistory.vue'
import PriceChart from '@/components/PriceChart.vue'

export default {
    name: 'CryptoCurrencies',
    components: {
        ControlPanel,
        PriceHistory,
        PriceChart,
    },
    data() {
        return {
            currencyProps: {
                bitcoin: {
                    altTag: 'Bitcoin',
                    color: 'purple',
                    heading: 'Bitcoin (Btc)',
                    path: '/src/assets/icons/IconBitcoin.svg',
                },
                ethereum: {
                    altTag: 'Ethereum',
                    color: 'blue',
                    heading: 'Ethereum (Eth)',
                    path: '/src/assets/icons/IconEthereum.svg',
                },
            },
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
            records: 20,
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

            const date = this.getDateFormat(period, 0, true)

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

            // if <url> ist set, the format has to comply with the API specs; e.g. DD-MM-YYYY || YYYY-MM-DD if not
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
            calculate the ratio between the current price and the past one to set either percentage state

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

            @param id <String> :: denotes the currency; e.g. bitcoin || ethereum
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
                        this.prices[id].history = prices.slice(0, this.records)

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
            Listener; invoked when 'update-price' is fired ==> @/components/ControlPanel.vue
        */
        updatePrice() {
            // update courses (anytime)
            this.getPrices('bitcoin', this.getDayDifference())
            this.getPrices('ethereum', this.getDayDifference())
            // update Price History and Charts
            this.getPrices('bitcoin', 100, this.getTimeRange())
            this.getPrices('ethereum', 100, this.getTimeRange())
        },
        // start out ...
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
