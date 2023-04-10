<template v-if="States && history">
    <v-navigation-drawer class="small-caps" height="auto" width="400">
        <v-list>
            <v-list-item class="bg-grey text-h6">Controls</v-list-item>
        </v-list>

        <v-divider class="mb-4"></v-divider>
<!-- Currency -->
        <span class="ml-4">Select a currency</span>

        <v-row class="mx-4">
            <v-col>
                <v-switch
                    v-model="States.bitcoin"
                    label="Bitcoin"
                    color="purple"
                >
                </v-switch>
            </v-col>

            <v-col>
                <v-switch
                    v-model="States.ethereum"
                    label="Ethereum"
                    color="blue"
                >
                </v-switch>
            </v-col>
        </v-row>
<!-- Currency end -->
        <v-divider class="mb-4"></v-divider>
<!-- History && Chart -->
        <span class="ml-4">Data to display</span>

        <v-row class="mx-4 mt-4">
            <v-col>Courses</v-col>
            <v-col>History</v-col>
            <v-col>Chart</v-col>
        </v-row>

        <v-row class="mx-4">
            <v-col v-for="dataType in ['courses', 'history', 'chart']" :key="dataType">
                <v-switch
                    v-model="States[dataType]"
                    color="blue-grey"
                    :label="States[dataType] ? 'Hide' : 'Show'"
                    :disabled="!(States.bitcoin || States.ethereum)"
                >
                </v-switch>
            </v-col>
        </v-row>

        <v-row v-if="(States.history || States.chart) && !(history.bitcoin || history.ethereum)" class="ma-4 mt-0">
            <v-alert
                border="start"
                border-color="warning"
                elevation="2"
                title="No Data fetched yet!"
            >
                <span style="font-weight: normal;">Please select a date from the date picker below to display the price history and chart.</span>
            </v-alert>
        </v-row>
<!-- History && Chart end -->
        <v-divider class="mb-4"></v-divider>
<!-- Period -->
        <span class="ml-4">Select a period</span>

        <v-row class="mx-4">
            <v-col v-for="period in ['week', 'month']" :key="period">
                <v-switch
                    v-model="States[period]"
                    color="cyan"
                    :label="`Last ${period}`"   
                    :disabled="!States.courses || !(States.bitcoin || States.ethereum)"
                    >
                </v-switch>
            </v-col>
        </v-row>
<!-- Date Picker -->
        <span class="ml-4">Select a date</span>

        <v-row cols="12" class="mx-4">
            <v-col cols="4">
                <v-switch
                    v-model="States.anytime"
                    color="cyan"
                    :label="States.anytime ? 'Hide' : 'Show'"
                    :disabled="!(States.bitcoin || States.ethereum)"
                >
                </v-switch>
            </v-col>

            <v-col cols="8" v-if="States.anytime">
                <v-row class="mt-4 ml-4">
                    <v-form @submit.prevent>
                        <input id="datetime" type="date" value="2023-04-01" :disabled="!(States.bitcoin || States.ethereum)" />

                        <v-btn
                            class=" ml-2"
                            color="grey"
                            size="small"
                            title="Send"
                            :disabled="!(States.bitcoin || States.ethereum)"
                            @click="$emit('update-price')"
                        >
                            <span>Send</span>
                        </v-btn>
                    </v-form>
                </v-row>
            </v-col>
        </v-row>
<!-- Date Picker && Period end -->
        <v-divider class="mb-4"></v-divider>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'ControlPanel',
    emits:['update-price'],
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
            States: this.states,
        }
    },
}
</script>
