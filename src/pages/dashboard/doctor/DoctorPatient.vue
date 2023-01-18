<template>
	<div>
		<div class="q-px-lg">
			<div class="row justify-end q-mt-xl">
				<div class="col-xs-12 col-sm-12 col-md-9">
					<h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Approved Patient</h4>
				</div>
					
				<div class="col-xs-12 col-sm-12 col-md-3 q-pl-md">
					<!-- <q-card class="my-card bg-deep-purple-13 text-white">
						<q-card-section>
							<div class="text-h6 text-right">Patient today</div>
							<div class="text-h5 text-weight-medium text-right">{{ patientCountToday }}</div>
						</q-card-section>
					</q-card> -->
				</div>
			</div>     
		</div>

		<div class="q-pa-md">
			<q-table
				:rows="patient"
				:columns="columns"
				row-key="referenceNo"
				bordered
				flat
				:filter="filter"
				@row-click="onRowClick"  
			>

				<template v-slot:top-right >
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

				<template v-slot:body-cell-referenceNo="props">            
					<q-td  :props="props">
						<div class="text-deep-purple-13 text-weight-bold text-subtitle2 text-center q-my-md">                  
							{{ props.value }}     
						</div>
					</q-td>
				</template>

				<template v-slot:body-cell-full_name="props">
					<q-td :props="props">   
						<template v-if="props.row.patient_id == null">                    
							<div class="text-left text-subtitle2">{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }} 
								<q-chip size="sm" color="positive" text-color="white">
									New Patient
								</q-chip>
							</div>
							<div class="text-left">{{ props.row.sex }}</div>   
						</template>
						<template v-else>
							<div class="text-left text-subtitle2" >
								{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }} 
								<q-chip size="sm" color="accent" text-color="white">
									{{ props.row.patient_id }}
								</q-chip> 
							</div>                   
							<div class="text-left">{{ props.row.sex }}</div>                                   
						</template>                   
					</q-td>
				</template> 
				<template v-slot:body-cell-address="props">
					<q-td :props="props">
						<div class="text-left text-subtitle2">
							{{ props.row.home}} {{ props.row.street}}
						</div>
						<div class="text-left">
							{{ props.row.address }}
						</div>
					</q-td>
				</template>        

				<template v-slot:body-cell-contact_number="props">
					<q-td :props="props">
						<template v-if="props.row.patient_id == null">
							<div class="text-center q-my-md">                  
								{{ props.row.contact_number }}
							</div>
						</template>
						<template v-else>
							<div class="text-center">
								{{ props.row.patient_id.contact_number }}
							</div>                    
						</template>               
					</q-td>
				</template>

				<template v-slot:body-cell-email="props">
					<q-td :props="props">
						<div class="text-left">
							{{ props.row.email }}
						</div>                 
					</q-td>
				</template>                 
			</q-table>
		</div>

		<q-dialog v-model="patientDialog" full-width>
			<q-card class="q-pa-lg">
				<q-card-section>              
					<div class="text-h6">                      
						{{ patientData.last_name }}, {{ patientData.first_name }} {{ patientData.middle_name }} 
						<template v-if="patientData.patient_id == null">
							<q-chip size="md" color="positive" text-color="white">New Patient</q-chip>
						</template>
						<template v-else>
							<q-chip size="md" color="accent" text-color="white">
								{{ patientData.patient_id }}
							</q-chip>
						</template>
					</div>
					<p class="text-subtitle1">{{ patientData.sex }}, {{ patientData.calculate_age }}</p> 
				</q-card-section>

				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-6">
						<q-card-section class="q-pt-none">
							<div>
								<p class="text-subtitle1 text-weight-bold text-blue-grey-10">Diagnosis</p>
								<q-input type="textarea" outlined v-model="patientDiagnosis"/>
							</div>
							<div>
								<p class="text-subtitle1 text-weight-bold text-blue-grey-10">SOAP</p>
								<q-input type="textarea" outlined v-model="patientSoap"/>
							</div>
							<div>
								<p class="text-subtitle1 text-weight-bold text-blue-grey-10">Complaint</p>
								<q-input type="textarea" outlined disable v-model="patientData.complaint"/>
							</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<div class="row q-col-gutter-md">                            
								<div class="row col-xs-12 col-sm-12 col-md-6 q-col-gutter-md">
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs"> Temperature</p>
										<q-input disable suffix="c�" v-model="patientData.temperature" dense outlined color="light-blue-7"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs">Weight</p>
										<q-input disable suffix="kg" v-model="patientData.weight" dense outlined color="light-blue-7"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs">Height</p>
										<q-input disable suffix="cm" v-model="patientData.height" dense outlined color="light-blue-7"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs">Blood Pressure</p>
										<q-input disable v-model="patientData.blood_pressure" dense outlined color="light-blue-7"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs">Pulse Rate</p>
									<q-input disable v-model="patientData.pulse_rate" dense outlined color="light-blue-7"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-4">
										<p class="text-subtitle1 q-mb-xs">SP02</p>
										<q-input disable v-model="patientData.sp02" dense outlined color="light-blue-7"/>
									</div>
								</div>
								<!-- Classification Section -->
								<div class="col-xs-12 col-sm-12 col-md-6 ">
									<div class="">
										<template v-if="patientData.payment_method == 'HMO'">
											<p class="text-subtitle1 q-mb-xs">HMO Company</p>
											<q-input disable v-model="patientData.hmoco" dense outlined color="light-blue-7"/>
										</template>
										<template>
											<p class="text-subtitle1 q-mb-xs">Payment Method</p>
											<q-input disable v-model="patientData.payment_method" dense outlined color="light-blue-7"/>
										</template>                                    
									</div>
									<div class="q-mb-xl">
										<p class="text-subtitle1 q-mb-xs">Classification</p>
										<q-input disable v-model="patientData.classification" dense outlined color="light-blue-7"/>
									</div>
									<div class="q-mb-md">
										<p class="ttext-subtitle1 q-mb-xs">Service Type</p>
										<q-input disable v-model="patientData.service_type" dense outlined color="light-blue-7"/>
									</div>
								</div>
							</div>												
						</q-card-section>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<q-card-section class="q-pt-none">
							<p class="text-subtitle1 text-weight-bold text-blue-grey-10">Patient History</p>
							<div>
								<q-table
								:rows="patientCaseData"
								:columns="patientCaseColumns"
								row-key="case_id"
								bordered
								flat
								:filter="filter"
								>

								<template v-slot:top-right >
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

								<template v-slot:body-cell-case_id="props">            
									<q-td :props="props">
										<div class="text-deep-purple-13 text-weight-bold text-subtitle2 text-center q-my-md">                  
											{{ props.row.caseid }}     
										</div>
									</q-td>
								</template> 

								<template v-slot:body-cell-date_visit="props">
									<q-td :props="props">
										<div class="text-left text-subtitle2">
											{{ props.row.date_visit }}
										</div>
									</q-td>
								</template>        

								<template v-slot:body-cell-type="props">
									<q-td :props="props">
										<div class="text-left">
											{{ props.row.type }}
										</div>     
									</q-td>
								</template>

								<template v-slot:body-cell-case_type="props">
									<q-td :props="props">
										<div class="text-left">
											{{ props.row.case_type }}
										</div>                 
									</q-td>
								</template> 

								<template v-slot:body-cell-physician="props">
									<q-td :props="props">
										<div class="text-left">
											{{ props.row.Physician }}
										</div>                 
									</q-td>
								</template> 

								<template v-slot:body-cell-remark="props">
									<q-td :props="props">
										<div class="text-left">
											{{ props.row.Remark }}
										</div>                 
									</q-td>
								</template> 

								<template v-slot:body-cell-checkout="props">
									<q-td :props="props">
										<div class="text-left">
											{{ props.row.checkout }}
										</div>                 
									</q-td>
								</template>                            
								
								</q-table>
							</div>
						</q-card-section>
					</div>                  
				</div>              

				<q-card-actions align="right">
					<div class="row q-gutter-lg">
						<q-btn flat label="Cancel" color="grey-8" v-close-popup />
						<q-btn label="Save" @click="endConsultation" color="light-blue-7" />
						<!-- <q-btn label="Test" @click="test" color="negative" /> -->
					</div>				
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
    name: 'DoctorPatient',
    data() {
        return {         
			patientDialog: false,

          	filter: '', 
          	patient: [],
          	columns: [
				{
					name: 'referenceNo',
					label: 'Reference No.',
					field: row => row.reference_no
				},
				{
					name: 'full_name',
					label: 'Full Name',
					field: row => row.patient_id == null ? row.last_name + ', ' + row.first_name + ' ' + row.middle_name : row.patient_id.last_name + ', ' + row.patient_id.first_name + ' ' + row.patient_id.middle_name
				},
				{
					name: 'address',
					label: 'Address',
					field: ''
				},
				{
					name: 'contact_number',
					label: 'Contact Number',
					field: row => row.patient_id == null ? row.contact_number : row.patient_id.contact_number,
					classes:['text-center']
				},
				{
					name: 'email',
					label: 'Email',
					field: ''
				},            
          	],          
          
			patientCaseData: [],
			patientCaseColumns: [
				{
					name: 'case_id',
					label: 'Case ID',
					field: '',
				},
				{
					name: 'date_visit',
					label: 'Date Visit',
					field: ''
				},
				{
					name: 'type',
					label: 'Type',
					field: ''
				},
				{
					name: 'case_type',
					label: 'Case Type',
					field: ''
				},
				{
					name: 'physician',
					label: 'Physician',
					field: ''
				},
				{
					name: 'remark',
					label: 'Remark',
					field: ''
				},
				{
					name: 'checkout',
					label: 'Checkout',
					field: ''
				}
          	],
          

          	onefDoctor: [],

			patientStatus:'',

			referenceNo: '',
			lastName: '',
			firstName: '',
			middleName: '',
			sex: '',
			birthdate: '',
			contactNumber: '',
			email: '',
			homeNo: '',
			street: '',
			address: '',
			addressId: '' ,
			weight: '',
			height: '',
			temperature: '',
			bloodPressure: '',
			pulseRate: '',
			sp02: '',
			paymentMethod: '',

			doctorApi: [],
			doctorSearch: [],
			doctor: '',
			complaint: '',

			patientData: [],

			patientCountToday: '',

			patientDiagnosis: '',
			patientSoap: '',

			dataID : '',
        }
    },

    async mounted() {
        await this.getOnefDoctor()
        await this.getPatientList()
    },

    methods: {

        dateAM: function(dt) {
			return date.formatDate(dt, 'hh:mm A')
        },

        dateWhole: function(dt){
			return date.formatDate(dt, 'MMMM DD, YYYY')
        },

        birthdateFormat: function(dt) {
			return date.formatDate(dt, 'MMMM DD, YYYY')
        },

        async getPatientList() {
			await api
            	.get('/api/v1/doctor-patient/')
				.then(response => {
					this.patient = response.data
					this.patientCountToday = response.data[0].patient_approved_count_today_by_doctor
					let onefDoctorData = this.onefDoctor

                	this.patient.map(x => {

						let doctor_fullname = onefDoctorData.filter(item => {                    
							try{
								return item.doctor_id == x.schedule.doctor 
							} catch(error){}                                  
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

        onRowClick(evt, row){

			this.dataID = row.id
			this.patientDialog = true
          
			api
				.get(`/api/v1/get-doctor-patient-selection/${this.dataID}/`)
				.then(response => {
					this.patientData = response.data[0]

					if(response.data[0].patient_id) {
						api
							.get(`/api/v1/onef_previous_admission/${response.data[0].patient_id}/`)
							.then(response => {
								this.patientCaseData = response.data
							})
							.catch(error => {
								// console.log(error)
							})
					} else {
						this.patientCaseData = []
					}                 
				})
				.catch(error => {
					// console.log(error)
				})  
        },

        endConsultation(){  
          
          	if(this.patientData.payment_method == 'HMO'){

              	let formData = {              
					patient_id: 0,
					last_name: this.patientData.last_name,
					first_name: this.patientData.first_name,
					middle_name: this.patientData.middle_name,
					birthdate: this.patientData.birthdate,
					sex: this.patientData.sex,
					blood_type: this.patientData.blood_type,
					status: this.patientData.civil_status,
					citizenship: this.patientData.nationality,
					religion: this.patientData.religion,
					mobile_no: this.patientData.contact_number,
					house_no: this.patientData.home_no,
					street: this.patientData.street,
					address: this.patientData.address,
					birthplace: this.patientData.birthplace,
					email: this.patientData.email,
					doctor_id: this.patientData.schedule.doctor,
					classification: this.patientData.classification,
					service_type: this.patientData.service_type,
					diagnosis: this.patientDiagnosis,
					soap: this.patientSoap,
					is_hmo: true,
					hmoco: this.patientData.hmoco,
					hmoco_card: '',
					hmo_exp: '',
					payment_method: 'CASH',
					account_user: 'mabalili'                
				}         
            
              	api
                  	.post('/api/v1/save_patient_to_onef/', formData)
                  	.then(response => {
						Notify.create({
                     		message: 'Appointment done.',
                      		type: 'positive',
                      		position: 'top'
                    	})
                    
                    	const updateFormData = {
                      		done_status: true,
						}

                    	api
                      		.put(`/api/v1/update-doctor-patient-appointment-done/${this.dataID}/`, updateFormData)
                      		.then(response => {                          		
								location.reload()
                      		})
                      		.catch(error => {
                          		// console.log(error)
                     		 })
                  	})
                  	.catch(error => {
                    //   console.log(error)
                  	})             

          	} else {

            	let formData = {              
					patient_id: 0,
					last_name: this.patientData.last_name,
					first_name: this.patientData.first_name,
					middle_name: this.patientData.middle_name,
					birthdate: this.patientData.birthdate,
					sex: this.patientData.sex,
					blood_type: this.patientData.blood_type,
					status: this.patientData.civil_status,
					citizenship: this.patientData.nationality,
					religion: this.patientData.religion,
					mobile_no: this.patientData.contact_number,
					house_no: this.patientData.home_no,
					street: this.patientData.street,
					address: this.patientData.address,
					birthplace: this.patientData.birthplace,
					email: this.patientData.email,
					doctor_id: this.patientData.schedule.doctor,
					classification: this.patientData.classification,
					service_type: this.patientData.service_type,
					diagnosis: this.patientDiagnosis,
					soap: this.patientSoap,
					is_hmo: false,
					hmoco: '',
					hmoco_card: '',
					hmo_exp: '',
					payment_method: 'CASH',
					account_user: 'mabalili'                  
				}

                api
					.post('/api/v1/save_patient_to_onef/', formData)
                  	.then(response => {
						Notify.create({
                      		message: 'Appointment done.',
                      		type: 'positive',
							position: 'top'
                    	})

						const updateFormData = {
							done_status: true,
						}

                    	api
							.put(`/api/v1/update-doctor-patient-appointment-done/${this.dataID}/`, updateFormData)
                      		.then(response => {
                          		location.reload()
                     		 })
                      		.catch(error => {
                      		    // console.log(error)
							})
                  	})
                  	.catch(error => {
						// console.log(error)
                	})
			}

		},

        async test() {          

			let formData = {              
                last_name: this.patientData.last_name,
                birthdate: this.patientData.birthdate,
                address: this.patientData.address              
			}         
              
			api
				.post('/api/v1/sample_insert_onef/', formData)
				.then(response => {
					
				})
				.catch(error => {
					// console.log(error)
				})
        },
    }
}
</script>