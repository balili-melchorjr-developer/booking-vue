<template>
    <div>
        <div class="q-px-lg">
            <div class="row q-mt-xl">
                <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Registration</h4>
                <div class="col-md-3 q-mt-sm">
                </div>

                <!-- Patient Count Today Component -->
                <!-- <PatientCountToday /> -->
                
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 q-mb-xs">
                    <h5 class="text-subtitle1 q-mb-md text-weight-bold text-blue-grey-10">Personal Information</h5>
                    <q-select class="q-mb-lg" dense outlined v-model="patient" color="light-blue-7" @update:model-value="patientIdCheckerFn" @filter="onSearch" use-input :options="patientApi" option-value="patient" option-label="full_name" emit-value map-options label="Search patient...">
                        <template v-if="patient" v-slot:append>
                            <q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
                        </template>                        
                    </q-select>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <template v-if="patient">                        
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Last Name" v-model="patient.LASTNAME" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="First Name" v-model="patient.FIRSTNAME" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Middle Name" v-model="patient.MIDDLENAME" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" disable label="Sex" v-model="patient.gender" :options="sexOptions" dense outlined color="light-blue-7"/>
                        </template>
                        <template v-else>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Last Name" v-model="lastName" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="First Name" v-model="firstName" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Middle Name" v-model="middleName" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" label="Sex" v-model="sex" :options="sexOptions" dense outlined color="light-blue-7"/>                        
                        </template>                    
                    </div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <template v-if="patient">
                            <q-select class="col-xs-12 col-sm-12 col-md-6" disable label="Nationality" color="light-blue-7" dense outlined v-model="patient.NATIONALITY" @filter="filterFnNationality" use-input :options="nationalitySearch" option-value="nationality" option-label="nationality" emit-value map-options></q-select>
                            <q-select class="col-xs-12 col-sm-12 col-md-6" disable label="Religion" color="light-blue-7" dense outlined v-model="patient.RELIGION" @filter="filterFnReligion" use-input :options="religionSearch" option-value="id" option-label="Religion" emit-value map-options></q-select>                        
                        </template>
                        <template v-else>
                            <q-select class="col-xs-12 col-sm-12 col-md-6" label="Nationality" color="light-blue-7" dense outlined v-model="nationality" @filter="filterFnNationality" use-input :options="nationalitySearch" option-value="nationality" option-label="nationality" emit-value map-options></q-select>
                            <q-select class="col-xs-12 col-sm-12 col-md-6" label="Religion" color="light-blue-7" dense outlined v-model="religion" @filter="filterFnReligion" use-input :options="religionSearch" option-value="id" option-label="Religion" emit-value map-options></q-select> 
                        </template>
                    </div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <template v-if="patient">
                            <q-input class="col-xs-12 col-sm-12 col-md-6" disable label="Birth Place" v-model="patient.BIRTHPLACE" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" disable label="Civil Status" v-model="patient.CIVILSTAT" :options="civilStatusOptions" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" disable label="Blood Type" v-model="patient.BLOODTYPE" :options="bloodTypeOptions" dense outlined color="light-blue-7"/>                     
                        </template>
                        <template v-else>
                            <q-input class="col-xs-12 col-sm-12 col-md-6" label="Birth Place" v-model="birthplace" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" label="Civil Status" v-model="civilStatus" :options="civilStatusOptions" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-3" label="Blood Type" v-model="bloodType" :options="bloodTypeOptions" dense outlined color="light-blue-7"/>
                        </template>
                    </div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <template v-if="patient">                        
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Birthdate" stack-label v-model="patient.dob" type="date" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Contact Number" v-model="patient.MOBILENO" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-6" disable label="Email Address" v-model="patient.email_add" dense outlined color="light-blue-7"/>
                        </template>
                        <template v-else>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Birthdate" stack-label v-model="birthdate" type="date" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Contact Number" v-model="contactNumber" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-6" label="Email Address" v-model="email" dense outlined color="light-blue-7"/>
                        </template>                        
                    </div>
                    <div class="row q-col-gutter-md">
                        <template v-if="patient">
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Home No." v-model="patient.HOUSENO" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" disable label="Street" v-model="patient.STREET" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-6" disable label="Address" color="light-blue-7" dense outlined v-model="patient.full_address" @filter="filterFnAddress" use-input :options="addressSearch" option-value="address" option-label="full_address" emit-value map-options></q-select>                  
                        </template>
                        <template v-else>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Home No." v-model="homeNo" dense outlined color="light-blue-7"/>
                            <q-input class="col-xs-12 col-sm-12 col-md-3" label="Street" v-model="street" dense outlined color="light-blue-7"/>
                            <q-select class="col-xs-12 col-sm-12 col-md-6" label="Address" color="light-blue-7" dense outlined v-model="address" @filter="filterFnAddress" use-input :options="addressSearch" option-value="address" option-label="full_address" emit-value map-options></q-select>
                        </template>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <h5 class="text-subtitle1 text-weight-bold text-blue-grey-10 q-my-md">Other Information</h5>
                    <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <h6 class="text-h6 text-blue-grey-10 no-margin">Schedule Appointment</h6>
                            <div class="row">
                                <q-option-group class="q-mb-lg col-xs-12 col-sm-12 col-md-6" v-model="options" inline :options="otherOptions" color="light-blue-7" />
                                <template v-if="options == 'Doctor'">                                           
                                    <div class="row col-xs-12 col-sm-12 col-md-6 justify-end">
                                        <q-btn icon="event" size="md" class="q-mb-md" @click="doctorScheduleFn" label="View Schedule" no-caps bordered square flat color="light-blue-7" />
                                    </div> 
                                </template>
                            </div>                                         
                            
                            <template v-if="options == 'Doctor'">
                                <div>
                                    <q-select clearable label="Search Doctor.." class="q-mb-md col-xs-12 col-sm-12 col-md-12 " dense v-model="doctor" @filter="filterFnDoctor" use-input :options="doctorSearch" option-value="id" option-label="doctor_fullname" emit-value map-options  outlined color="light-blue-7">
                                        <template v-slot:option="scope">
                                            <q-item v-bind="scope.itemProps">
                                                <q-item-section>
                                                    <q-item-label>Dr. {{ scope.opt.LASTNAME }}, {{ scope.opt.FIRSTNAME }} {{ scope.opt.MIDDLENAME }}<span caption></span></q-item-label>
                                                    <small class="text-grey-10">{{ scope.opt.SPECIALIZATION }}</small>
                                                    <small class="text-grey-10 text-weight-medium">Room No. {{ scope.opt.CLINICNO }}</small>
                                                </q-item-section>
                                            </q-item>
                                        </template>  
                                    </q-select>
                                </div>   
                            </template>
                            <template v-else>
                                <div>
                                    <q-select clearable label="Search Ancillary.." class="q-mb-md" dense v-model="auxiliary" @filter="filterFnAuxiliary" use-input :options="auxiliarySearch" option-value="id" option-label="title" emit-value map-options  outlined color="light-blue-7" />
                                </div> 
                            </template>
                            <div class="q-mb-lg">
                                <q-input type="textarea" color="ca" v-model="complaint" dense outlined label="Complaint/Notes" />
                            </div>
                        </div>                                        
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <h6 class="text-h6 no-margin">Payment Method</h6>
                            <q-option-group class="q-mb-lg" v-model="payment" inline :options="paymentOptions" color="light-blue-7" />
                            
                            <template v-if="payment == 'HMO'">
                                <q-select clearable label="Search HMO..." class="q-mb-md" dense v-model="hmoco" @filter="filterFnHmoco" use-input :options="hmocoSearch" option-value="hmoco" option-label="hmoco" emit-value map-options  outlined color="light-blue-7" />
                            </template>  
                            <q-separator class="q-mb-lg"/>                      
                            <q-select clearable label="Classification" class="q-mb-md" dense v-model="classification" @filter="filterFnClassification" use-input :options="classificationSearch" option-value="classification" option-label="classification" emit-value map-options  outlined color="light-blue-7" />
                            <q-select clearable label="Service Type" class="q-mb-md" dense v-model="serviceType" @filter="filterFnServiceType" use-input :options="serviceTypeSearch" option-value="service_type" option-label="service_type" emit-value map-options  outlined color="light-blue-7" />
                            <div class="row justify-end">
                                <q-btn color="light-blue-7" @click="submit()" label="Submit" />
                            </div>                       
                        </div>                    
                    </div>
                </div>
            </div>

            <q-dialog v-model="doctorSchedule" persistent>
                <q-card style="width: 1200px; max-width: 120vw;"> 
                    <q-card-section>
                        <div class="row q-col-gutter-md q-pa-md">
                            <div class="col-xs-12 col-sm-12 col-md-5">
                                <h6 class="text-h6 q-ma-none">Dr. {{ doctor.doctor_fullname }}</h6>
                                <p>{{ doctor.SPECIALIZATION }}</p>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7">
                                <h6 class="text-h6 q-ma-none">Schedule</h6>
                                <template v-if="selectedScheduleID">
                                    <p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ finalDayOfWeeks }}, {{ finalDays }}</p>						
                                    <p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ finalDateFromDate }} - {{ finalDateToDate }}</p>
                                </template>
                                <template v-else>
                                    <q-banner inline-actions rounded dense class="bg-orange text-white">
                                        <q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule.
                                    </q-banner>
                                </template>                                          
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-5">
                                <q-date v-model="date" :events="newEvent" event-color="accent" @click="selectDate" landscape />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7">
                                <q-table
                                    title="Available Time"
                                    :rows="newFilterDoctorScheduleData"
                                    :columns="doctorScheduleDataColumns"
                                    row-key="id"
                                    bordered
                                    flat
                                    :filter="filter"
                                    @row-click="onScheduleRowClick">
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

                                    <template v-slot:body-cell-from_time="props">
                                        <q-td :props="props">
                                            <div class="text-grey-9 text-center">
                                                {{ props.row.from_time_format }}
                                            </div>
                                        </q-td>
                                    </template>
                                    <template v-slot:body-cell-to_time="props">
                                        <q-td :props="props">
                                            <div class="text-grey-9 text-center">
                                                {{ props.row.to_time_format }}                                            
                                            </div>
                                        </q-td>
                                    </template>
                                    <template v-slot:body-cell-patient_limit="props">
                                        <q-td :props="props">
                                            <div class="text-grey-9 text-center">
                                                <template v-if="props.row.patient">
                                                    <template v-if="props.row.patient >= props.row.patient_limit">
                                                        <q-icon name="warning" color="warning" size="1rem" /> {{ props.row.patient }} out of {{ props.row.patient_limit }}
                                                        <q-tooltip>
                                                            Patient limit exceeded
                                                        </q-tooltip>
                                                    </template>
                                                    <template v-else>
                                                        {{ props.row.patient }} out of {{ props.row.patient_limit }}
                                                    </template>												
                                                </template>
                                                <template v-else>
                                                    0 out of {{ props.row.patient_limit }}
                                                </template>
                                            </div>
                                        </q-td>
                                    </template>
                                            <!-- <template v-slot:body-cell-action="props">
                                            <q-td :props="props">
                                                <div class="row justify-center">
                                                    <q-btn dense round flat color="grey" @click="editScheduleID(props)" icon="edit"></q-btn>
                                                    <q-btn dense round flat color="grey" @click="deleteScheduleID(props)" icon="delete"></q-btn>
                                                </div>                                        
                                            </q-td>
                                        </template>  -->
                                </q-table>  
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right" class="q-pa-lg">                        
                        <q-btn flat label="Cancel" @click="cancelSchedule" v-close-popup />
                        <q-btn color="light-blue-7" label="OK" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            
            <q-dialog v-model="patientLimitDialog">
                <q-card class="bg-orange text-white" style="width: 400px">
                    <q-card-section>
                        <h6 class="text-h6 q-ma-sm text-center">Patient Limit Exceeded</h6>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <p class="text-center text-weight-medium text-body1">Are you sure you want to continue?</p>
                    </q-card-section>

                    <q-card-actions align="center">
                        <q-btn color="white" text-color="light-blue-7" label="OK" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="goToPrinterSettingsDialog" pesistent>
                <q-card style="width: 700px; max-width: 80vw;" class="">
                    <q-card-section >
                        <h6 class="q-ml-sm q-mt-md q-mb-none text-center text-weight-medium text-light-blue-7 text-h6">No printer detected.</h6>
                    </q-card-section>
                    <q-card-actions align="center" class="q-pa-md">                        
                        <q-btn color="light-blue-7" label="Go to Settings" :to="{name: 'Settings'}" unelevated />                                
                    </q-card-actions>
                </q-card>
            </q-dialog>

        </div>
    </div>   
</template>

<script>

import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { date } from 'quasar'
import PatientCountToday from 'components/PatientCountToday.vue'

export default {
    name: 'WalkInRegistration',
    data() {
        return {
            filter:'',

            addressApi: [],
            addressSearch: [],

            patientApi: [],          
            patientSearch: [],            
            patient: '', 

            referenceNo: '',
            lastName: '',
            firstName: '',
            middleName: '',
            sex: '',
            birthdate: '',
            birthplace: '',
            civilStatus: 'Single',
            bloodType: 'N/A',
            contactNumber: '',
            email: '',
            homeNo: '',
            street: '',
            address: '',
            nationality: '', 
            religion: '',

            sexOptions: ['Male', 'Female'],
            civilStatusOptions: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
            bloodTypeOptions: ['A', 'AB', 'B', 'O', 'N/A'],
            
            dob: '',

            options: 'Doctor',
            otherOptions: [
                {
                    label: 'Doctor',
                    value: 'Doctor'
                },
                {
                    label: 'Ancillary',
                    value: 'Ancillary',
                    disable: true
                }
            ],

            payment: 'Cash',
            paymentOptions: [
                {
                    label: 'Cash',
                    value: 'Cash'
                },
                {
                    label: 'HMO',
                    value: 'HMO'
                }
            ],

            doctorApi: [],
            doctorSearch: [],
            doctor: '',

            auxiliaryApi: [],
            auxiliarySearch: [],
            auxiliary: '',

            nationalityApi: [],
            nationalitySearch: [],
            nationality: '',

            religionApi: [],
            religionSearch: [],
            religion: '',

            classificationApi: [],
            classificationSearch: [],
            classification: '',

            serviceTypeApi: [],
            serviceTypeSearch: [],
            serviceType: '',

            hmocoApi: [],
            hmocoSearch: [],
            hmoco: '',

            complaint: '',

            doctorSchedule: false,
            doctorIdChecker: '',
            doctorScheduleData: [],
            newFilterDoctorScheduleData:[],

            date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            newEvent: [],
            splitterModel: 40,

            doctorScheduleDataColumns: [
                {
                    name:'from_time',
                    label: 'Start Time',
                    field: row => date.formatDate(row.from_time, 'hh:mm:ss A')
                },
                {
                    name: 'to_time',
                    label: 'End Time',
                    field: row => date.formatDate(row.to_time, 'hh:mm:ss A')
                },
                {
                    name: 'patient_limit',
                    label: 'Patient Limit',
                    field: ''
                }
            ],

            selectedScheduleID: '',
            finalDateFromDate: '',
            finalDateToDate: '',
            finalDays: '',
            finalDayOfWeeks: '',

            patientIdChecker: '',

            // Patient Limit Counts

            patientLimit: '',
			patientLimitDialog: false,

            goToPrinterSettingsDialog: false,

            printerDescription: '',
            printerIpAdress: '',

        }
    },

    components:{
        PatientCountToday,
    },

    async mounted() {
        await this.getPrinter()
        await this.getAddress()
        await this.getPatientList()
        await this.getNationality()
        await this.getReligion()
        await this.getDoctorList()
        await this.getAuxiliary()  
        await this.getOnefHmoco()
        await this.getOnefClassification()
        await this.getOnefServiceType()  
    },

    methods: {

        async getPrinter() {
            await api 
                .get('/api/v1/printer/')
                .then(response => {
                    if (response.data.length === 0) {
                        this.goToPrinterSettingsDialog = true
                    } else {
                        api
                        .get('/api/v1/active-printer/')
                        .then(response => {
                            this.printerDescription = response.data[0].description
                            this.printerIpAddress = response.data[0].ip_address                            
                        })
                    } 
                })
        },

        async getAddress() {
            await api
                .get('/api/v1/onef_address/')
                .then(response => {
                    this.addressApi = response.data
                })
                .catch(error => [
                    // console.log(error)
                ])
        },

        filterFnAddress(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.addressSearch = this.addressApi.filter(v => v.full_address.toLowerCase().indexOf(needle) > -1)              
            })
        },

        async getPatientList() {
            await api
                .get('/api/v1/onef_patient/')
                .then(response => { 
                    this.patientApi = response.data                
                })   
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnPatient(val, update, abort) {          
            if (val.length < 3){
                abort()
            }              
            update(() => {
                const needle = val.toLowerCase()              
                this.patientSearch = this.patientApi.filter(v => v.full_name.toLowerCase().indexOf(needle) > -1)   
            })  
        },

        onSearch(search, loading) {
            if(search.length) {
                loading(true);
                this.search(loading, search, this);
            }
        },

        search(loading, search, vm) {
            setTimeout(() => {
            api
                .get(`/api/v1/onef_exact_patient/${search}/`)
                .then(response => {
                    this.patientApi = response.data
                })
                .catch(error => {
                    Notify.create({
                        message: 'Patient does not exist.',
                        type: 'negative',
                        position: 'top'
                    })
                })
            }, 15)
        },  

        async getNationality() {
            await api
                .get('/api/v1/onef_nationality/')
                .then(response => {
                    this.nationalityApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnNationality(val, update, abort){
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.nationalitySearch = this.nationalityApi.filter(v => v.nationality.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getReligion() {
            await api
                .get('/api/v1/onef_religion/')
                .then(response => {
                    this.religionApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                 })
        },

        filterFnReligion(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.religionSearch = this.religionApi.filter(v => v.Religion.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getDoctorList() {
            await api
                .get('/api/v1/onef_doctor/')
                .then(response => {
                    this.doctorApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnDoctor(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.doctorSearch = this.doctorApi.filter(v => v.doctor_fullname.toLowerCase().indexOf(needle) > -1)              
            })
        },

        async getAuxiliary() {
            await api
                .get('/api/v1/auxiliary/')
                .then(response => { 
                    this.auxiliaryApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnAuxiliary(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.auxiliarySearch = this.auxiliaryApi.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getOnefClassification() {
            await api
                .get('/api/v1/onef_classification/')
                .then(response => { 
                    this.classificationApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnClassification(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.classificationSearch = this.classificationApi.filter(v => v.classification.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getOnefServiceType() {
            await api
                .get('/api/v1/onef_service_type/')
                .then(response => { 
                    this.serviceTypeApi = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },

        filterFnServiceType(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.serviceTypeSearch = this.serviceTypeApi.filter(v => v.service_type.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getOnefHmoco() {
            await api
                .get('/api/v1/onef_hmoco/')
                .then(response => { 
                    this.hmocoApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnHmoco(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.hmocoSearch = this.hmocoApi.filter(v => v.hmoco.toLowerCase().indexOf(needle) > -1)
            })
        },

        async doctorScheduleFn() {  
            try{

                const doctorId = this.doctor.doctor_id

                if(doctorId == null){
                    Notify.create({
                        message: 'Please select doctor first.',
                        type: 'negative',
                        position: 'top'
                    })
                } else {
                    this.doctorSchedule = true

                    await api
                        .get(`/api/v1/schedule-patient-limit-list/${doctorId}/`)
                        .then(response => {   
                            (response.data).map(item => {
                                this.newEvent.push(date.formatDate(item.days, 'YYYY/MM/DD' ))                
                            })  
                        this.doctorScheduleData = response.data  
                        })
                        .catch(error => { })

                    await api
                        .get(`/api/v1/approve-list-doctor/${this.doctor.doctor_id}/`)
                        .then(response => {
                            this.patientLimit = response.data
                            let patientSchedule = []

                            for(let num in this.patientLimit) {
                                patientSchedule.push(this.patientLimit[num].schedule.id)
                            }

                            const countPatientLimit = {}

                            patientSchedule.forEach(function (x) { countPatientLimit[x] = (countPatientLimit[x] || 0) + 1; });	

                            this.doctorScheduleData.map(item => {
								for (let [key, value] of Object.entries(countPatientLimit)){							
									if(item.id == key){
										item['patient'] = value
									} 								
								}
							})
                        })
                }
            
            } catch(err) {
                Notify.create({
                    message: 'Please select doctor first.',
                    type: 'negative',
                    position: 'top'
                })
            } 
        },

        selectDate() {
            let filterDoctorScheduleData =  this.doctorScheduleData.filter(item => {
                return date.formatDate(item.days, 'YYYY/MM/DD' ) == date.formatDate(this.date, 'YYYY/MM/DD' )         
            })

            this.newFilterDoctorScheduleData = filterDoctorScheduleData     
        },

        onScheduleRowClick(evt, row){
            let daysFormatted = date.formatDate(row.days, 'MMMM DD, YYYY')
            let daysOfWeekFormatted = date.formatDate(row.days, 'dddd')

            this.selectedScheduleID = row.id
            this.finalDateFromDate = row.from_time_format
            this.finalDateToDate = row.to_time_format
            this.finalDays = daysFormatted
            this.finalDayOfWeeks = daysOfWeekFormatted

            if(row.patient >= row.patient_limit) {
				this.patientLimitDialog = true
			}
        },

        async submit(){
            if(this.patient) {   
                if(this.options == 'Doctor') {
                    if(this.doctor == ""){
                        Notify.create({
                            message: 'No doctor selected.',
                            type: 'negative',
                            position: 'top'
                    })
                    } else { 

                        if (this.selectedScheduleID == "") {
                            Notify.create({
                                message: 'No schedule selected.',
                                type: 'negative',
                                position: 'top'
                            })
                        } else {
                            const editPatientData = {
                                reference_no: this.referenceNo,
                                last_name: this.patient.LASTNAME,
                                first_name: this.patient.FIRSTNAME,
                                middle_name: this.patient.MIDDLENAME,
                                sex: this.patient.gender,
                                birthdate: date.formatDate(this.patient.birthdate, 'YYYY-MM-DD'),
                                birthplace: this.patient.BIRTHPLACE,
                                civil_status: this.patient.CIVILSTAT,
                                blood_type: this.patient.BLOODTYPE,
                                contact_number: this.patient.MOBILENO,
                                email: this.patient.email_add,
                                home_no: this.patient.HOUSENO,
                                street: this.patient.STREET,
                                address: this.patient.full_address,
                                payment_method: this.payment,
                                hmoco: this.hmoco,
                                classification: this.classification,
                                service_type: this.serviceType,
                                auxiliary: null,
                                schedule: this.selectedScheduleID,
                                complaint: this.complaint,
                                nationality: this.patient.NATIONALITY,
                                religion: this.patient.RELIGION,
                                registration_type: 'Walk In',
                                patient_id: this.patient.PATIENTID,
                            } 
                            
                            await api
                                .post('/api/v1/approved-list/', editPatientData)
                                .then(response => {
                                    Notify.create({
                                        message: 'Appointment approved.',
                                        type: 'positive',
                                        position: 'top'
                                    })

                                    const printFormData = {
                                        reference_no: response.data.reference_no,
                                        lastname: this.patient.LASTNAME,
                                        firstname: this.patient.FIRSTNAME,
                                        middlename: this.patient.MIDDLENAME,
                                        doctor_fullname: this.doctor.doctor_fullname,
                                        doctor_clinicno: this.doctor.CLINICNO,
                                        ip_address: this.printerIpAddress
                                    }

                                    api
                                        .post('/api/v1/print_network_walkin_registration/', printFormData)
                                        .then(response => {
                                        })
                                        .catch(error => {
                                            // console.log(error)
                                        })

                                    this.$router.push({name: 'ApprovedList'})
                                })
                                .catch(error => {
                                    // console.log(error)
                                })
                        } 
                    }

                } else if(this.options == "Ancillary") {

                    if(this.auxiliary == "") {
                        Notify.create({
                            message: 'No Ancillary selected.',
                            type: 'negative',
                            position: 'top'
                        })

                    } else {
                        const editPatientData = {
                            reference_no: this.referenceNo,
                            last_name: this.patient.LASTNAME,
                            first_name: this.patient.FIRSTNAME,
                            middle_name: this.patient.MIDDLENAME,
                            sex: this.patient.gender,
                            birthdate: date.formatDate(this.patient.birthdate, 'YYYY-MM-DD'),
                            birthplace: this.patient.BIRTHPLACE,
                            civil_status: this.patient.CIVILSTAT,
                            blood_type: this.patient.BLOODTYPE,
                            contact_number: this.patient.MOBILENO,
                            email: this.patient.email_add,
                            home_no: this.patient.HOUSENO,
                            street: this.patient.STREET,
                            address: this.patient.full_address,
                            payment_method: this.payment,
                            hmoco: this.hmoco,
                            classification: this.classification,
                            service_type: this.serviceType,
                            schedule: null,
                            auxiliary: this.auxiliary,
                            complaint: this.complaint,
                            nationality: this.patient.NATIONALITY,
                            religion: this.patient.RELIGION,
                            registration_type: 'Walk In',
                            patient_id: this.patient.PATIENTID,
                        }                       

                        await api
                            .post('/api/v1/approved-list/', editPatientData)
                            .then(response => {
                                Notify.create({
                                    message: 'Appointment approved.',
                                    type: 'positive',
                                    position: 'top'
                                })

                                const printFormData = {
                                    reference_no: response.data.reference_no,
                                    lastname: this.patient.LASTNAME,
                                    firstname: this.patient.FIRSTNAME,
                                    middlename: this.patient.MIDDLENAME,
                                    doctor_fullname: this.auxiliary,
                                    ip_address: this.printerIpAddress
                                }

                                api
                                    .post('/api/v1/print_network_walkin_registration/', printFormData)
                                    .then(response => {
                                        
                                    })
                                    .catch(error => {
                                        // console.log(error)
                                    })
                                        
                                this.$router.push({name: 'ApprovedList'})
                            })
                            .catch(error => {
                                // console.log(error)
                            })                      
                    }
                }
            } else if(this.lastName) {   
                if(this.options == "Doctor") {
                    if(this.doctor == ""){
                        Notify.create({
                            message: 'No doctor selected.',
                            type: 'negative',
                            position: 'top'
                        })
                    } else {   
                        
                        if (this.selectedScheduleID == "") {
                            Notify.create({
                                message: 'No doctor selected.',
                                type: 'negative',
                                position: 'top'
                            })
                        } else {
                            const formData = {
                                reference_no: this.referenceNo,
                                last_name: this.lastName,
                                first_name: this.firstName,
                                middle_name: this.middleName,
                                sex: this.sex,
                                birthdate: this.birthdate,
                                birthplace: this.birthplace,
                                civil_status: this.civilStatus,
                                blood_type: this.bloodType,
                                contact_number: this.contactNumber,
                                email: this.email,
                                home_no: this.homeNo,
                                street: this.street,
                                address: this.address.full_address,
                                payment_method: this.payment,
                                hmoco: this.hmoco,
                                classification: this.classification,
                                service_type: this.serviceType,
                                auxiliary: null,
                                schedule: this.selectedScheduleID,
                                patient_id: null,
                                complaint: this.complaint,
                                nationality: this.nationality,
                                religion: this.religion.Religion,
                                registration_type: 'Walk In'
                            } 

                            await api
                                .post('/api/v1/approved-list/', formData)
                                .then(response => {
                                    Notify.create({
                                        message: 'Appointment approved.',
                                        type: 'positive',
                                        position: 'top'
                                    })

                                    const printFormData = {
                                        reference_no: response.data.reference_no,
                                        lastname: this.lastName,
                                        firstname: this.firstName,
                                        middlename: this.middleName,
                                        doctor_fullname: this.doctor.doctor_fullname,
                                        doctor_clinicno: this.doctor.CLINICNO,
                                        ip_address: this.printerIpAddress
                                    }

                                    api
                                        .post('/api/v1/print_network_walkin_registration/', printFormData)
                                        .then(response => {
                                        
                                        })
                                        .catch(error => {
                                            // console.log(error)
                                        })

                                    this.$router.push({name: 'ApprovedList'})
                                })
                                .catch(error => {
                                    // console.log(error)
                                })   
                        }                         
                    }
                } else if(this.options == "Ancillary") {
                    if(this.auxiliary == ""){
                        Notify.create({
                            message: 'No Ancillary selected.',
                            type: 'negative',
                            position: 'top'
                        })
                    } else {
                        const formData = {
                            reference_no: this.referenceNo,
                            last_name: this.lastName,
                            first_name: this.firstName,
                            middle_name: this.middleName,
                            sex: this.sex,
                            birthdate: this.birthdate,
                            birthplace: this.birthplace,
                            civil_status: this.civilStatus,
                            blood_type: this.bloodType,
                            contact_number: this.contactNumber,
                            email: this.email,
                            home_no: this.homeNo,
                            street: this.street,
                            address: this.address.full_address,
                            payment_method: this.payment,
                            hmoco: this.hmoco,
                            classification: this.classification,
                            service_type: this.serviceType,
                            auxiliary: this.auxiliary,
                            schedule: null,
                            patient_id: null,
                            complaint: this.complaint,
                            nationality: this.nationality,
                            religion: this.religion.Religion,
                            registration_type: 'Walk In'
                        }                        

                        await api
                            .post('/api/v1/approved-list/', formData)
                            .then(response => {
                                Notify.create({
                                    message: 'Appointment approved.',
                                    type: 'positive',
                                    position: 'top'
                                })

                                const printFormData = {
                                    reference_no: response.data.reference_no,
                                    lastname: this.lastName,
                                    firstname: this.firstName,
                                    middlename: this.middleName,
                                    doctor_fullname: this.doctor.auxiliary,
                                    ip_address: this.printerIpAddress
                                }

                                api
                                    .post('/api/v1/print_network_walkin_registration/', printFormData)
                                    .then(response => {
                                      
                                    })
                                    .catch(error => {
                                        // console.log(error)
                                    })
                                    
                                this.$router.push({name: 'ApprovedList'})
                            })
                            .catch(error => {
                                console.log(error)
                            }) 
                    }
                }
            }        
        },       

        clearAll() {
            this.referenceNo = ''
            this.lastName = ''
            this.firstName = ''
            this.middleName = ''
            this.sex = ''
            this.birthdate = ''
            this.contactNumber = ''
            this.email = ''
            this.homeNo = ''
            this.street = ''
            this.address = ''
            this.complaint = ''
            this.nationality = ''
            this.religion = ''

            if (this.patient == null) {
                
            } else {
                if (this.patient.address == undefined){
                
                } else {
                   
                }          
            }            
            this.patient = null
        },
        patientIdCheckerFn(){
            try {
                this.patientIdChecker = this.patient.id
            } catch(err) {
                // console.log(err)
            }
        },        
        cancelSchedule(){
            this.selectedScheduleID = ''
        }
    }
}
</script>
