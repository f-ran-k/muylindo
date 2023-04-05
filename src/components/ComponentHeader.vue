<template>
    <v-app-bar elevated>
        <v-app-bar-title class="small-caps text-h5">Crypto currency</v-app-bar-title>

        <template v-slot:prepend>
            <img title="Crypto currency" alt="Coin" src="@/assets/icons/IconCoin.svg" width="40" height="40" />
        </template>

        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>

        <v-row>
            <v-switch
                class="small-caps mt-4"
                color="blue-grey"
                label="Toggle Theme"
                @click="$emit('toggle-theme')"
                >
            </v-switch>
        </v-row>
    </v-app-bar>
</template>

<script>
export default {
    name: 'ComponentHeader',
    emits: ['toggle-theme'],
}
</script>
