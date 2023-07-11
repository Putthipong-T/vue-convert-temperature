<template>
	<div class="bg-gradient-to-tr from-gray-700 to-gray-900 min-w-screen min-h-screen">
		<div class="flex justify-center text-white only:sm:display:true pt-10">
            <span class="hidden text-4xl lg:text-6xl sm:inline ">Convert Celsius(°C) to Fahrenheit(°F)</span>
            <span class="inline text-5xl sm:hidden"> Convert °C to °F</span>
        </div>
		
		<div id="Body" class="pt-10 flex justify-center w-auto">
            <form onsubmit="return false">
                <label for="celsius_input" class="text-white -mb-11 text-xl">Enter temperature (°C)</label><br>
                <input v-model="celsius" step=0.001 type='number' id="celsius_input" onkeydown="return (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 46 ||event.keyCode !== 69" class="bg-slate-300 my-4 text-3xl rounded-lg px-3 py-2"  placeholder="Enter temperature (°C)" required/>
                <p class="-mt-3 ml-2 text-red-400">* maximum 3 digits</p>

                <div class="flex justify-center mt-5">
                    <button class="bg-gradient-to-tr from-cyan-500 to-blue-500 ease-in-out duration-300 hover:scale-105 hover:bg-gradient-to-tr hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit" v-on:click="ToggleModal()">
                        Calculate
                    </button>
                </div>
            </form>
            

		</div>
        <div class =" text-xl text-white">
            {{tempValue[tempValue.length - 2]}}
        </div>
        <div v-if = "showtrigger" class ="text-6xl text-red-500">
            test
        </div>
        <div class='flex flex-row mt-5'>
            
            <dotGraph class='basis-10/12 w-full' :horizontal-line="lineValue" titleColor="white" :showHorizontalLine="showLine  " :time="time" :tempValue="tempValue" :startTime="startTime" graph_name="Temperature"></dotGraph>
            <div class='basis-2/12 pt-20 flex flex-col'>
                <div>
                    <input v-model="showLine" id='H-line' type="checkbox" class="checked:bg-black checked:accent-black w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 inline-flex" checked>
                    <label for="H-line" class='ml-2 text-white inline'> Show Horizontal line</label>
                </div>


                <input v-model="lineValue" step=0.001 type='number' id="line" class="bg-slate-300 rounded-xl m-2 px-3 w-32" onkeydown="return (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 46 ||event.keyCode !== 69"   placeholder="Enter Y value" required />
                <!-- <input v-model="st" type='string' id="startT"  class="bg-slate-300 rounded-lg mt-2 mx-2 px-3 py-1"  placeholder="Enter start" required/>
                <div class="text-white">{{lineValue}} {{ showLine }}{{ startTime }} st:{{ st }}</div> -->
<!--                 
                <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:duration-[700ms] peer-checked:after:border-white after:absolute after:ease-in-out after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                </label> -->
                
                <div class="flex flex-col ml-2 ">
                    <label for="graph-range" class="align-top text-white">Select Range:</label>
                    <select id="graph-range" v-model="startTime" class="inline-box rounded-xl bg-slate-300 w-32 mt-1">
                    
                            <option value="-1m" class = "rounded-t-xl">1 Minutes</option>
                            <option value="-3m">3 Minutes</option>
                            <option value="-5m">5 Minutes</option>
                            <option value="-10m">10 Minutes</option>
                            <option value="-15m">15 Minutes</option>
                            <option value="-30m">30 Minutes</option>
                            <option value="-45m">45 Minutes</option>
                            <option value="-1h">1 Hours</option>
                            <option value="-3h">3 Hours</option>
                            <option value="-6h">6 Hours</option>
                            <option value="-12h">12 Hours</option>
                            <option value="-1d" class = "">1 Day</option>

                    </select>

                    <!-- <ul class="bg-white w-32 mt-3 rounded-lg children:bg-red-200 children:py-2 " >
                        <li class = "hover:bg-slate-400  hover:rounded-t-lg">
                            <span> 1 </span>
                        </li>
                        <li class = "hover:bg-slate-400">
                            <span> 2 </span>
                        </li>
                        <li class = "hover:bg-slate-400">
                            <span> 3 </span>
                        </li>
                        <li class = "hover:bg-slate-400">
                            <span> 4 </span>
                        </li>
                        <li class = "hover:bg-slate-400  hover:rounded-b-lg">
                            <span> 5 </span>
                        </li>

                    </ul> -->

                </div>

            </div>
            
        </div>
        <Modal v-if="openModal.buttonTrigger" :Toggle ="() => ToggleModal()" >
                <h2>{{celsius}}°C ≈ {{fahrenheit}}°F</h2>
            </Modal>
        <Modal v-if="openModal.valueTrigger" :Toggle ="() => ToggleModal()" >
                <h2 class="text-red-500">Please enter the value (°C)</h2>
        </Modal>
        
        
		
		
	</div>
</template>

<script lang="ts">
    import { ref, watch  } from 'vue';
	import Modal from './components/icons/Popup.vue';
    import dotGraph from './components/Chart.vue'
    // import {myQuery} from '../database/read.js';
    import { InfluxDB, Point } from '@influxdata/influxdb-client-browser'
    // import sendNotification from './components/Linenotify.js'

	export default {
        name: 'App',
        data() {
            return {
                celsius : null,
                showLine: false,
                lineValue: 0,
                tempValue: [] as any[],
                time: [] as any[], 
                startTime: '-1d',
                st: '-1d',
                showtrigger: false
            }
        },
        setup(){
            const celsius = ref<number | null>(null);
            const tempValue = ref< Array<any>| null>([]);
            const fahrenheit = ref<number | null>(null);
            const showLine = ref<Boolean>(false);
            const startTime = ref('-1d'); // Add startTime here
            const isNumber = (value: unknown): value is number => {return typeof value === "number" && !isNaN(value);};
            const convert = (() => {
                if (isNumber(celsius.value)) {
                    celsius.value = Number(celsius.value.toFixed(3))
                    let F = (celsius.value * 9) / 5 + 32;
                    fahrenheit.value = Number(F.toFixed(3));
                    console.log('hi');
                } else {
                    fahrenheit.value = null;
         
                }
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
     

            return {fahrenheit, celsius, convert, openModal, ToggleModal, showLine}
            
        },
        components: {
            Modal,
            dotGraph,
        },
        async mounted() {
            console.log('Component mounted')
            await this.fetchData();
            setInterval(async () => {
                await this.fetchData();
            }, 5000);
            watch(
            () => this.startTime,
            async (newStartTime) => {
                await this.fetchData();
            }
            );
        },
        methods: {
            async myQuery(timeRange: String) {
                // async function myQuery(timeRange) {
                // const { InfluxDB, Point } = require('@influxdata/influxdb-client-browser');
                
                //ubuntu
                const token ='c3o6PsZ5wAs25twWrsdApE73eBm4KjkyAGLN--5LVXwGGYHBAmVjJ-7raBP2thvOdKLXcoOscdMyzBwXsehjYQ=='
                const url = 'http://18.142.197.178:8086';
                let org = `kmitl`
                let bucket = `test_data`
                // let bucket = `Test_data2`

                // const token = 'd2t-hh49xIxIfbxfyJ5AKX6IGfI7sQDVZjufDxS2HtaH86NZ53N0rQsUZgl2dCd2P0uQU9KjiP5cibJqdj-Y4w==';
                // const url = 'http://127.0.0.1:8086';
                // const orgID = '4faf28548de05ae3';
                // const org = 'Vue-qonnect';
                // const bucket = 'test2';
                const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
                const fluxQuery = `from(bucket:"${bucket}") 
                |> range(start:${timeRange}) 
                |> filter(fn: (r) => r._measurement == "temp")
                |> filter(fn: (r) => r["_field"] == "test")
                |> aggregateWindow(every: ${getInterval(timeRange)}, fn: mean)
                |> yield(name: "mean")`;

                function getInterval(timeRange: String) {
                    if (timeRange === '-30m') {
                    return '10s';
                    }else if (timeRange === '-45m') {
                    return '10s';
                    }else if (timeRange === '-1h') {
                    return '10s';
                    }else if (timeRange === '-3h') {
                    return '20s';
                    } else if (timeRange === '-6h') {
                    return '40s';
                    } else if (timeRange === '-12h') {
                    return '1m';
                    } else if (timeRange === '-1d') {
                    return '4m';
                    }
                
                    // Default interval if none of the specific time range values match
                    return '5s';
                }
                
                
                
                

                const tempValue = [];
                const time = [];

                for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
                    const o = tableMeta.toObject(values);
                    tempValue.push(o._value);
                    time.push(o._time);
                }

                return { tempValue, time };
            },

            async fetchData() {
            try {
                // console.log("load data")
                const result = await this.myQuery(this.startTime);
                this.tempValue = result.tempValue;
                this.time = result.time;
                // console.log(this.tempValue, this.time)
                // console.log(this.tempValue.length)
                // console.log(this.tempValue)
                // console.log(this.tempValue[this.tempValue.length - 2])
                if( this.tempValue[this.tempValue.length - 2] > 0){
                    this.showtrigger = true
                    // sendNotification("your temp more than " + this.tempValue[this.tempValue.length -2]);
                    // console.log("value more than 55: ", this.tempValue[this.tempValue.length])
                }else{
                    this.showtrigger = false
                }
            } catch (error) {
                console.error(error);
            }
            },
            
        },
	};
</script>

<style>
</style>
