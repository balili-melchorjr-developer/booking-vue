<template>
    <div class="q-pa-md">
        <h4 class="text-h4 text-weight-medium text-primary">Doctor Schedule</h4>
        <ul v-for="schedule in doctorSchedule" :key="schedule.id">
            <li>Days: {{ schedule.from_days }} - {{ schedule.to_days }} || Time: {{ schedule.from_time }} - {{ schedule.to_time }}</li>
        </ul>
        <ul v-for="room in doctorRoom" :key="room.id">
            <li>Room: {{ room.description }}</li>
        </ul>
        <ul v-for="status in doctorAvailableStatus" :key="status.id">
            <li>{{ status.available_status }}</li>
            <p>Reasons: {{ status.description }}</p>
        </ul>
    </div>
</template>

<script>

import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
    name: 'DoctorSchedule',
    data() {
        return {          
            doctorSchedule: [],
            doctorRoom: [],
            doctorAvailableStatus: []          
        }
    },

    async mounted() {        
        await this.getDoctorSchedule()
        await this.getDoctorRoom()
        await this.getDoctorAvailableStatus()    
    },

    methods: {
        dateAM: function(dt) {
            return date.formatDate(dt, 'hh:mm A')
        },

        dateWhole: function(dt){
            return date.formatDate(dt, 'MMMM DD, YYYY')
        },

        birthdateFormat: function(dt) {
            return date.formatDate(dt, 'MMMM DD, YYYY')
        },

        async getDoctorSchedule() {
            await api
                .get('/api/v1/schedule/')
                .then(response => {
                    this.doctorSchedule = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getDoctorRoom() {
            await api
                .get('/api/v1/room/')
                .then(response => {
                    this.doctorRoom = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        async getDoctorAvailableStatus() {
            await api
                .get('/api/v1/available-status')
                .then(response => {
                    this.doctorAvailableStatus = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        }
    }
}
</script>