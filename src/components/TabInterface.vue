<template>
    <v-tabs v-if="showTabs" bg-color="black" class="mb-8" height="60" v-model="Tab" grow>
        <v-tab v-for="name in ['courses', 'history', 'chart']" :key="name" :disabled="!states[name]" @click="emitTab">
            {{ name }}
        </v-tab>
    </v-tabs>
</template>

<script>
export default {
    name: 'TabInterface',
    emits: ['update-tab'],
    props: {
        tab: {
            type: Number,
            required: true,
        },
        states: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            Tab: this.tab,
        }
    },
    methods: {
        emitTab() {
            this.$emit('update-tab', this.Tab)
        }
    },
    computed: {
        showTabs() {
            return (this.states.bitcoin || this.states.ethereum) && (this.states.courses || this.states.history || this.states.chart)
        },
    },
}
</script>
