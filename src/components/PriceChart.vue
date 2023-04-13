<template>
    <v-row justify="center">
        <v-card v-if="states.chart && (states.bitcoin || states.ethereum)" class="ma-8" height="auto" width="auto">

            <v-card-title class="small-caps bg-grey">
                <v-btn class="bg-grey" elevation="0">
                    <template v-slot:prepend>
                        <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                            &nbsp;&nbsp;
                        <img alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
                    </template>
                </v-btn>

                <span>Price Chart</span>
            </v-card-title>

            <v-divider></v-divider>

            <!-- vertical margins get exchanged due to rotation; e.g. mb === mt and vice versa -->
            <v-row class="ma-4 mb-0">
                <div v-for="(values, index) in chartPrices" :key="index">
                    <span v-for="currency in ['bitcoin', 'ethereum']" :key="currency"
                        :class="[currencyProps.bar, currencyProps[currency].color, currencyProps.margin]"
                        :style="{ height: getBarHeight(currency, values[currencyProps[currency].index]) + 'px' }"
                        :title="getTitle(currency) + ': ' + getTimeStamp('isoCut', parseInt(index))"
                        >
                        <span class="rotate-text mt-4">{{ values[currencyProps[currency].index] }} €</span>
                    </span>
                </div>
            </v-row>
        </v-card>
    </v-row>
</template>

<script>
export default {
    name: 'PriceChart',
    inject: ['getTimeStamp'],
    props: {
        chartPrices: {
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
                bar: 'bar',
                bitcoin: {
                    color: 'bg-purple',
                    index: 0,
                },
                ethereum: {
                    color: 'bg-blue',
                    index: 1,
                },
                margin: 'ml-2',
            },
        }
    },
    methods: {
        /*
            uppercase first letter; corresponds to PHP's ucfirst()

            @param term <String>

            @return <String>
        */
        getTitle(term) {
            return term.charAt(0).toUpperCase() + term.slice(1)
        },
        /*
            get individual bar heights in pixels

            @param id <String> e.g 'bitcoin' || 'ethereum'
            @param price <Integer>

            @return <Integer>
        */
        getBarHeight(id, price) {
            const divisors = {
                bitcoin: { 500: 15, 1000: 30, 2000: 60, 5000: 150, 10000: 300, 20000: 600, 50000: 1500 },
                ethereum: { 500: 5, 1000: 10, 2000: 20, 5000: 50, 10000: 100, 20000: 200, 50000: 500 },
            }

            const matches = Object.keys(divisors[id]).filter(value => price < value)
            const min = matches[matches.length - 1]

            return 100 + Math.round(price / divisors[id][min])
        },
    },
}
</script>
