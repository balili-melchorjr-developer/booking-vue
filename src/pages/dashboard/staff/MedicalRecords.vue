<template>
    <div class="q-px-lg">
       <div class="row q-mt-xl">
            <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center q-ma-none">Out-Patient Records</h4>
            <div class="col-md-3 q-mt-sm">

            </div>

            <!-- Patient Count Today Component -->
            <PatientCountToday />
            
        </div>

        <div class="q-pa-md">
            <q-table
                :rows="data"
                :columns="columns"
                row-key="reference_no"
                bordered
                flat
                :filter="filter" 
            >
                <template v-slot:top-right>
                    <q-input class="q-mt-md " standout="bg-light-blue-7" dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props" 
                        >
                                <div class="text-weight-medium text-center text-light-blue-7 text-subtitle2">
                                    {{ col.label }}
                                </div>                   
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">  
                    <q-tr :props="props" :class="(props.row.medical_records_status == 'Doctor Received')?'bg-positive text-white':'bg-white text-black'">
                        <q-td key="reference_no" :props="props" class="text-weight-bold text-deep-purple-13">
                            {{ props.row.reference_no }}
                        </q-td>
                        <q-td key="appointment_date" :props="props">                  
                            <div class="text-subtitle2 text-center">
                                {{ dateMeridian(props.row.date_created) }}
                            </div>
                            <div class="text-weight-light text-center">
                                {{ fullDate(props.row.date_created) }}
                            </div>                   
                        </q-td>
                        <q-td key="full_name">
                            <div class="text-left text-subtitle2">
                                {{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }}
                            </div>
                            <div class="text-left text-weight-medium">
                                {{ props.row.sex }}
                            </div>
                        </q-td>
                        <q-td key="doctor">
                            <div class="text-left text-weight-medium text-subtitle2">
                                Dr. {{ props.row.doctor_fullname }}                          
                            </div>
                            <div class="text-left">
                                {{ fullDate(props.row.schedule.days) }}
                            </div>
                            <div class="text-left text-caption">
                                {{ props.row.from_time_format }} - {{ props.row.to_time_format }}
                            </div>
                        </q-td>
                        <template v-if="props.row.medical_records_status == 'Pending'">               
                            <q-td key="status">
                                <q-chip :class="(props.row.medical_records_status == 'Pending')?'bg-teal text-white':''" size="md">
                                    {{ props.row.medical_records_status }}
                                </q-chip>
                            </q-td>        
                        </template>
                        <template v-else-if="props.row.medical_records_status == 'Returned'">
                            <q-td key="status">
                                <q-chip :class="(props.row.medical_records_status == 'Returned')?'bg-orange text-white':''" size="md">
                                    {{ props.row.medical_records_status }}
                                </q-chip>
                            </q-td>
                        </template>
                        <template v-else-if="props.row.medical_records_status == 'Catalog'">
                            <q-td key="status">
                                <q-chip :class="(props.row.medical_records_status == 'Catalog')?'bg-blue-grey text-white':''" size="md">
                                    {{ props.row.medical_records_status }}
                                </q-chip>
                            </q-td>
                        </template>
                        <template v-else>
                            <q-td key="status">
                                <div class="text-weight-bold">
                                    {{ props.row.medical_records_status}}
                                </div>
                            </q-td>
                        </template>
                        <q-td key="medical_record_status_remarks" :props="props">                  
                            <div class="text-subtitle2 text-center">
                                {{ props.row.medical_record_status_remarks }}
                            </div>                 
                        </q-td>
                        <q-td key="transaction_date" :props="props">                  
                            <div class="text-subtitle2 text-center">
                                {{ dateMeridian(props.row.modified_at) }}
                            </div>
                            <div class="text-weight-light text-center">
                                {{ fullDate(props.row.modified_at) }}
                            </div>                   
                        </q-td>
                        <q-td key="action" :props="props">
                            <q-btn @click="setMedicalRecordsID(props)" label="Set status" flat dense no-caps />
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>

        <q-dialog v-model="medicalRecordsDialog">
            <q-card style="width: 700px; max-width: 80vw;" class="">
                <q-card-section class="row items-center">                 
                    <div class="row">
                        <div class="q-ml-sm q-mt-md text-weight-medium text-subtitle1">Are you sure want to update this status?</div>
                           <div class="col-xs-12 col-sm-12 col-md-12 row q-pa-lg q-gutter-md">
                            <q-btn @click="setDoctorsReceived" class="bg-positive text-white" label="Doctor Received" />
                            <q-btn @click="setPending" class="bg-teal text-white" label="Pending" />
                            <q-btn @click="setReturned" class="bg-orange text-white" label="Returned" />
                            <template v-if="medicalRecordsStatus == 'Returned'">
                                <q-btn @click="setCatalogDialog" class="bg-blue-grey text-white" label="Catalog" />                                                        
                            </template>
                            <template v-else>
                                <q-btn @click="setCatalogDialog" disable class="bg-grey-5 text-grey" label="Catalog" />
                            </template>                        
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="medicalRecordsStatusRemarksDialog">
            <q-card style="width: 700px; max-width: 80vw;" class="">
                <q-card-section class="row items-center">                 
                    <div class="row">
                        <div class="q-ml-sm q-mt-md text-weight-medium text-subtitle1">Remarks</div>
                        <div class="col-xs-12 col-sm-12 col-md-12 row q-pa-lg q-gutter-md">             
                            <q-input v-model="medicalRecordsStatusRemarks" class="col-xs-12 col-sm-12 col-md-12" dense outlined color="light-blue-7"/>
                            <q-btn @click="setCatalog" class="bg-light-blue-7 text-white" label="Save" />  
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>

import { api, apiout } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'
import PatientCountToday from 'components/PatientCountToday.vue'

export default {
    name: 'MedicalRecords',
    data() {
        return {
            filter: '',
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
                    field: ''
                },
                {
                    name: 'action',
                    label: 'Action',
                    field: '',              
                }            
            ],

            onefDoctor: [],

            medicalRecordsID: '',
            medicalRecordsDialog: false,
            medicalRecordsStatus: '',
            medicalRecordsStatusRemarksDialog: false,
            medicalRecordsStatusRemarks: '',
        }
    },

    components: {
        PatientCountToday,
    },

    async mounted() {
        await this.getOnefDoctor()
        await this.getPreDoctorPatient()   
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

        setMedicalRecordsID(props) {
            this.medicalRecordsID = props.row.id
            this.medicalRecordsDialog = true
            this.medicalRecordsStatus = props.row.medical_records_status
        },

        setDoctorsReceived() { 
            const formData = {
                medical_records_status: "Doctor Received",
                medical_record_status_remarks: ''
            }

            api
                .put(`/api/v1/update-medical-records-status/${this.medicalRecordsID}/`, formData)
                .then(response => {
                    Notify.create({
                        message: "Successfully Updated",
                        type: "positive",
                        position: "top"
                    })

                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })          
        },

        setPending() {
            const formData = {
                medical_records_status: "Pending",
                medical_record_status_remarks: ''
            }

            api
                .put(`/api/v1/update-medical-records-status/${this.medicalRecordsID}/`, formData)
                .then(response => {
                    Notify.create({
                        message: "Successfully Updated",
                        type: "positive",
                        position: "top"
                    })

                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        setReturned() {
            const formData = {
                medical_records_status: "Returned",
                medical_record_status_remarks: ''              
            }

            api
                .put(`/api/v1/update-medical-records-status/${this.medicalRecordsID}/`, formData)
                .then(response => {
                    Notify.create({
                        message: "Successfully Updated",
                        type: "positive",
                        position: "top"
                    })

                    location.reload()
                  
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        setCatalogDialog() {
            this.medicalRecordsStatusRemarksDialog = true
        },

        setCatalog() {
            const formData = {
                medical_records_status: "Catalog",
                medical_record_status_remarks: this.medicalRecordsStatusRemarks,
            }

            api
                .put(`/api/v1/update-medical-records-status/${this.medicalRecordsID}/`, formData)
                .then(response => {
                    Notify.create({
                        message: "Successfully Updated",
                        type: "positive",
                        position: "top"
                    })

                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        }        
    }
}


</script>