<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { usePokeStore } from "../stores/PokeStore";
import { useRouter } from "vue-router";

const router = useRouter();
const pokeStore = usePokeStore();

const appReady = ref(false);
const limit = ref(151);
const offset = ref(0)
let count = 0;

const fetchData = () => {
	const params = `limit=${limit.value}&offset=${offset.value}`;
	pokeStore.fill(params).then(() => {
		count = pokeStore.data?.count || 0;
		appReady.value = true;
	});
};

pokeStore.data.forEach((poke) => {
	poke.isSelected = false
})

function select(poke) {

	if (poke.isSelected) {
		router.push(`/poke/${poke.name}`);
	} else {
		// pokeStore.deselectAll()
		pokeStore.select(poke.name)
	}

}

const data = () => {

	router.push(`/poke/${pokeStore.loadedPokePage.name}`);
}

onMounted(fetchData);

</script>

<template>
	<div class="screen p-2">


		<div v-if="appReady" class="flex flex-row ">

			<div class="max-w-2/3 border-r-4 border-double border-black">
				<h1>CONTENTS</h1>
				<ul class="uppercase overflow-x-hidden max-h-[240px]">
					<li v-auto-animate v-for="(poke, index) in pokeStore.data" :key="poke.name"
						class="mb-2 flex flex-row ">
						<span :class="poke.isSelected ? '' : 'hidden'"> ▸ </span>
						{{ index + 1 }}
						<button class="uppercase" @click="select(poke)">{{ poke.name }}</button>
					</li>
				</ul>
			</div>
			<div class="py-2 leading-6 ">
				<div class="border-b-4 p-2 border-black border-double pb-2 mb-2 ">
					SEEN 151
					OWN 151
				</div>
				<div class="p-2 ">
					<button @click="data">DATA</button>
					<button @click="pokeStore.playCry">CRY</button>
					AREA
					QUIT
				</div>
			</div>
		</div>
		<div>
		</div>
	</div>
</template>

<style scoped>
template {
	padding: 20px;
}
</style>
