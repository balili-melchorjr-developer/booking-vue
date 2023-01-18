<template>
    <div class="row q-col-gutter-xl">
        <div class="col-xs-12 col-sm-12 col-md-6 row justify-center xs-hide sm-hide login-background">
            <div class="q-mt-xl appointment-container-left-side" style="margin-top: 25%">                
                <img class="appointment-title-img" src="~assets/onefocus_queuing.png" alt="" />               
            </div>         
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-py-xl" style="margin-top: 5%">
            <q-form @submit="onSubmit" class="q-col-gutter-md">
            <div class="q-px-lg">
                <h3 class="text-cyan-8 text-weight-medium text-h4" >Make an Appointment</h3>
                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg">
                    <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="lastName" outlined color="cyan-8" label="Last Name" />
                    <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="firstName" outlined color="cyan-8" label="First Name" />
                    <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="middleName" outlined color="cyan-8" label="Middle Name" />
                </div>
                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg ">
                    <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="birthdate" type="date" outlined color="cyan-8" label="Birthdate" stack-label />
                    <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="contactNumber" type="number" outlined color="cyan-8" label="Contact Number" />
                    <q-select class="col-xs-12 col-sm-12 col-md-4" v-model="sex" :options="sexOptions" outlined color="cyan-8" label="Sex" />                    
                </div>
                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg">
                    <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="birthplace" outlined color="cyan-8" label="Birth Place" />
                    <q-select class="col-xs-12 col-sm-12 col-md-3" v-model="civilStatus" :options="civilStatusOptions" outlined color="cyan-8" label="Civil Status" /> 
                    <q-select class="col-xs-12 col-sm-12 col-md-3" v-model="bloodType" :options="bloodTypeOptions" outlined color="cyan-8" label="Blood Type" /> 
                </div>
                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg ">
                    <q-input class="col-xs-12 col-sm-12 col-md-3" v-model="homeNo" outlined color="cyan-8" label="Home no." />
                    <q-input class="col-xs-12 col-sm-12 col-md-3" v-model="street" outlined color="cyan-8" label="Street" />
                    <q-select class="col-xs-12 col-sm-12 col-md-6" v-model="address" @filter="filterFnAddress" use-input :options="addressOptions" option-value="full_address" option-label="full_address" emit-value map-options  outlined color="cyan-8" label="Address" />
                </div>
                <div class="row col-sm-12 q-col-gutter-sm q-mb-sm">
                    <q-input class="col-xs-12 col-sm-12 col-md-12" v-model="email" outlined color="cyan-8" label="Email" />
                </div>
            </div>

            <div class="q-px-xl text-grey-8">
                    <p class="text-italic text-caption">
                        I agree that the information provided in this document is true and correct to the best of my knowledge and understand
                        that any dishonest answers may have serious legal and public health implications as stated under RA 11332.
                    </p>
                    <p class="text-italic text-caption">I declare that the information disclosed above is TRUE and CORRECT.</p>
                    <p class="text-italic text-caption">The data you provide is strictly confidential and used for hospital reference only.</p>
                </div>
                
                <div class="row q-my-xl q-px-lg justify-end">
                    <q-btn type="submit" class="col-xs-12 col-sm-6 col-md-4" rounded ripple color="cyan-8" padding="16px" label="Make an appointment" />
                </div>             
            </q-form>
        </div>          
    </div>
</template>
<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
    name: 'PatientAppointment.vue',
    data () {    
        return {  
            lastName: '',
            firstName: '',
            middleName: '',
            birthdate: '',
            birthplace: '',
            civilStatus: 'Single',
            bloodType: 'N/A',
            contactNumber: '',
            sex: '',
            homeNo: '',
            street: '',
            address: '',
            email: '',    

            sexOptions: ['Male', 'Female'],
            civilStatusOptions: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
            bloodTypeOptions: ['A', 'AB', 'B', 'O', 'N/A'],

            addressOptions: [],
            addressApi: [],
        }    
    },

    async mounted() {
        await this.getAddress()
    },

    methods : {
        filterFnAddress(val, update, abort) {
            if (val.length < 3){
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.addressOptions = this.addressApi.filter(v => v.full_address.toLowerCase().indexOf(needle) > -1)
            })
        },

        async getAddress(){
            await api
                .get('/api/v1/onef_address/')
                .then(response => {
                    this.addressApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        
        async onSubmit() {
            let patientData = {
                last_name: this.lastName,
                first_name: this.firstName,
                middle_name: this.middleName,
                birthdate: this.birthdate,
                birthplace: this.birthplace,
                civil_status: this.civilStatus,
                blood_type: this.bloodType,
                contact_number: this.contactNumber,
                sex: this.sex,
                home_no: this.homeNo,
                street: this.street,
                address: this.address,
                email: this.email,
            } 
            
            await api
                .post('/api/v1/online-appointment/', patientData)
                .then(response => {            

                api
                    .get(`/api/v1/online-appointment/${response.data.id}/`)
                    .then(response => { 
                        sessionStorage.setItem('last_name', response.data.last_name) 
                        sessionStorage.setItem('first_name', response.data.first_name) 
                        sessionStorage.setItem('middle_name', response.data.middle_name) 
                        sessionStorage.setItem('birthdate', response.data.birthdate)
                        sessionStorage.setItem('birthplace', response.data.birthplace)
                        sessionStorage.setItem('civil_status', response.data.civil_status)
                        sessionStorage.setItem('blood_type', response.data.blood_type)
                        sessionStorage.setItem('sex', response.data.sex) 
                        sessionStorage.setItem('contact_number', response.data.contact_number) 
                        sessionStorage.setItem('home_no', response.data.home_no) 
                        sessionStorage.setItem('street', response.data.street) 
                        sessionStorage.setItem('address', response.data.address) 
                        sessionStorage.setItem('email', response.data.email)
                        sessionStorage.setItem('reference_no', response.data.reference_no)

                        Notify.create({
                            message: 'Thank you for choosing Adventist Medical Center Manila.',
                            type: 'positive',
                            position: 'top'
                            })
                            
                        this.statusDone = true  
                        
                        this.$router.push({name: 'ReferencePage'})
                })
            })                
            
                .catch(error => {
                    Notify.create({
                        message: 'Please fill up the form correctly',
                        type: 'negative',
                        position: 'top'
                    }) 
                })
        },
    }
}
</script>