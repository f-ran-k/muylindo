<template>
    <v-row justify="space-around">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-card v-if="states.chart && states[currency] && history[currency]" class="ma-8" height="auto" width="auto">

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
                    <span v-for="(values, index) in history[currency]" :key="index"
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
    inject: ['getDate'],
    props: {
        history: {
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
       getBarHeight(id, price) {
            return id === 'bitcoin'
                ? 100 + (price / 250)
                : 100 + (price / 25)
        },
    },
}
</script>
