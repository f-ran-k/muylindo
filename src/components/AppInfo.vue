<template>
    <div class="float-right">
        <v-card v-for="props in infoProps" :key="props" class="small-caps my-8" width="600px">
            <v-alert
                border="top"
                :border-color="props.color"
                elevation="2"
                :title="props.title"
                >
                <span class="font-weight-normal" v-html="props.text"></span>
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
                usage: {
                    title: 'Usage',
                    color: 'info',
                    text: 'The upper switches - <strong>Bitcoin</strong> and <strong>Ethereum</strong> - in the Control Panel to the left serve as masters.<br />\
                    If both are disabled, this info is displayed and all other switches are disabled as well.<br />\
                    Toggle either of it or both to display the single currency courses and enable the other switches.<br />\
                    Toggle either of the latter in turn to display the appropriate data.',
                },
                data: {
                    title: 'Data',
                    color: 'info',
                    text: 'The Data displayed is provided by <strong>CoinGecko</strong>.<br />\
                            The following Rules apply when selecting a date from the <strong>Date Picker</strong>:<br />\
                            1 day from current time = 5 minute interval data<br />\
                            1 - 90 days from current time = hourly data<br />\
                            above 90 days from current time = daily data'
                },
                format: {
                    title: 'Date Format',
                    color: 'warning',
                    text: 'The <strong>Date Picker</strong> uses the format <strong>MM/DD/YYYY</strong> as opposed to <strong>YYYY/MM/DD</strong><br />\
                            used throughout the <strong>Application</strong> to display the dates.'
                },
            },
        }
    },
}
</script>
