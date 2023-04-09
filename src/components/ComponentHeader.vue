<template>
    <v-app-bar>
        <v-app-bar-title class="small-caps">Crypto currency</v-app-bar-title>

            <template v-slot:prepend>
                <img alt="Coin" src="@/assets/icons/IconCoin.svg" width="40" height="40" />
            </template>

            <template v-slot:append>
                <v-switch
                    class="small-caps mt-4"
                    color="blue-grey"
                    title="Switch Theme"
                    @click="$emit('toggle-theme')"
                    >
                </v-switch>

                <img class="mx-4" alt="Sun" src="@/assets/icons/IconSun.svg" width="24" height="24" />
            </template>
    </v-app-bar>
</template>

<script>
export default {
    name: 'ComponentHeader',
    emits: ['toggle-theme'],
}
</script>
