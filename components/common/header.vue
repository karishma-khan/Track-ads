<template>
    <div @click="handleClickOutside">
        <div ref="menuContainer">
            <header class="h-[60px] z-100 bg-[#FFFFFF] border-b border-black px-[5%] items-center flex justify-between">
                <div @click="goHome()" class="flex h-full items-center cursor-pointer">
                    <img src="../../static/img/logo.svg" alt="">
                    <span class="logoHead capitalize flex flex-col pl-2">
                        <div>political ads</div> 
                        <div>observatory</div> 
                    </span>
                </div>
                <div @click.stop="toggleMenu">
                    <div  v-if="isMenuOpen">
                        <span class="mdi mdi-close text-xl"></span>
                    </div>
                    <div v-else>
                        <img src="../../static/img/menu.svg" alt="">
                    </div>
                </div>
            </header>
            <div v-if="isMenuOpen" ref="menu" class="menu">
                <div @click="navigate('/')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                    <span>Home</span><span><img src="../../static/img/arrowUpRight.svg" alt=""></span>
                </div>
                <div  @click="navigate('/overview')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                    <span>Dashboard</span><span><img src="../../static/img/arrowUpRight.svg" alt=""></span>
                </div>
                <div  @click="navigate('/compare')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                    <span>Compare</span><span><img src="../../static/img/arrowUpRight.svg" alt=""></span>
                </div>
                <div  @click="navigate('/about')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
                    <span>About</span><span><img src="../../static/img/arrowUpRight.svg" alt=""></span>
                </div>
                <div  @click="navigate('/about#contact')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r-0">
                    <span>Contact Us</span><span><img src="../../static/img/arrowUpRight.svg" alt=""></span>
                </div>
            </div>
        </div>
        <common-search-filter v-if="$route.path=='/overview' || $route.name=='advertiser-:id' || $route.path=='/compare/advertisers'"></common-search-filter>
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
        goHome(){
            window.location.href='/'
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        navigate(path){
            this.isMenuOpen = false;
            window.location = path
        },
        handleClickOutside(event) {
            if (this.isMenuOpen && !this.$refs?.menu?.contains(event.target) && !this.$refs?.menuContainer?.contains(event.target)) {
                this.isMenuOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>