<template>
    <div>
        <common-header class="fixed top-0 left-0 right-0 z-[20] border-b border-black" />
        <Nuxt :class="marginTop" />
        <common-footer />
    </div>
</template>
<script>
export default{
    computed: {
        marginTop(){
            let routeData = this.$route
            let width = window.innerWidth
            if(routeData.name == 'advertiser-:id' || routeData.name == 'overview')
            {
                if(width < 768)
                    return 'mt-[207px]'
                return 'mt-[134px]'
            }
            return 'mt-[60px]'
        }
    }
}
</script>