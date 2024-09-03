<template>
    <div class="bg-black bggridLogin min-h-[90vh] text-white px-[5%] py-[25px] md:py-[80px]">
        <div class="md:flex md:gap-[20px] justify-between">
            <!-- Information Section -->
            <div class="flex flex-col justify-between gap-[12px] max-w-[410px] md:w-2/5">
                <div>
                    <div class="contactTitle">
                        <p>Apply for</p>
                        <p>Access!</p>
                    </div>
                    <div class="loginDetail">
                        <div class="my-[20px]">
                            Get early access to the Political Ad Dashboard! Limited spots available—sign up now to secure your place and be among the first to explore our powerful new tool. Don't miss out!
                        </div>
                    </div>
                </div>
                <div class="loginDetail">
                    <div>
                        Already have access? <b class="cursor-pointer" @click="redirectLogin()">Login here.</b>
                    </div>
                </div>
            </div>
            
            <!-- Form Section -->
            <div class="md:w-3/5 relative">
                <form @submit.prevent="submitFeedback()" class="relative">
                    <!-- Name Input -->
                    <input 
                        required 
                        type="text" 
                        placeholder="Your Name" 
                        v-model="name" 
                        class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]"
                    >
                    
                    <!-- Email Input -->
                    <input 
                        required 
                        type="email" 
                        placeholder="Your email" 
                        v-model="email" 
                        class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]"
                    >
                    
                    <!-- Message Textarea -->
                    <textarea 
                        required 
                        placeholder="Tell us about your area of interest?" 
                        v-model="message" 
                        rows="10" 
                        class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border border-[#FFFFFF66]"
                    ></textarea>
                    
                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        value="Submit" 
                        class="bg-[#212121] text-[14px] md:text-[20px] block w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative"
                    >
                        Submit
                        <span v-if="loading" class="mdi mdi-rotate-right mdi-spin relative left-[15px]"></span>
                    </button>
                    
                    <!-- Success Message -->
                    <div 
                        v-if="sent" 
                        style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px);" 
                        class="z-[10] absolute top-0 border-[#FFFFFF66] text-[20px] font-[800] rounded-lg border h-[420px] md:h-[500px] w-[100%] flex justify-center items-center"
                    >
                        <div class="absolute right-[10px] top-[10px] cursor-pointer" @click="sent = false">
                            <span class="mdi mdi-close text-xl"></span>
                        </div>
                        <div class="w-[80%] md:w-[60%] text-center">
                            <div class="text-[14px] md:text-[20px] font-[800]">Thank You!</div>
                            <div class="mt-[35px] text-[14px] md:text-[16px] font-[100]">
                                We have received your request. We will review it and send a confirmation to your email soon.
                            </div>
                        </div>
                    </div>
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
        name: '',
        email: '',
        message: '',
        loading: false,
        sent: false
    }
  },
  methods:{
    // Redirects to the login page
    redirectLogin(){
        window.location.href = "/login"
    },
    // Handles form submission
    async submitFeedback(){
        this.loading = true
        try {
            let feedBack = await this.$store.dispatch('applyAccess', { 
                name: this.name, 
                email: this.email, 
                area_of_interest: this.message 
            })
            if(feedBack?.message === 'User created successfully') {
                // Clear form and show success message
                this.name = ''
                this.email = ''
                this.message = ''
                this.sent = true
            }
        } catch (error) {
            // Handle error (optional)
            console.error('An error occurred:', error);
        } finally {
            this.loading = false
        }
    }
  }
}
</script>