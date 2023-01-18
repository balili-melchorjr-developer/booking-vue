<template>
    <div class="q-pa-lg">
        <div>
            <q-table
                title="Doctors"
                :rows="doctors"
                :columns="columns"
                row-key="full_name"
                bordered
                flat
                :filter="filter"
            >

                <template v-slot:top-right>
                    <q-input class="q-mt-md" standout="bg-light-blue-7" dense debounce="300" v-model="filter" placeholder="Search">
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

                <template v-slot:header-cell-schedule="props">                    
                    <q-th :props="props">
                        <q-icon name="event" size="1.5em" />                    
                    </q-th>
                </template>

                <template v-slot:body-cell-schedule="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="light-blue-7" @click="schedule(props), getDoctorSchedule()" icon="event">
                            <q-tooltip>
                                View doctors schedule.
                            </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>         

                <template v-slot:body-cell-full_name="props">
                    <q-td :props="props">
                        <div class="text-grey-9 text-left text-subtitle2">
                            Dr. {{ props.row.LASTNAME }}, {{ props.row.FIRSTNAME }} {{ props.row.MIDDLENAME }}
                            <q-chip color="accent" size="sm" text-color="white">
                                    {{ props.row.doctor_id }}
                            </q-chip>
                        </div>
                        <div class="text-left text-weight-light">
                            {{ props.row.SPECIALIZATION }}
                        </div>
                    </q-td>
                </template>
    <!-- 
            <template v-slot:body-cell-doctor_specialization="props">
                <q-td :props="props">
                    <div>
                    <div class="text-grey-9 text-left">
                            {{ props.row.SPECIALIZATION }}
                    </div>                   
                    </div>
                </q-td>
            </template> -->

            <!-- <template v-slot:body-cell-birthdate="props">
                <q-td :props="props">
                    <div class="text-grey-9 text-center">
                    {{ props.value }}
                    </div>
                </q-td>
            </template> -->

                <template v-slot:body-cell-email="props" >
                    <q-td :props="props">
                        <div class="text-grey-9 text-center">
                            {{ props.row.email }}
                        </div>
                    </q-td>
                </template>

                <template v-slot:body-cell-contact_number="props">
                    <q-td :props="props">
                        <div class="text-grey-9 text-center">
                            {{ props.value }}
                        </div>
                    </q-td>
                </template>
                
                <template v-slot:body-cell-add_schedule="props">
                    <q-td :props="props">
                        <div class="text-center">
                            <q-btn dense  flat color="light-blue-7" @click="addSchedule(props)" icon="add_box" label="Add Schedule" no-caps />
                        </div>              
                    </q-td>
                </template>
            </q-table>
        </div>   

        <q-dialog v-model="scheduleDialog" >
            <q-card style="width: 1200px; max-width: 120vw">
                <q-card-section>
                    <h6 class="text-h6 q-ma-none">Doctor Schedule Settings</h6>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">                            
                            <q-table
                                title="Doctor Schedule"
                                :rows="doctorSchedule"
                                :columns="doctorsScheduleColumn"
                                row-key="id"
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

                                <template v-slot:body-cell-days="props">
                                    <q-td :props="props">
                                        <div class="text-center">
                                            {{ humanizeFullDateFormat(props.row.days) }}
                                        </div>
                                        <div class="text-center text-grey-9 ">
                                            {{ humanizeDaysFormat (props.row.days) }}
                                        </div>
                                    </q-td>
                                </template>

                                <template v-slot:body-cell-time="props">
                                    <q-td :props="props">
                                        <div class="text-grey-9 text-center">
                                            {{ props.row.from_time_format }} - {{ props.row.to_time_format }}
                                        </div>
                                    </q-td>
                                </template>

                                <template v-slot:body-cell-patient_limit="props">
                                    <q-td :props="props">
                                        <div class="text-grey-9 text-center">
                                            {{ props.row.patient_limit }}
                                        </div>
                                    </q-td>
                                </template>

                                <template v-slot:body-cell-action="props">
                                    <q-td :props="props">
                                        <div class="row justify-center">
                                            <q-btn dense round flat color="grey" @click="editScheduleID(props)" icon="edit">
                                                <q-tooltip>
                                                    Update schedule.
                                                </q-tooltip>
                                            </q-btn>
                                            <q-btn dense round flat color="grey" @click="deleteScheduleID(props)" icon="delete">
                                                <q-tooltip>
                                                    Delete schedule.
                                                </q-tooltip>
                                            </q-btn>
                                        </div>                                        
                                    </q-td>
                                </template>
                            </q-table>
                        </div>
                    </div>                            
                </q-card-section>
            </q-card>
        </q-dialog>

         <q-dialog v-model="deleteDialog">
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete_forever" color="light-blue-7" text-color="white" />
                    <span class="q-ml-sm">Are you sure want to remove?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="No" color="light-blue-7" v-close-popup />
                    <q-btn flat label="Yes" color="light-blue-7" @click="confirmScheduleDelete()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="addScheduleDialog" >
            <q-card style="width: 1200px; max-width: 120vw">
                <q-card-section>
                    <h6 class="text-h6 q-ma-none">Add Schedule</h6>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="row">
                        <div class="row q-gutter-md q-mb-md col-xs-12 col-sm-12 col-md-12 justify-center">
                            <div class="col-xs-12 col-sm-12 col-md-3">
                                <div class="text-subtitle1">Select Date</div>
                                <q-date v-model="days" :options="optionsFn" today-btn/>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3">
                                <div class="text-subtitle1">Start time</div>
                                <q-time v-model="fromTime" now-btn />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3">
                                <div class="text-subtitle1">End time</div>
                                <q-time  v-model="toTime" now-btn /> 
                            </div>  
                            <div class="row col-xs-12 col-sm-12 col-md-2">
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <div class="text-subtitle1">Patient Limit</div>
                                    <q-input v-model="patientLimit" type="number" dense outlined color="light-blue-7" label="Patient Limit" />
                                </div>
                            </div>
                        </div> 
                    </div>                            
                </q-card-section>
                <q-card-actions align="right" class="q-pa-lg">
                    <template v-if="editID == ''">                     
                        <q-btn color="light-blue-7" label="Submit" @click="submit" />                                                     
                    </template>
                    <template v-else>                                                          
                        <q-btn color="grey" flat label="Cancel" @click="cancelUpdateSchedule" />
                        <q-btn color="light-blue-7" label="Update" @click="updateSchedule" /> 
                    </template>
                </q-card-actions>  
            </q-card>
        </q-dialog>        
    </div>
</template>

<script>
import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
    name: 'DoctorList',
    data() {
        return {
            filter: '',
            
            doctorSpecialization: [],
            daysOptions: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            days: '',
            fromTime: '',
            toTime: '',
            patientLimit: 10,

            columns: [
                {
                    name: 'schedule',
                    label: '',
                    field: '',
                },
                {
                    name: 'full_name',
                    label: 'Full Name',
                    field: row => row.doctor_fullname                    
                },
                // {
                //     name: 'doctor_specialization',
                //     label: 'Specialization',
                //     field: row => row.specialization
                // },
                // {
                //     name: 'birthdate',
                //     label: 'Birthdate',
                //     field: row => date.formatDate(row.birthdate, 'MMMM D, YYYY')
                // },
                {
                    name: 'email',
                    label: 'Email',
                    field: row => row.email
                },
                {
                    name: 'contact_number',
                    label: 'Contact Number',
                    field: row => row.contact_number
                },
                {
                    name: 'add_schedule',
                    label: 'Action',
                    field : ''
                }
            ],

            doctorsScheduleColumn:[ 
                {
                    name: 'days',
                    label: 'Days',
                    field: row => date.formatDate(row.days, 'YYYY/MM/DD'),
                },
                {
                    name: 'time',
                    label: 'Time',
                    field: row => row.from_time,
                },
                {
                    name: 'patient_limit',
                    label: 'Patient Limit',
                    field: row => row.patient_limit,
                },
                {
                    name: 'action',
                    label: 'Action',
                    field: '',
                }
            ],
            
            doctors: [],
            doctorSchedule: [],

            scheduleDialog: false,
            doctorID: '',

            addScheduleDialog: false,            

            deleteDialog: false,
            deleteID: '',
            editID: '',
        }       
    },

    async mounted() {
        // await this.getDoctorSpecialization()
        await this.getDoctorList()
        // await this.getOnefDoctorList()
    },

    methods:{

        humanizeFullDateFormat(d){
            return d = date.formatDate(d, 'MMM, DD YYYY')
        },

        humanizeDaysFormat(d){
            return d = date.formatDate(d, 'dddd')
        }, 

        optionsFn(d) {
            return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
        },

        async getDoctorList(){
            await api
                .get('/api/v1/onef_doctor/')
                .then(response => {
                    this.doctors = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },

        // async getDoctorList() {
        //     await api
        //         .get('/api/v1/doctor-list/')
        //         .then(response => {
        //             this.doctors = response.data
        //             let doctor_sp = this.doctorSpecialization            

        //             for(let x in doctor_sp){
        //                 this.doctors[x]["specialization"] = doctor_sp[x].specialization.title                                    
        //             }                
        //         })
        //         .catch(error => {
        //             console.log(JSON.stringify(error))
        //         })
        // },

        // async getDoctorSpecialization() {
        //     await api
        //         .get('/api/v1/doctor-specialization-description/')
        //         .then(response => {
        //             this.doctorSpecialization = response.data
        //         })
        // },  
        
        async getDoctorSchedule() {            
            let doctorID = this.doctorID

            await api
                .get(`/api/v1/schedule-patient-limit-list/${doctorID}/`)
                .then(response => {
                    this.doctorSchedule = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        }, 

        schedule(props){
            this.scheduleDialog = true
            this.doctorID = props.row.doctor_id
            this.days = ''
            this.fromTime = ''
            this.toTime = ''
            this.patientLimit = 10
        },

        addSchedule(props){
            this.addScheduleDialog = true
            this.doctorID = props.row.doctor_id
            this.days = ''
            this.fromTime = ''
            this.toTime = ''
            this.editID = ''
            
        },  
        
        deleteScheduleID(props) {
            this.deleteID = props.row.id
            this.deleteDialog = true
            console.log(this.deleteID)
        },

        confirmScheduleDelete() {
            let scheduleID = this.deleteID
            api
                .delete(`/api/v1/schedule-patient-limit/${scheduleID}/`)
                .then(response => {
                    Notify.create({
                        message: 'Successfully deleted',
                        type:'positive',
                        position: 'top',
                    })
                    this.scheduleDialog = false
                })
                .catch(error => {
                    console.log(error)
                })
        },

        editScheduleID(props){            
            this.editID = props.row.id        
            this.days = date.formatDate(props.row.days, 'YYYY/MM/DD')
            this.fromTime = props.row.from_time
            this.toTime = props.row.to_time
            this.patientLimit = props.row.patient_limit
            this.addScheduleDialog = true                        
        },

        updateSchedule() {

            if(this.fromTime > this.toTime){
                Notify.create({
                    message: 'Please select more than start time.',
                    type: 'negative',
                    position: 'top'
                })
            } else if (5 > this.patientLimit) {
                Notify.create({
                    message: 'More than 10 patient limit is needed.',
                    type: 'negative',
                    position: 'top'
                })
            } else {

                let editID = this.editID

                let formData = {
                    doctor: this.doctorID,
                    days: this.days,
                    from_time: this.fromTime,
                    to_time: this.toTime,
                    patient_limit: this.patientLimit,
                }

                api
                    .put(`/api/v1/schedule-patient-limit/${editID}/`, formData)
                    .then(response => {
                        Notify.create({
                            message: 'Successfully updated.',
                            type: 'positive',
                            position: 'top'
                        })
                        this.addScheduleDialog = false
                        this.scheduleDialog = false
                    })
                    .catch(error => {
                        // console.log(error)
                    })
            }            
        },

        cancelUpdateSchedule() {
            this.editID = ''
            this.days = 'Sunday'
            this.fromTime = ''
            this.toTime = ''
        },

        submit() {
            if(this.fromTime > this.toTime && this.fromTime == '' && this.toTime == ''){
                Notify.create({
                    message: 'Please select more than start time.',
                    type: 'negative',
                    position: 'top'
                })
            } else if(5 > this.patientLimit){
                Notify.create({
                    message: 'More than 10 patient limit is needed.',
                    type: 'negative',
                    position: 'top'
                })
            } else {

                const formData = {
                doctor: this.doctorID,
                patient_limit: this.patientLimit,
                days: this.days,
                from_time: this.fromTime,
                to_time: this.toTime,
            }

            api
                .post(`/api/v1/schedule-patient-limit/`, formData)
                .then(response => {
                    Notify.create({
                        message: 'Successfully added',
                        type: 'positive',
                        position: 'top'
                })
                    this.addScheduleDialog = false
                })
                .catch(error => {
                   
                })
            }            
        },
    }
}
</script>