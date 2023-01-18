<template>
	<div>
		<q-btn-toggle
			v-model="toggleQueue"
			spread
			no-caps
			toggle-color="light-blue-7"
			color="white"
			text-color="black"
			:options="[
				{label: 'Registration Queue', value: 'R'},
				{label: 'Vital Signs Queue', value: 'VT'}
			]"
		/>
		<template v-if="toggleQueue == 'R'">  
			<q-list separator v-for="(item, index) in sortedCounterOneList" class="no-padding" :key="item.id" >			       
				<template v-if="item.done_status == false">						
					<template v-if="item.active_status === true">
						<q-item class="no-padding">		
							<q-item-section class="bg-positive text-white q-pa-md">
								<div class="row q-col-gutter-md" style="height:110px;">
									<div class="col-xs-12 col-sm-12 col-md-6 ">
										<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
										<small>{{ item.counter_status }}</small>												
									</div>	
									<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">								
										<q-btn size="sm" class="bg-white text-black" @click="setInactiveRegistration(item)" label='Inactive'/>
										<q-btn size="sm" class="bg-white text-black" @click="transferPrompt(item)" label='Actions'/> 
										<q-btn icon="notifications" class="bg-white text-black" size="sm" @click="queueCall(item)" label="Call"/> 																			
									</div>       
								</div>                
							</q-item-section>
						</q-item>																								
					</template>
					<template v-else-if="item.active_status === false">	
						<q-item class="no-padding">
							<q-item-section class="q-pa-md" >
								<div class="row q-col-gutter-md" style="height:110px;">
									<div class="col-xs-12 col-sm-12 col-md-6 ">
										<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
										<small>{{ item.counter_status }}</small>																	
									</div>								
									<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">
										<q-btn size="sm" class="bg-positive text-white" @click="setActiveRegistration(item)" label='Pull Ticket'/>									                   
										<q-btn size="sm" @click="transferPrompt(item)" label='Actions'/>  
										<q-btn icon="notifications" size="sm" @click="queueCall(item)" label="Call"/> 										                 
									</div>       
								</div>               
							</q-item-section>  
						</q-item>				
					</template>
					<q-separator/>  
				</template> 		
			</q-list>
		</template>
		<template v-else-if="toggleQueue == 'VT'">
			<q-list v-for="(item, index) in sortedCounterThreeList" :key="item.id" class="no-padding" separator>			
				<q-item class="no-padding">
					<template v-if="item.active_status == true">						
						<q-item-section class="bg-positive text-white q-pa-md">
							<div class="row q-col-gutter-md" style="height:110px;">
								<div class="col-xs-12 col-sm-12 col-md-6 ">
									<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
									<small>{{ item.counter_status }}</small>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">									
									<q-btn size="sm" class="bg-white text-black" @click="setInactiveVitalSigns(item)" color="positive" label='Inactive'/>
									<q-btn size="sm" class="bg-white text-black" @click="actionPrompt(item)" label="Actions"/> 									
									<q-btn icon="notifications" class="bg-white text-black" size="sm" @click="queueCall(item)" label="Call"/>   
								</div>            
							</div>
						</q-item-section> 
					</template>
					<template v-else>
						<q-item-section class="q-pa-md">
							<div class="row q-col-gutter-md" style="height:110px;">
								<div class="col-xs-12 col-sm-12 col-md-6 ">
									<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
									<small>{{ item.counter_status }}</small>
									{{ index }}
								</div>
								<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">									
									<q-btn size="sm" @click="setActiveVitalSigns(item)" color="positive" label='Pull Ticket' />
									<q-btn size="sm" @click="actionPrompt(item)" label='Actions' />
									<q-btn icon="notifications" class="bg-white text-black" size="sm" @click="queueCall(item)" label="Call"/>
								</div>            
							</div>
						</q-item-section> 
					</template>                                  
				</q-item>			
				<q-separator/>      
			</q-list>
		</template>

		<q-dialog v-model="doneConfirmationDialog" persistent>
			<q-card>
				<q-card-section class="row items-center">
					<span class="q-ml-sm">Are you sure you want to finish this?</span>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn unelevated @click="setDone()" label="Yes, I'm sure." color="light-blue-7" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

        <q-dialog v-model="transferPromptDialog" >
            <q-card style="width:600px;">
				<q-card-section class="row items-center q-pb-none">
					<h6 class="text-h6 text-light-blue-7 q-ma-none">Take Actions</h6>
				</q-card-section>
              	<q-card-section>
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-4">
							<q-btn size="md" color="cyan-9" @click="pullHmo()" label='Transfer to HMO' />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-4">
							<q-btn size="md" color="cyan-9" @click="pullVitalSigns()" label='Transfer to Vital Signs'/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-4">
							<q-btn size="md" color="negative" flat @click="setConfirmationDialog()" label="End Queue"/>
						</div>												
					</div>		
              	</q-card-section>
            </q-card>
		</q-dialog>

		<q-dialog v-model="actionPromptDialog">
            <q-card style="width:400px">
				<q-card-section class="row items-center q-pb-none">
					<h6 class="text-h6 text-light-blue-7 q-ma-none">Take Actions</h6>
				</q-card-section>

              	<q-card-section>
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-6">
							<q-btn size="md" color="cyan-9" @click="pullHmo()" label='Transfer to HMO' />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-6">
							<q-btn size="md" color="negative" flat @click="setConfirmationDialog()" label="End Queue"/>
						</div>
					</div>                   
              	</q-card-section>
            </q-card>			
		</q-dialog>
    </div>
</template> 

<script>
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
	name: 'RegistrationQueueNumber',
	data() {
		return {
			counterOneList: [],
			counterThreeList: [],
			toggleQueue: 'R',
			doneConfirmationDialog: false,
			doneId: '',

			transferPromptDialog: false,
			actionPromptDialog: false,

			name: '',
			selectedVoice: 1,
			synth: window.speechSynthesis,
			voiceList: [],
			greetingSpeech: new window.SpeechSynthesisUtterance()
			
		}
	},
  
	async mounted () {
			this.getWalkInQueueNumber() 
			this.getWalkInWithHmoQueueNumber()
			this.getOnlineAppointmentQueueNumber()
			this.getOnlineAppointmentWithHmoQueueNumber()  

			this.voiceList = this.synth.getVoices()  
				
			this.synth.onvoiceschanged = () => {
			this.voiceList = this.synth.getVoices()
		}  
	},

  	computed: {
		sortedCounterOneList(){			
			return this.counterOneList
				.sort((a, b) => Number(b.active_status) - Number(a.active_status))
		},

      	sortedCounterThreeList(){
			return this.counterThreeList
				.sort((a, b) => Number(b.active_status) - Number(a.active_status))
      	}	
  	},

  	methods: {

		queueCall(item) {			
			this.greetingSpeech.text = item.full_queue
			this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
			this.synth.speak(this.greetingSpeech)
		},

		transferPrompt(item) {
			this.transferPromptDialog = true		
			this.doneId  = item.id
		},

		actionPrompt(item) {
			this.actionPromptDialog = true
			this.doneId  = item.id
		},

		async getWalkInQueueNumber(){
			await api
				.get('/api/v1/walk-in-queue-number/')
				.then(response => {
					response.data.forEach(item => {
						this.counterOneList.push(item)
					})       
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async getWalkInWithHmoQueueNumber(){
			await api
				.get('/api/v1/walk-in-with-hmo-queue-number/')
				.then(response => {
					response.data.forEach(item => {
						this.counterOneList.push(item)
					})
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async getOnlineAppointmentQueueNumber(){
			await api
				.get('/api/v1/online-appointment-queue-number/')
				.then(response => {
					response.data.forEach(item => {
						this.counterThreeList.push(item)
					})
				})
				.catch(error => {
					// console.log(error)
				})
		},  
    
		async getOnlineAppointmentWithHmoQueueNumber(){
			await api
				.get('/api/v1/online-appointment-with-hmo-queue-number/')
				.then(response => {
						response.data.forEach(item => {
							this.counterThreeList.push(item)
					})
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async pullHmo(){
			const formData = {
				counter_status: 'HMO',
				active_status: false
			}

			await api
				.put(`/api/v1/update-queue-status/${this.doneId}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async pullRegistration(){
			const formData = {
				counter_status: 'Walk In',
				active_status: false
			}

			await api
				.put(`/api/v1/update-queue-status/${this.doneId}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},
    
		async pullVitalSigns(){
			const formData = {
				counter_status: 'Online Appointment',
				active_status: false,
			}

			await api
				.put(`/api/v1/update-queue-status/${this.doneId}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})			
		},

		async setActiveRegistration(item){ 

			const formData = {
				active_status: true,
				// counter_status: item.counter_status
			}		

			await api 
				.put(`/api/v1/update-queue-status/${item.id}/`,formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async setActiveVitalSigns(item){
			const formData = {
				active_status: true,
				// counter_status: item.counter_status
			}

			await api
				.put(`/api/v1/update-queue-status/${item.id}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async setInactiveVitalSigns(item){
			const formData = {
				active_status: false,
				counter_status: item.counter_status
			}

			await api
				.put(`/api/v1/update-queue-status/${item.id}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},  

		async setInactiveRegistration(item) {      
			const formData = {
				active_status: false,
				counter_status: item.counter_status
			}

			await api
				.put(`/api/v1/update-queue-status/${item.id}/`, formData)
				.then(response => {
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async setConfirmationDialog(){ 
			this.doneConfirmationDialog = true
		},

		async setDone(){
			const formData = {          
				done_status: true,
				active_status: false
			}

			await api
				.put(`/api/v1/update-queue-status/${this.doneId}/`, formData)
				.then(response => {
					Notify.create({
						message: 'Well Done!',
						type: 'positive',
						position: 'top'
					})
				})
				.catch(error => {
					// console.log(error)
				})
		},
  	},
}

</script>