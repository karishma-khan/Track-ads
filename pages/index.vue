<template>
  <div>
    <common-search-filter></common-search-filter>
    <div class="block md:flex">
      <overview class="md:w-1/3"></overview>
      <Advertisers class="md:w-2/3" />
    </div>
    <spending-over-time></spending-over-time>
    <div class="md:flex">
      <audience class="md:w-3/4"></audience>
      <ad-format class="md:w-1/4"></ad-format>
    </div>
    <honey-comb></honey-comb>
  </div>
</template>

<script>
import Advertisers from '../components/Advertisers.vue';

export default {
  name: 'IndexPage'
}
</script>
