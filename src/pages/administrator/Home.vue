<template>
    <div class="text-h4 q-pa-md" >
        <div class="row gutter-sm q-mt-xl">
            <div class="col-md-2 offset-md-6 q-pl-md">
                <q-card class="my-card bg-deep-purple-13 text-white">
                    <q-card-section>
                        <h6 class="text-h6 text-right q-ma-none">Staffs</h6>
                        <p class="text-subtitle2 text-right q-ma-none">staff_count</p>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-2 q-pl-md">
                <q-card class="my-card bg-deep-purple-13 text-white">
                    <q-card-section>
                        <h6 class="text-h6 text-right q-ma-none">Doctors</h6>
                        <p class="text-subtitle2 text-right q-ma-none">doctor_count</p>
                    </q-card-section>
                </q-card>
            </div>          
        </div>
        <div class="row q-mt-lg">
            <q-card flat class="q-pa-lg col-md-12">
                <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="light-blue-7"
                indicator-color="light-blue-7"
                align="justify"
                narrow-indicator
                >
                    <q-tab name="staff-nurse" label="Staff Nurse" />
                    <q-tab name="doctor" label="Doctor" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="staff-nurse">
                        <h6 class="text-h6 q-mb-lg q-mt-none">Staff Nurse</h6>
                        <q-form autocapitalize="on" ref="staffAccountForm" @submit.prevent="submitStaffAccount" class="q-gutter-md">

                            <div class="row q-col-gutter-md q-mb-md">
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="staffLastName" dense outlined label="Last Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="staffFirstName" dense outlined label="First Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="staffMiddleName" dense outlined label="Middle Name" type="input" />
                            </div>
                            
                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="staffBirthdate" dense outlined  type="date" color="light-blue-7" label="Birthdate" stack-label lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="staffContactNumber" dense  outlined  type="tel" color="light-blue-7" label="Contact Number" :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                                <q-select class="col-xs-12 col-sm-12 col-md-3" v-model="staffSex" :options="sexOptions" dense outlined  color="light-blue-7" label="Sex" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg ">
                                <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="staffHomeNo" dense outlined color="light-blue-7" label="Home no." />
                                <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="staffStreet" dense outlined color="light-blue-7" label="Street" />                       
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                                <q-select class="col-xs-12 col-sm-12 col-md-12" v-model="staffAddress" dense use-input @filter="filterFnAddress" :options="addressSearch" option-value="id" option-label="full_address" emit-value map-options  outlined color="light-blue-7" label="Address" :rules="[ val => val && val > 0 || 'This field is required.']" />
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12 " v-model="staffUserName" label="Email Address" dense outlined  lazy-rules type="email" :rules="[ val => val && val.length > 0 || 'This field is required.', val => val != this.users.name || 'This email already exist!']"/>
                            </div> 

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12" v-model="staffPassword1" label="Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length >= 8 || 'Password should be at least 8 characters' ]"></q-input>
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12 " v-model="staffPassword2" label="Repeat Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[val => val === staffPassword1 || 'Password not matched']">
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                        />
                                    </template>
                                </q-input>
                            </div>

                            <div>
                                <q-btn label="Submit" type="submit" color="light-blue-7"/>
                                <q-btn label="Reset" @click="resetForm()" color="light-blue-7"/>
                            </div>        
                        </q-form>
                    </q-tab-panel>

                    <q-tab-panel name="doctor">
                        <h6 class="text-h6 q-mb-lg q-mt-none">Doctor</h6>
                        <q-form @submit.prevent="submitDoctorAccount" class="q-gutter-md">
                            <div class="row">
                                <q-select clearable label="Search Doctor.." class="q-mb-md col-xs-12 col-sm-12 col-md-12 " dense v-model="doctor" @filter="filterFnDoctor" use-input :options="doctorSearch" option-value="id" option-label="doctor_fullname" emit-value map-options  outlined color="light-blue-7">
                                    <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps">
                                        <q-item-section>
                                        <q-item-label>Dr. {{ scope.opt.LASTNAME }}, {{ scope.opt.FIRSTNAME }} {{ scope.opt.MIDDLENAME }}<span caption></span></q-item-label>
                                        <small class="text-grey-10">{{ scope.opt.SPECIALIZATION }}</small>
                                        </q-item-section>
                                    </q-item>
                                    </template>  
                                </q-select>
                            </div>

                            <div class="row q-col-gutter-md q-mb-md">
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctorLastName" dense outlined label="Last Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctorFirstName" dense outlined label="First Name" lazy-rules type="input" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctorMiddleName" dense outlined label="Middle Name" type="input" />
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctorBirthdate" dense outlined  type="date" color="light-blue-7" label="Birthdate" stack-label lazy-rules :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                                <q-input class="col-xs-12 col-sm-12 col-md-4" v-model="doctorContactNumber" dense  outlined  type="tel" color="light-blue-7" label="Contact Number" :rules="[ val => val && val.length > 0 || 'This field is required.']" />
                                <q-select class="col-xs-12 col-sm-12 col-md-3" v-model="doctorSex" :options="sexOptions" dense outlined  color="light-blue-7" label="Sex" :rules="[ val => val && val.length > 0 || 'This field is required.']"/>
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg ">
                                <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="doctorHomeNo" dense outlined color="light-blue-7" label="Home no." />
                                <q-input class="col-xs-12 col-sm-12 col-md-6" v-model="doctorStreet" dense outlined color="light-blue-7" label="Street" />                       
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md ">
                                <q-select class="col-xs-12 col-sm-12 col-md-12" v-model="doctorAddress" dense use-input @filter="filterFnAddress" :options="addressSearch" option-value="id" option-label="full_address" emit-value map-options  outlined color="light-blue-7" label="Address" :rules="[ val => val && val > 0 || 'This field is required.']" />
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12" v-model="doctorUserName" label="Email Address" dense outlined  lazy-rules type="email" :rules="[ val => val && val.length > 0 || 'This field is required.', val => val != this.users.name || 'This email already exist!']"/>
                            </div> 

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12" v-model="doctorPassword1" label="Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length >= 8 || 'Password should be at least 8 characters' ]"></q-input>
                            </div>

                            <div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-md">
                                <q-input class="row col-xs-12 col-sm-12 " v-model="doctorPassword2" label="Repeat Password" dense outlined :type="isPwd ? 'password' : 'text'" :rules="[val => val === doctorPassword1 || 'Password not matched']">
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                        />
                                    </template>
                                </q-input>
                            </div>

                            <div>
                                <q-btn label="Submit" type="submit" color="light-blue-7"/>
                            </div>
                        </q-form>
           
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>
</template>

<script>

import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { date } from 'quasar'

export default {
    name: 'Home',
    data () {
        return {

            tab: 'staff-nurse',

            users: [],
            sexOptions: ['Male', 'Female'],
            addressSearch: [],
            addressApi: [],

            doctorSearch: [],
            doctorApi: [],

            // ------------------- Staff Account ------------------

            staffUserName: '',
            staffLastName: '',
            staffFirstName: '',
            staffMiddleName: '',
            staffSex: '',
            staffBirthdate: '',
            staffHomeNo: '',
            staffStreet: '',
            staffAddress: '',
            staffContactNumber: '',
            staffPassword1: '',
            staffPassword2: '',
            isPwd: true, 

            // ------------------------------------------------------

            // -------------------- Doctor Account ------------------

            doctorUserName: '',
            doctorLastName: '',
            doctorFirstName: '',
            doctorMiddleName: '',
            doctorSex: '',
            doctorBirthdate: '',
            doctorHomeNo: '',
            doctorStreet: '',
            doctorAddress: '',
            doctorContactNumber: '',
            doctorPassword1: '',
            doctorPassword2: '',
            isPwd: true, 

            doctor: '',         
            
            // ------------------------------------------------------
        }
    },

    async mounted () {
        await this.getAddress()
        await this.getDoctor()
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

        async submitStaffAccount() {

            const sfaffFormData = {
                email: this.staffUserName,
                password: this.staffPassword1,
                re_password: this.staffPassword2,
                last_name: this.staffLastName,
                first_name: this.staffFirstName,
                middle_name: this.staffMiddleName,
                sex: this.staffSex,
                birtthdate: this.staffBirthdate,
                home_no: this.staffHomeNo,
                street: this.staffStreet,
                address: this.staffAddress,
                contact_number: this.staffContactNumber,
                roles: 3
            }

            await api
                
                .post('/api/v1/users/', sfaffFormData)
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

        async submitDoctorAccount() {

            const doctorFormData = {
                email: this.doctorUserName,
                password: this.doctorPassword1,
                re_password: this.doctorPassword2,
                last_name: this.doctorLastName,
                first_name: this.doctorFirstName,
                middle_name: this.doctorMiddleName,
                sex: this.doctorSex,
                birthdate: this.doctorBirthdate,
                home_no: this.doctorHomeNo,
                street: this.doctorStreet,
                address: this.doctorAddress,
                contact_number: this.doctorContactNumber,
                roles: 1,
                doctor_id: this.doctor_id,
            }

            await api
                .post('/api/v1/users/', doctorFormData)
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

        resetForm() {
            this.$refs.staffAccountForm.reset();
        },
    }
}
</script>
