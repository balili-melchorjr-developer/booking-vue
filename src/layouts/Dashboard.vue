<template>
	<q-layout view="hHh lpR lFr">
		<q-header elevated class="bg-white text-light-blue-7">
			<q-toolbar>
				<q-btn dense flat round icon="dashboard"  color="light-blue-7" @click="toggleLeftDrawer" />
					<q-toolbar-title><img src="~assets/onefocus_queuing.png" style="width:25%; margin-top:1.1%" alt="" /></q-toolbar-title>
						<h6 id="realtime" class="text-weight-medium text-grey-7 text-h6 text-uppercase q-ma-none"></h6>			
					<q-space />
					<UserNavbar />  		
				<q-btn dense flat round icon="menu" color="light-blue-7" @click="toggleRightDrawer" />			
			</q-toolbar>
		</q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-light-blue-7 text-white">   
            
		<UserAccountSidebar />
		<q-separator class="bg-white" />
		<q-list padding class="q-mt-md" >  
			<template v-if="sessionRoles == 1">
				<q-item active-class="my-menu-link" clickable :to="{name: 'DoctorPatient'}">
					<q-item-section avatar>
						<q-icon name="people" />
					</q-item-section>
					<q-item-section>
						Consultation
					</q-item-section>
				</q-item>
			</template>

      <template v-else-if="sessionRoles == 7">
          <q-item clickable active-class="my-menu-link" :to="{name: 'QueueTouchPanel'}" >
            <q-item-section avatar>
              <q-icon name="touch_app" />
            </q-item-section>
            <q-item-section>
              Queue Touch Panel					
            </q-item-section>
          </q-item>
      </template>
      <template v-else-if="sessionRoles == 6">

        <q-item clickable active-class="my-menu-link" :to="{name: 'MedicalRecords'}" >
          <q-item-section avatar>
						<q-icon name="dvr" />
					</q-item-section>
					<q-item-section>
            Out-Patient Records						
					</q-item-section>
				</q-item>

        <q-item clickable active-class="my-menu-link" :to="{name: 'OutOnlyRecords'}" >
			<q-item-section avatar>
				<q-icon name="folder_shared" />
			</q-item-section>
			<q-item-section>
				Out Only Records
			</q-item-section>
		</q-item>

      </template>
			<template v-else-if="sessionRoles == 3">
				<q-item clickable  active-class="my-menu-link" :to="{name: 'WalkInRegistration'}">
					<q-item-section avatar>
						<q-icon name="directions_walk" />
					</q-item-section>

					<q-item-section>
						Registration
					</q-item-section>
				</q-item>
				
				<q-item clickable active-class="my-menu-link" :to="{name: 'WaitingList'}">
					<q-item-section avatar>
						<q-icon name="list" />
					</q-item-section>

					<q-item-section>
						Registered Online
					</q-item-section>
				</q-item>
				<q-item clickable active-class="my-menu-link" :to="{name: 'ApprovedList'}">
					<q-item-section avatar>
						<q-icon name="checklist" />
					</q-item-section>

					<q-item-section>
						Appointed Patients
					</q-item-section>
				</q-item>
				<q-item clickable active-class="my-menu-link" :to="{name: 'DoctorList'}">
					<q-item-section avatar>
						<q-icon name="medical_services" />
					</q-item-section>

					<q-item-section>
						Doctors 
					</q-item-section>
				</q-item>

				<q-item clickable active-class="my-menu-link" :to="{name: 'PatientList'}">
					<q-item-section avatar>
						<q-icon name="people" />
					</q-item-section>

					<q-item-section>
						Patients
					</q-item-section>
				</q-item>
			</template>

          </q-list>        

    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>

       <template v-if="sessionRoles == 1">
        <div style="max-width: 350px">         
            <div class="q-pa-md text-teal-14 text-weight-medium text-h5">Upcoming Patient</div>
                <q-separator/> 
                	<UpcomingPatientPatient />
        		<q-separator/> 
        </div>
        </template>
        <template v-else-if="sessionRoles == 3">
        <div style="max-width: 350px">
			<div class="row q-col-gutter-sm q-pa-md">
			<div class="col-xs-12 col-sm-12 col-md-7 row">
				<h5 class="text-teal-14 text-weight-medium text-h5 q-ma-none self-center">Queued</h5>
			</div>
			<div class="col-xs-12 -col-sm-12 col-md-5 row justify-end">
				<q-btn @click="play" size="sm" class=" self-end" color="secondary" icon="notifications" label="Ring"/>
			</div>
			</div>          
			<q-separator/>      
			<RegistrationQueueNumber />                      
        </div>
        </template>
        <template v-else-if="sessionRoles == 5">
            <div style="max-width: 350px">         
            <div class="row q-col-gutter-sm q-pa-md">
              <div class="col-xs-12 col-sm-12 col-md-7 row">
                <h5 class="text-teal-14 text-weight-medium text-h5 q-ma-none self-center">Queued</h5>
              </div>
			<div class="col-xs-12 -col-sm-12 col-md-5 row justify-end">
              	<q-btn @click="play" size="sm" class=" self-end" color="secondary" icon="notifications" label="Ring"/>
			</div>
            </div>              
              <q-separator/>         
              <HmoQueueNumber />   
                       
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
import UserNavbar from 'components/UserNavbar.vue'
import UserAccountSidebar from 'components/UserAccountSidebar.vue'
import RegistrationQueueNumber from 'components/RegistrationQueue.vue'
import HmoQueueNumber from 'components/HmoQueueNumber.vue'
import useSound from 'vue-use-sound'
import buttonSfx from '../assets/announcement sound effect.mp3'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const [play] = useSound(buttonSfx)

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
      user: [],
      play,


    }
  },

components: {
  UpcomingPatientPatient,
  DoctorAvailable,
  UserNavbar,
  UserAccountSidebar,
  RegistrationQueueNumber,
  HmoQueueNumber,
},


mounted() {
      var timeDisplay = document.getElementById("realtime");      

            function refreshTime() {
                let dateString = new Date().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit" })
               
                timeDisplay.innerHTML = dateString
            }

            setInterval(refreshTime, 1000);   

      this.getSesssionRoles()
  },

  methods: {

    getSesssionRoles () {
      this.sessionRoles = sessionStorage.roles
    },

  },

}
</script>