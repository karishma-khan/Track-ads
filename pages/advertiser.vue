<template>
    <div>
        <common-search-filter></common-search-filter>
        <div class="bg-[#FFFBEF] min-h-[88px] flex items-center text-center justify-center advTitle common-container capitalize">
            BHARTIYA JANTA PARTY (BJP)
        </div>
        <pages-funded></pages-funded>
        <div class="md:flex">
            <advertiser-overview class="md:w-1/4"></advertiser-overview>
            <test-hex-map class="md:w-3/4"></test-hex-map>
            <!-- <Advertisers class="md:w-3/4" /> -->
        </div>

    <spending-over-time></spending-over-time>
    <div class="md:flex">
      <audience class="md:w-3/4"></audience>
      <ad-format class="md:w-1/4"></ad-format>
    </div>
    <word-cloud></word-cloud>
    </div>
    <!-- <div class="text-white p-[10%] bg-white">
      <WordCloud />
    <test-hex-map></test-hex-map>
      HEllo
    </div> -->
  </template>
  
  <script>
  import WordCloud from '@/components/WordCloud';
  
  export default {
    components: {
      WordCloud,
    },
  };
  </script>
  