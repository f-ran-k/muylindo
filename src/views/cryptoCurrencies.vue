<template>
    <ControlPanel
        :history="history"
        :states="states"
        @update-price="updatePrice()"
    />

    <v-main>
        <v-container fluid>
            <AppInfo v-show="!(states.bitcoin || states.ethereum)" />

            <CryptoCourses
                :prices="prices"
                :states="states"
            />

            <PriceHistory v-if="dataFetched"
                :history="history"
                :states="states"
            />

            <PriceChart v-if="dataFetched"
                :chartPrices="chartPrices"
                :states="states"
            />
        </v-container>
    </v-main>
</template>

<script>
import AppInfo from '@/components/AppInfo.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import CryptoCourses from '@/components/CryptoCourses.vue'
import PriceHistory from '@/components/PriceHistory.vue'
import PriceChart from '@/components/PriceChart.vue'

export default {
    name: 'CryptoCurrencies',
    components: {
        AppInfo,
        ControlPanel,
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
                bitcoin: false, ethereum: false, week: true, month: true, anytime: false, courses: true, history: false, chart: false,
            },
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
                const [to, from] = range
                // replace url end to prevent appending the params everytime the function is called
                return this.endpoints[id].range = `${this.endpoints[id].range.replace(/from=.*$/, '')}from=${from}&to=${to}`
            }

            const date = this.getTimeStamp('urlGecko', 0, period)

            return period === 0
                ? this.endpoints[id].price
                : this.endpoints[id].history = `${this.endpoints[id].history.replace(/date=.*$/, '')}date=${date}`
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
                isoCut: date.toISOString().slice(0, 10),
                original: date,
                seconds: date.getTime(),
                short: date.toDateString(),
                timeCut: date.toTimeString().slice(0, 8),
                url: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
                urlGecko: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            }

            return formats[format]
        },
        /*
            calculate the time difference of two dates in days

            @return <Integer>
        */
        getDayDifference() {
            const date = document.getElementById('datetime').value

            const currentDate = new Date()
            const pastDate = new Date(date)

            const differenceSeconds = currentDate.getTime() - pastDate.getTime()
            // calculate the number of days ==> ms * sec * min * h
            return Math.round(differenceSeconds / (1000 * 60 * 60 * 24))
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
                        throw new Error(`HTTP error: code: ${response.status} type: ${response.type} url: ${response.url}`)
                    }
                    return response.json()
                })
                .then((data) => {
                    // get price history bulk data
                    if (range.length) {
                        this.history[id] = data.prices.slice(0, this.records)

                        this.chartPrices = this.getChartPrices()

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
            const { bitcoin, ethereum } = this.history

            let prices = {}
            Object.values(bitcoin).forEach(dateprice => {
                prices[dateprice[0]] = [dateprice[1].toFixed(2)]
            })
            Object.values(ethereum).forEach(dateprice => {
                prices[dateprice[0]].push(dateprice[1].toFixed(2))
            })

            return prices
        },
        /*
            Listener; invoked when 'update-price' is fired ==> @/components/ControlPanel.vue
        */
        updatePrice() {
            for (let currency of ['bitcoin', 'ethereum']) {
                // update courses (anytime)
                this.getPrices(currency, this.getDayDifference())
                // update Price History and Chart
                this.getPrices(currency, 100, this.getTimeRange())
            }
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
