<template>
    <div ref="searchSec" :class="$forceUpdate?.path == '/compare/dates' ? 'relative' : ''">
        <!-- Search input field with dynamic class based on route -->
        <div class="relative w-full">
            <input 
                type="text" 
                class="chip searchAdv min-w-[350px]" 
                v-model="searchText" 
                @input="search()" 
                style="padding-left: 34px;width: 100%;" 
                placeholder="Search for an advertiser here..."
            />
            <!-- Search icon inside input field -->
            <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
        </div>
        
        <!-- Dropdown for search results, displayed conditionally -->
        <div 
            v-if="advisersData.length > 0 && !isClickedOutside" 
            :key="keyVal" 
            class="cursor-pointer fixed w-[335px] bg-[white] rounded-xl max-h-[200px] p-2 border border-[#00000033] overflow-y-auto z-[2] absolute"
        >
            <!-- List of search results -->
            <div 
                @click="searchText=item.advertiser;isClickedOutside=true;$emit('selected',item)" 
                v-for="(item,idx) in advisersData" 
                :key="idx" 
                class="border-b border-[#00000033] text-[12px] py-2" 
                style="font-family: 'Nunito Sans', sans-serif;"
            >
                {{ item.advertiser }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        keyVal: {
            default: 'search',
            type: String,
        }
    },
    data() {
        return {
            searchText: '', // Holds the current search query
            isClickedOutside: false, // Tracks if the click is outside the search results
        }
    },
    mounted() {
        // Add event listener to handle clicks outside the component
        document.addEventListener("click", this.handleOutsideClick);
    },
    computed: {
        ...mapGetters({
            advisersData: "get_advertisers_search_data", // Retrieves search results from Vuex store
        })
    },
    methods: {
        // Dispatches the search action to Vuex store
        search() {
            this.isClickedOutside = false
            this.$store.dispatch('search_advertisers', { search: this.searchText, country: 'IN' });
        },
        // Handles clicks outside the component to close the dropdown
        handleOutsideClick(event) {
            if (!this.$refs.searchSec.contains(event.target)) {
                this.isClickedOutside = true;
            }
        },
    }
}
</script>
<style>
.search{
    border-radius: 0px 0px 10px 10px;
    border: 1px 0px 0px 0px;
}
</style>