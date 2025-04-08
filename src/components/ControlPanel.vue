<template>
    <v-navigation-drawer class="small-caps" width="400">
        <v-row>
            <v-col class="bg-grey text-h6 mt-4 ml-4">Controls</v-col>
        </v-row>

        <v-divider class="mb-8"></v-divider>
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
<!-- Courses, History, Chart -->
        <span class="ml-4">Toggle tabs</span>

        <v-row class="mt-4 mx-4">
            <v-col>Courses</v-col>
            <v-col>History</v-col>
            <v-col>Chart</v-col>
        </v-row>

        <v-row class="mt-0 mx-4">
            <v-col v-for="dataType in ['courses', 'history', 'chart']" :key="dataType">
                <v-switch
                    v-model="States[dataType]"
                    color="blue-grey"
                    :label="States[dataType] ? 'Hide' : 'Show'"
                    :disabled="elementDisabled"
                >
                </v-switch>
            </v-col>
        </v-row>

        <v-row v-if="noData" class="ma-4 mt-0">
            <v-alert
                border="start"
                border-color="warning"
                elevation="2"
                title="No Data fetched yet!"
            >
                <span class="font-weight-normal">Please select a date from the date picker to display the price history and chart.</span>
            </v-alert>
        </v-row>
<!-- Courses, History, Chart end -->
        <v-divider class="mb-4"></v-divider>
<!-- Period -->
        <span class="ml-4">Select a period</span>

        <v-row class="mx-4">
            <v-col v-for="period in ['week', 'month']" :key="period">
                <v-switch
                    v-model="States[period]"
                    color="cyan"
                    :label="`Last ${period}`"   
                    :disabled="!States.courses || elementDisabled"
                    >
                </v-switch>
            </v-col>
        </v-row>
<!-- Period end -->

<!-- Date Picker -->
        <span class="ml-4">Select a date</span>

        <v-row cols="12" class="mx-4">
            <v-col cols="4">
                <v-switch
                    v-model="States.anytime"
                    color="cyan"
                    :label="States.anytime ? 'Hide' : 'Show'"
                    :disabled="elementDisabled"
                >
                </v-switch>
            </v-col>

            <v-col cols="8" v-if="States.anytime">
                <v-row class="mt-4 ml-4">
                    <v-form @submit.prevent :disabled="elementDisabled">
                        <input id="datetime" type="date" value="2025-01-01" :disabled="elementDisabled" />

                        <v-btn
                            class=" ml-2"
                            color="grey"
                            size="small"
                            title="Submit"
                            variant="tonal"
                            @click="$emit('update-price')"
                            :disabled="elementDisabled"
                        >
                            <span>Submit</span>
                        </v-btn>
                    </v-form>
                </v-row>
            </v-col>
        </v-row>
<!-- Date Picker end -->
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
    computed: {
        elementDisabled() {
            return !(this.States.bitcoin || this.States.ethereum)
        },
        noData() {
            return (this.States.history || this.States.chart) && !(Object.keys(this.history.bitcoin).length || Object.keys(this.history.ethereum).length)
        },
    },
}
</script>
