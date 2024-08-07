<template>
    <div class="bg-[#FFFFFF] text-black common-container">
        <div class="flex gap-4">
            <img src="../../static/img/compare.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <div class="md:flex gap-6">
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-4">
                <div @click="$router.push('/compare/advertisers')" class="bg-[#326284] w-[299px] h-[150px] common-container cursor-pointer flex flex-col justify-between" style="border: 0px !important;padding: 20px 20px">
                    <div class="flex justify-between">
                        <div class="flex gap-2 items-center">
                            <img src="../../static/img/compare-guest.svg" alt="">
                            <span class="text-white compare-heading"> Advertisers </span>
                        </div>
                        <div>
                            <img src="../../static/img/compare-share.svg" alt="">
                        </div>
                    </div>
                    <div class="common-description text-white">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, saepe?
                    </div>
                </div>
                <div @click="$router.push('/compare/dates')" class="bg-[#326284] w-[299px] h-[150px] common-container cursor-pointer flex flex-col justify-between" style="border: 0px !important;padding: 20px 20px">
                    <div class="flex justify-between">
                        <div class="flex gap-2 items-center">
                            <img src="../../static/img/compare-dates.svg" alt="">
                            <span class="text-white compare-heading"> Dates </span>
                        </div>
                        <div>
                            <img src="../../static/img/compare-share.svg" alt="">
                        </div>
                    </div>
                    <div class="common-description text-white">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, saepe?
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
            title:'Compare',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
        }
    }
}
</script>