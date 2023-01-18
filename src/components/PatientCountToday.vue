<template>
    <div class="col-md-3 q-pl-md">
        <q-card class="my-card bg-deep-purple-13 text-white">
            <q-card-section>
                <div class="text-h6 text-right">Patient today</div>
                <div class="text-h5 text-weight-medium text-right">{{ patientCountToday.patient_count_today }}</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>

import { api } from 'boot/axios'

export default {
    name: 'PatientCountToday',
    data() {
        return {
            patientCountToday: ''
        }
    },

    async mounted() {
        await this.getPatientCountToday()
    },

    methods: {
        async getPatientCountToday() {
            await api
                .get('/api/v1/online-appointment')
                .then(response => {
                    try{
                        this.patientCountToday = response.data[0]
                    }catch(err){
                        Notify.create({
                            message: 'No Patient Today',
                            type: 'negative',
                            position: 'top'
                        })

                        this.patientCountToday = 0
                    }
                    
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>