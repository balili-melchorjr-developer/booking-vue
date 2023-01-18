<template>
    <div class="q-px-lg">    
		<div class="row q-mt-xl">
			<h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center q-ma-none">Patients</h4>
				<div class="col-md-3 q-mt-sm">
			</div>
				<!-- <PatientCountToday/> -->
		</div>
		<div class="q-mt-lg">
			<q-select dense outlined v-model="patient"  @filter="onSearch" use-input :options="patientApi" option-value="patient" option-label="full_name" emit-value map-options label="Search patient..." />
	
			<template v-if="patient">
				<q-card class="q-mt-lg q-pa-lg">   
					<q-card-section>
						<h5 class="text-h5 q-ma-none">{{ patient.full_name }}<q-chip color="accent" text-color="white">{{ patient.PATIENTID }}</q-chip></h5>
						<h6 class="text-h6 q-mt-none">{{ patient.gender }}, {{ patient.AGE_TRIM }}</h6>
						<h6 class="text-h6 q-ma-none q-mb-sm">Personal Information</h6>
						<div class="row q-col-gutter-md">
							<div class="col-xs-12 col-sm-12 col-md-4">
								<p class="q-mb-sm">Civil Status</p>
								<q-input dense v-model="patient.CIVILSTAT" disable class="" outlined></q-input>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-4">
								<p class="q-mb-sm">Nationality</p>
								<q-input dense v-model="patient.NATIONALITY" disable class="" outlined></q-input>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-4">
								<p class="q-mb-sm">Religion</p>
								<q-input dense v-model="patient.RELIGION" disable class="" outlined></q-input>
							</div>
						</div> 
						<div class="row q-col-gutter-md q-mt-md">
							<div class="col-xs-12 col-sm-12 col-md-3">
								<p class="q-mb-sm">Home No.</p>
								<q-input dense v-model="patient.HOUSENO" disable class="" outlined></q-input>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-3">
								<p class="q-mb-sm">Street</p>
								<q-input dense v-model="patient.STREET" disable class="" outlined></q-input>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6">
								<p class="q-mb-sm">Address</p>
								<q-input dense v-model="patient.full_address" disable class="" outlined></q-input>
							</div>
						</div>          
					</q-card-section>
				</q-card>
			</template>      
		</div>
    </div>
</template>

<script>
import { api } from 'boot/axios'
import { date } from 'quasar'
import PatientCountToday from 'components/PatientCountToday.vue'

export default {
    name: 'PatientList',
    data() {
        return {
			patient: '',
			patientApi: [],

			columns: [
                {                
                    name: 'full_name',
                    label: 'Full Name',
                    field: row => row.last_name + ' ' + row.first_name + ' ' + row.middle_name,
				},
                {
                    name: 'address',
                    label: 'Address',
                    field: row => row.address.zip_code + ' ' + row.address.district_town + ' ' + row.address.province + ' ' + row.address.country 
				},  
                {
                    name: 'birthdate',
                    label: 'Birthdate',
                    field: row => date.formatDate(row.birthdate, 'MMMM D, YYYY')
                },             
                {                  
                    name: 'contact_number',
                    label: 'Contact Number',
                    field: row => row.contact_number,
                    classes:['text-center']
                },
                {
                    name: 'email_address',
                    label: 'Email Address',
                    field: row => row.email_addresss,                    
                },              
            ],

            data: [],
            filter: '',

            patientList: [],
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
                .get('/api/v1/patient-list/')
                .then(response => {
                    this.data = response.data
                })
                .catch(error => {
                    // console.log(error)
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
    }
}
</script>