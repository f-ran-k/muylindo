<template>
    <v-row justify="space-around">
        <span v-if="states.courses && (states.bitcoin || states.ethereum)">
            <v-card v-for="currency in ['bitcoin', 'ethereum']" :key="currency" class="mt-8">
                <v-btn v-if="states[currency]"
                    block class="small-caps text-black mb-2" :color="currencyProps[currency].color" size="x-large" variant="flat"
                    >
                    <template v-slot:prepend>
                        <img v-if="currency === 'bitcoin'" alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                        <img v-else alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
                    </template>

                    <span class="small-caps">{{ currencyProps[currency].heading }}</span>
                </v-btn>

                <v-table v-if="states[currency]"
                    fixed-header
                    >
                    <thead>
                        <tr class="small-caps no-wrap">
                            <th><span>Today</span></th>
                            <th><span v-if="states.week">Change (week)</span></th>
                            <th><span v-if="states.month">Change (month)</span></th>
                            <th><span v-if="states.anytime">Change ({{ getTimeStamp('isoCut', 0, getDayDifference()) }})</span></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="no-wrap">
                            <td>{{ prices[currency].current }} €</td>

                            <td v-for="period in ['week', 'month', 'anytime']" :key="period">
                                <v-col v-if="states[period] && (period === 'anytime' ? prices[currency].anytime : true)">
                                    <span>{{ getPercentage(prices[currency].current, prices[currency][period], currency, period) }} %</span>
                                    <span :class="[dot.name, dot.margin, percentageState[currency][period] ? dot.color.red : dot.color.green]"></span>
                                </v-col>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </span>
    </v-row>
</template>

<script>
export default {
    name: 'CryptoCourses',
    inject: ['getTimeStamp', 'getDayDifference'],
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
                    heading: 'Bitcoin',
                },
                ethereum: {
                    color: 'blue',
                    heading: 'Ethereum',
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
            this.percentageState[id][period] = pastPrice < currentPrice

            // the prepended '+' gets rid of trailing zeros; e.g. 1.50 ==> 1.5
            return +((pastPrice / currentPrice * 100) - 100).toFixed(2)
        },
    },
}
</script>
