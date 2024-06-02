<template>
    <div class="px-[5%] footer text-white">
        <div class="h-[109px] border-b border-[#FFFFFF4D] flex justify-between items-center">
            <div class="footerTitle flex items-center">
                Political Ads Observatory
                <span @click="scrollToTop()" class="mdi mdi-arrow-up ml-6 text-2xl cursor-pointer"></span>
            </div>
            <div>
                <img src="img/uni.svg" alt="">
            </div>
        </div>
        <div class="flex justify-center items-center h-[60px] copyrightText">
            Political Ad Observatory © 2024
        </div>
    </div>
</template>
<script setup lang="ts">
function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
</script>