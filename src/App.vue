<template>
	<div class="bg-gradient-to-tr from-gray-700 to-gray-900 min-w-screen min-h-screen">
		<div class="flex justify-center text-white text-6xl pt-10">
		    Convert Celsius(°C) to Fahrenheit(°F)
		</div>
		
		<div id="Body" class="pt-10 flex flex-col items-center justify-center w-auto">
            <form onsubmit="return false">
                <label for="celsius_input" class="text-white -mb-11 text-xl">Enter temperature (°C)</label><br>
                <!-- <input v-model="celsius" type='number' id="celsius_input" onkeydown="return event.keyCode !== 69" class="bg-slate-300 my-4 text-3xl rounded-lg px-3 py-2"  placeholder="Enter temperature (°C)" required/> -->
                <input v-model="celsius" type='number' id="celsius_input" onkeydown="return (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 46 ||event.keyCode !== 69" class="bg-slate-300 my-4 text-3xl rounded-lg px-3 py-2"  placeholder="Enter temperature (°C)" required/>

                <br>
                <div class="flex justify-center">
                    <button class="bg-gradient-to-tr from-cyan-500 to-blue-500 hover:bg-gradient-to-tr hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit" v-on:click="ToggleModal()">
                        Calculate
                    </button>
                </div>
            </form>
            <Modal v-if="openModal.buttonTrigger" :Toggle ="() => ToggleModal()" >
                <h2>{{celsius}}°C ≈ {{fahrenheit}}°F</h2>
            </Modal>
            <Modal v-if="openModal.valueTrigger" :Toggle ="() => ToggleModal()" >
                <h2 class="text-red-500">Please enter the value (°C)</h2>
            </Modal>

		</div>
		
		
	</div>
</template>

<script lang="ts">
    import { ref } from 'vue';
	import Modal from './components/icons/Popup.vue';

	export default {
        name: 'App',
        data() {
            return {
                celsius : null
            }
        },
        setup(){
            const celsius = ref<number | null>(null)
            const fahrenheit = ref<number | null>(null);
            const isNumber = (value: unknown): value is number => {return typeof value === "number" && !isNaN(value);};
            const convert = (() => {
                if (isNumber(celsius.value)) {
                    let F = (celsius.value * 9) / 5 + 32;
                    fahrenheit.value = Number(F.toFixed(2));
                    console.log('hi');
                } else {
                    fahrenheit.value = null;
                }
                // if (typeof(celsius.value) === 'number') {
                //     let F = (celsius.value * 9) / 5 + 32
                //     fahrenheit.value = Number(F.toFixed(2))
                //     console.log('qwe')
                // }else{
                //     fahrenheit.value = null
                    
                // }
            })
            const openModal = ref({ buttonTrigger:false, valueTrigger:false});
            const ToggleModal = (() => {
                console.log('toggle')
                convert()
                openModal.value.buttonTrigger = !openModal.value.buttonTrigger;
                if(fahrenheit.value === null){
                    openModal.value.buttonTrigger = !openModal.value.buttonTrigger
                    openModal.value.valueTrigger = !openModal.value.valueTrigger
                }
            })
     

            return {fahrenheit, celsius, convert, openModal, ToggleModal}
        },
        components: {
            Modal,
        },
	};
</script>


