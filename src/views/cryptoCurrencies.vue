<template>
    <ControlPanel
        :history="history"
        :states="states"
        @update-price="updatePrice()"
    />

    <v-main>
        <v-container class="pa-0">
            <AppInfo v-show="!(states.bitcoin || states.ethereum)" />

            <TabInterface
                :states="states"
                :tab="tab"
                @update-tab="updateTab"
            />

            <CryptoCourses v-if="tab === 0"
                :prices="prices"
                :states="states"
            />

            <PriceHistory v-if="dataFetched && tab === 1"
                :history="history"
                :states="states"
            />

            <PriceChart v-if="tab === 2"
                :history="history"
            />
        <!--
            Dynamic components

            NOTE: remember to comment the both components above <PriceHistory> and <PriceChart> when going with this approach

            <Component v-if="dataFetched" :is="componentMap[tab]"
                :chartPrices="chartPrices"
                :history="history"
                :states="states"
            />
        -->
        </v-container>
    </v-main>
</template>

<script>
import AppInfo from '@/components/AppInfo.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import TabInterface from '@/components/TabInterface.vue'
import CryptoCourses from '@/components/CryptoCourses.vue'
import PriceHistory from '@/components/PriceHistory.vue'
import PriceChart from '@/components/PriceChart.vue'

export default {
    name: 'CryptoCurrencies',
    components: {
        AppInfo,
        ControlPanel,
        TabInterface,
        CryptoCourses,
        PriceHistory,
        PriceChart,
    },
    provide() {
        return {
            getDayDifference: this.getDayDifference,
            getTimeStamp: this.getTimeStamp,
        }
    },
    data() {
        return {
            chartPrices: {},
            // componentMap: {
            //     1: 'PriceHistory',
            //     2: 'PriceChart',
            // },
            endpoints: {
                bitcoin: {
                    currentPrice: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
                    date: 'https://api.coingecko.com/api/v3/coins/bitcoin/history?',
                    history: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&',
                },
                ethereum: {
                    currentPrice: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur',
                    date: 'https://api.coingecko.com/api/v3/coins/ethereum/history?',
                    history: 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=eur&',
                },
            },
            history: {
                bitcoin: {}, ethereum: {},
            },
            prices: {
                bitcoin: {
                    current: null, week: null, month: null, anytime: null,
                },
                ethereum: {
                    current: null, week: null, month: null, anytime: null,
                },
            },
            records: 20,
            states: {
                bitcoin: false, ethereum: false, week: true, month: true, anytime: false, courses: true, history: true, chart: true,
            },
            tab: 0,
        }
    },
    computed: {
        dataFetched() {
            return Object.keys(this.history.bitcoin).length && Object.keys(this.history.ethereum).length
        },
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
                const [from, to] = range
                // replace url end to prevent appending the params everytime the function is called
                return this.endpoints[id].history = `${this.endpoints[id].history.replace(/from=.*$/, '')}from=${from}&to=${to}`
            }

            const date = this.getTimeStamp('gecko', 0, period)

            return period === 0
                ? this.endpoints[id].currentPrice
                : this.endpoints[id].date = `${this.endpoints[id].date.replace(/date=.*$/, '')}date=${date}`
        },
        /*
            @param format <String>; either of formats.keys()
            @param timestamp <Integer>
            @param period <Integer>

            @return <Any>
        */
        getTimeStamp(format, timestamp = 0, period = 0) {
            const date = timestamp
                ? new Date(timestamp)
                : new Date()

            if (period !== 0) date.setDate(date.getDate() - period)

            const formats = {
                isoHead: date.toISOString().slice(0, 10),
                timeHead: date.toTimeString().slice(0, 8),
                gecko: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            }

            return formats[format]
        },
        /*
            either calculate the time difference of two dates in days or rather
            the "range boundaries" (from, to) to assemble the endpoint for the history data: e.g. endpoints.<currency>.history

            @param givenPeriod <Boolean>

            @return <Array> || <Integer>
        */
        getDayDifference(givenPeriod = false) {
            const date = document.getElementById('datetime').value

            const currentDate = new Date()
            const pastDate = new Date(date)

            // get time in seconds
            if (givenPeriod) {
                return [Math.round(pastDate.getTime() / 1000), Math.round(currentDate.getTime() / 1000)]
            }

            const differenceMilliSeconds = currentDate.getTime() - pastDate.getTime()
            // calculate the number of days ==> ms * sec * min * h
            return Math.round(differenceMilliSeconds / (1000 * 60 * 60 * 24))
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
                        throw new Error(`HTTP error: ${response}`)
                    }
                    return response.json()
                })
                .then((data) => {
                    // get price history bulk data
                    if (range.length) {
                        this.history[id] = data.prices

                        return
                    }
                    // ... otherwise get a single course; either the current course (today)
                    if (period === 0) {
                        const { bitcoin, ethereum } = data

                        const { eur } = id === 'bitcoin'
                            ? bitcoin
                            : ethereum

                        this.prices[id].current = eur.toFixed(2)
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
            const { eur } = data.market_data.current_price

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
            rearrange data for the chart
            format: { timestamp: [bitcoinCourse, ethereumCourse] }
        */
        getChartPrices() {
            let { bitcoin, ethereum } = this.history
            // limit the chart data to no. of records (default: 20)
            bitcoin = bitcoin.slice(0, this.records)
            ethereum = ethereum.slice(0, this.records)

            Object.values(bitcoin).forEach(dateprice => {
                const [ timestamp, price ] = dateprice
                this.chartPrices[timestamp] = [price.toFixed(2)]
            })
            Object.values(ethereum).forEach(dateprice => {
                const [ timestamp, price ] = dateprice
                this.chartPrices[timestamp].push(price.toFixed(2))
            })
        },
        /*
            Listener; invoked when 'update-price' is fired ==> @/components/ControlPanel.vue::<DatePicker>
        */
        updatePrice() {
            for (let currency of ['bitcoin', 'ethereum']) {
                // update courses (anytime)
                this.getPrices(currency, this.getDayDifference())
                // update Price History
                this.getPrices(currency, 100, this.getDayDifference(true))
            }

            this.chartPrices = {}
            // wait a second for the history data to be fetched
            setTimeout(() => {
                this.getChartPrices()
            }, 1000)
        },
        updateTab(Tab) {
            this.tab = Tab
        },
        // start out ...
        init() {
            const periods = [0, 7, 30]
            // get the current prices as well as the past ones (last week and last month)
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
