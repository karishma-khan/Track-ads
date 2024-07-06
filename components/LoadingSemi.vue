<template>
    <div class="Herocontainer">
        <div class="semicircle flex justify-center items-center relative overflow-hidden">
            <div class="loader"></div>
        </div>
    </div>
</template>
<style scoped> 
  .Herocontainer {
    text-align: center;
    position: relative;
    width: 100%;
  }
  .semicircle {
    width: 100vw;
    height: 25vw;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
  }
  @media screen and (max-width:920px) {
    .semicircle{
      height: 70vw;
    }
  }

    .loader {
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    -webkit-mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
    background: linear-gradient(#81c2a7 0 0) bottom/100% 0% no-repeat #ddd;
    animation: l8 2s infinite steps(7);
    }
    @keyframes l8 {
        100% {background-size:100% 115%}
    }
</style>
  