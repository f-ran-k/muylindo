<template>
    <div class="float-right">
        <v-card v-for="props in infoProps" :key="props" class="small-caps my-8" width="600px">
            <v-alert
                border="top"
                :border-color="props.color"
                elevation="2"
                :title="props.title"
                >
                <span style="font-weight: normal;" v-html="props.text"></span>
            </v-alert>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'AppInfo',
    data() {
        return {
            infoProps: {
                about: {
                    title: 'About',
                    color: 'info',
                    text: 'This project originated from a job interview.<br />\
                            It displays information about the Crypto Currencies <strong>Bitcoin</strong> and <strong>Ethereum</strong>\
                            including current and past <strong>courses</strong>,\
                            a <strong>price history</strong> and a <strong>basic chart</strong>.<br />\
                            It is build with <strong>Vue.js</strong> and <strong>Vuetify</strong>.<br />\
                            The Code is hosted on <strong>GitHub</strong> and is open source.'
                },
                data: {
                    title: 'Data',
                    color: 'info',
                    text: 'The Data displayed is provided by the <strong>CoinGecko</strong> API.<br />\
                            The following Rules apply when selecting a past date from the <strong>Date Picker</strong>:<br />\
                            1 day from current time = 5 minute interval data<br />\
                            1 - 90 days from current time = hourly data<br />\
                            above 90 days from current time = daily data'
                },
                format: {
                    title: 'Date Format',
                    color: 'warning',
                    text: 'The <strong>Date Picker</strong> uses the format <strong>MM/DD/YYYY</strong><br />\
                            as opposed to <strong>YYYY/MM/DD</strong> used throughout the rest of the <strong>Application</strong>\
                            to display the dates.'
                },
            },
        }
    },
}
</script>
