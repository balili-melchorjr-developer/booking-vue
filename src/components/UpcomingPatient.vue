<template>
    <q-list separator>
        <!-- <q-item class="upcoming-patient" v-for="(patient, index) in medicalRecords" :key="patient.id" :active="index === 0" active-class="text-white bg-teal-14" @click="setPatient(patient)"  clickable v-ripple> -->
        <q-item class="upcoming-patient" v-for="patient in medicalRecords" :key="patient.id">
            <q-item-section class="q-pa-sm">
            	<p class="q-mb-xs q-mt-md text-medium">Reference No.</p>    
            	<h6 class="text-weight-bold text-h6 q-ma-none text-deep-purple-13">{{ patient.reference_no }}</h6>
        
            	<div class="q-my-md">
                	<p class="q-ma-none">Patient Name</p>
                	<q-item-label class="text-weight-medium text-subtitle1 q-mt-xs">{{ patient.last_name }}, {{ patient.first_name }} {{ patient.middle_name }}</q-item-label>                 
            	</div>

            	<div>
              		<p class="q-mb-xs">Medical Records Status </p>              
					<template v-if="patient.medical_records_status == 'Pending'">
						<q-chip :class="(patient.medical_records_status == 'Pending')?'bg-teal text-white':''" size="md">
							{{ patient.medical_records_status }} 
						</q-chip>                  
						</template>
					<template v-else-if="patient.medical_records_status == 'Returned'">
						<q-chip :class="(patient.medical_records_status == 'Returned')?'bg-orange text-white':''" size="md">
							{{ patient.medical_records_status }}
						</q-chip>
					</template>
					<template v-else-if="patient.medical_records_status == 'Catalog'">
						<q-chip :class="(patient.medical_records_status == 'Catalog')?'bg-blue-grey text-white':''" size="md">
							{{ patient.medical_records_status }}
						</q-chip>
					</template>
					<template v-else>
						<q-chip :class="(patient.medical_records_status == 'Doctor Received')?'bg-blue text-white':''" size="md">
							{{ patient.medical_records_status }}
						</q-chip>
					</template>                            
            	</div>
            </q-item-section>            
        </q-item>         
    </q-list>
</template>

<script>
import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
	name: 'UpcomingPatient',
	data() {
			return {
			medicalRecords: [],
			active: true,
			timer: ""
		}

  	},

	mounted () {
		this.MedicalRecords() 
	},

  	created() {
		this.MedicalRecords()
		this.timer = setInterval(this.MedicalRecords, 5000)
	},

  	methods: {

		birthdateFormat: function(dt) {
			return date.formatDate(dt, 'MMMM DD, YYYY')
		},

		async MedicalRecords() {
			await api
				.get('/api/v1/medical-records/')
				.then(response => {
					this.medicalRecords = response.data
				})
				.catch(error => {
					// console.log(error)
				})
		},

		setPatient(patient) {
			window.location.reload();
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


     