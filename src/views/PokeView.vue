<template>
    <div>
        <div class="screen">

            <div class="flex uppercase items-end pb-4 flex-row border-b border-solid border-black"
                v-if="data && species">
                <div class="px-3 mb-2">
                    <img width="100" height="100" :src="sprite" />
                    No. <span class="font-bold">{{ id }}</span>
                </div>
                <div class="">
                    <h1>{{ name }}</h1>
                    <div>
                        {{ genera }}
                    </div>
                    <div>
                        HT <span class="font-bold">{{ ht }} </span> "
                    </div>
                    <div>
                        WT <span class="font-bold">{{ wt }} </span> lb
                    </div>

                </div>

            </div>

            <div class="p-3 text-[14px]" v-if="data && species">
                {{ desc }}
            </div>

            <div>

            </div>

            <RouterLink class="pl-3" to="/">Return</RouterLink>
        </div>


    </div>
</template>



<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePokeStore } from "@/stores/PokeStore";

const pokeStore = usePokeStore();
const router = useRouter();
const name = router.currentRoute.value.params.name as string;

onMounted(async () => {
    await pokeStore.getPokeMainPage(name);
    await pokeStore.getPokeSpeciesPage(name);
    // Assign the data after it's been loaded
    data.value = pokeStore.loadedPokePage;
    species.value = pokeStore.loadedPokeSpeciesPage;
    pokeStore.playCry()
});

const data = ref<any>(null); // Adjust the type according to your data structure
const species = ref<any>(null); // Adjust the type according to your data structure

const genera = computed(() => {
    return species.value.genera.find(g => g.language.name === 'en').genus;
});

const ht = computed(() => {
    return data.value.height
});

const wt = computed(() => {
    return data.value.weight
});

const id = computed(() => {
    return data.value.id
});

const desc = computed(() => {
    return species.value?.flavor_text_entries.find(t => t.language.name === 'en').flavor_text
});

const sprite = computed(() => {
    return data.value.sprites.versions['generation-i']['red-blue'].front_default
});



</script>

<script lang="ts"></script>

<style scoped></style>