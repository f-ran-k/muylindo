<template>
    <v-row justify="space-around">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-card v-if="chartStates.chart && chartStates[currency] && chartPrices[currency].history" class="ma-8" height="auto" width="auto">

                <v-card-title class="small-caps bg-grey">
                    <v-btn class="bg-grey" elevation="0">
                        <template v-slot:prepend>
                            <img v-if="currency === 'bitcoin'" alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                            <img v-else alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
                        </template>
                    </v-btn>

                    <span>Price Chart</span>
                </v-card-title>

                <v-divider></v-divider>

                <!-- vertical margins get exchanged due to rotation; e.g. mb === mt and vice versa -->
                <v-row class="swap-vertical ma-4">
                    <span v-for="(values, index) in chartPrices[currency].history" :key="index"
                        :class="[currencyProps.bar, currencyProps[currency].color, currencyProps.margin]"
                        :style="{ height: getBarHeight(currency, values[1]) + 'px'}"
                        :title="getDate(values[0])" 
                        >
                        <span class="mt-4">{{ values[1].toFixed(2)  }} €</span>
                    </span>
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
        getDate(seconds) {
            return new Date(seconds).toDateString()
        },
        /*
            get individual bar heights in pixels

            @param id <String> e.g 'bitcoin' || 'ethereum'
            @param price <Integer>

            @return <Integer>
        */
       getBarHeight(id, price) {
            // const boundaries = {
            //     bitcoin: { height: 50, 500: 5, 1000: 10, 2000: 20, 5000: 100, 10000: 200, 25000: 500, 50000: 1000 },
            //     ethereum: { height: 100, 100: 5, 200: 10, 500: 20, 1000: 50, 2000: 100, 5000: 250 }
            // }

            // const matches = Object.keys(boundaries[id]).filter(val => val < price)
            // const min = matches[matches.length - 1]

            // return boundaries[id].height + Math.round(price / boundaries[id][min])
            return id === 'bitcoin'
                ? 100 + (price / 250)
                : 100 + (price / 25)
        },
    },
}
</script>
