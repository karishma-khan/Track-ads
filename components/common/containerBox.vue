<template>
    <div class="common-container text-white" :class="'bg-[#'+bgColor+'] '">
        <slot></slot>
        ok tested i am connected to
    </div>
</template>
<script>
export default {
    props: ['bgColor', 'color'],
    data() {return{
        loading:true
    }},
    mounted(){
        this.loading = true
    }
};
</script>
<style>
/* .common-container{
    border: 2px solid #000000;
    border-radius: 20px;
    padding: 40px;
} */
</style>