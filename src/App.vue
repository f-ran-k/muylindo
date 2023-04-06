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
    name: 'CryptoCurrencies',
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

<style>
.bar {
    display: inline-block;
    width: 24px;
    writing-mode: vertical-rl;
}
.dot {
    display: inline-block;
    border-radius: 50%;
    height: 16px;
    width: 16px;
}
.no-wrap {
    white-space: nowrap;
}
.small-caps {
    font-variant: small-caps;
    font-weight: bold;
}
.swap-vertical {
    transform: rotate(180deg);
}
</style>
