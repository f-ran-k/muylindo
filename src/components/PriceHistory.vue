<template>
    <v-row justify="space-around">
        <div v-for="currency in ['bitcoin', 'ethereum']" :key="currency">
            <v-table v-if="States.history && States[currency] && History[currency]"
                fixed-header
                class="mt-8"
                height="600px"
            >
                <thead>
                    <tr class="small-caps">
                        <th class="bg-grey">
                            <v-btn class="bg-grey ml-4" elevation="0">
                                <template v-slot:prepend>
                                    <img v-if="currency === 'bitcoin'" alt="Bitcoin" src="@/assets/icons/IconBitcoin.svg" height="40" width="40" />
                                    <img v-else alt="Ethereum" src="@/assets/icons/IconEthereum.svg" height="40" width="40" />
                                </template>
                            </v-btn>
                        </th>

                        <th class="bg-grey text-h6">Price History</th>

                        <th class="bg-grey">
                            <v-btn
                                v-if="History[currency]"
                                class="bg-grey"
                                label
                                elevation="0"
                                title="Sort by Course"
                                @click="History[currency].sort((a, b) => b[1] - a[1])"
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
<!-- datePrice === [<time in seconds>, <price>] -->
                <tbody>
                    <tr v-for="datePrice in History[currency]" :key="datePrice[0]">
                        <td>{{ historyDateFormat(0, datePrice[0]) }}</td>
                        <td>{{ getTime(datePrice[0]) }}</td>
                        <td>{{ datePrice[1].toFixed(2) }} €</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'PriceHistory',
    props: {
        history: {
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
            History: this.history,
            States: this.states,
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
