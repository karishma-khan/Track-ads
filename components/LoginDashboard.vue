<template>
    <div class="bg-black bggridLogin min-h-[90vh] text-white px-[5%] py-[25px] md:py-[80px]">
        <div class="md:flex justify-between">
            <div class="flex flex-col justify-between gap-[12px] max-w-[410px] md:w-2/5">
                <div>
                    <div class="contactTitle">
                        <p>Login to</p>
                        <p>Dashboard</p>
                    </div>
                    <div class="loginDetail">
                        <div class="my-[20px]">Access the Political Ads Dashboard with limited availability! Log in here to explore ad transparency and enhance your research.</div>
                    </div>
                </div>
                <div class="loginDetail">
                    <div>Don’t have access? <b class="cursor-pointer" @click="$router.push('/apply')">Get Access.</b></div>
                </div>
            </div>
            <div class="md:w-3/5">
                <form @submit.prevent="submitFeedback()">
                    <input required type="text" placeholder="Your Username" v-model="name" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]">
                    <input required type="password" placeholder="Your Password" v-model="email" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]">
                    <button type="submit" value="Submit" class="bg-[#212121] text-[14px] md:text-[20px] block  w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative">Login
                    <span v-if="loading" class="mdi mdi-rotate-right mdi-spin relative left-[15px]"></span></button>
                    <div class="my-8 flex w-full items-center">
                        <div class="grow h-[0px] border border-[#7C7C7C]"></div>
                        <div class="mx-4">Or</div>
                        <div class="grow h-[0px] border border-[#7C7C7C]"></div>
                    </div>
                    <button type="submit" value="Submit" class="bg-[#212121] text-[14px] md:text-[16px] block socialAuth w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative flex w-full justify-center items-center gap-4"> <img src="img/GLogin.svg" alt=""> Login with Google
                        <span v-if="loading" class="mdi mdi-rotate-right mdi-spin relative left-[15px]"></span></button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactPage',
  data(){
    return{
        name:'',
        email:'',
        subject:'',
        message:'',
        loading:false
    }
  },
  methods:{
    async submitFeedback(){
        this.loading = true
        let feedBack = await this.$store.dispatch('submitFeedback', {name: this.name, from_email: this.email, subject: this.subject, message: this.message})
        if(feedBack?.message == 'Mail sent')
        {
            this.name = ''
            this.email = ''
            this.subject = ''
            this.message = ''
            this.loading = false
        }
    }
  }
}
</script>