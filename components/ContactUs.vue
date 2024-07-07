<template>
    <div class="bg-black text-white px-[5%] py-[25px] md:py-[80px]">
        <div class="md:flex justify-between">
            <div class="flex flex-col justify-between md:w-2/5">
                <div class="contactTitle">
                    <p>Have</p>
                    <p>questions?</p>
                    <p>We have</p>
                    <p>answers.</p>
                </div>
                <div class="contactMail">
                    <div class="text-[#999999]">You can also write us at</div>
                    <div>politicaladsobservatory@email.com</div>
                </div>
            </div>
            <div class="md:w-3/5">
                <form @submit.prevent="submitFeedback()">
                    <input required type="text" placeholder="Your name" v-model="name" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]">
                    <input required type="email" placeholder="Your email" v-model="email" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]">
                    <input required type="text" placeholder="Subject" v-model="subject" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]">
                    <textarea required placeholder="Message" v-model="message" rows="10" class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border  border-[#FFFFFF66]"></textarea>
                    <button type="submit" value="Submit" class="bg-[#212121] text-[14px] md:text-[20px] block  w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative">Submit
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