<template>
    <div class="q-px-lg">
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

        <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-8">
                <q-card class="my-card bg-cyan-7 text-white">
                    <q-card-section>
                        <h4 class="text-center text-weight-medium text-h4 q-ma-none">Active Clinic</h4>
                    </q-card-section>                    
                </q-card>
                <q-card class="q-mt-md">
                    <q-card-section>
                        <div v-for="queue in data" :key="queue.id">
                            <template v-if="queue.active_status == true">
                                <h2 class="q-my-sm text-h2 text-weight-bold text-positive">{{ queue.reference_no }} <br/> <span class="text-grey-9 text-weight-medium text-h4">Clinic Room: {{ queue.doctor_clinic }} </span></h2>
                            </template>                    
                         </div>
                    </q-card-section>
                </q-card> 
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
                <q-card class="my-card bg-cyan-7 text-white">
                    <q-card-section>
                        <h4 class="text-h4 text-weight-medium text-center q-ma-none">Waiting Area</h4>
                    </q-card-section>                   
                </q-card>
                <q-card class="q-mt-md">
                    <q-card-section>
                        <div v-for="queue in data" :key="queue.id">
                            <template v-if="queue.active_status == false">
                                <h6 class="q-my-sm text-h6 text-weight-bold text-deep-purple-13">{{ queue.reference_no }} <br/> <span class="text-grey-9">Clinic Room: {{ queue.doctor_clinic }} </span></h6>
                            </template>                    
                        </div>
                    </q-card-section>
                </q-card>             
                
            </div>
        </div> 
    </div>
</template>
<script>

import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
    name: 'ClinicQueueMonitor',
    data() {
        return {
            data: [],
            columns: [
                {
                    name: 'reference_no',
                    label: 'Reference No.',
                    field: row => row.reference_no
                },
                {
                    name: 'appointment_date',
                    label: 'Appointment date',
                    field: row => date.formatDate(row.date_created, 'hh:mm A') + ' ' + date.formatDate(row.date_created, 'MMMM D, YYYY')
                },
                {
                    name: 'full_name',
                    label: 'Full Name',
                    field: row => row.last_name + ' ' + row.first_name + ' ' + row.middle_name,
                },
                {
                    name: 'doctor',
                    label: 'Doctor',
                    field: ''
                },
                {
                    name: 'status',
                    label: 'Status',
                    field: ''
                },
                {
                    name: 'transaction_date',
                    label: 'Transaction Date',
                    field: '',              
                }
            
            ],

            onefDoctor: []        
        }
    },  

    async mounted() {
        await this.getOnefDoctor()
        await this.getVitalSignsList()

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

    methods: {
        optionsFn(d) {
            return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
        },

        dateMeridian: function(dt){
            return date.formatDate(dt, 'hh:mm A')
        },

        fullDate: function(dt){
          return date.formatDate(dt, 'MMMM DD, YYYY')
        },

        birthdateFormat: function(dt){
          return date.formatDate(dt, 'MM/DD/YYYY')
        },
        humanizeDaysFormat(d){
            return d = date.formatDate(d, 'dddd')
        },

        async getVitalSignsList() {
            await api
                .get('/api/v1/doctor-patient/')
                .then(response => {
                    this.data = response.data
                    let onefDoctorData = this.onefDoctor

                    this.data.map(x => {

                            let doctor_fullname = onefDoctorData.filter(item => {                            
                                try{
                                    return item.doctor_id == x.schedule.doctor 
                                } catch(error){
                                    
                                }                                            
                            })
                            
                            if(doctor_fullname.length > 0){
                                x['doctor_fullname'] = doctor_fullname[0].doctor_fullname
                                x['doctor_clinic'] = doctor_fullname[0].CLINICNO
                            
                            } else {
                                x['doctor_fullname'] = ''
                            }                            
                        })  
                })
                .catch(error => {
                    // console.log(error)
                })
        },

       async getOnefDoctor(){
            await api
                .get('/api/v1/onef_doctor/')
                .then(response => {
                    this.onefDoctor = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },
    }
}

</script>