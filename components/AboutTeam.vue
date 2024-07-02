<template>
    <div class="bg-[#326284] text-white px-[5%] py-10 md:py-[100px]">
       <p class="teamHead mb-10">Meet the team</p>
       <div class="flex flex-wrap justify-center w-full gap-6">
        <div class="teamTile text-black rounded-md overflow-hidden" v-for="(item,idx) in teamData" :key="idx">
            <div @mouseover="isHover=true; isHoverId = idx" @mouseleave="isHover=false" class="flex h-full rounded-md overflow-hidden">
                <div v-if="isHover && isHoverId == idx" class="flex grow items-center border border-black bg-[#2E5876] rounded-md">
                    <img class="max-w-max px-4 rounded-md" src="img/team1.svg" alt="">
                    <div class="grow flex flex-col justify-center items-center rounded-md">
                        <div class="border-l border-dashed border-white py-3 px-5 getInTouch text-white">
                            Get in touch
                            <div class="flex justify-between px-3 items-center">
                                <img src="img/linkedin.svg" alt="">
                                <img src="img/twitter-x.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex grow items-center border border-black bg-[#2E5876] rounded-md">
                    <img class="max-w-max px-4 rounded-md" src="img/team1.svg" alt="">
                </div>
                <div  v-if="!isHover || (isHover && isHoverId != idx)" class="px-5 flex flex-col bg-white h-full justify-between">
                    <div>
                        <div class="teamName mb-4 text-[24px]">{{ item.name }}</div>
                        <div class="teamRole text-[20px]">{{ item.role }}</div>
                    </div>
                    <div class="text-[#2E5876] text-[12px] md:text-[14px] border-t border-black text-sm pt-3 border-dashed">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
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
        return{
            isHover:false,
            isHoverId:0,
            teamData:[
                {
                    name:"Piyush Aggarwal",
                    role:"Lorem ipsum"
                },
                {
                    name:"Guillien Torres",
                    role:"Lorem ipsum"
                },
                {
                    name:"Surbhi Sonway",
                    role:"Lorem ipsum"
                },
                {
                    name:"Karishma Khan",
                    role:"Lorem ipsum"
                },
                {
                    name:"Lorem Ipsum",
                    role:"Lorem ipsum"
                },
                {
                    name:"Lorem Ipsum",
                    role:"Lorem ipsum"
                }
            ]
        }
    }
}
</script>