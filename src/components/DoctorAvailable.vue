<template>
    <q-list separator>
        <q-item class="doctor-available" v-for="doctor in doctorList" :key="doctor.id" clickable v-ripple>
            <q-item-section>
                <div class="row">
                    <div class="col-3">
                        <template v-if="image == true">
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar.png" />
                            </q-avatar>
                        </template>
                        <template v-else>
                            <q-avatar color="grey-7">{{ doctor.first_char }}</q-avatar>                    
                        </template>                 
                    </div>  
                    <div class="col-9">
                        <div>
                            <q-item-label>{{ doctor.LASTNAME }}, {{ doctor.FIRSTNAME }} {{ doctor.MIDDLENAME }}</q-item-label>
                            <small>{{ doctor.SPECIALIZATION }}</small>
                        </div>
                        <div>
                            <q-icon name="phone" class="q-mr-sm" /><span class="text-caption">{{ doctor.PHONENO }}</span>
                        </div>                 
                    </div> 
                </div>
            </q-item-section>                   
        </q-item>
        <q-separator/>      
    </q-list> 
</template> 

<script>
import { api } from 'boot/axios'

export default {
    name: 'DoctorAvailable',
    data() {
        return {
            doctorSpecializationDescription: [],
            doctorList: [],
            active: true,
            image: false,
      
            designation: "",
        }
    },

    async mounted () {
        // await this.DoctorSpecialization()
        // await this.DoctorPatient() 
        this.onefDoctorList()   
    },

    methods: {

        async onefDoctorList(){
            await api
                .get('/api/v1/onef_doctor/')
                .then(response => {
                    this.doctorList = response.data

                    for(let firstLetter in response.data){
                        this.doctorList[firstLetter]["first_char"] = response.data[firstLetter].LASTNAME.charAt(0)
                    }
                })
        },  

        // async DoctorPatient() {
        //     await api
        //       .get('/api/v1/doctor-list/')
        //       .then(response => {
        //           this.doctorList = response.data              
        //           let doctor_sp = this.doctorSpecializationDescription
                
        //           for(let x in doctor_sp){
        //               this.doctorList[x]["specialization"] = doctor_sp[x].specialization.title         
        //           }

                // for(let firstLetter in response.data){
                //    this.doctorList[firstLetter]["first_char"] = response.data[firstLetter].first_name.charAt(0)
                // }

        //       })  

        //       .catch(error => {
        //         console.log(JSON.stringify(error))
        //     })
        // },

        // async DoctorSpecialization() {
        //     await api
        //       .get('/api/v1/doctor-specialization-description/')
        //       .then(response => {
        //           this.doctorSpecializationDescription = response.data              
        //       })

        //       .catch(error => {
        //         console.log(JSON.stringify(error))
        //     })
        // }
    }
}
</script>


     