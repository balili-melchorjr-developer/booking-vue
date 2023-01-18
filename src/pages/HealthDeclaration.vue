<template>
    <div class="q-px-xl text-grey-8 ">
                <div class="row">
                    <h6 class="col-md-10">Please check an answer for every question</h6>
                    <h6 class="col-md-1 gt-sm">Yes</h6>
                    <h6 class="col-md-1 gt-sm">No</h6>
                </div>
                    
                <div class="row">
                    <p class="text-body1">Have you ever experienced the following symptoms recently?</p>
                    <ul class="text-body1 row" style="line-height: 2rem">
                        <li class="col-xs-12 col-sm-12 col-md-12  row">
                            <span class="col-xs-12 col-sm-12 col-md-10 ">Fever</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer1" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer1" :options="optionsMobile" color="light-blue-7" inline />
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class=" col-sm-12 col-md-10">Diarrhea, Nausea or Vomitting</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer2" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 lt-md" v-model="answer2" :options="optionsMobile" color="light-blue-7" inline />
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Shortness of breath or other respiratory symptoms</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer3" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer3" :options="optionsMobile" color="light-blue-7" inline />
                        </li>
                        <ul class="col-xs-12 col-sm-12 col-md-8">
                            <q-input class="q-mb-md" label="Other respiratory symptoms:" />
                        </ul>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Headache</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer4" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer4" :options="optionsMobile" color="light-blue-7" inline />                         
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Joint Pain or Muscle Pain</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer5" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer5" :options="optionsMobile" color="light-blue-7" inline />  
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">Flu-like symptoms such as:
                            <ul class="row">
                                <li class="col-xs-12 col-sm-12 col-md-12 row">
                                    <span class="col-sm-12 col-xs-12 col-md-10">Chills or repeated shaking with chills</span>
                                    <q-option-group class="col-md-2 gt-sm" v-model="answer6" :options="options" color="light-blue-7" inline />
                                    <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer6" :options="optionsMobile" color="light-blue-7" inline /> 
                                </li>
                                <li class="col-xs-12 col-sm-12 col-md-12 row">
                                    <span class="col-xs-12 col-sm-12 col-md-10">Body aches</span>
                                    <q-option-group class="col-md-2 gt-sm" v-model="answer7" :options="options" color="light-blue-7" inline />
                                    <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer7" :options="optionsMobile" color="light-blue-7" inline /> 
                                </li>
                                <li class="col-xs-12 col-sm-12 col-md-12 row">
                                    <span class="col-xs-12 col-sm-12 col-md-10">Sore throat</span>
                                    <q-option-group class="col-md-2 gt-sm" v-model="answer8" :options="options" color="light-blue-7" inline />
                                    <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer8" :options="optionsMobile" color="light-blue-7" inline /> 
                                </li>
                                <li class="col-xs-12 col-sm-12 col-md-12 row">
                                    <span class="col-xs-12 col-sm-12 col-md-10">Runny nose or sneezing</span>
                                    <q-option-group class="col-md-2 gt-sm" v-model="answer9" :options="options" color="light-blue-7" inline />
                                     <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer9" :options="optionsMobile" color="light-blue-7" inline /> 
                                </li>
                                <li class="col-xs-12 col-sm-12 col-md-12 row">
                                    <span class="col-xs-12 col-sm-12 col-md-10">Cough and colds</span>
                                    <q-option-group class="col-md-2 gt-sm" v-model="answer10" :options="options" color="light-blue-7" inline />
                                    <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer10" :options="optionsMobile" color="light-blue-7" inline /> 
                                </li>
                            </ul>
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Have you been recently tested for COVID-19?</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer11" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer11" :options="optionsMobile" color="light-blue-7" inline /> 
                            <ul class="col-xs-12 col-sm-12 col-md-12 row">
                                <q-input class="col-xs-12 col-sm-12 col-md-8" type="date" color="light-blue-7" label="Date tested:" stack-label />
                                <li class="col-xs-12 col-sm-12 col-md-12 row">Result: (if available, please provide copy)</li>
                            </ul>
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-md-10">Have you been tested as a Probable or a Suspect for COVID-19?</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer12" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer12" :options="optionsMobile" color="light-blue-7" inline /> 
                            <ul class="col-xs-12 col-sm-12 col-md-8">
                                <q-input class="col-xs-12 col-sm-12 col-md-8" type="date" color="light-blue-7" label="If YES, when did you your quarantine start?" stack-label />
                            </ul>
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Do you have any travel history in the past 14 days?</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer13" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer13" :options="optionsMobile" color="light-blue-7" inline /> 
                            <ul class="col-xs-12 col-sm-12 col-md-8">
                               <q-input class="q-mb-md" label="If YES, when and where?" />
                            </ul>
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Did you come close contact with someone who is a<br>CONFIRMED COVID-19 case?</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer14" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer14" :options="optionsMobile" color="light-blue-7" inline /> 
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-md-10">Are you staying in the same close environment with someone who is a<br>
                            CONFIRMED COVID-19 case?</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer15" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer15" :options="optionsMobile" color="light-blue-7" inline /> 
                        </li>
                        <li class="col-xs-12 col-sm-12 col-md-12 row">
                            <span class="col-xs-12 col-sm-12 col-md-10">Did you come int close contact with a PROBABLE or SUSPECTED person<br>
                            with COVID-19</span>
                            <q-option-group class="col-md-2 gt-sm" v-model="answer16" :options="options" color="light-blue-7" inline />
                            <q-option-group class="col-xs-12 col-sm-12 lt-md" v-model="answer16" :options="optionsMobile" color="light-blue-7" inline /> 
                        </li>
                    </ul>
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
                    <q-btn type="submit" class="col-xs-12 col-sm-6 col-md-4" rounded ripple color="light-blue-7" padding="16px">Make an Appointment</q-btn>
                </div>  
            </div>
</template>

<script>

import { ref } from 'vue'
import { api } from 'boot/axios'


export default {
    name: 'HealthDeclartion',
    data() {
        return {
            answer1: ref('No'),
            answer2: ref('No'),
            answer3: ref('No'),
            answer4: ref('No'),
            answer5: ref('No'),
            answer6: ref('No'),
            answer7: ref('No'),
            answer8: ref('No'),
            answer9: ref('No'),
            answer10: ref('No'),
            answer11: ref('No'),
            answer12: ref('No'),
            answer13: ref('No'),
            answer14: ref('No'),
            answer15: ref('No'),
            answer16: ref('No'),
        

        options: [
            {
            label: '',
            value: 'Yes'
            },
            {
            label: '',
            value: 'No'
            },
        ],
        optionsMobile: [
            {
            label: 'Yes',
            value: 'Yes'
            },
            {
            label: 'No',
            value: 'No'
            },
        ], 


        questions: [],
    }
},

    async mounted() {
        await this.getQuestion()
    },

    methods: {

        async getQuestion() {
          await api
            .get('/api/v1/question/')
            .then(response => {
                this.questions = response.data
            })
            .catch(error => {
                console.log(error)
            })
      },

      async onSubmit() {

         let patientData = {
             last_name: this.lastName,
             first_name: this.firstName,
             middle_name: this.middleName,
             birthdate: this.birthdate,
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

                let questionData = { question: this.questions[0].question, choices: this.answer1, patient_appointment_id: response.data.id }
                let questionData2 = { question: this.questions[1].question, choices: this.answer2, patient_appointment_id: response.data.id }
                let questionData3 = { question: this.questions[2].question, choices: this.answer3, patient_appointment_id: response.data.id }
                let questionData4 = { question: this.questions[3].question, choices: this.answer4, patient_appointment_id: response.data.id }
                let questionData5 = { question: this.questions[4].question, choices: this.answer5, patient_appointment_id: response.data.id }
                let questionData6 = { question: this.questions[5].question, choices: this.answer6, patient_appointment_id: response.data.id }
                let questionData7 = { question: this.questions[6].question, choices: this.answer7, patient_appointment_id: response.data.id }
                let questionData8 = { question: this.questions[7].question, choices: this.answer8, patient_appointment_id: response.data.id }
                let questionData9 = { question: this.questions[8].question, choices: this.answer9, patient_appointment_id: response.data.id }
                let questionData10 = { question: this.questions[9].question, choices: this.answer10, patient_appointment_id: response.data.id }
                let questionData11 = { question: this.questions[10].question, choices: this.answer11, patient_appointment_id: response.data.id }
                let questionData12 = { question: this.questions[11].question, choices: this.answer12, patient_appointment_id: response.data.id }
                let questionData13 = { question: this.questions[12].question, choices: this.answer13, patient_appointment_id: response.data.id }
                let questionData14 = { question: this.questions[13].question, choices: this.answer14, patient_appointment_id: response.data.id }
                let questionData15 = { question: this.questions[14].question, choices: this.answer15, patient_appointment_id: response.data.id }
                let questionData16 = { question: this.questions[15].question, choices: this.answer16, patient_appointment_id: response.data.id }

                const questionApi = api.post('/api/v1/question/', questionData)
                const questionApi2 = api.post('/api/v1/question/', questionData2)
                const questionApi3 = api.post('/api/v1/question/', questionData3)
                const questionApi4 = api.post('/api/v1/question/', questionData4)
                const questionApi5 = api.post('/api/v1/question/', questionData5)
                const questionApi6 = api.post('/api/v1/question/', questionData6)
                const questionApi7 = api.post('/api/v1/question/', questionData7)
                const questionApi8 = api.post('/api/v1/question/', questionData8)
                const questionApi9 = api.post('/api/v1/question/', questionData9)
                const questionApi10 = api.post('/api/v1/question/', questionData10)
                const questionApi11 = api.post('/api/v1/question/', questionData11)
                const questionApi12 = api.post('/api/v1/question/', questionData12)
                const questionApi13 = api.post('/api/v1/question/', questionData13)
                const questionApi14 = api.post('/api/v1/question/', questionData14)
                const questionApi15 = api.post('/api/v1/question/', questionData15)
                const questionApi16 = api.post('/api/v1/question/', questionData16)
                const getReference = api.get(`/api/v1/online-appointment/${response.data.id}/`).then(response => { 
                    sessionStorage.setItem('last_name', response.data.last_name) 
                    sessionStorage.setItem('first_name', response.data.first_name) 
                    sessionStorage.setItem('middle_name', response.data.middle_name) 
                    sessionStorage.setItem('birthdate', response.data.birthdate) 
                    sessionStorage.setItem('sex', response.data.sex) 
                    sessionStorage.setItem('contact_number', response.data.contact_number) 
                    sessionStorage.setItem('home_no', response.data.home_no) 
                    sessionStorage.setItem('street', response.data.street) 
                    sessionStorage.setItem('address', response.data.address.id) 
                    sessionStorage.setItem('email', response.data.email)
                })

                Promise.all([
                    questionApi, 
                    questionApi2,
                    questionApi3,
                    questionApi4,
                    questionApi5,
                    questionApi6,
                    questionApi7,
                    questionApi8,
                    questionApi9,
                    questionApi10,
                    questionApi11,
                    questionApi12,
                    questionApi13,
                    questionApi14,
                    questionApi15,
                    questionApi16,
                    getReference
                ])
                
                console.log(getReference)

                this.$router.push('/appointment-done')
            })

            .catch(error => {
                console.log(JSON.stringify(error))
            })
      },

        
    }
}
</script>