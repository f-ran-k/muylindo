<template>
    <v-row justify="center" class="small-caps">
        <v-row v-for="props in infoProps" :key="props" class="ma-8">
            <v-alert
                border="top"
                border-color="info"
                elevation="2"
                :title="props.title"
            >
                <span style="font-weight: normal;" v-html="props.text"></span>
            </v-alert>
        </v-row>
    </v-row>
</template>

<script>
export default {
    name: 'AppInfo',
    data() {
        return {
            infoProps: {
                project: {
                    title: 'Project',
                    text: "This small project arose from an application interview. It's name <strong>muylindo</strong> is Spanish for <em>very nice</em> and is chosen arbitrarily. It doesn't reflect anything in regards to the App's content.",
                },
                dateFormat: {
                    title: 'Date Format',
                    text: 'Please note that the Date Formats differ. The Date Picker Element uses <em>MM/DD/YYYY</em> whereas the format <em>YYYY/MM/DD</em> is used throughout the whole application.',
                },
            },
        }
    },
}
</script>
