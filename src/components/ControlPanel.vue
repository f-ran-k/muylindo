<template v-if="localStates && localPrices">
    <v-navigation-drawer height="auto" width="400">
        <v-list>
            <v-list-item class="bg-grey text-h6 small-caps">Controls</v-list-item>
        </v-list>
<!-- Currency -->
        <span class="small-caps ml-4">Select a currency</span>

        <v-row class="ml-4">
            <v-col>
                <v-switch
                    v-model="localStates.bitcoin"
                    label="BTC"
                    color="purple"
                >
                </v-switch>
            </v-col>

            <v-col>
                <v-switch
                    v-model="localStates.ethereum"
                    label="ETH"
                    color="blue"
                >
                </v-switch>
            </v-col>
        </v-row>
<!-- Currency end -->
        <v-divider class="mb-4"></v-divider>
<!-- Period -->
        <span class="small-caps ml-4">Select a period</span>

        <v-row class="ml-4">
            <v-col>
                <v-switch
                    v-model="localStates.week"
                    label="Last week"
                    color="cyan"
                    :disabled="!(localStates.bitcoin || localStates.ethereum)"
                    >
                </v-switch>
            </v-col>

            <v-col>
                <v-switch
                    v-model="localStates.month"
                    label="Last month"
                    color="cyan"
                    :disabled="!(localStates.bitcoin || localStates.ethereum)"
                    >
                </v-switch>
            </v-col>
        </v-row>
<!-- Date Picker -->
        <span class="small-caps ml-4">Select a date</span>

        <v-row cols="12" class="ml-4">
            <v-col cols="4">
                <v-switch
                    v-model="localStates.anytime"
                    color="cyan"
                    :label="localStates.anytime ? 'Hide' : 'Show'"
                    :disabled="!(localStates.bitcoin || localStates.ethereum)"
                >
                </v-switch>
            </v-col>

            <v-col cols="8" v-if="localStates.anytime" class="mt-4">
                <v-form @submit.prevent>
                    <input id="datetime" type="date" value="2023-01-01" :disabled="!(localStates.bitcoin || localStates.ethereum)" />

                    <v-btn
                        class="small-caps ml-2"
                        color="grey"
                        size="small"
                        title="Send"
                        :disabled="!(localStates.bitcoin || localStates.ethereum)"
                        @click="$emit('update-price')"
                        >
                        <span>Go</span>
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
<!-- Date Picker && Period end -->
        <v-divider class="mb-4"></v-divider>
<!-- History && Chart -->
        <v-row class="small-caps">
            <v-col class="ml-4">Price History</v-col>
            <v-col class="ml-4">Price Chart</v-col>
        </v-row>

        <v-row>
            <v-col class="ml-4">
                <v-switch
                    v-model="localStates.history"
                    color="blue-grey"
                    :label="localStates.history ? 'Hide' : 'Show'"
                    :disabled="!(localStates.bitcoin || localStates.ethereum)"
                >
                </v-switch>
            </v-col>

            <v-col class="ml-4">
                <v-switch
                    v-model="localStates.chart"
                    color="blue-grey"
                    :label="localStates.chart ? 'Hide' : 'Show'"
                    :disabled="!(localStates.bitcoin || localStates.ethereum)"
                >
                </v-switch>
            </v-col>
        </v-row>

        <v-row v-if="(localStates.history || localStates.chart) && !localPrices.bitcoin.history" class="ma-4 mt-0">
            <v-alert
                border="start"
                border-color="warning"
                elevation="2"
                title="NO DATA FETCHED YET!"
            >
                Please select a date from the date picker above to display the price history and chart.
            </v-alert>
        </v-row>
<!-- History && Chart end -->
        <v-divider class="mb-4"></v-divider>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'ControlPanel',
    emits:['update-price'],
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
            localPrices: this.prices,
            localStates: this.states,
        }
    },
}
</script>
