<template v-if="panelStates && panelPrices">
    <v-navigation-drawer height="auto" width="400">
        <v-list>
            <v-list-item class="bg-grey text-h6 small-caps">Controls</v-list-item>
        </v-list>
<!-- Currency -->
        <span class="small-caps ml-4">Select a currency</span>

        <v-row class="ml-4">
            <v-col>
                <v-switch
                    v-model="panelStates.bitcoin"
                    label="BTC"
                    color="purple"
                >
                </v-switch>
            </v-col>

            <v-col>
                <v-switch
                    v-model="panelStates.ethereum"
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
                    v-model="panelStates.week"
                    label="Last week"
                    color="cyan"
                    :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
                    >
                </v-switch>
            </v-col>

            <v-col>
                <v-switch
                    v-model="panelStates.month"
                    label="Last month"
                    color="cyan"
                    :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
                    >
                </v-switch>
            </v-col>
        </v-row>
<!-- Date Picker -->
        <span class="small-caps ml-4">Select a date</span>

        <v-row cols="12" class="ml-4">
            <v-col cols="4">
                <v-switch
                    v-model="panelStates.anytime"
                    color="cyan"
                    :label="panelStates.anytime ? 'Hide' : 'Show'"
                    :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
                >
                </v-switch>
            </v-col>

            <v-col cols="8" v-if="panelStates.anytime" class="mt-4">
                <v-form @submit.prevent>
                    <input id="datetime" type="date" value="2023-01-01" :disabled="!(panelStates.bitcoin || panelStates.ethereum)" />

                    <v-btn
                        class="small-caps ml-2"
                        color="grey"
                        size="small"
                        title="Send"
                        :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
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
                    v-model="panelStates.history"
                    color="blue-grey"
                    :label="panelStates.history ? 'Hide' : 'Show'"
                    :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
                >
                </v-switch>
            </v-col>

            <v-col class="ml-4">
                <v-switch
                    v-model="panelStates.chart"
                    color="blue-grey"
                    :label="panelStates.chart ? 'Hide' : 'Show'"
                    :disabled="!(panelStates.bitcoin || panelStates.ethereum)"
                >
                </v-switch>
            </v-col>
        </v-row>

        <v-row v-if="(panelStates.history || panelStates.chart) && !panelPrices.bitcoin.history" class="ma-4 mt-0">
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
            panelPrices: this.prices,
            panelStates: this.states,
        }
    },
}
</script>
