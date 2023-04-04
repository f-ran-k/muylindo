<template>
    <v-row justify="space-around">
<!-- Price chart BTC -->
        <v-card v-if="chartStates.chart && chartStates.bitcoin && chartPrices.bitcoin.history" class="ma-8" height="auto" width="auto">
            <v-card-title class="small-caps bg-grey">
                <v-btn class="bg-grey" elevation="0">
                    <template v-slot:prepend>
                        <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="40" height="40" />
                    </template>
                </v-btn>
                Price Chart
            </v-card-title>

            <v-divider></v-divider>
            <!-- vertical margins get exchanged due to rotation; e.g. mb === mt and vice versa -->
            <v-row class="swap-vertical ma-4">
                <div v-for="(values, index) in chartPrices.bitcoin.history" :key="index"
                    class="bar bg-purple ml-2" :style="{ height: getBarHeight('bitcoin', values[1]) + 'px'}">

                    <span class="small-caps mx-2 mt-8">{{ values[1].toFixed(0) }} €</span>
                </div>
            </v-row>
        </v-card>
<!-- Price chart BTC end -->

<!-- Price chart ETH -->
        <v-card v-if="chartStates.chart && chartStates.ethereum && chartPrices.ethereum.history" class="ma-8" height="auto" width="auto">
            <v-card-title class="small-caps bg-grey">
                <v-btn class="bg-grey" elevation="0">
                    <template v-slot:prepend>
                        <img alt="Ethereum" src="@/assets/icons/IconEthereum.svg" width="40" height="40" />
                    </template>
                </v-btn>
                Price Chart
            </v-card-title>

            <v-divider></v-divider>
            <!-- vertical margins get exchanged due to rotation; e.g. mb === mt and vice versa -->
            <v-row class="swap-vertical ma-4">
                <div v-for="(values, index) in chartPrices.ethereum.history" :key="index"
                    class="bar bg-blue ml-2" :style="{ height: getBarHeight('ethereum', values[1]) + 'px'}">

                    <span class="small-caps mx-2 mt-8">{{ values[1].toFixed(0) }} €</span>
                </div>
            </v-row>
        </v-card>
<!-- Price chart ETH end -->
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
