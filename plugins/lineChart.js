import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('line-chart', {
    extends: Line,
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
            }),
         
        },
    },
    watch: {
        data() {
            this.renderChart(this.data, this.options)
        },
    },
    mounted() {
        this.renderChart(this.data, this.options)
    },
})