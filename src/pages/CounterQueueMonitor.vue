<template>
    <div class="q-pa-xl bg-cyan-1" style="min-height: 100vh">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8 q-mb-lg">
                <h3 class="text-h3 text-cyan-8 text-weight-light q-mb-sm">Welcome to</h3>
                <h2 class="text-h2 text-cyan-8 text-weight-medium q-ma-none">Adventist Medical Center Manila</h2>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
                <h3 id="realtime" class="row justify-end text-weight-medium text-cyan-8 text-h3 text-uppercase q-mb-sm"></h3>
                <h4 id="dateToday" class="row justify-end text-cyan-8 text-h4 q-ma-none"></h4>
                <h5 id="dateDays" class="row justify-end text-weight-light text-cyan-8 text-h5 q-ma-none"></h5>
            </div>            
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="row q-col-gutter-md">
                 <div class="col-xs-12 col-sm-12 col-md-4">
                     <div class="q-mt-lg">
                        <q-card class="my-card bg-cyan-7 text-white">
                            <q-card-section>
                                <h3 class="text-h3 q-ma-none text-center">Reception</h3>
                            </q-card-section>
                        </q-card>
                    </div>                    
                    <div class="q-my-lg text-center">
                        <q-card style="min-height: 202px">
                            <q-card-section>
                                 <h4 class="text-h4 text-cyan-8 text-weight-medium q-ma-none">Active Now</h4>
                            </q-card-section>
                            <q-card-section>
                                <div class="q-my-lg text-center" v-for="item in sortedCounterOne" :key="item.id">
                                    <template v-if="item.active_status == true">
                                        <h3 class="text-h3 text-weight-medium text-positive q-ma-none">{{ item.full_queue }}</h3>  
                                    </template>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    
                    <div class="q-my-lg text-center">
                        <q-card  class="bg-cyan-2" flat>
                            <q-card-section>
                                <h4 class="text-left q-mt-md q-mb-none q-ml-lg text-cyan-8 text-weight-medium">Next</h4>
                            </q-card-section>
                            <q-card-section>
                                 <div class="q-my-lg text-center" v-for="item in sortedCounterOne" :key="item.id">               
                                    <template v-if="item.active_status == false">                                  
                                        <h5 class="text-h5 q-ma-none text-cyan-10 text-weight-medium">{{ item.full_queue }}</h5>  
                                    </template>                                        
                                </div>                                 
                            </q-card-section>
                        </q-card> 
                    </div>

                </div>
                <div class="col-xs-12 col-sm-12 col-md-4">
                    <div class="q-mt-lg">
                        <q-card class="my-card bg-cyan-7 text-white">
                            <q-card-section>
                                <h3 class="text-h3 q-ma-none text-center">HMO</h3>
                            </q-card-section>
                        </q-card>
                    </div>

                    <div class="q-my-lg text-center " >
                        <q-card style="min-height: 202px">
                            <q-card-section>
                                 <h4 class="text-h4 text-cyan-8 text-weight-medium q-ma-none">Active Now</h4>
                            </q-card-section>
                            <q-card-section>
                                <div class="q-my-lg text-center" v-for="item in sortedCounterTwo" :key="item.id">
                                    <template v-if="item.active_status == true">
                                        <h3 class="text-h3 text-weight-medium text-positive q-ma-none">{{ item.full_queue }}</h3>  
                                    </template>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    
                    <div class="q-my-lg text-center">
                        <q-card  class="bg-cyan-2" flat>
                            <q-card-section>
                                <h4 class="text-left q-mt-md q-mb-none q-ml-lg text-cyan-8 text-weight-medium">Next</h4>
                            </q-card-section>
                            <q-card-section>
                                 <div class="q-my-lg text-center" v-for="item in sortedCounterTwo" :key="item.id">               
                                    <template v-if="item.active_status == false">                                  
                                        <h5 class="text-h5 q-ma-none text-cyan-10 text-weight-medium">{{ item.full_queue }}</h5>  
                                    </template>                                        
                                </div>                                 
                            </q-card-section>
                        </q-card> 
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-4">
                    <div class="q-mt-lg">
                        <q-card class="my-card bg-cyan-7 text-white">
                            <q-card-section>
                                <h3 class="text-h3 q-ma-none text-center">Vital Signs</h3>
                            </q-card-section>
                        </q-card>
                    </div> 

                    <div class="q-my-lg text-center" >
                        <q-card style="min-height: 202px">
                            <q-card-section>
                                 <h4 class="text-h4 text-cyan-8 text-weight-medium q-ma-none">Active Now</h4>
                            </q-card-section>
                            <q-card-section>
                                <div class="q-my-lg text-center" v-for="item in sortedCounterThree" :key="item.id">
                                    <template v-if="item.active_status == true">
                                        <h3 class="text-h3 text-weight-medium text-positive q-ma-none">{{ item.full_queue }}</h3>  
                                    </template>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    
                    <div class="q-my-lg text-center">
                        <q-card class="bg-cyan-2" flat>    
                            <q-card-section>
                                <h4 class="text-left q-mt-md q-mb-none q-ml-lg text-cyan-8 text-weight-medium">Next</h4>
                            </q-card-section>
                            <q-card-section>
                                 <div class="q-my-lg text-center" v-for="item in sortedCounterThree" :key="item.id">               
                                    <template v-if="item.active_status == false">                                  
                                       <h5 class="text-h5 q-ma-none text-cyan-10 text-weight-medium">{{ item.full_queue }}</h5>  
                                    </template>                                        
                                </div>                                 
                            </q-card-section>
                        </q-card> 
                    </div>
                </div>                    
            </div>
        </div>
    </div>
</template>

<script>

import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
    name: 'CounterQueueMonitor',
    data () {
        return{
            counterOne: [],
            counterTwo: [],
            counterThree: [],
            onlineAppointmentWithHMOQueueList: [],
            hmoQueueList: [],

            timerWalkIn: '',
            timerWalkInWithHMO : '',
            timerOnlineAppointment: '',
            timerOnlineAppointmentWithHMO: '',
            
            autoReloadCounterOne: '',
            autoReloadCounterTwo: '',
            autoReloadCounterThree: '',
        }
    }, 

    async mounted() {
        await this.getWalkInQueueNumber()
        await this.getWalkInWithHMOQueueNumber()
        await this.getOnlineAppointmentQueueNumber()
        await this.getOnlineAppointmentWithHMOQueueNumber()
        await this.getHMOQueueNumber()
        await this.autoReloadCounter()

        var timeDisplay = document.getElementById("realtime");     

            function refreshTime() {
                let dateString = new Date().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit" })
               
                timeDisplay.innerHTML = dateString
            }

        setInterval(refreshTime, 1000);
            
        const timeStamp = Date.now()
        const dateStamp = date.formatDate(timeStamp, 'MMMM D, YYYY')
        const dayStamp = date.formatDate(timeStamp, 'dddd') 

        let dateToday = document.getElementById('dateToday')
        let dateDays = document.getElementById('dateDays')

        dateToday.innerHTML = dateStamp
        dateDays.innerHTML = dayStamp

        setTimeout(function(){
            window.location.reload();
        }, 30000);
    },

    created() {        
        this.getWalkInQueueNumber()
        this.timerWalkIn = setInterval(this.getWalkInQueueNumber, 5000)
        this.getWalkInWithHMOQueueNumber()
        this.timerWalkInWithHMO = setInterval(this.getWalkInWithHMOQueueNumber, 5000)    
        this.getOnlineAppointmentQueueNumber()
        this.timerOnlineAppointment = setInterval(this.getOnlineAppointmentQueueNumber, 5000)    
        this.getOnlineAppointmentWithHMOQueueNumber()
        this.timerOnlineAppointmentWithHMO = setInterval(this.getOnlineAppointmentWithHMOQueueNumber, 5000) 
    },

    computed: {        

        sortedCounterOne(){   
            // return this.counterOne.sort((a, b) => (b.active_status > a.active_status)? 1 : -1)
            return [...this.counterOne.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()].sort((a, b) => (b.active_status > a.active_status)? 1 : -1)                
        },

        sortedCounterTwo(){
            // return this.counterTwo.sort((a, b) => Number(b.active_status) - Number(a.active_status))
            return [...this.counterTwo.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()].sort((a, b) => Number(b.active_status) - Number(a.active_status))
        },

        sortedCounterThree(){
            // return this.counterThree.sort((a, b) => Number(b.active_status) - Number(a.active_status))
            return [...this.counterThree.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()].sort((a, b) => Number(b.active_status) - Number(a.active_status)) 
        }    
    },   

    methods: {
        async getWalkInQueueNumber(){
            await api
                .get('/api/v1/walk-in-queue-number/')
                .then(response => {
                    response.data.forEach(item => {                                                
                        this.counterOne.push(item)
                    })                    
                })
                .catch(error => {
                    // console.log(error)
                })
        },
        
        async getWalkInWithHMOQueueNumber() {
            await api
                .get('/api/v1/walk-in-with-hmo-queue-number/')
                .then(response => {
                    response.data.forEach(item => {
                        this.counterOne.push(item)
                        this.counterTwo.push(item)
                    })
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getOnlineAppointmentQueueNumber() {
            await api
                .get('/api/v1/online-appointment-queue-number/')
                .then(response => {
                    response.data.forEach(item => {
                        this.counterThree.push(item)
                    })
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getOnlineAppointmentWithHMOQueueNumber() {
            await api
                .get('/api/v1/online-appointment-with-hmo-queue-number/')
                .then(response => {
                    response.data.forEach(item => {
                        this.counterTwo.push(item)
                        this.counterThree.push(item)                        
                    })
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getHMOQueueNumber() {
            await api
                .get('/api/v1/hmo-queue-number/')
                .then(response => {
                    response.data.forEach(item => {
                        this.counterTwo.push(item)
                    })
                })
                .catch(error => {
                    // console.log(error)
                })       
        },

         async autoReloadCounter(){
        //    console.log(this.counterOne)
        },

        cancelAutoUpdate() {
            clearInterval(this.timerWalkIn)
            clearInterval(this.timerWalkInWithHMO)
            clearInterval(this.timerOnlineAppointment)
            clearInterval(this.timerOnlineAppointmentWithHMO)
        },
    },

    beforeDestroy() {
        this.cancelAutoUpdate()  
    },  
}
</script>