<template>
    <div>
        <!-- Container for the tab content with background and border styling -->
        <div class="bg-[#F4E8C1] border-t rounded-t-3xl border-black" id="whatDetail">
            <!-- Tab header for "What ?" section, toggles visibility of content on click -->
            <div @click="selectedTab == 1 ? selectedTab = null : selectedTab = 1 " class="h-[107px] md:h-[125px] flex items-center justify-between px-[5%]">
                <div class="p-2 border border-black text-[20px] md:text-[24px] font-black rounded-lg">What ?</div>
                <div >
                    <img src="../static/img/arrow-down-circle.svg" alt="Arrow Icon">
                </div>
            </div>
            <!-- Content for "What ?" section, displayed when selectedTab is 1 -->
            <div class="px-[5%]" v-if="selectedTab == 1">
                <div class="flex flex-col justify-center items-center">
                    <p class="aboutDetailDescription pb-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices iaculis neque. Mauris quis magna quis arcu interdum convallis. Curabitur non nulla eu urna ullamcorper euismod at ut urna. Pellentesque ut augue diam. Cras quis dapibus odio. Aliquam erat volutpat. Pellentesque rutrum euismod metus at malesuada. Morbi diam sem, tincidunt eget purus at, vulputate iaculis sem.
                        </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                        </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                    </p>
                </div>
            </div>
            <!-- Container for the next tab "How ?" with background and border styling -->
            <div class="bg-[#C5D6B6] border-t rounded-t-3xl border-black" id="howDetail">
                <!-- Tab header for "How ?" section, toggles visibility of content on click -->
                <div @click="selectedTab == 2 ? selectedTab = null : selectedTab = 2 " class="h-[107px] md:h-[125px] flex items-center justify-between px-[5%]">
                    <div class="p-2 border border-black text-[20px] md:text-[24px] font-black rounded-lg">How ?</div>
                    <div >
                        <img src="../static/img/arrow-down-circle.svg" alt="Arrow Icon">
                    </div>
                </div>
                <!-- Content for "How ?" section, displayed when selectedTab is 2 -->
                <div class="flex flex-col px-[5%] justify-center items-center" v-if="selectedTab == 2">
                    <p class="aboutDetailDescription pb-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices iaculis neque. Mauris quis magna quis arcu interdum convallis. Curabitur non nulla eu urna ullamcorper euismod at ut urna. Pellentesque ut augue diam. Cras quis dapibus odio. Aliquam erat volutpat. Pellentesque rutrum euismod metus at malesuada. Morbi diam sem, tincidunt eget purus at, vulputate iaculis sem.
                        </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                        </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                    </p>
                </div>
                <!-- Container for the final tab "Why ?" with background and border styling -->
                <div class="bg-[#81C2A7] border-t rounded-t-3xl border-black" id="whyDetail">
                    <!-- Tab header for "Why ?" section, toggles visibility of content on click -->
                    <div @click="selectedTab == 3 ? selectedTab = null : selectedTab = 3 " class="h-[107px] md:h-[125px] flex items-center justify-between px-[5%]">
                        <div class="p-2 border border-black text-[20px] md:text-[24px] font-black rounded-lg">Why ?</div>
                        <div >
                            <img src="../static/img/arrow-down-circle.svg" alt="Arrow Icon">
                        </div>
                    </div>
                    <!-- Content for "Why ?" section, displayed when selectedTab is 3 -->
                    <div class="flex flex-col px-[5%] justify-center items-center" v-if="selectedTab == 3">
                        <p class="aboutDetailDescription pb-10">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices iaculis neque. Mauris quis magna quis arcu interdum convallis. Curabitur non nulla eu urna ullamcorper euismod at ut urna. Pellentesque ut augue diam. Cras quis dapibus odio. Aliquam erat volutpat. Pellentesque rutrum euismod metus at malesuada. Morbi diam sem, tincidunt eget purus at, vulputate iaculis sem.
                            </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                            </br></br>Sed eu egestas velit, ac facilisis lectus. Vestibulum orci tellus, blandit sed ipsum a, interdum posuere enim. Maecenas sodales orci ut sapien hendrerit, in porta odio cursus. Vivamus eget auctor nunc. Suspendisse sed ex et odio vestibulum cursus in sed neque. Fusce vehicula sapien.
                        </p>
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
            // Tracks the currently selected tab
            selectedTab: null
        }
    },
    mounted()
    {
        // Determine which tab to select based on the URL hash
        let hash = this.$route.hash
        if(hash == '#whatDetail')
            this.selectedTab = 1 // Select "What ?" tab
        else if(hash == '#howDetail')
            this.selectedTab = 2 // Select "How ?" tab
        else if(hash == '#whyDetail')
            this.selectedTab = 3 // Select "Why ?" tab
    }
}
</script>
