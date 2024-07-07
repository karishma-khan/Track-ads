<template>
    <div>
        <div class="bg-[#F4E8C1] border rounded-3xl border-black overflow-hidden">
            <div ref="what" @click="selectedTab == 1 ? selectedTab = null : selectedTab = 1 " class="h-[68px] flex justify-between px-[5%]">
                <div class="p-2 font-[800] flex items-center text-[20px] md:text-[24px] rounded-lg">What ?</div>
            </div>
                <div class="px-[5%] tab-content" :class="selectedTab == 1?'active':''">
                    <div class="flex flex-col justify-center items-center">
                        <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/What.svg" alt="">
                        <img class="w-full md:block object-cover hidden mb-8 " src="../static/img/whatLong.svg" alt="">
                        <p class="aboutDetailDescription py-10">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                        </p>
                    </div>
                    <div class="knowMore" @click="$router.push('/about#whatDetail')">
                        Know More <img src="../static/img/knowmore.svg" alt="">
                    </div>
                </div>
            <div class="bg-[#C5D6B6] border-t rounded-t-3xl border-black">
                <div ref="how" @click="selectedTab == 2 ? selectedTab = null : selectedTab = 2 " class="h-[68px] flex items-center justify-between px-[5%]">
                    <div class="p-2 font-[800] text-[20px] md:text-[24px] rounded-lg">How ?</div>
                </div>

                    <div class="flex flex-col px-[5%] justify-center tab-content" :class="selectedTab == 2?'active':''">
                        <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/Where.svg" alt="">
                        <img class="w-full md:block object-cover hidden mb-8 " src="../static/img/whereLong.svg" alt="">
                        <p class="aboutDetailDescription py-10">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro facilis consectetur ipsam, aut perferendis, vitae amet architecto a incidunt accusamus impedit nesciunt ipsa ad tempora molestias repellat ducimus sed quisquam molestiae nulla corrupti exercitationem adipisci? Incidunt illo ut quasi!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, eveniet?
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                        </p>
                        <div class="knowMore" @click="$router.push('/about#howDetail')">
                            Know More <img src="../static/img/knowmore.svg" alt="">
                        </div>
                    </div>
                <div class="bg-[#81C2A7] border-t rounded-t-3xl border-black">
                    <div ref="why" @click="selectedTab == 3 ? selectedTab = null : selectedTab = 3 " class="h-[68px] flex items-center justify-between px-[5%]">
                        <div class="p-2 font-[800] text-[20px] md:text-[24px] rounded-lg">Why ?</div>
                    </div>
    
                        <div class="flex flex-col px-[5%] justify-center tab-content" :class="selectedTab == 3?'active':''">
                            <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/Why.svg" alt="">
                            <img class="w-full md:block object-cover hidden mb-8 " src="../static/img/whyLong.svg" alt="">
                            <p class="aboutDetailDescription py-10">
                                lorem200
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
                            </p>
                            <div class="knowMore" @click="$router.push('/about#whyDetail')">
                                Know More <img src="../static/img/knowmore.svg" alt="">
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
            selectedTab:0,
            currentSection: 0,
            flag:0
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                if(this.selectedTab < 3)
                {
                        this.selectedTab ++;
                    
                }
            }
            // const scrollTop = window.scrollY || document.documentElement.scrollTop;
            // const scrollHeight = document.documentElement.scrollHeight;
            // const clientHeight = document.documentElement.clientHeight;
            // if (scrollTop + clientHeight >= scrollHeight - 5 && this.selectedTab == 0) {
            //     this.selectedTab ++;
            // }
            // else
            // if(this.selectedTab != 0){
            //     const scrollPosition = window.scrollY;
            //     const viewportHeight = window.innerHeight;
            //     if ((scrollPosition + viewportHeight) >= (this.$refs.what.offsetTop) &&  (scrollPosition + viewportHeight) < (this.$refs.how.offsetTop +200)) {
            //         this.selectedTab = 1
            //     } else if ((scrollPosition + viewportHeight) >= (this.$refs.how.offsetTop)&&  (scrollPosition + viewportHeight) < (this.$refs.why.offsetTop+ 200 )) {
            //             this.selectedTab = 2
            //         }
            //         else
            //             this.selectedTab = 3
            // }
        }
    }
}
</script>
<style scoped>
.tab-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
}

/* Style for active tab content */
.tab-content.active {
    max-height: 600px; /* Adjust height as needed */
}
.heightReq {
    height: fit-content;
    transition: height 1s; /* Adjust timing and easing as needed */
    transition-delay: 0.5s;
}

.zeroHeight {
    height: 0px;
    overflow: hidden;
    transition: height 1s; /* Adjust timing and easing as needed */
}
</style>