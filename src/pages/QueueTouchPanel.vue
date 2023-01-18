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
        
        <div class="row q-mt-xl q-col-gutter-xl justify-center" style="margin-top: 8%;">
            <div class="row justify-center col-xs-12 col-sm-12 col-md-3">
                <q-btn class="full-width q-pa-xl queue-touch-panel-button bg-cyan-6 text-white text-weight-bold"  @click="walkIn" size="1.5rem" label="Walk-In"/>
            </div>
            <div class="row justify-center col-xs-12 col-sm-12 col-md-3">
                <q-btn class="full-width q-pa-xl queue-touch-panel-button bg-cyan-6 text-white text-weight-bold" @click="walkInWithHMO" size="1.5rem" label="Walk-In with HMO"/>
            </div>
            <div class="row justify-center col-xs-12 col-sm-12 col-md-3">
                <q-btn class="full-width q-pa-xl queue-touch-panel-button bg-cyan-6 text-white text-weight-bold" @click="onlineAppointment" size="1.5rem" label="Online Appointment"/>
            </div>
            <div class="row justify-center col-xs-12 col-sm-12 col-md-3">
                <q-btn class="full-width q-pa-xl queue-touch-panel-button bg-cyan-6 text-white text-weight-bold" @click="onlineAppointmentWithHMO" size="1.5rem" label="HMO"/>
            </div> 
        </div>        
        <div class="row justify-end col-xs-12 col-sm-12 col-md-12" style="margin-top: 10%;">
            <q-btn icon="print" @click="togglegoToPrinterSettingsDialog" size="1.5rem"/>
        </div> 
    </div>

    <q-dialog v-model="goToPrinterSettingsDialog" pesistent>
        <q-card style="width: 700px; max-width: 80vw;" class="">
            <q-card-section >
                <h6 class="q-ml-sm q-mt-md q-mb-none text-center text-weight-medium text-light-blue-7 text-h6">{{ this.printSettingsError }}</h6>
            </q-card-section>
            <q-card-section>
                <div class="row q-col-gutter-md">
                    <q-input class="col-xs-12 col-sm-12 col-md-5" v-model="description" outlined color="cyan-8" label="Description" />
                    <q-input class="col-xs-12 col-sm-12 col-md-5" v-model="ipAddress" outlined color="cyan-8" label="IP Address" />
                    <q-checkbox class="col-xs-12 col-sm-12 col-md-2" label="Active" v-model="activeStatus" />
                </div>
            </q-card-section>
            <q-card-actions align="center" class="q-pa-md">
                <template v-if="this.printerID === ''">
                    <q-btn color="light-blue-7" label="Add" @click="addPrinterSetttings" unelevated /> 
                </template>
                <template v-else>
                    <q-btn color="light-blue-7" label="Update" @click="updatePrinterSettings" unelevated /> 
                </template>                
            </q-card-actions>
        </q-card>
    </q-dialog>


</template>
<script>

import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { date } from 'quasar'

export default {
    name: 'QueueTouchPanel',
    data() {
        return {
            goToPrinterSettingsDialog: false,
            printSettingsError: 'No Printer Detected',
            printerID: '',
            activeStatus: '',
            description: '',
            ipAddress: ''           

        }
    },

    mounted() {
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

        this.getActiveQueueTouchPanelPrinter()
    },
    
    methods: {

        async togglegoToPrinterSettingsDialog() {
            this.goToPrinterSettingsDialog = true
        },

        async getActiveQueueTouchPanelPrinter() {
            await api
                .get('/api/v1/queue-touch-panel-printer')
                .then(response => {
                    if(response.data.length === 0) {
                        this.goToPrinterSettingsDialog = true
                        this.printSettingsError = 'Add printer settings.'
                        this.activeStatus = false
                    } else {
                        if(response.data[0].active === false) {
                            this.goToPrinterSettingsDialog = true
                            this.printSettingsError = 'Printer status not active.'
                            this.activeStatus = false
                            this.printerID = response.data[0].id
                            this.description = response.data[0].description
                            this.ipAddress = response.data[0].ip_address                          
                        } else {
                            this.printSettingsError = 'Update printer settings'
                            this.activeStatus = response.data[0].active
                            this.description = response.data[0].description
                            this.ipAddress = response.data[0].ip_address
                        }                    
                   
                    }
                })  
        },
        
        async addPrinterSetttings() {

            let formData = {
                    active: this.activeStatus,
                    description: this.description,
                    ip_address: this.ipAddress,
                }

            await api   

                .post('/api/v1/queue-touch-panel-printer/', formData)
                .then(response => {
                    Notify.create({
                        message: 'Succcessfully Added',
                        type: 'positive',
                        position: 'top'
                    })
                     
                    this.goToPrinterSettingsDialog = false
                })
        },  

        async updatePrinterSettings() {

            let formData = {
                    active: this.activeStatus,
                    description: this.description,
                    ip_address: this.ipAddress
                }

            await api 

                .put(`/api/v1/queue-touch-panel-printer/${this.printerID}/`, formData)
                .then(response => {
                    Notify.create({
                        message: 'Successfully saved.',
                        type: 'positive',
                        position: 'top'
                    })

                    this.goToPrinterSettingsDialog = false
                })  
        },

        async walkIn() {
            const formData = {
                queue_code: 'W',
                counter_status: 'Walk In'
            }

            await api
                .post('/api/v1/walk-in-queue-number/', formData)
                .then(response => {
                     Notify.create({
                        message: 'Thank you for choosing Adventist Medical Center Manila.',
                        type: 'positive',
                        position: 'top'
                    })
                    
                    const printFormData = {
                        content:  response.data.full_queue,
                        task: 'Walk In',
                        ip_address: this.ipAddress
                    }
                    
                    api 
                        .post('/api/v1/print_network_queue/', printFormData)  
                        .then(response => {})
                        .catch(error => {
                            // console.log(error)
                        })  
                })

                .catch(error => {
                    // console.log(error)
                })        
           
        },

        async walkInWithHMO() {
            const formData = {
                queue_code: 'WH',
                counter_status: 'Walk In with HMO',
            }

            await api
                .post('/api/v1/walk-in-with-hmo-queue-number/', formData)
                .then(response => {
                     Notify.create({
                        message: 'Thank you for choosing Adventist Medical Center Manila.',
                        type: 'positive',
                        position: 'top'
                    })

                    const printFormData = {
                        content:  response.data.full_queue,
                        task: 'Walk In with HMO',
                        ip_address: this.ipAddress
                    }                   
                    
                    api 
                        .post('/api/v1/print_network_queue/', printFormData)  
                        .then(response => {})
                        .catch(error => {
                            console.log(error)
                        })                          
                })
                .catch(error => {
                    // console.log(error)
                })
        }, 

        async onlineAppointment() {
            const formData = {
                queue_code: 'OL',
                counter_status: 'Online Appointment'
            }

            await api
                .post('/api/v1/online-appointment-queue-number/', formData)
                .then(response => {
                    Notify.create({
                        message: 'Thank you for choosing Adventist Medical Center Manila.',
                        type: 'positive',
                        position: 'top'
                    })

                    const printFormData = {
                        content:  response.data.full_queue,
                        task: 'Online Appointment',
                        ip_address: this.ipAddress
                    }                   
                    
                    api 
                        .post('/api/v1/print_network_queue/', printFormData)  
                        .then(response => {})
                        .catch(error => {
                            // console.log(error)
                        })             
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async onlineAppointmentWithHMO(){

            const formData = {
                queue_code: 'HMO',
                counter_status: 'HMO'
            }

            await api
                .post('/api/v1/online-appointment-with-hmo-queue-number/', formData)
                .then(response => {
                    Notify.create({
                        message: 'Thank you for choosing Adventist Medical Center Manila.',
                        type: 'positive',
                        position: 'top'
                    }) 

                    const printFormData = {
                        content:  response.data.full_queue,
                        task: 'HMO',
                        ip_address: this.ipAddress
                    }                   
                    
                    api 
                        .post('/api/v1/print_network_queue/', printFormData)  
                        .then(response => {})
                        .catch(error => {
                            // console.log(error)
                        }) 
                    
                })
                .catch(error => {
                    // console.log(error)
                })            
        },

        async testPrint() {
            api
                .post('/api/v1/print_network/')
                .then(response => {})
                .catch(error => {
                    // console.log(error)
                })
        }
    }
}
</script>