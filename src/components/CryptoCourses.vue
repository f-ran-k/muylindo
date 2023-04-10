<template>
    <v-row justify="space-around">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-card v-if="states.courses && (states.bitcoin || states.ethereum)" class="mt-8" height="auto" width="auto">
                <v-btn v-if="states[currency]" block class="small-caps text-black mb-2" size="x-large" variant="flat" :color="currencyProps[currency].color">
                    <template v-slot:prepend>
                        <img v-if="currency === 'bitcoin'" alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                        <img v-else alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
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

                            <th v-if="states.anytime">Change ({{ dateFormat(dayDifference()) }})</th>
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

                            <td v-if="states.anytime && prices[currency].anytime">
                                {{ getPercentage(prices[currency].current, prices[currency].anytime, currency, 'anytime') }} %
                                <span :class="[dot.name, dot.margin, !percentageState[currency].anytime ? dot.color.red : dot.color.green]"></span>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'CryptoCourses',
    inject: ['dateFormat', 'dayDifference'],
    props: {
        prices: {
            type: Object,
            required: true,
        },
        states: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currencyProps: {
                bitcoin: {
                    color: 'purple',
                    heading: 'Bitcoin (BTC)',
                },
                ethereum: {
                    color: 'blue',
                    heading: 'Ethereum (ETH)',
                },
            },
            dot: {
                name: 'dot',
                margin: 'ml-2',
                color: {
                    red: 'bg-red', green: 'bg-green',
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
        }
    },
    methods: {
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

    },
}
</script>
