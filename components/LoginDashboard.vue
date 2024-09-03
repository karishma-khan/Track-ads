<template>
    <div class="bg-black bggridLogin min-h-[90vh] text-white px-[5%] py-[25px] md:py-[80px]">
        <!-- Container with flex layout for login section -->
        <div class="md:flex justify-between">
            <!-- Section for login information and access request -->
            <div class="flex flex-col justify-between gap-[12px] max-w-[410px] md:w-2/5">
                <div>
                    <!-- Login title section -->
                    <div class="contactTitle">
                        <p>Login to</p>
                        <p>Dashboard</p>
                    </div>
                    <!-- Description about accessing the Political Ads Dashboard -->
                    <div class="loginDetail">
                        <div class="my-[20px]">Access the Political Ads Dashboard with limited availability! Log in here to explore ad transparency and enhance your research.</div>
                    </div>
                </div>
                <!-- Link to request access if not available -->
                <div class="loginDetail">
                    <div>Don’t have access? <b class="cursor-pointer" @click="getAccess()">Get Access.</b></div>
                </div>
            </div>
            <!-- Form section for user login -->
            <div class="md:w-3/5">
                <form class="relative" @submit.prevent="submitFeedback()">
                    <div>
                        <!-- Input field for email/username -->
                        <input 
                            required 
                            type="email" 
                            placeholder="Your Username" 
                            v-model="name" 
                            class="text-[12px] md:text-[16px] block p-4 my-4 w-full rounded-lg bg-black border h-[48px] border-[#FFFFFF66]"
                        >
                        <!-- Submit button for requesting login link -->
                        <button 
                            type="submit" 
                            value="Submit" 
                            class="bg-[#212121] text-[14px] md:text-[20px] block w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative"
                        >
                            Get login link
                            <span v-if="loading" class="mdi mdi-rotate-right mdi-spin relative left-[15px]"></span>
                        </button>
                    </div>
                    <!-- Notification message after form submission -->
                    <div 
                        v-if="sent == true" 
                        class="z-[10] absolute top-0 border-[#FFFFFF66] bg-[#212121] text-[20px] font-[800] opacity-[97%] rounded-lg border h-[120px] w-[100%] flex justify-center items-center"
                    >
                        <!-- Close button for the notification message -->
                        <div class="absolute right-[10px] top-[10px] cursor-pointer" @click="sent = false">
                            <span class="mdi mdi-close text-xl"></span>
                        </div>
                        {{ message }}
                    </div>
                    <!-- Separator with "Or" text -->
                    <div class="my-8 flex w-full items-center">
                        <div class="grow h-[0px] border border-[#7C7C7C]"></div>
                        <div class="mx-4">Or</div>
                        <div class="grow h-[0px] border border-[#7C7C7C]"></div>
                    </div>
                    <!-- Button for Google login -->
                    <button 
                        @click="loginWithGoogle()" 
                        type="submit" 
                        value="Submit" 
                        class="bg-[#212121] opacity-[97%] text-[14px] md:text-[16px] block socialAuth w-full rounded-lg border h-[48px] border-[#FFFFFF66] relative flex w-full justify-center items-center gap-4"
                    >
                        <img src="img/GLogin.svg" alt="Google Login">
                        Login with Google
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactPage',
  data() {
    return {
        name: '', // Stores the email/username input by the user
        loading: false, // Flag to indicate if the form submission is in progress
        sent: false, // Flag to display the success/error message
        message: '' // Stores the success/error message
    }
  },
  methods: {
    // Redirects to access request page
    getAccess() {
        window.location.href = '/apply'
    },
    // Handles login with Google
    loginWithGoogle() {
        this.$auth.loginWith('google', {
            params: {
                prompt: 'select_account' 
            }
        }).then(() => {
            // Optionally redirect after successful login
            // this.$router.push('/');
        }).catch((error) => {
            console.error('Error during login:', error);
        });
    },
    // Handles form submission to get login link
    async submitFeedback() {
        this.loading = true // Show loading spinner
        let feedBack = await this.$store.dispatch('getLoginLink', {"email": this.name})
        
        // Handle feedback from the server
        if (feedBack.error == 'USER_NOT_FOUND') {
            this.message = 'User Not Found'
        } else {
            this.message = 'Check your email for a login link'
        }
        
        console.log(feedBack);
        this.name = '' // Clear input field
        this.loading = false // Hide loading spinner
        this.sent = true // Show feedback message
    }
  }
}
</script>
