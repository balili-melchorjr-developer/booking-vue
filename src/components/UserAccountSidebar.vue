<template>
    <div class="row justify-center q-my-lg bg-transparent">
        <template v-if="image == true">
            <q-avatar size="100px" class="q-my-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
        </template>
        <template v-else>
            <q-avatar size="100px" class="q-my-sm" color="grey-7">{{ firstChar }}</q-avatar>
        </template>   
        
        <p class="text-weight-bold col-md-12 text-center q-ma-none">{{ user.last_name }}, {{ user.first_name }} {{ user.middle_name }}</p>
        <template v-if="roles == 3">
                <p class="col-md-12 text-center q-ma-none">{{ designation }}</p> 
            </template>
        <template v-else>
            <p class="col-md-12 text-center q-ma-none">{{ specialization }}</p>
        </template>  
    </div>
</template>

<script>

import { api } from 'boot/axios'

export default {
    name: 'UserAccountSidebar',
    data () {
        return {
            user: [],
            firstChar: '',
            image: false,
            designation: [],
            specialization: [],
            roles: ''
        }
    },

    async mounted() {
        await this.getUser()
        await this.getDesignation() 
        await this.getSpecializaiton()
        await this.getSession()
    },

    methods: {
        async getUser() {
            await api
                .get('/api/v1/users/me')
                .then(response => {
                    this.user = response.data
                    this.firstChar = this.user.first_name.charAt(0)
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getDesignation() {
            await api            
                .get('/api/v1/opd-staff/')
                .then(response => {
                    try{
                        this.designation = response.data[0].designation.title
                    } catch(err) {
                        this.designation = "None"
                    }
                })
                .catch(error => {
                    // console.log(error)
                })   
        },

        async getSpecializaiton() {
            await api
                .get('/api/v1/doctor-specialization/')
                .then(response => {
                    try{
                        this.specialization = response.data[0].specialization.title
                        
                    } catch {
                        this.specialization = "None"
                    }   
                })
                .catch(error => {
                    console.log(error)
                })
                
        },

        async getSession() {
            this.roles = sessionStorage.roles            
        }
    }    
}
</script>



