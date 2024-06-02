<template>
    <div class="bg-[#326284] text-white common-container">
        <div class="flex gap-4">
            <img src="img/overviewLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-3 gap-4">
            <div v-for="(item,index) in tileData" :key="index">
                <div class="fundTile relative box-border overflow-hidden" :class=" selectedTile == item.id ? 'border-2 border-black' : '' ">
                    <div v-if="selectedTile == item.id" class="absolute rounded-bl-xl top-0 right-0 h-6 w-6 items-center flex font-black justify-center text-white bg-black">
                        <span class="mdi mdi-check"></span>
                    </div>
                    <div class="fundHead">{{ item.name }}</div>
                    <div class="flex items-center text-[#808080]">
                        <div>
                            <div class="fundSubHead">Ads</div>
                            <div class="fundSpend">{{ item.ads }}</div>
                        </div>
                        <div class="grow flex justify-center">
                            <div>
                                <div class="fundSubHead">Money Spent</div>
                                <div class="fundSpend"> {{ item.money_spent }} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            title:'Pages Funded',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            selectedTile:1,
            tileData:[
                {
                    name:'Bhartiya Janta Party (BJP)',
                    ads:48721,
                    id:1,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Karnataka',
                    ads:48721,
                    id:2,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Telangana',
                    ads:48721,
                    id:3,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Andaman & Nicobar',
                    ads:48721,
                    id:4,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Telangana',
                    ads:48721,
                    id:5,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Puducherry',
                    ads:48721,
                    id:6,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Uttarakhand',
                    ads:48721,
                    id:7,
                    money_spent:'16.08m - 19.14m'
                },
                {
                    name:'BJP Uttarakhand',
                    ads:48721,
                    id:8,
                    money_spent:'16.08m - 19.14m'
                },
                
            ]
        }
    }
}
</script>326284