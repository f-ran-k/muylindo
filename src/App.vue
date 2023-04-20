<template>
    <v-app :theme="theme">
        <ComponentHeader @toggle-theme="toggleTheme()" />

        <RouterView />

        <ComponentFooter />
    </v-app>
</template>

<script setup>
    import { RouterView } from 'vue-router'
</script>

<script>
import ComponentHeader from '@/components/ComponentHeader.vue'
import ComponentFooter from '@/components/ComponentFooter.vue'

export default {
    name: 'AppRoot',
    components: {
        ComponentHeader,
        ComponentFooter,
    },
    data() {
        return {
            theme: 'dark',
        }
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
        },
    },
}
</script>

<style lang="css" src="@/assets/currency.css"></style>
