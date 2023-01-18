<template>
    <q-list separator>
        <q-item v-for="item in sortedHMO" :key="item.id" class="no-padding">
          	<template v-if="item.done_status == false">
            	<template v-if="item.active_status == true">
                	<q-item-section class="bg-positive text-white q-pa-md">
                  		<div class="row q-col-gutter-md" style="height:110px;">
							<div class="col-xs-12 col-sm-12 col-md-6 ">
								<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
								<small>{{ item.counter_status }}</small>
							</div>	
                    		<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">
								<q-btn size="sm" class="bg-white text-black" @click="setInactive(item)" label="Set inactive" color="positive"/>
								<q-btn size="sm" class="bg-white text-black" @click="transferPrompt(item)" label='Actions'/>
                        		<q-btn icon="notifications" class="bg-white text-black" size="sm" @click="queueCall(item)" label="Call"/>
                    		</div>          
                  		</div>
                	</q-item-section> 
				</template>            
            	<template v-else>
              		<q-item-section class="q-pa-md">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-6 ">
								<h5 class="text-h5 q-mt-md q-mb-none text-weight-medium">{{ item.full_queue }}</h5>
								<small>{{ item.counter_status }}</small>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 q-gutter-y-sm column">
								<q-btn size="sm" @click="setActive(item)" label="Pull Ticket" color="positive"/>
								<q-btn size="sm" @click="transferPrompt(item)" label='Actions'/>
								<q-btn icon="notifications" class="bg-white text-black" size="sm" @click="queueCall(item)" label="Call"/>                             
							</div>          
						</div>
					</q-item-section>
            	</template>          
         	</template>                       
        </q-item>
        <q-separator/>      
    </q-list> 

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
						<q-btn size="md" color="cyan-9" @click="pullRegistration(item)" label='Transfer to Registration' />							
					</div>
					<div class="col-xs-12 col-sm-12 col-md-4">
						<q-btn size="md" color="cyan-9" @click="pullVitalSigns(item)" label='Transfer to Vital Signs'/>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-4">
						<q-btn size="md" color="negative" flat @click="setConfirmationDialog(item)" label="End Queue"/>
					</div>												
				</div>		
			</q-card-section>
		</q-card>
	</q-dialog>

</template> 

<script>
import { api } from 'boot/axios'
import { Notify } from 'quasar'


export default {
	name: 'HmoQueueNumber',
  	data() {
    	return {
      		hmoQueueNumberList: [],
			disable: true,

      		name: '',
      		selectedVoice: 1,
      		synth: window.speechSynthesis,
      		voiceList: [],
      		greetingSpeech: new window.SpeechSynthesisUtterance(),

	  		doneId: '',
	  		doneConfirmationDialog: false,

	  		transferPromptDialog: false,
    	}
  	},

	async mounted () {
		this.getHmoQueueNumber()
		this.getWalkInWithHmoQueueNumber()
		this.getOnlineAppointmentWithHmoQueueNumber()

		this.voiceList = this.synth.getVoices()  
			
		this.synth.onvoiceschanged = () => {
			this.voiceList = this.synth.getVoices()
		}  
	},

	computed: {
		sortedHMO(){
			return this.hmoQueueNumberList
				.sort((a, b) => Number(b.active_status) - Number(a.active_status))
		}
	},  

	methods: {

		queueCall(item) {
			this.greetingSpeech.text = item.full_queue
			this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
			this.synth.speak(this.greetingSpeech)
		},	

		async getHmoQueueNumber(){
			await api
				.get('/api/v1/hmo-queue-number/')
				.then(response => {
					response.data.forEach(item => {
						this.hmoQueueNumberList.push(item)
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
						this.hmoQueueNumberList.push(item)
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
						this.hmoQueueNumberList.push(item)
					});
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
					Notify.create({
						message: 'Successfully send to registration counter.',
						type: 'positive',
						position: 'top',
					})
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async pullVitalSigns(){

			const formData = {
				counter_status: 'Online Appointment',
				active_status: false
			}

			await api
				.put(`/api/v1/update-queue-status/${this.doneId}/`, formData)
				.then(response => {
					Notify.create({
						message: 'Successfully send to vital signs counter.',
						type: 'positive',
						position: 'top',
					})
					location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async setActive(item){

			const formData = {
				active_status: true
			}

			if (this.disable == true){
				this.disable = false
			} else {
				this.disable = true   
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

		async setInactive(item){
			
			const formData = {
				active_status: false
			}

			if (this.disable == true){
				this.disable = false
			} else {
				this.disable = true   
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

		transferPrompt(item) {
			this.transferPromptDialog = true
			this.doneId = item.id
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
  	}
}
</script>