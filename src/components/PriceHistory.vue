<template>
    <v-row justify="space-around">
<!-- Price history BTC -->
        <v-table v-if="historyStates.history && historyStates.bitcoin && historyPrices.bitcoin.history"
            fixed-header
            class="mt-8"
            height="600px"
        >
            <thead>
                <tr class="small-caps">
                    <th class="bg-grey">
                        <v-btn class="bg-grey ml-4" elevation="0">
                            <template v-slot:prepend>
                                <img alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" width="40" height="40" />
                            </template>
                        </v-btn>
                    </th>

                    <th class="bg-grey text-h6">Price History</th>

                    <th class="bg-grey">
                        <v-btn
                            v-if="historyPrices.bitcoin.history"
                            class="bg-grey"
                            label
                            elevation="0"
                            title="Sort by Course"
                            @click="historyPrices.bitcoin.history.sort((a, b) => b[1] - a[1])"
                            >
                            <template v-slot:prepend>
                                <img alt="Sort" src="@/assets/icons/IconSort.svg" width="30" height="30" />
                            </template>
                        </v-btn>
                    </th>
                </tr>

                <tr class="small-caps">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Course</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="n in historyPrices.bitcoin.history.slice(0, 20)" :key="n">
                    <td>{{ historyDateFormat(0, n[0]) }}</td>
                    <td>{{ getTime(n[0]) }}</td>
                    <td>{{ n[1].toFixed(2) }} €</td>
                </tr>
            </tbody>
        </v-table>
<!-- Price history BTC end -->

<!-- Price history ETH -->
        <v-table v-if="historyStates.history && historyStates.ethereum && historyPrices.ethereum.history"
            fixed-header
            class="mt-8"
            height="600px"
        >
            <thead>
                <tr class="small-caps">
                    <th class="bg-grey">
                        <v-btn class="bg-grey ml-4" elevation="0">
                            <template v-slot:prepend>
                                <img alt="Bitcoin" src="@/assets/icons/IconEthereum.svg" width="40" height="40" />
                            </template>
                        </v-btn>
                    </th>

                    <th class="bg-grey text-h6">Price History</th>

                    <th class="bg-grey">
                        <v-btn
                            v-if="historyPrices.ethereum.history"
                            class="bg-grey"
                            label
                            elevation="0"
                            title="Sort by Course"
                            @click="historyPrices.ethereum.history.sort((a, b) => b[1] - a[1])"
                            >
                            <template v-slot:prepend>
                                <img alt="Sort" src="@/assets/icons/IconSort.svg" width="30" height="30" />
                            </template>
                        </v-btn>
                    </th>
                </tr>

                <tr class="small-caps">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Course</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="n in historyPrices.ethereum.history.slice(0, 20)" :key="n">
                    <td>{{ historyDateFormat(0, n[0]) }}</td>
                    <td>{{ getTime(n[0]) }}</td>
                    <td>{{ n[1].toFixed(2) }} €</td>
                </tr>
            </tbody>
        </v-table>
<!-- Price history ETH end -->
    </v-row>
</template>

<script>
export default {
    name: 'PriceHistory',
    props: {
        prices: {
            type: Object,
            required: true,
        },
        states: {
            type: Object,
            required: true,
        },
        dateFormat: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            historyPrices: this.prices,
            historyStates: this.states,
            historyDateFormat: this.dateFormat,
        }
    },
    methods: {
        /*
            extract the time portion from the date, e.g. 09:22:35

            @param timestamp <Integer>

            @return <String>
        */
        getTime(timestamp) {
            return new Date(timestamp).toTimeString().slice(0, 8)
        },
    },
}
</script>
