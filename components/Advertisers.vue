<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex gap-4">
            <img src="img/overviewLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <scatter-plot></scatter-plot>
        <!-- <test-scatter></test-scatter> -->
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    data(){
        return {
            title: 'Overview',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, .'
        }
    }
}
</script>