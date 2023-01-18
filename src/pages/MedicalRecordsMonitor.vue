<template>
    <div class="q-px-lg">
       <div class="row q-mt-xl">
            <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-xs-12 col-sm-12 col-md-10 align-center q-ma-none">Medical Records Status</h4>
            <div class="col-xs-12 col-sm-12 col-md-2 q-mt-sm">

                <div id="dateDays" class="text-center text-h4 text-grey-9"></div>
                <div id="dateToday" class="text-center text-h5 text-grey-9" ></div>
            </div>            
        </div>

        <div class="q-pa-md q-mt-lg">
            <q-table
                :rows="data"
                :columns="columns"
                row-key="reference_no"
                bordered
                flat
            >
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props" 
                        >
                            <div class="text-weight-bold q-my-md text-center text-light-blue-7 text-subtitle1">
                                {{ col.label }}
                            </div>                   
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props" :class="(props.row.medical_records_status == 'Doctor Received')?'bg-positive text-white':'bg-white text-black'">
                        <q-td key="reference_no" :props="props" >
                            <div class="text-weight-bold text-subtitle1 text-center">
                                {{ props.row.reference_no }}
                            </div>                    
                        </q-td>
                        <q-td key="appointment_date" :props="props">                  
                            <div class="text-subtitle1 text-center text-weight-medium">
                                {{ dateMeridian(props.row.date_created) }}
                            </div>
                            <div class="text-weight-medium text-subtitle2 text-center">
                                {{ fullDate(props.row.date_created) }}
                            </div>                   
                        </q-td>
                        <q-td key="full_name">
                            <div class="text-left text-weight-bold text-subtitle1">
                                {{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }}
                            </div>
                            <div class="text-left text-subtitle2 text-weight-medium">
                                {{ props.row.sex }}
                            </div>
                        </q-td>
                        <q-td key="doctor">
                            <div class="text-left text-weight-bold text-subtitle1">
                                Dr. {{ props.row.doctor_fullname }}                          
                            </div>
                            <div class="text-left">
                                {{ fullDate(props.row.schedule.days) }}
                            </div>
                            <div class="text-left text-subtitle2">
                                {{ props.row.from_time_format }} - {{ props.row.to_time_format }}
                            </div>
                        </q-td>
                        <template v-if="props.row.medical_records_status == 'Pending'">               
                            <q-td key="status">
                                <div class="row justify-center">
                                    <q-chip :class="(props.row.medical_records_status == 'Pending')?'bg-teal text-white':''" size="md">
                                        {{ props.row.medical_records_status }}
                                    </q-chip>
                                </div>                       
                            </q-td>        
                        </template>
                        <template v-else-if="props.row.medical_records_status == 'Returned'">
                            <q-td key="status">
                                <div class="row justify-center" >
                                    <q-chip :class="(props.row.medical_records_status == 'Returned')?'bg-orange text-white':''" size="md">
                                        {{ props.row.medical_records_status }}
                                    </q-chip>
                                </div>                        
                            </q-td>
                        </template>
                        <template v-else-if="props.row.medical_records_status == 'Catalog'">
                            <q-td key="status">
                                <div class="row justify-center" >
                                    <q-chip :class="(props.row.medical_records_status == 'Catalog')?'bg-blue-grey text-white':''" size="md">
                                        {{ props.row.medical_records_status }}
                                    </q-chip>
                                </div>                        
                            </q-td>
                        </template>
                        <template v-else>
                            <q-td key="status">
                                <div class="text-weight-bold text-center text-subtitle1">
                                    {{ props.row.medical_records_status }}
                                </div>
                            </q-td>
                        </template>
                        <q-td key="transaction_date">
                            <div class="text-subtitle1 text-center text-weight-medium">
                                {{ props.row.medical_record_status_remarks }}
                            </div>
                        </q-td>
                        <q-td key="transaction_date">
                            <div class="text-subtitle1 text-center text-weight-medium">
                                {{ dateMeridian(props.row.modified_at) }}
                            </div>
                            <div class="text-weight-medium text-subtitle2 text-center">
                                {{ fullDate(props.row.modified_at) }}
                            </div> 
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
    </div>
</template>
<script>

import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
    name: 'MedicalRecordsMonitor',
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
                    name: 'medical_record_status_remarks',
                    label: 'Remarks',
                    field: ''
                },
                {
                    name: 'transaction_date',
                    label: 'Transaction Date',
                    field: '',              
                }            
            ],

            onefDoctor: [],

            timer: ""        
        }
    },  

    async mounted() {
        await this.getOnefDoctor()
        await this.getPreDoctorPatient()

        const timeStamp = Date.now()

        const dateStamp = date.formatDate(timeStamp, 'MMMM D, YYYY')
        const dayStamp = date.formatDate(timeStamp, 'dddd') 

        let dateToday = document.getElementById('dateToday')
        let dateDays = document.getElementById('dateDays')

        dateToday.innerHTML = dateStamp
        dateDays.innerHTML = dayStamp
    },

    created() {
        this.getPreDoctorPatient()
        this.timer = setInterval(this.getPreDoctorPatient, 5000)        
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

        async getPreDoctorPatient() {
            await api
                .get('/api/v1/pre-doctor-patient/')
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

        cancelAutoUpdate() {
            clearInterval(this.timer)
        }
    },

    beforeDestroy() {
        this.cancelAutoUpdate()  
    },  
}

</script>