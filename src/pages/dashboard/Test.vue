<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bold text-light-blue-7"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
  data () {
    return {
      columns: [
            {
                name: 'reference_no',
                label: 'Reference No',
                field: row => row.reference_no,
            },
            {
                name: 'appointment_date',
                label: 'Appointment Date',
                field: row => date.formatDate(row.date_created, ''),
            },
        ],

        data: []

    
    }
  },
  async mounted() {
      await this.getWaitingList()
  },

     methods: {
        async getWaitingList() {
          await api
            .get('/api/v1/online-appointment/')
            .then(response => {              
              this.data = response.data
              console.log(this.data)
              
            })
            .catch(error => {
              console.log(JSON.stringify(error))
            })
        }

    }
}
</script>