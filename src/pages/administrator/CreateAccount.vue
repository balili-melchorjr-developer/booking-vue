<template>
    <div class="q-pa-md">
        <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Create Account</h4>
        <div class="q-px-lg">
            <!-- <q-form autocapitalize="on" ref="staffAccountForm" class="q-gutter-md"> -->
            <q-form autocapitalize="on" ref="staffAccountForm" @submit.prevent="submitUserAccount" class="q-gutter-md">

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                    <q-select class="col-xs-12 col-sm-12 col-md-6" @update:model-value="roleIdCheckerFn" v-model="roles" dense use-input @filter="filterFnRoles" :options="roleSearch" option-value="id" option-label="descriptions" emit-value map-options  outlined color="light-blue-7" label="Roles" :rules="[ val => val && val > 0 || 'This field is required.']" />
                    <template v-if="roles == 1">
                        <q-select clearable label="Search Doctor.." class="q-mb-md col-xs-12 col-sm-12 col-md-6" dense v-model="doctor" @filter="filterFnDoctor" use-input :options="doctorSearch" option-value="id" option-label="doctor_fullname" emit-value map-options  outlined color="light-blue-7">
                            <template v-slot:option="scope">
                                <q-item v-bind="scope.itemProps">
                                    <q-item-section>
                                        <q-item-label>Dr. {{ scope.opt.LASTNAME }}, {{ scope.opt.FIRSTNAME }} {{ scope.opt.MIDDLENAME }}<span caption></span></q-item-label>
                                        <small class="text-grey-10">{{ scope.opt.SPECIALIZATION }}</small>
                                    </q-item-section>
                                </q-item>
                            </template>  
                        </q-select>
                    </template>                
                </div>

                <div class="row q-col-gutter-md q-mb-md">
                    <template v-if="doctor.doctor_id">
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.LASTNAME" dense outlined label="Last Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/> 
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.FIRSTNAME" dense outlined label="First Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.MIDDLENAME" dense outlined label="Middle Name" type="input" />
                    </template>
                    <template v-else>
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="lastName" dense outlined label="Last Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/> 
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="firstName" dense outlined label="First Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="middleName" dense outlined label="Middle Name" type="input" />
                    </template>   
                </div>

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                    <template v-if="doctor.doctor_id">
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.BIRTHDATE" dense outlined  type="date" color="light-blue-7" label="Birthdate" stack-label lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.PHONENO" dense  outlined  type="tel" color="light-blue-7" label="Contact Number" :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                        <q-select class="col-xs-12 col-sm-12 col-md-4" v-model="doctor.SEX" :options="sexOptions" dense outlined  color="light-blue-7" label="Sex" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                    </template>
                    <template v-else>
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="birthDate" dense outlined  type="date" color="light-blue-7" label="Birthdate" stack-label lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                        <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="contactNumber" dense  outlined  type="tel" color="light-blue-7" label="Contact Number" :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                        <q-select class="col-xs-12 col-sm-12 col-md-4" v-model="sex" :options="sexOptions" dense outlined  color="light-blue-7" label="Sex" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                    </template>
                </div>

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg ">
                    <template v-if="doctor.doctor_id">
                        <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="homeNo" dense outlined color="light-blue-7" label="Home no." />
                        <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="street" dense outlined color="light-blue-7" label="Street" /> 
                    </template>
                    <template v-else>
                        <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="homeNo" dense outlined color="light-blue-7" label="Home no." />
                        <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="street" dense outlined color="light-blue-7" label="Street" /> 
                    </template>                                      
                </div>

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                    <template v-if="doctor.doctor_id">
                        <q-select class="col-xs-12 col-sm-12 col-md-12" v-model="address" dense use-input @filter="filterFnAddress" :options="addressSearch" option-value="id" option-label="full_address" emit-value map-options  outlined color="light-blue-7" label="Address" :rules="[ val => val && val > 0 || 'This field is required.']" />
                    </template>
                    <template v-else>
                        <q-select class="col-xs-12 col-sm-12 col-md-12" v-model="address" dense use-input @filter="filterFnAddress" :options="addressSearch" option-value="id" option-label="full_address" emit-value map-options  outlined color="light-blue-7" label="Address" :rules="[ val => val && val > 0 || 'This field is required.']" />
                    </template>                
                </div>

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                    <q-input class="row col-xs-12 col-sm-12 " v-model="userName" label="Email Address" dense outlined  lazy-rules type="email" :rules="[ val => val && val.length > 0 || 'This field is required.', val => val != this.users.name || 'This email already exist!']"/>
                </div>
            
                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                    <q-input class="row col-xs-12 col-sm-12" v-model="password1" label="Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length >= 8 || 'Password should be at least 8 characters' ]"></q-input>
                </div>

                <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                    <q-input class="row col-xs-12 col-sm-12 " v-model="password2" label="Repeat Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[val => val === password1 || 'Password not matched']">
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>
                </div>

                <div class="q-gutter-md" align="right">
                    <q-btn label="Submit" type="submit" color="light-blue-7"/>
                    <q-btn label="Reset" @click="resetForm()" color="light-blue-7"/>
                </div>
        
            </q-form>

        </div>        
    </div>
</template>
<script>

import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
     name: 'CreateAccount',
     data() {
        return {  
            sexOptions: ['Male', 'Female'],

            addressSearch: [],
            addressApi: [],

            doctorSearch: [],
            doctorApi: [],

            roleSearch: [],
            rolesApi: [],

            userName: '',
            lastName: '',
            firstName: '',
            middleName: '',
            sex: '',
            birthDate: '',
            homeNo: '',
            street: '',
            address: '',
            contactNumber: '',
            password1: '',
            password2: '',
            isPwd: true,
            roles: '',

            doctor: '',
        }
    },

    async mounted() {
        this.getAddress()
        this.getDoctor()
        this.getRoles()
    },

     methods: {
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

        async getDoctor() {
            await api
                .get('/api/v1/onef_doctor/')
                .then(response => {
                    this.doctorApi = response.data 
                    console.log(response.data[0])
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

        async getRoles() {
            await api
                .get('/api/v1/roles-list/')
                .then(response => {
                    this.rolesApi = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        filterFnRoles(val, update, abort) {
            if (val.length < 3) {
                abort()
            }
            update(() => {
                const needle = val.toLowerCase()
                this.roleSearch = this.rolesApi.filter(v => v.descriptions.toLowerCase().indexOf(needle) > -1)
            })
        },      

        resetForm() {
            this.userName = ""
            this.lastName = ""
            this.firstName = ""
            this.middleName = ""
            this.sex = ""
            this.birthDate = ""
            this.homeNo = ""
            this.street = ""
            this.address = ""
            this.contactNumber = ""
            this.password1 = ""
            this.password2 = ""
        },

        roleIdCheckerFn() {
            this.doctor = ""
        },      

        async submitUserAccount() { 
            const formData = {
                email: this.userName,
                password: this.password1,
                re_password: this.password2,
                last_name: this.lastName,
                first_name: this.firstName,
                middle_name: this.middleName,
                sex: this.sex,
                birthdate: this.birthDate,
                home_no: this.homeNo,
                street: this.street,
                address: this.address,
                contact_number: this.contactNumber,
                roles: this.roles,
                doctor_id: this.doctor.doctor_id
            }

            await api
                .get('/ap1/v1/users/', formData)
                .then(response => {
                    Notify.create({
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Account has been created!',
                        position: 'top'
                    })
                })
                .catch(error => {
                    // console.log(error)
                })
        },
     }    
}
</script>