<template>
    <div>
        <div class="bg-[#F4E8C1] border rounded-3xl border-black overflow-hidden">
            <div ref="what" @click="selectedTab == 1 ? selectedTab = null : selectedTab = 1 " class="h-[68px] flex items-center justify-between px-[5%]">
                <div class="p-2 font-black rounded-lg">What ?</div>
            </div>
            <div class="px-[5%]" v-if="selectedTab == 1">
                <div class="flex flex-col justify-center items-center">
                    <img class="w-full mb-8 md:h-[160px]" src="img/What.svg" alt="">
                    <p class="aboutDetailDescription py-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                    </p>
                </div>
                <div class="knowMore">
                    Know More <img src="img/knowmore.svg" alt="">
                </div>
            </div>
            <div class="bg-[#C5D6B6] border-t rounded-t-3xl border-black">
                <div ref="how" @click="selectedTab == 2 ? selectedTab = null : selectedTab = 2 " class="h-[68px] flex items-center justify-between px-[5%]">
                    <div class="p-2 font-black rounded-lg">How ?</div>
                </div>
                <div class="flex flex-col px-[5%] justify-center items-center" v-if="selectedTab == 2">
                    <img class="w-full mb-8 md:h-[160px]" src="img/Where.svg" alt="">
                    <p class="aboutDetailDescription py-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                    </p>
                    <div class="knowMore">
                        Know More <img src="img/knowmore.svg" alt="">
                    </div>
                </div>
                <div class="bg-[#81C2A7] border-t rounded-t-3xl border-black">
                    <div ref="why" @click="selectedTab == 3 ? selectedTab = null : selectedTab = 3 " class="h-[68px] flex items-center justify-between px-[5%]">
                        <div class="p-2 font-black rounded-lg">Why ?</div>
                    </div>
                    <div class="flex flex-col px-[5%] justify-center items-center" v-if="selectedTab == 3">
                        <img class="w-full mb-8 md:h-[160px]" src="img/Why.svg" alt="">
                        <p class="aboutDetailDescription py-10">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                        </p>
                        <div class="knowMore">
                            Know More <img src="img/knowmore.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            selectedTab:null,
            currentSection: 0
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        console.log(scrollPosition,viewportHeight,this.$refs.what.offsetTop);

        if ((scrollPosition + viewportHeight) >= (this.$refs.what.offsetTop) &&  (scrollPosition + viewportHeight) < (this.$refs.how.offsetTop +200)) {
            this.selectedTab = 1
        } else if ((scrollPosition + viewportHeight) >= (this.$refs.how.offsetTop)&&  (scrollPosition + viewportHeight) < (this.$refs.why.offsetTop+ 200 )) {
            this.selectedTab = 2
            }
            else
            this.selectedTab = 3
        }
    }
}
</script>