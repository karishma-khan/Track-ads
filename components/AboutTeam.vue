<template>
    <div class="bg-[#326284] text-white px-[5%] py-10 md:py-[100px]">
       <p class="teamHead mb-10">Meet the team</p>
       <div class="flex flex-wrap justify-center w-full gap-6">
        <div class="teamTile text-black flex flex-col justify-between" v-for="(item,idx) in teamData" :key="idx">
            <div @mouseover="isHover=true; isHoverId = idx" @mouseleave="isHover=false" class="teamImg">
                <div v-if="isHover && isHoverId == idx" class="teamTileHover text-white flex h-full flex-col justify-between">
                    <div class="teamDetail">Surbhi is a part-time visual storyteller and a full-time observer who enjoys exploring beauty within our ordinary lives.</div>
                    <div class="getInTouch flex justify-between pt-[10px] border-dashed border-t border-white">
                        Get in touch
                        <img src="img/linkedin.svg" alt="">
                    </div>
                </div>
                <img v-else src="img/teamPlaceholder.png" alt="" class="">
            </div>
            <div>
                <div class="teamName mb-4">{{ item.name }}</div>
                <div class="teamRole">{{ item.role }}</div>
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