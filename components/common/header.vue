<template>
    <div>
        <header class="h-[60px] z-100 bg-[#FFFFFF] border-b border-black px-[5%] items-center flex justify-between">
            <div @click="$router.push('/')" class="flex h-full items-center cursor-pointer">
                <img src="img/logo.svg" alt="">
                <span class="logoHead capitalize flex flex-col pl-2">
                    <div>political ads</div> 
                    <div>observatory</div> 
                </span>
            </div>
            <div @click="isMenuOpen = !isMenuOpen">
                <div  v-if="isMenuOpen">
                    <span class="mdi mdi-close text-xl"></span>
                </div>
                <div v-else>
                    <img src="img/menu.svg" alt="">
                </div>
            </div>
        </header>
        <div v-if="isMenuOpen" class="menu">
            <div @click="navigate('/')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                <span>Home</span><span><img src="img/arrowUpRight.svg" alt=""></span>
            </div>
            <div  @click="navigate('/advertiser')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                <span>Dashboard</span><span><img src="img/arrowUpRight.svg" alt=""></span>
            </div>
            <div  @click="navigate('/about')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                <span>About</span><span><img src="img/arrowUpRight.svg" alt=""></span>
            </div>
            <div  @click="navigate('/about#contact')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r-0">
                <span>Contact Us</span><span><img src="img/arrowUpRight.svg" alt=""></span>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    data(){
        return{
            isMenuOpen : false
        }
    },
    methods:{
        navigate(path){
            this.isMenuOpen = false;
            this.$router.push(path)
        }
    }
}
</script>