<template>
    <q-btn no-caps rounded flat>
        <q-avatar size="md" class="q-mr-md" color="grey-7">{{ firstChar }}</q-avatar><span>{{ user.first_name }}</span>
        <q-menu class="q-mt-md" transition-show="jump-down" transition-hide="jump-up" >
            <q-list style="min-width: 100px">
            <template v-if="roles == 3 || roles == 5 || roles == 7">
                <q-item clickable v-ripple :to="{name: 'Settings'}">
                    <q-item-section avatar>
                        <q-icon color="blue-grey-10" name="settings" />
                    </q-item-section>
                    <q-item-section flat class="q-mr-md">Settings</q-item-section>
                </q-item>
            </template>

            <q-separator />
                          
                <q-item clickable  @click="logout" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="logout" color="red-10" />
                    </q-item-section>
                    <q-item-section flat class="text-red-10 q-mr-md">Logout</q-item-section>
                </q-item>
            </q-list>
        </q-menu>         
    </q-btn>
</template>

<script>

import { api } from 'boot/axios'

export default {
    name: 'UserNavbar',
    data() {
        return {
            user: [],
            firstChar: '',
            roles: ''
        }
    },
    mounted(){
        this.getUser()
        this.getSessionRoles()       
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
        
        async logout() {
            await api
                .post('/api/v1/token/logout')
                .then(response => {
                    // console.log("Yes Logout!!!")
                })
                .catch(error => {
                    // console.log(error)
                })
                api.defaults.headers.common['Authorization'] = ""

                sessionStorage.removeItem('token')
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('userid')
                sessionStorage.removeItem('roles')

                this.$store.commit('removeToken')
                this.$router.push('/login')
        },

        async getSessionRoles() {
            this.roles = sessionStorage.roles
        },
    }    
}
</script>