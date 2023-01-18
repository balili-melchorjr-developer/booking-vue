<template>
  <q-layout view="hHh lpR lFr">

    <q-header elevated class="bg-white text-light-blue-7">
      <q-toolbar>
        <q-btn dense flat round icon="dashboard" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Line Stream
        </q-toolbar-title>

        <div id="realtime" class="text-weight-medium text-grey-7 text-h6 text-uppercase"></div>
        
        <q-space />

        <q-btn no-caps flat>
          <q-avatar size="md" class="q-mr-md" color="grey-7">J </q-avatar>
          <q-menu class="q-mt-md" transition-show="jump-down" transition-hide="jump-up" >
            <q-list style="min-width: 100px">              
              <q-item clickable  @click="logout" v-ripple>
                <q-item-section flat class=" text-red-10">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
         
        </q-btn>
                       

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

       <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-light-blue-7 text-white">

          <div class="row justify-center q-my-lg bg-transparent">
            <q-avatar size="100px" class="q-my-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold col-md-12 text-center">your_cool_name_here</div>
            <div class="col-md-12 text-center">your_proud_designation_here</div>
                         
          </div>

          <q-separator class="bg-white" />
          <q-list padding class="q-mt-md" >
            <q-item clickable active-class="my-menu-link" :to="{name: 'Home'}" >
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>

            <q-item clickable active-class="my-menu-link" :to="{name: 'CreateAccount'}">
              <q-item-section avatar>
                <q-icon name="person_add" />
              </q-item-section>

              <q-item-section>
                Create Account
              </q-item-section>
            </q-item>

            <q-item clickable active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="people" />
              </q-item-section>

              <q-item-section>
                Users
              </q-item-section>
            </q-item>

            <q-item clickable active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section >
                Settings
              </q-item-section>
            </q-item>
          </q-list>        

    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
       <template v-if="sessionRoles == 3">
        <div style="max-width: 350px">         
            <div class="q-pa-md text-teal-14 text-weight-medium text-h5">Upcoming Patient</div>     

            <UpcomingPatientPatient />

        <q-separator/> 
        </div>
        </template>
        <template v-else-if="sessionRoles == 1">
        <div style="max-width: 350px">         
            <div class="q-pa-md text-teal-14 text-weight-medium text-h5">Available Doctor</div>  
            
        <q-separator/>       

            
            <DoctorAvailable />
        </div>
        </template>

            

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import UpcomingPatientPatient from 'components/UpcomingPatient.vue'
import DoctorAvailable from 'components/DoctorAvailable.vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      sessionRoles: '',

    }
  },

components: {
  UpcomingPatientPatient,
  DoctorAvailable
},

mounted() {


      var timeDisplay = document.getElementById("realtime");
      

            function refreshTime() {
                let dateString = new Date().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit" })
               
                timeDisplay.innerHTML = dateString
            }

            setInterval(refreshTime, 1000);   

      this.getSessionRoles()
  },

  methods: {

    async getSessionRoles () {
      this.sessionRoles = sessionStorage.roles
      console.log(this.sessionStorage)
    },

    async logout() {
      await api
        .post('/api/v1/token/logout')
        .then(response => {
          console.log("Yes Logout!!!")
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
        
        api.defaults.headers.common['Authorization'] = ""
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('userid')
        sessionStorage.removeItem('roles')
        this.$store.commit('removeToken')

        this.$router.push('/login')
    }
  },
}
</script>