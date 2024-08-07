<template>
    <div>
        <div class="bg-[#FFFFFF] text-black common-container">
            <div class="flex gap-4">
                <img src="../../../static/img/compare.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="md:flex justify-between gap-[160px]">
                <div class="">
                    <p class="mt-3 mb-6 common-description">
                        {{ description }}
                    </p>
                    <common-search></common-search>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 1
                        </div>
                        <common-date-picker class="grow"></common-date-picker>
                    </div>
                    <div class="flex items-center gap-2 w-full">
                        <div class="border grow border-dashed border-[#00000033]"></div>
                        <div class="text-[14px] font-[800] text-[#00000080]">VS</div>
                        <div class="border grow border-dashed border-[#00000033]"></div>
                    </div>
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 2
                        </div>
                        <common-date-picker class="grow"></common-date-picker>
                    </div>
                    <button class="h-[40px] rounded-[41px] w-full bg-[#326284] flex items-center text-white justify-center">Compare</button>
                </div>
            </div>
        </div>
        <div class="block md:flex">
            <compare-overview class="md:w-1/3" :chartData="[]"></compare-overview>
            <compare-dates-active-ads class="md:w-2/3" :chartData="ads_data" :metaData="[]" />
        </div>
        <compare-dates-spending :chartData="ads_data" ></compare-dates-spending>
        <div class="md:flex">
            <compare-audience class="md:w-3/4" :chartData="audience_Data"></compare-audience>
            <compare-ad-format class="md:w-1/4" :chartData="[]"></compare-ad-format>
        </div>
        <compare-dates-word-cloud :chartData="{}" ></compare-dates-word-cloud>
    </div>
</template>
<script>
export default{
    data(){
        return{
            title:'Compare',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
            ads_data:[],
            audience_Data:[
            {
        "chart_id": "audience",
        "data": [
            {
                "mode": "geography",
                "meta": {
                    "min": 118,
                    "max": 282174
                },
                "data": [
                    {
                        "state": "Uttarakhand",
                        "users": 21543
                    },
                    {
                        "state": "Jharkhand",
                        "users": 20924
                    },
                    {
                        "state": "Chhattisgarh",
                        "users": 26904
                    },
                    {
                        "state": "Uttar Pradesh",
                        "users": 189073
                    },
                    {
                        "state": "Madhya Pradesh",
                        "users": 85094
                    },
                    {
                        "state": "Bihar",
                        "users": 88976
                    },
                    {
                        "state": "Goa",
                        "users": 2347
                    },
                    {
                        "state": "Mizoram",
                        "users": 744
                    },
                    {
                        "state": "Arunachal Pradesh",
                        "users": 2831
                    },
                    {
                        "state": "Sikkim",
                        "users": 6796
                    },
                    {
                        "state": "West Bengal",
                        "users": 64169
                    },
                    {
                        "state": "Tripura",
                        "users": 755
                    },
                    {
                        "state": "Tamil Nadu",
                        "users": 56564
                    },
                    {
                        "state": "Rajasthan",
                        "users": 134651
                    },
                    {
                        "state": "Puducherry",
                        "users": 1711
                    },
                    {
                        "state": "Andhra Pradesh",
                        "users": 77222
                    },
                    {
                        "state": "Himachal Pradesh",
                        "users": 36008
                    },
                    {
                        "state": "Assam",
                        "users": 18732
                    },
                    {
                        "state": "Chandigarh",
                        "users": 5665
                    },
                    {
                        "state": "Dadra and Nagar Haveli",
                        "users": 118
                    },
                    {
                        "state": "Gujarat",
                        "users": 71273
                    },
                    {
                        "state": "Haryana",
                        "users": 218785
                    },
                    {
                        "state": "Odisha",
                        "users": 39573
                    },
                    {
                        "state": "Kerala",
                        "users": 29034
                    },
                    {
                        "state": "Maharashtra",
                        "users": 282174
                    },
                    {
                        "state": "Manipur",
                        "users": 1555
                    },
                    {
                        "state": "Meghalaya",
                        "users": 784
                    },
                    {
                        "state": "Karnataka",
                        "users": 42561
                    },
                    {
                        "state": "Nagaland",
                        "users": 502
                    },
                    {
                        "state": "Telangana",
                        "users": 44560
                    },
                    {
                        "state": "Andaman and Nicobar Islands",
                        "users": 1600
                    },
                    {
                        "state": "Lakshadweep",
                        "users": 200
                    },
                    {
                        "state": "Punjab",
                        "users": 408
                    }
                ]
            },
            {
                "mode": "age_and_gender",
                "meta": {},
                "data": [
                    {
                        "gender": "unknown",
                        "distribution": [
                            {
                                "age_range": "45-54",
                                "percent": 0.08
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.03
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.19
                            },
                            {
                                "age_range": "18-24",
                                "percent": 0.42
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.25
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.04
                            }
                        ]
                    },
                    {
                        "gender": "male",
                        "distribution": [
                            {
                                "age_range": "45-54",
                                "percent": 0.12
                            },
                            {
                                "age_range": "18-24",
                                "percent": 0.23
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.34
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.23
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.06
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.02
                            }
                        ]
                    },
                    {
                        "gender": "female",
                        "distribution": [
                            {
                                "age_range": "18-24",
                                "percent": 0.28
                            },
                            {
                                "age_range": "45-54",
                                "percent": 0.12
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.3
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.03
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.2
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.07
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {}
    },
    {
        "chart_id": "audience",
        "data": [
            {
                "mode": "geography",
                "meta": {
                    "min": 118,
                    "max": 282174
                },
                "data": [
                    {
                        "state": "Uttarakhand",
                        "users": 21543
                    },
                    {
                        "state": "Jharkhand",
                        "users": 20924
                    },
                    {
                        "state": "Chhattisgarh",
                        "users": 26904
                    },
                    {
                        "state": "Uttar Pradesh",
                        "users": 189073
                    },
                    {
                        "state": "Madhya Pradesh",
                        "users": 85094
                    },
                    {
                        "state": "Bihar",
                        "users": 88976
                    },
                    {
                        "state": "Goa",
                        "users": 2347
                    },
                    {
                        "state": "Mizoram",
                        "users": 744
                    },
                    {
                        "state": "Arunachal Pradesh",
                        "users": 2831
                    },
                    {
                        "state": "Sikkim",
                        "users": 6796
                    },
                    {
                        "state": "West Bengal",
                        "users": 64169
                    },
                    {
                        "state": "Tripura",
                        "users": 755
                    },
                    {
                        "state": "Tamil Nadu",
                        "users": 56564
                    },
                    {
                        "state": "Rajasthan",
                        "users": 134651
                    },
                    {
                        "state": "Puducherry",
                        "users": 1711
                    },
                    {
                        "state": "Andhra Pradesh",
                        "users": 77222
                    },
                    {
                        "state": "Himachal Pradesh",
                        "users": 36008
                    },
                    {
                        "state": "Assam",
                        "users": 18732
                    },
                    {
                        "state": "Chandigarh",
                        "users": 5665
                    },
                    {
                        "state": "Dadra and Nagar Haveli",
                        "users": 118
                    },
                    {
                        "state": "Gujarat",
                        "users": 71273
                    },
                    {
                        "state": "Haryana",
                        "users": 218785
                    },
                    {
                        "state": "Odisha",
                        "users": 39573
                    },
                    {
                        "state": "Kerala",
                        "users": 29034
                    },
                    {
                        "state": "Maharashtra",
                        "users": 282174
                    },
                    {
                        "state": "Manipur",
                        "users": 1555
                    },
                    {
                        "state": "Meghalaya",
                        "users": 784
                    },
                    {
                        "state": "Karnataka",
                        "users": 42561
                    },
                    {
                        "state": "Nagaland",
                        "users": 502
                    },
                    {
                        "state": "Telangana",
                        "users": 44560
                    },
                    {
                        "state": "Andaman and Nicobar Islands",
                        "users": 1600
                    },
                    {
                        "state": "Lakshadweep",
                        "users": 200
                    },
                    {
                        "state": "Punjab",
                        "users": 408
                    }
                ]
            },
            {
                "mode": "age_and_gender",
                "meta": {},
                "data": [
                    {
                        "gender": "unknown",
                        "distribution": [
                            {
                                "age_range": "45-54",
                                "percent": 0.08
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.03
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.19
                            },
                            {
                                "age_range": "18-24",
                                "percent": 0.42
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.25
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.04
                            }
                        ]
                    },
                    {
                        "gender": "male",
                        "distribution": [
                            {
                                "age_range": "45-54",
                                "percent": 0.12
                            },
                            {
                                "age_range": "18-24",
                                "percent": 0.23
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.34
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.23
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.06
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.02
                            }
                        ]
                    },
                    {
                        "gender": "female",
                        "distribution": [
                            {
                                "age_range": "18-24",
                                "percent": 0.28
                            },
                            {
                                "age_range": "45-54",
                                "percent": 0.12
                            },
                            {
                                "age_range": "25-34",
                                "percent": 0.3
                            },
                            {
                                "age_range": "65+",
                                "percent": 0.03
                            },
                            {
                                "age_range": "35-44",
                                "percent": 0.2
                            },
                            {
                                "age_range": "55-64",
                                "percent": 0.07
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {}
    }
            ]
        }
    }
}
</script>