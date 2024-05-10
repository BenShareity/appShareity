import Vue from 'vue'
import { PolarArea, } from 'vue-chartjs'

Vue.component('PolarArea', {
    extends: PolarArea,
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