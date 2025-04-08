<template>
    <v-row justify="center">
        <Scatter id="crypto-chart" :data="chartData" :options="chartOptions" />
    </v-row>
</template>

<script>
import { Scatter } from 'vue-chartjs'
import { Chart, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'

Chart.register(LinearScale, LineElement, PointElement, Tooltip, Legend )

export default {
    name: 'PriceChart',
    components: { Scatter },
    props: {
        history: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            chartData: {
                datasets: [
                    {
                        label: 'Bitcoin',
                        backgroundColor: 'purple',
                        data: [
                            { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 },
                        ],
                    },
                    {
                        label: 'Ethereum',
                        backgroundColor: 'blue',
                        data: [
                            { x: -2, y: -4 }, { x: -1, y: -1 }, { x: 0, y: 1 }, { x: 1, y: -1 }, { x: 2, y: -4 },
                        ],
                    },
                ]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    methods: {},
}
</script>
