<template>
    <v-app theme="dark">
        <v-navigation-drawer app>
            <!-- -->
        </v-navigation-drawer>

        <v-app-bar elevated>
            <v-app-bar-title>Crypto currency</v-app-bar-title>
            <!-- -->
            <template v-slot:prepend>
                <v-app-bar-nav-icon>Click</v-app-bar-nav-icon>
            </template>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script setup>
</script>
