<template>
    <v-app theme="dark">
        <v-app-bar elevated>
            <v-app-bar-title>Crypto currency</v-app-bar-title>

            <template v-slot:prepend>
                <img alt="Crypto" src="../components/icons/IconBitcoin.svg" width="40" height="40" />
            </template>
            {{ prices }}
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row justify="space-around">
                    <v-navigation-drawer>
                        <v-list>
                            <v-list-item title="Menu"></v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-radio-group inline label="Select a currency" class="ma-4">
                            <v-radio label="Bitcoin" value="bitcoin"></v-radio>
                            <v-radio label="Ethereum" value="ethereum"></v-radio>
                        </v-radio-group>

                        <v-switch class="ml-4" label="Bitcoin"></v-switch>
                        <v-switch class="ml-4" label="Ethereum"></v-switch>
                    </v-navigation-drawer>

                    <v-card width="400" height="250" theme="dark" class="mt-8">
                        <div class="font-weight-bold ma-8">
                            TODAY'S COURSES (IN EUR)
                        </div>

                        <v-btn
                            block
                            class="text-none text-black mb-4"
                            color="red-accent-2"
                            size="x-large"
                            variant="flat"
                            >
                            <template v-slot:prepend>
                                <img alt="Bitcoin" src="../components/icons/IconBitcoin.svg" width="40" height="40" />
                            </template>
                            <!-- Bitcoin (BTC) @ {{ prices.bitcoin.bitcoin.eur }} -->
                            Bitcoin (BTC)
                        </v-btn>

                        <v-btn
                            block
                            class="text-none text-black"
                            color="blue-accent-2"
                            size="x-large"
                            variant="flat"
                            >
                            <template v-slot:prepend>
                                <img alt="Ethereum" src="../components/icons/IconEthereum.svg" width="40" height="40" />
                            </template>
                            <!-- Ethereum (ETH) @ {{ prices.ethereum.ethereum.eur }} -->
                            Ethereum (ETH)
                        </v-btn>

                        <!-- <v-card-text>
                            <v-timeline density="compact" align="start">
                                <v-timeline-item
                                    v-for="message in messages"
                                    :key="message.time"
                                    :dot-color="message.color"
                                    size="x-small"
                                    >
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            <strong>{{ message.from }}</strong> @{{ message.time }}
                                        </div>
                
                                        <div>{{ message.message }}</div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text> -->
                    </v-card>
                </v-row>
            </v-container>
        </v-main>

        <v-footer app>
            <img alt="Vue logo" src="../components/icons/IconLogo.svg" width="40" height="40" />
        </v-footer>
    </v-app>
</template>

<script>
import historyBitcoin from '../assets/history_bitcoin.json'
import historyEthereum from '../assets/history_ethereum.json'

export default {
    name: 'CryptoCurrencies',
    data() {
        return {
            messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple-lighten-1',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'green',
        },
      ],
            date: new Date(),
            daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            endpoints: {
                bitcoin: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/bitcoin/history?',
                },
                ethereum: {
                    price: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur',
                    history: 'https://api.coingecko.com/api/v3/coins/ethereum/history?',
                }
            },
            history: {
                bitcoin: historyBitcoin,
                ethereum: historyEthereum,
            },
            ids: ['bitcoin', 'ethereum'],
            prices: {},
        }
    },
    methods: {
        /*
        get the current date and reformat it to match coinGeckos API specs (format: 'dd-mm-yyyy')
        
            @return String
        */
        getCurrentDate() {
            return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getFullYear()}`
        },
        // const previous = currentDate.setMonth(current.getMonth() - 1);
        getLastWeek() {
            const currentDate = new Date()
            // change date to 7 days in the past
            const oneWeekAgo = currentDate.getDate() - 7
            currentDate.setDate(oneWeekAgo)

            return currentDate
        },
        getCurrentPrices() {
            const today = this.getCurrentDate()

            for (let id of this.ids) {
                this.endpoints[id].history += `date=${today}`

                fetch(this.endpoints[id].price)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`)
                        }
                        return response.json()
                    })
                    .then((data) => {
                        this.prices[id] = data
                    })
                    .catch((err) => console.error(`Server error: ${err.message}`));
            }
        },
    },
    mounted() {
        this.getCurrentPrices()
    }
}
</script>
