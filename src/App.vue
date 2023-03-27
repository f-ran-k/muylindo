<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'

// const date = new Date()
// const previous = date.setMonth(current.getMonth() - 1);

var daten = ref([])
// define types of payment
const ids= ['bitcoin', 'ethereum']

// define API urls that (should :/) return the data requested
const endpoints = {
    bitcoin: {
        price: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
        history: 'https://api.coingecko.com/api/v3/coins/bitcoin/history?',    // ... will be patched in getCurrentPrices()
    },
    ethereum: {
        price: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur',
        history: 'https://api.coingecko.com/api/v3/coins/ethereum/history?',
    }
}

/*
    get the current date and reformat it to match coinGeckos API specs
    ==> format: 'dd-mm-yyyy'

    @return String
*/    
function getCurrentDate() {
    const date = new Date()
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}    

function getCurrentPrices() {
// const currencies = async () => {
//     const response = await fetch('../public/coinGecko.json')
//     const data = await response.json()
//     data.filter(date => date.id === 'bitcoin' || date.id === 'ethereum')
// }
// console.log(currencies)

    const today = getCurrentDate()

    for (let id of ids) {
        endpoints[id].history += `date=${today}`

        try {
            fetch(endpoints[id].price)
                .then(response => response.json)
                .then(data => {
                    daten.value.push(data)
                    console.log(daten.value)
                })
        } catch(error) { console.log(error) }
    }
}
getCurrentPrices()
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="You did it!" />

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/vuetify">Vuetify</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
