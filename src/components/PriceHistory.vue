<template>
    <v-row justify="center">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-table v-if="states.history && states[currency] && history[currency]"
                class="mt-8 mx-2"
                fixed-header
                height="600px"
                >
                <thead>
                    <tr class="small-caps">
                        <th class="bg-grey">
                            <v-btn class="bg-grey ml-4" elevation="0">
                                <template v-slot:prepend>
                                    <img
                                        v-if="currency === 'bitcoin'"
                                        alt="Bitcoin"
                                        src="@/assets/icons/IconBitcoin.svg"
                                        height="40"
                                        width="40"
                                    />
                                    <img v-else
                                        alt="Ethereum"
                                        src="@/assets/icons/IconEthereum.svg"
                                        height="40"
                                        width="40"
                                    />
                                </template>
                            </v-btn>
                        </th>

                        <th class="bg-grey text-h6">Price History</th>

                        <th class="bg-grey">
                            <v-btn
                                v-if="history[currency]"
                                class="bg-grey"
                                label
                                elevation="0"
                                title="Sort"
                                >
                                <template v-slot:prepend>
                                    <img
                                        alt="Sort"
                                        src="@/assets/icons/IconSortDate.svg"
                                        title="Sort by Date"
                                        height="40"
                                        width="40"
                                        @click="sortHistory(currency, 0)"
                                    />
                                        &nbsp;&nbsp;
                                    <img
                                        alt="Sort"
                                        src="@/assets/icons/IconSortCourse.svg"
                                        title="Sort by Course"
                                        height="30"
                                        width="30"
                                        @click="sortHistory(currency, 1)"
                                    />
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
<!-- dateUnit === [<time in seconds>, <price>] -->
                <tbody>
                    <tr v-for="dateUnit in history[currency]" :key="dateUnit[0]">
                        <td>{{ getTimeStamp('isoCut', dateUnit[0]) }}</td>
                        <td>{{ getTimeStamp('timeCut', dateUnit[0]) }}</td>
                        <td>{{ dateUnit[1].toFixed(2) }} €</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'PriceHistory',
    inject: ['getTimeStamp'],
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
    methods: {
        /**
         *
         * @param { String } currency
         * @param { Integer } index
         *
         * @return { Object }
         */
        sortHistory(currency, index) {
            // provide container since children "shouldn't" change props
            const data = this.history
            // sort by date (ascending)
            if (index === 0) {
                return data[currency].sort((a, b) => a[0] - b[0])
            }
            // sort by price (descending)
            return data[currency].sort((a, b) => b[1] - a[1])
        },
    },
}
</script>
