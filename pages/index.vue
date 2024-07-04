<template>
    <div class="bggridHome">
        <div class="bg-white flex flex-col rounded-b-[70px] text-center justify-center" style="text-align: -webkit-center;">
          <!-- <test></test> -->
          <hero-bubbles></hero-bubbles>
          <div class="my-10">
            <p class="heroHead">Transparency</p>
            <p class="heroHead">For Democracy</p>
            <p class="mt-3 heroUnlock">Unlock the insights on political ad</p>
            <button class="bg-black redirectionBtn hover:bg-black text-white mt-4 font-[500] text-[16px] py-2 flex items-center px-8 rounded-3xl" @click="$router.push('/overview')">
              Enter <span><img class="ml-[4px] relative top-[2px]" style="height: 22px !important;" src="../static/img/arrowUpRight.svg" alt=""></span>
            </button>
          </div>
        </div>
        <div class="min-h-[50vh] howItWorks flex items-center justify-center text-white">
            How It Works?
        </div>
        <div class="md:px-[15%]">

        <how-it-works></how-it-works>
        <!-- <scroll-div></scroll-div> -->
        </div>
    </div>
</template>
  
<script>
</script>
<style>
.redirectionBtn{
  font-family: "Eurostile Extd Bold";
}
</style>