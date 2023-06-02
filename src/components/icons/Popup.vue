<template>
        <div class ="modal flex content-center items-center fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-400 ease-in-out">
            <div class="modal-content w-auto h-auto bg-white m-auto text-center rounded-t-2xl rounded-b-2xl">
                <div class="modal-header flex justify-between bg-slate-500 rounded-t-xl p-5">
                    <h1 class="text-3xl text-white font-bold">Convert Celsius(°C) to Fahrenheit(°F)</h1>
                </div>
                <div class="modal-body" >
                    <div class="text-4xl font-semibold pt-3 px-5">
                        <slot class=""/>
                    </div>
                    <button class="bg-gradient-to-tr from-cyan-500 to-blue-500 hover:bg-gradient-to-tr hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 px-4 my-4 rounded w-52" v-on:click = Toggle >
                        Close
                    </button>
                </div>
            </div>
            

        </div>
    <!-- </div> -->
</template>

<script lang="ts">
    import { ref } from 'vue';

export default {
    name: "Modal",
    props: ['Toggle'],
    setup(){
            const openModal = ref({ buttonTrigger:false});
            const ToggleModal = (() => {
                openModal.value.buttonTrigger = !openModal.value.buttonTrigger;
                console.log(openModal.value.buttonTrigger)
            })
     

            return {openModal, ToggleModal}
        },
};
</script>

<style scoped>

</style>
