<template>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }
}
</style>
