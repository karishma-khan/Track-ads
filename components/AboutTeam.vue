<template>
    <div class="bg-[#326284] text-white px-[5%] py-10 md:py-[100px]">
       <!-- Section heading -->
       <p class="teamHead mb-10">Meet the team</p>
       
       <!-- Container for team tiles with flex layout and spacing -->
       <div class="flex flex-wrap justify-center w-full gap-6">
           <!-- Transition group for animating team tile appearance -->
           <transition-group name="teamTileTransition" tag="div" class="flex flex-wrap justify-center w-full gap-6">
              <!-- Iterates over teamData to create individual team tiles -->
              <div class="teamTile text-black rounded-md overflow-hidden" v-for="(item, idx) in teamData" :key="idx">
                  <!-- Transition effect for hover state -->
                  <transition name="hoverTransition">
                    <div 
                        @mouseover="isHover=true; isHoverId = idx" 
                        @mouseleave="isHover=false" 
                        class="flex h-full rounded-md overflow-hidden">
                        
                        <!-- Content shown when hovering over the team tile -->
                        <div v-if="isHover && isHoverId == idx" :class="isHover && isHoverId == idx ? 'active' : ''" class="defaultTab flex grow items-center border border-black bg-[#2E5876] rounded-md">
                            <img class="max-w-max px-4 rounded-md" src="../static/img/team1.svg" alt="Team Member Image">
                            <div class="grow flex flex-col justify-center items-center rounded-md">
                                <!-- "Get in touch" button with icons -->
                                <div class="border-l border-dashed border-white py-3 px-5 getInTouch text-white">
                                    Get in touch
                                    <div class="flex justify-between px-3 items-center">
                                        <img src="../static/img/linkedin.svg" alt="LinkedIn Icon">
                                        <img src="../static/img/twitter-x.svg" alt="Twitter Icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Content shown when not hovering over the team tile -->
                        <div v-else class="flex grow items-center border border-black bg-[#2E5876] rounded-md">
                            <img class="max-w-max px-4 rounded-md" src="../static/img/team1.svg" alt="Team Member Image">
                        </div>
                        
                        <!-- Basic information about the team member -->
                        <div v-if="!isHover || (isHover && isHoverId != idx)" class="px-5 flex flex-col bg-white h-full justify-between">
                            <div>
                                <div class="teamName mb-4 text-[24px]">{{ item.name }}</div>
                                <div class="teamRole text-[20px]">{{ item.role }}</div>
                            </div>
                            <div class="text-[#2E5876] text-[12px] md:text-[14px] border-t border-black text-sm pt-3 border-dashed">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            </div>
                        </div>
                    </div>
                  </transition>
              </div>
           </transition-group>
       </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // State to track hover status and which item is hovered
            isHover: false,
            isHoverId: 0,
            
            // Data for the team members
            teamData: [
                { name: "Piyush Aggarwal", role: "Lorem ipsum" },
                { name: "Guillien Torres", role: "Lorem ipsum" },
                { name: "Surbhi Sonway", role: "Lorem ipsum" },
                { name: "Karishma Khan", role: "Lorem ipsum" },
                { name: "Lorem Ipsum", role: "Lorem ipsum" },
                { name: "Lorem Ipsum", role: "Lorem ipsum" }
            ]
        }
    }
}
</script>

<style>
/* Transition for team tile appearance and disappearance */
.teamTileTransition-enter-active, .teamTileTransition-leave-active {
    transition: all 0.5s ease;
}
.teamTileTransition-enter, .teamTileTransition-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* Transition for hover effect */
.hoverTransition-enter-active, .hoverTransition-leave-active {
    transition: all 0.3s ease;
}
.hoverTransition-enter, .hoverTransition-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* Hover effect for active state */
.defaultTab.active {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>
