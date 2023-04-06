<template>
    <v-row justify="space-around">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-card v-if="chartStates.chart && chartStates[currency] && chartPrices[currency].history" class="ma-8" height="300" width="auto">
                <v-card-title class="small-caps bg-grey">
                    <v-btn class="bg-grey" elevation="0">
                        <template v-slot:prepend>
                            <img v-if="currency === 'bitcoin'" alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                            <img v-else alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
                        </template>
                    </v-btn>
                    Price Chart
                </v-card-title>

                <v-divider></v-divider>
                <!-- vertical margins get exchanged due to rotation; e.g. mb === mt and vice versa -->
                <v-row class="swap-vertical ma-4">
                    <div v-for="(values, index) in chartPrices[currency].history" :key="index"
                        :class="[currencyProps[currency].color, currencyProps.bar, currencyProps.margin]" :style="{ height: getBarHeight(currency, values[1]) + 'px'}">

                        <span class="small-caps mx-2 mt-8">{{ values[1].toFixed(2) }} €</span>
                    </div>
                </v-row>
            </v-card>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'PriceChart',
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
            chartPrices: this.prices,
            chartStates: this.states,
            currencyProps: {
                bar: 'bar',
                bitcoin: {
                    color: 'bg-purple',
                },
                ethereum: {
                    color: 'bg-blue',
                },
                margin: 'ml-2',
            },
        }
    },
    methods: {
        /*
            get individual bar heights in pixels

            @param id <String> e.g 'bitcoin' || 'ethereum'
            @param price <Integer>

            @return <Integer>
        */
       // TODO :: sort of sloppy; needs a better logical approach
       getBarHeight(id, price) {
            // add a minimum height for each bar
            const minHeight = 100

            return id === 'bitcoin'
                ? price < 2000
                    ? (price / 20) + minHeight
                    : price / 200
                : price < 2000
                    ? (price / 10) + minHeight
                    : price / 20
        },
    },
}
</script>
