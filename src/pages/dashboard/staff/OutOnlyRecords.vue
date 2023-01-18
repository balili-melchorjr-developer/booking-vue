<template>
    <div class="q-px-lg">    
		<div class="row q-mt-xl">
			<h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center q-ma-none">Out Only Records</h4>
            <div class="col-md-3 q-mt-sm">
			</div>
				<!-- <PatientCountToday/> -->
		</div>
        <div class="row q-col-gutter-md q-mt-md">
            <div class="col-xs-12 col-sm-12 col-md-10">
                <p class="q-mb-sm">Search Patient</p>
                <q-select dense outlined v-model="patient"  @filter="onSearch" use-input :options="patientApi" option-value="patient" option-label="full_name" emit-value map-options label="Search patient..." />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-2 row justify-end q-pb-xs">
                <q-btn label="Get Records" @click="testMe" color="light-blue-7" class="self-end" />
            </div>
        </div>
       
		<div class="q-mt-lg">		            
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
                            <q-td key="patient_id" :props="props" class="text-weight-bold ">
                                <div class="text-subtitle2 text-center">
                                    {{ props.row.patient_id }}
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
                                        {{ props.row.home_no }} {{ props.row.street }}                         
                                    </div>
                                    <div class="text-left">
                                    <!-- {{ fullDate(props.row.schedule.days) }} -->
                                    </div>
                                    <div class="text-left text-caption">
                                        {{ props.row.address }} 
                                    </div>
                                </q-td>
                            <template v-if="props.row.medical_records_status == 'Pending'">               
                                <q-td key="status">
                                    <q-chip class="text-center" color="teal" text-color="white" size="md">
                                        {{ props.row.medical_records_status }}
                                    </q-chip>
                                </q-td>        
                            </template>
                            <template v-else-if="props.row.medical_records_status == 'Returned'">
                                <q-td key="status">
                                    <q-chip class="text-center" color="orange" text-color="white" size="md">
                                        {{ props.row.medical_records_status }}
                                    </q-chip>
                                </q-td>
                            </template>
                            <template v-else-if="props.row.medical_records_status == 'Catalog'">
                                <q-td key="status">
                                    <q-chip class="text-center" color="blue-grey" text-color="white" size="md">
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
                            <q-td key="remarks" :props="props">                  
                                <div class="text-subtitle2 text-center">
                                    {{ props.row.medical_records_status_remarks }}
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
                            <q-td key="actions" :props="props">
                                <q-btn @click="setOuTOnlyRecordsID(props)" label="Set status" flat dense no-caps />
                            </q-td>
                            <q-td key="actions" :props="props">
                                <q-btn @click="setRemoveDialog(props)" size="md" color="negative" flat label="Remove" />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>            
		</div>

        <q-dialog v-model="outOnlyRecordsDialog">
            <q-card style="width: 800px; max-width: 80vw;" class="">
                <q-card-section class="row items-center">                 
                    <div class="row">
                        <p class="q-ml-sm q-mt-md text-weight-medium text-subtitle1">Are you sure want to update this status?</p>
                        <div class="col-xs-12 col-sm-12 col-md-12 row q-pa-lg q-gutter-md">
                            <q-btn @click="setDoctorsReceived" class="bg-positive text-white" label="Doctor Received" />
                            <q-btn @click="setPending" class="bg-teal text-white" label="Pending" />
                            <q-btn @click="setReturned" class="bg-orange text-white" label="Returned" />
                            <template v-if="outOnlyRecordsStatus == 'Returned'">
                                <q-btn @click="setCatalogDialog" class="bg-blue-grey text-white" label="Catalog" />                                                        
                            </template>
                            <template v-else>
                                <q-btn @click="setCatalogDialog" disable class="bg-grey-5 text-grey" label="Catalog" />
                            </template>
                            <q-btn @click="setRemove" color="negative" flat label="Remove" />                       
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="outOnlyRecordsStatusRemarksDialog">
            <q-card style="width: 700px; max-width: 80vw;" class="">
                <q-card-section class="row items-center">                 
                    <div class="row">
                        <p class="q-ml-sm q-mt-md text-weight-medium text-subtitle1">Remarks</p>
                        <div class="col-xs-12 col-sm-12 col-md-12 row q-pa-lg q-gutter-md">             
                            <q-input v-model="medicalRecordsStatusRemarks" class="col-xs-12 col-sm-12 col-md-12" dense outlined color="light-blue-7"/>
                            <q-btn @click="setCatalog" class="bg-light-blue-7 text-white" label="Save" />  
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="outOnlyRecordsRemoveDialog">
            <q-card style="width: 400px; max-width: 40vw;" class="">
                <q-card-section class="row items-center">                 
                    <div class="row">
                        <p class="q-ml-sm q-mt-md text-weight-medium text-subtitle1">Are you want remove this item?</p>                 
                    </div>
                </q-card-section>
                <q-card-actions align="right" class="q-pa-md">
                    <q-btn flat label="Cancel" v-close-popup />  
                    <q-btn @click="setRemoveConfirm" class="bg-light-blue-7 text-white" label="Confirm" /> 
                </q-card-actions>
            </q-card>
        </q-dialog>
        
    </div>
</template>

<script>
import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'
import PatientCountToday from 'components/PatientCountToday.vue'

export default {
    name: 'OutOnlyRecords',
    data() {
        return {
			patient: '',
			patientApi: [],

			columns: [
                {
                    name: 'patient_id',
                    label: 'Patient ID',
                    field: ''
                },
                {                
                    name: 'full_name',
                    label: 'Full Name',
                    field: row => row.last_name + ' ' + row.first_name + ' ' + row.middle_name,
				},
                {
                    name: 'address',
                    label: 'Address',
                    field: ''
				},  
                {
                    name: 'status',
                    label: 'Status',
                    field: ''
                },             
                {                  
                    name: 'remarks',
                    label: 'Remarks',
                    field: ''
                },
                {
                    name: 'transaction_date',
                    label: 'Transaction Date',
                    field: '' 
                },
                {
                    name: 'actions',
                    label: 'Actions',
                    field: '',                    
                },
                {
                    name: 'remove',
                    label: '',
                    field: ''
                }              
            ],

            data: [],
            filter: '',

            patientList: [],
            
            outOnlyRecordsID: '',
            outOnlyRecordsDialog: false,
            outOnlyRecordsStatusRemarksDialog: false,
            outOnlyRecordsStatus: '',
            medicalRecordsStatusRemarks: '',
            
            outOnlyRecordsRemoveDialog: false

        }
    },

    mounted() {
        this.getPatientList()
    },

    components: {
        PatientCountToday
    },

    methods: {

        async getPatientList() {
            await api
                .get('/api/v1/out-only-records/')
                .then(response => {
                    this.data = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        dateMeridian: function(dt){
            return date.formatDate(dt, 'hh:mm A')
        },

        fullDate: function(dt){
          return date.formatDate(dt, 'MMMM DD, YYYY')
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
        
        async testMe() {
            const formData = {
                last_name: this.patient.LASTNAME,
                first_name: this.patient.FIRSTNAME,
                middle_name: this.patient.MIDDLENAME,
                birthdate: this.patient.dob,
                birthplace: this.patient.BIRTHPLACE,
                civil_status: this.patient.CIVILSTAT,
                blood_type: this.patient.BLOODTYPE,
                email: this.patient.email,
                sex: this.patient.gender,
                home_no: this.patient.HOUSENO,
                street: this.patient.STREET,
                address: this.patient.full_address,
                contact_number: this.patient.MOBILENO,
                patient_id: this.patient.PATIENTID,
                medical_records_status: 'Pending',
                medical_records_status_remarks: '',
                nationality: this.patient.NATIONALITY,
                religion: this.patient.RELIGION,         
            }

            await api
                .post('/api/v1/out-only-records/', formData)
                .then(response => {
                    window.location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        setOuTOnlyRecordsID(props) {
            this.outOnlyRecordsID = props.row.id
            this.outOnlyRecordsDialog = true
            this.outOnlyRecordsStatus = props.row.medical_records_status            
        },

        setDoctorsReceived() {  
            const formData = {
                medical_records_status: "Doctor Received",
                medical_records_status_remarks: ''
            }

            api
                .put(`/api/v1/out-only-records/${this.outOnlyRecordsID}/`, formData)
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
                medical_records_status_remarks: ''
            }

            api
                .put(`/api/v1/out-only-records/${this.outOnlyRecordsID}/`, formData)
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
                medical_records_status_remarks: ''              
            }

            api
                .put(`/api/v1/out-only-records/${this.outOnlyRecordsID}/`, formData)
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
            this.outOnlyRecordsStatusRemarksDialog = true
        },

        setCatalog() {
            const formData = {
                medical_records_status: "Catalog",
                medical_records_status_remarks: this.medicalRecordsStatusRemarks,
            }

            api
                .put(`/api/v1/out-only-records/${this.outOnlyRecordsID}/`, formData)
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

        setRemoveDialog(props) {
            this.outOnlyRecordsID = props.row.id
            this.outOnlyRecordsRemoveDialog = true
        },
        
        setRemoveConfirm() {
            api
                .delete(`/api/v1/out-only-records/${this.outOnlyRecordsID}/`)
                .then(response => {
                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        }
    }
}
</script>