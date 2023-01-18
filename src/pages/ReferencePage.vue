<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 row">
            <div class="q-px-xl row justify-center">
                <h4 class="text-light-blue-7 q-mb-md text-weight-medium col-xs-12 col-sm-12 col-md-12 text-center">Reference No.</h4>       
                <p id="reference_no_qr_code" class="text-center col-md-12 row justify-center"></p>
                <p id="reference_no" class="text-weight-medium text-h4 text-center text-light-blue-7 col-xs-12 col-sm-12 col-md-12" size="30px" >{{ this.referenceNo }}</p>
                <p class="text-center col-xs-12 col-sm-12 col-md-12">Take a screenshot</p>     
                <p class="q-mt-md col-xs-12 col-sm-12 col-md-12 text-justify row justify-center">*Present this QR Code or Reference number <br> to OPD Staff Nurse on duty.</p>                    
            </div>         
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6" style="border-left: 1px solid rgba(0, 137, 255, .5)">    
            <div class="q-px-xl">
                <h4 class="text-light-blue-7 text-weight-medium" >Your Information</h4>
                <div class="row col-xs-12 col-sm-12 q-gutter-md q-mb-lg">
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Last Name</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.lastName }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
						<p class="text-h6 text-weight-light">First Name</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.firstName }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Middle Name</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.middleName }}</p>
                    </div>                    
                </div>
                <div class="row col-xs-12 col-sm-12 q-gutter-md q-mb-lg">
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Birthdate</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.birthdate }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Contact Number</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.contactNumber }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Sex</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.sex }}</p>
                    </div>                    
                </div>
                <div class="row col-xs-12 col-sm-12">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      	<p class="text-h6 text-weight-light">Birth Place</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.birthplace }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      	<p class="text-h6 text-weight-light">Civil Status</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.civilStatus }}</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      	<p class="text-h6 text-weight-light">Blood Type</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.bloodType }}</p>
                    </div>
                </div>
                <div class="row col-xs-12 col-sm-12 q-gutter-md q-mb-lg ">
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Home No.</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.homeNo }}</p>
                    </div>  
                    <div class="col-xs-12 col-sm-12 col-md-4" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Street</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.street}}</p>
                    </div>                      
                </div>
                <div class="row col-sm-12 q-gutter-sm q-mb-sm row">
                    <div class="col-xs-12 col-sm-12 col-md-12" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Address</p>
                      	<p class="text-h5 text-capitalize text-light-blue-7">{{ this.address }}</p>
                    </div> 
                </div>
                <div class="row col-sm-12 q-gutter-sm q-mb-sm row">
                    <div class="col-xs-12 col-sm-12 col-md-12" color="light-blue-7">
                      	<p class="text-h6 text-weight-light">Email</p>
                      	<p class="text-h5  text-light-blue-7">{{ this.email }}</p>
                    </div> 
                </div>
            </div>
		</div>            
	</div>

	<q-dialog v-model="alertSample">
		<q-card >
			<!-- <q-card-section>
			<h5 class="text-h5 text-center q-ma-none q-mt-md">Thank you for choosing Adventist Medical Center Manila.</h5>
			</q-card-section> -->

			<q-card-section class="q-pt-none">
				<h6 class="text-h6 text-center q-mb-sm text-weight-light">Kindly wait for our receptionist to confirm your appointment.</h6> 
			</q-card-section>

			<q-card-actions align="center" class="q-mb-md">
				<q-btn label="OK" color="light-blue-7" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
        
</template>
<script>

import { ref } from 'vue'
import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
  	name: 'ReferencePage.vue',

  	data () {    
    	return {
      		lastName: '',
			firstName: '',
			middleName: '',
			birthdate: '',
			birthplace: '',
			civilStatus: '',
			bloodType: '',
			contactNumber: '',
			sex: '',
			homeNo: '',
			street: '',
			address: '',
			email: '',
			referenceNo: '', 
			
			alertSample: true
   	 	}    
  	},

	async mounted(){

		await this.getSessionData()

		let qrcode = new QRCode("reference_no_qr_code",{
			colorDark: "#03a9f4"
		})

		function makeCode () {
			var elText = document.getElementById("reference_no")
			qrcode.makeCode(elText.innerHTML)
		}

		makeCode();
	},

	methods: {
		getSessionData() {
			const birthDateSessionStorage = sessionStorage.getItem('birthdate')
			const birthDateFormat = date.formatDate(birthDateSessionStorage, 'MMMM D, YYYY')

			this.lastName = sessionStorage.getItem('last_name')
			this.firstName = sessionStorage.getItem('first_name')
			this.middleName = sessionStorage.getItem('middle_name')
			this.birthdate = birthDateFormat
			this.birthplace = sessionStorage.getItem('birthplace')
			this.civilStatus = sessionStorage.getItem('civil_status')
			this.bloodType = sessionStorage.getItem('blood_type')
			this.contactNumber = sessionStorage.getItem('contact_number')
			this.sex = sessionStorage.getItem('sex')
			this.homeNo = sessionStorage.getItem('home_no')
			this.street = sessionStorage.getItem('street')
			this.address = sessionStorage.getItem('address')
			this.email = sessionStorage.getItem('email')
			this.referenceNo = sessionStorage.getItem('reference_no')
		},
	}
}
</script>