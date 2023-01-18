<template>
    <div>
        <div >
            <div class="row q-mt-xl q-px-lg">
                <div class="">
                    <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Settings</h4>
                </div> 
            </div>
            <div>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="light-blue-7"
                    indicator-color="light-blue-7"
                    align="justify"
                >
                    <q-tab disable name="personal_information" label="Personal Information" />
                    <q-tab name="utilities" label="Utilities" />
                    <q-tab disable name="other" label="Other" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="personal_information" class="q-pa-none">       
                        
                        <q-splitter
                            v-model="splitterModelPersonalInformation"
                            style="min-height: 735px"
                        >
    
                            <template v-slot:before>
                            <q-tabs
                                v-model="innerTab"
                                vertical
                            >
                                <q-tab name="change_password" icon="lock" label="Change Password" />
                            </q-tabs>
                            </template>
    
                            <template v-slot:after>
                            <q-tab-panels
                                v-model="innerTab"
                                animated
                                transition-prev="slide-down"
                                transition-next="slide-up"
                            >
                                <q-tab-panel name="printers">
                                    <div class="text-h4 q-mb-md">Change Password</div>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-xs-12 col-sm-12 col-md-4">
                                            <p class="text-subtitle1 q-mb-xs">Password</p>
                                            <q-input dense outlined color="light-blue-7"/>
                                        </div>
                                        <div class="col-xs-12 col-sm-12 col-md-4">
                                            <p class="text-subtitle1 q-mb-xs">Re-type Password</p>
                                            <q-input dense outlined color="light-blue-7"/>
                                        </div>
                                    </div>
                                    
                                </q-tab-panel>
                            </q-tab-panels>
                            </template>
    
                        </q-splitter>
                    </q-tab-panel>

                    <q-tab-panel class="q-pa-none" name="utilities">                  
                        
                    <q-splitter
                        v-model="splitterModelUtilities"
                        style="min-height: 735px"
                    >

                        <template v-slot:before>
                        <q-tabs
                            v-model="innerTab"
                            vertical
                        >
                            <q-tab name="printers" icon="print" label="Printers" />
                        </q-tabs>
                        </template>

                        <template v-slot:after>
                        <q-tab-panels
                            v-model="innerTab"
                            animated
                            transition-prev="slide-down"
                            transition-next="slide-up"
                        >
                            <q-tab-panel name="printers">
                                <h4 class="text-h4 q-ma-none q-mb-md text-blue-grey-10">Printer</h4>
                                <div class="row q-col-gutter-md">                                    
                                    <div class="col-xs-12 col-sm-12 col-md-12 row justify-end q-pa-md">
                                        <q-btn @click="addPrinterDialog" label="Add Printer" color="light-blue-7" />
                                    </div>
                                </div>

                                <div>
                                    <q-table
                                        :rows="data"
                                        :columns="columns"
                                        row-key="reference_no"
                                        bordered
                                        flat
                                        :filter="filter" 
                                        >

                                        <template v-slot:top-right>
                                            <q-input class="q-mt-md " standout="bg-light-blue-7" dense debounce="300" v-model="filter" placeholder="Search">
                                            <template v-slot:append>
                                                <q-icon name="search" />
                                            </template>
                                            </q-input>
                                        </template>

                                        <template v-slot:header="props">
                                            <q-tr :props="props">
                                            <q-th
                                                v-for="col in props.cols"
                                                :key="col.name"
                                                :props="props" 
                                            >
                                                <div class="text-weight-medium text-center text-light-blue-7 text-subtitle2">
                                                {{ col.label }}
                                                </div>                   
                                            </q-th>
                                            </q-tr>
                                        </template>

                                        <template v-slot:body-cell-description="props">
                                            <q-td :props="props">
                                            <div class="text-grey-9 text-center text-subtitle2">
                                                {{ props.row.description }}
                                            </div>
                                            </q-td>
                                        </template>

                                        <template v-slot:body-cell-ip_address="props">
                                            <q-td :props="props">
                                            <div class="text-grey-9 text-center text-subtitle2">
                                                {{ props.row.ip_address }} 
                                            </div>
                                            </q-td>
                                        </template>

                                        <template v-slot:body-cell-status="props">
                                            <q-td :props="props">
                                                <template v-if="props.row.active == true">
                                                    <div class="text-center">
                                                        <q-chip color="positive" clickable  @click="updatePrinter(props)" text-color="white">
                                                            Active
                                                        </q-chip>
                                                    </div>                                                    
                                                </template>
                                                <template v-else>
                                                    <div class="text-center">
                                                        <q-chip color="deep-orange" clickable  @click="updatePrinter(props)" text-color="white">
                                                            Not Used
                                                        </q-chip>
                                                    </div>                                                    
                                                </template>
                                            </q-td>
                                        </template>

                                        <template v-slot:body-cell-action="props">
                                            <q-td :props="props">
                                                <div class="text-center">
                                                    <q-btn dense round flat color="grey" @click="setDeletePrinterDialog(props)"  icon="delete"></q-btn>
                                                </div>                                               
                                            </q-td>
                                        </template>

                                        </q-table>
                                </div>
                                
                            </q-tab-panel>
                            
                        </q-tab-panels>
                        </template>

                    </q-splitter>
                    </q-tab-panel>

                    <q-tab-panel name="other">
                        <div class="text-h6">Other</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
                </q-tab-panels>
            </div>     
        </div>

        <!-- All Dialog comes here -->

        <q-dialog v-model="printerDialog">
            <q-card style="width: 700px; max-width: 80vw;" class="">
                <q-card-section >
                    <h6 class="q-ml-sm q-mt-md q-mb-none text-weight-medium text-light-blue-7 text-h5">Add Printer</h6>
                </q-card-section>
                <q-card-section>
                    <div class="col-xs-12 col-sm-12 col-md-12 row q-px-sm q-py-none q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <p class="text-subtitle1 q-mb-xs">Printer Name</p>
                            <q-input v-model="description" dense outlined color="light-blue-7"/>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <p class="text-subtitle1 q-mb-xs">IP Address</p>
                            <q-input v-model="ipAddress" dense outlined color="light-blue-7"/>
                        </div>                      
                    </div>
                </q-card-section>  
                <q-card-actions align="right" class="q-pa-md">
                    <q-btn label="Cancel" flat v-close-popup no-caps />
                    <q-btn @click="savePrinter" color="light-blue-7" label="Save" no-caps /> 
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="deletePrinterDialog">
            <q-card style="width: 700px; max-width: 80vw;" class="">
                <q-card-section >
                    <h6 class="q-ml-sm q-mt-md q-mb-none text-center text-weight-medium text-light-blue-7 text-h6">Are you sure you want to delete this printer?</h6>
                </q-card-section>
                <q-card-actions align="center" class="q-pa-md">
                    <q-btn label="Cancel" flat v-close-popup no-caps />
                    <q-btn @click="confirmDeletePrinter()" color="negative" label="Delete" unelevated no-caps /> 
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>

import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
    name: 'Settings',
    data() {
       return {
            tab: 'utilities',
            innerTab: 'printers',
            splitterModelUtilities: 10,
            splitterModelPersonalInformation: 20,

            filter: '',

            columns: [
                {
                    name: 'description',
                    label: 'Description',
                    field: ''
                },
                {
                    name: 'ip_address',
                    label: 'IP Address',
                    field: ''
                },
                {
                    name: 'status',
                    label: 'Status',
                    field: ''
                },
                {
                    name: 'action',
                    label: 'Action',
                    field: ''
                }
            ],

            data: [],

            description: '',
            ipAddress: '',

            printerDialog: false,

            deletePrinterDialog: false,
            deletePrinterID: ''
       }    
    },
    async mounted () {
        await this.getPrinter()
    },

    methods: {        

        async getPrinter(){
            await api
                .get('/api/v1/printer/')
                .then(response => {
                    this.data = response.data
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        updatePrinter(props){ 
            if(props.row.active == true) {

                const formData = {
                    active: false,
                    description: props.row.description,
                    ip_address: props.row.ip_address
                }
                    api
                    .put(`/api/v1/printer/${props.row.id}/`, formData)
                    .then(response => {
                        location.reload()
                    })
                    .catch(error => {
                        // console.log(error)
                })

            } else {

                const formData = {
                    active: true,
                    description: props.row.description,
                    ip_address: props.row.ip_address
                }
                    api
                    .put(`/api/v1/printer/${props.row.id}/`, formData)
                    .then(response => {
                        location.reload()
                    })
                    .catch(error => {
                        // console.log(error)
                })
            }          
        },

        addPrinterDialog() {
            this.printerDialog = true
        },

        async savePrinter() {
            const formData = {
                description: this.description,
                ip_address: this.ipAddress                
            }

            await api
                .post('/api/v1/printer/', formData)
                .then(response => {
                    Notify.create({
                        message: 'Successfully Added.',
                        type:'positive',
                        position: 'top'
                    })

                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        },

        setDeletePrinterDialog(props) {
            this.deletePrinterDialog = true
            this.deletePrinterID = props.row.id
        },

        confirmDeletePrinter() {
            api
                .delete(`/api/v1/printer/${this.deletePrinterID}`)
                .then(response => {
                    location.reload()
                })
                .catch(error => {
                    // console.log(error)
                })
        }
    }
}
</script>