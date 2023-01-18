<template>
    <div>
        <div class="q-px-lg">
            <div class="row q-mt-xl">
                <h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Appointed Patients</h4>
                <div class="col-md-3 q-mt-sm"></div>

            <!-- <PatientCountToday /> -->
            </div>
        	<div class="q-pa-md">
				<q-table
					:rows="data"
					:columns="columns"
					row-key="referenceNo"
					bordered
					flat
					:filter="filter"
					@row-click="onRowClick" 
					dense 
				>

					<template v-slot:top-right >
						<q-input class="q-mt-md" standout="bg-light-blue-7" dense debounce="300" v-model="filter" placeholder="Search">
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

					<template v-slot:body-cell-referenceNo="props">            
						<q-td  :props="props">
							<div class="text-deep-purple-13 text-weight-bold text-subtitle2 text-center q-my-md">                  
								{{ props.value }}     
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-approved_date="props">
						<q-td class="text-left" :props="props">
							<div class="text-left q-my-md">
								<div class="text-subtitle2">
									{{ dateAM(props.row.date_created) }} 
								</div>
								<div>
									{{ dateWhole (props.row.date_created) }} 
								</div>   
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-full_name="props">
						<q-td :props="props">					                 
							<div class="text-left text-subtitle2">{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }}
								<template v-if="props.row.patient_id == null">   
									<q-chip size="sm" color="positive" text-color="white">
										New Patient
									</q-chip> 
								</template>
								<template v-else>
								<q-chip size="sm" color="accent" text-color="white">
									{{ props.row.patient_id }}
								</q-chip>
								</template> 
							</div>
							<div class="text-left">{{ props.row.sex }}</div>                      
														
							
							
							<!-- <template v-if="props.row.patient_id == null">                    
								<div class="text-left text-subtitle2">{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }} 
									<q-chip size="sm" color="positive" text-color="white">
										New Patient
									</q-chip> 
								</div>
								<div class="text-left">{{ props.row.sex }}</div>   
							</template>
							<template v-else>
								<div class="text-left text-subtitle2" >{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }} 
									<q-chip size="sm" color="accent" text-color="white">
										{{ props.row.patient_id }}
									</q-chip> 
								</div>                   
								<div class="text-left">{{ props.row.sex }}</div>                                   
							</template>                    -->
						</q-td>
					</template>

					<template v-slot:body-cell-appointment="props">
						<q-td :props="props">
							<template v-if="props.row.auxiliary !== null ">                  
								<div class="text-left text-subtitle2">
									{{ props.row.auxiliary.title }}
								</div>
							</template>
							<template v-else>
								<div class="text-left text-subtitle2">
									Dr. {{ props.row.doctor_fullname }}                          
								</div>
								<div class="text-left">
									{{ dateWhole(props.row.schedule.days) }}
								</div>
								<div class="text-left text-caption">
									{{ props.row.from_time_format }} - {{ props.row.to_time_format }}
								</div>
							</template>
						</q-td>
					</template>     

					<template v-slot:body-cell-contact_number="props">
						<q-td :props="props">
							<template v-if="props.row.patient_id == null">
								<div class="text-center q-my-md">                  
									{{ props.row.contact_number }}
								</div>
							</template>
							<template v-else>
								<div class="text-center">
									{{ props.row.patient_id.contact_number}}
								</div>                    
							</template>               
						</q-td>
					</template> 
			
					<template v-slot:body-cell-action="props">
						<q-td :props="props">
							<q-btn dense round flat color="grey" @click="editScheduleDialogFn(props)" icon="edit_calendar">
								<q-tooltip>
									Edit patient schedule.
								</q-tooltip>
							</q-btn>              
							<q-btn dense round flat color="grey" @click="transferScheduleDialogFn(props)" icon="autorenew">
								<q-tooltip>
									Transfer to another doctor.
								</q-tooltip>
							</q-btn>    
							<q-btn dense round flat color="grey" @click="deleteConfirmDialogFn(props)" icon="close">
								<q-tooltip>
									Cancel appointment.
								</q-tooltip>
							</q-btn>          
							</q-td>
					</template>

				</q-table>
			</div>        
		</div>

    	<q-separator/>

		<div class="q-px-lg">
			<div class="q-pa-lg">            
				<div class="row">
					<div style="height: 2rem">
						<span style="font-size: 1rem;" class="row col-md-12 text-light-blue-7 text-weight-bold">Reference No.</span>
						<span style="font-size: 1.5em;" class="row col-md-12 text-bold text-subtitle1 text-deep-purple-13">{{ referenceNo }}</span>           
					</div>
				</div>
				
				<div class="row" style="height: 4rem">
					<div class="text-subtitle1 text-light-blue-7 text-weight-bold q-py-lg col-md-6">Patient Information
						<template v-if="patientStatus == 'New Patient' "> 
							<q-chip color="positive" text-color="white">
								New Patient
							</q-chip>
						</template>              
						<template v-else-if="patientStatus"> 
							<q-chip color="accent" text-color="white">
								{{ patientStatus }}
							</q-chip>
						</template> 
					</div>                
				</div> 

				<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
					<div class="col-xs-12 col-sm-12 col-md-3">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Last Name</p>   
						<q-input disable v-model="lastName" dense outlined color="light-blue-7"/>      
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3">
						<p class="text-subtitle2 text-weight-light q-mb-xs">First Name</p>                 
						<q-input disable v-model="firstName" dense outlined color="light-blue-7"/>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3" >
						<p class="text-subtitle2 text-weight-light q-mb-xs">Middle Name</p>                  
						<q-input disable v-model="middleName" dense outlined color="light-blue-7"/>               
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Sex</p>                  
						<q-input disable v-model="sex" dense outlined color="light-blue-7"/>        
					</div>                    
				</div>

				<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
					<div class="col-xs-12 col-sm-12 col-md-6">
						<p class="text-subtitle-2 text-weight-light q-mb-xs">Nationality</p>
						<q-input disable v-model="nationality" dense outlined color="light-blue-7" />
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<p class="text-subtitle-2 text-weight-light q-mb-xs">Religion</p>
						<q-input disable v-model="religion" dense outlined color="light-blue-7" />
					</div>
				</div>

				<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
					<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Birthdate</p>					
							<!-- {{ birthdateFormat(birthdate) }} -->					
						<q-input disable v-model="birthdate" dense outlined color="light-blue-7"></q-input>
					</div>                  
					<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Contact Number</p>                  
						<q-input disable v-model="contactNumber" dense outlined color="light-blue-7"></q-input>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Email</p>                  
						<q-input disable v-model="email" dense outlined color="light-blue-7"></q-input>
					</div>                   
				</div>

				<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
					<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Home No.</p>
						<q-input disable v-model="homeNo" dense outlined color="light-blue-7"></q-input>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Street</p>
						<q-input disable v-model="street" dense outlined color="light-blue-7"></q-input>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
						<p class="text-subtitle2 text-weight-light q-mb-xs">Address</p>
						<q-input disable v-model="address" dense outlined color="light-blue-7"></q-input>
					</div>                   
				</div>

				<div class=" q-mb-sm text-subtitle1 text-light-blue-7 text-weight-bold"> Other Information</div>
				<div class="row col-xs-12 col-md-12 q-col-gutter-md">              
					<div class="col-xs-12 col-sm-12 col-md-6">
						<div class="q-my-sm">                
							<div class="row q-col-gutter-md q-mb-sm col-xs-12 col-sm-12 col-md-12">
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">Height</p>
										<q-input v-model="height" suffix="cm" dense outlined color="light-blue-7"></q-input>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">Weight</p> 
									<q-input v-model="weight" suffix="kg" dense outlined color="light-blue-7"></q-input>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">Temperature</p>
									<q-input v-model="temperature" suffix="c�" dense outlined color="light-blue-7"></q-input>
								</div>  
							</div>
							<div class="row q-col-gutter-md q-mb-sm">
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">Blood Pressure</p>   
									<q-input v-model="bloodPressure" dense outlined color="light-blue-7"></q-input>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">Pulse Rate</p>
									<q-input v-model="pulseRate" dense outlined color="light-blue-7"></q-input>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4">
									<p class="text-subtitle2 text-weight-light q-mb-xs">SPO2</p>
									<q-input v-model="sp02" dense outlined color="light-blue-7"></q-input>
								</div>     
							</div>                 
						</div>
						<div class="q-mb-sm">
							<template v-if="this.auxiliary">                
								<p class="text-subtitle2 text-weight-light q-mb-xs">Auxiliary</p>
								<q-input disable v-model="auxiliary" dense outlined color="light-blue-7"></q-input>             
							</template>
							<template v-else>                
								<p class="text-subtitle2 text-weight-light q-mb-xs">Doctor</p>
								<q-input disable v-model="doctor" dense outlined color="light-blue-7"></q-input>                
							</template>              
						</div>
						<div>
							<p class="text-subtitle2 text-weight-light q-mb-xs">Complaint</p>
							<q-input disable type="textarea" v-model="complaint" dense outlined color="light-blue-7"></q-input>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 q-mt-sm">
						<div class="col-xs-12 col-sm-12 col-md-6 q-mb-sm" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Payment Method</p>
							<q-input disable v-model="paymentMethod" dense outlined color="light-blue-7"></q-input>
						</div>
						<template v-if="paymentMethod == 'HMO'">
							<div class="col-xs-12 col-sm-12 col-md-6 q-mb-sm" color="light-blue-7">
								<p class="text-subtitle2 text-weight-light q-mb-xs">HMO</p>
								<q-input disable v-model="hmoco" dense outlined color="light-blue-7"></q-input>
							</div> 
						</template>                
						<div class="col-xs-12 col-sm-12 col-md-6 q-mb-sm" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Classification</p>
							<q-input disable v-model="classification" dense outlined color="light-blue-7"></q-input>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Service Type</p>
							<q-input disable v-model="serviceType" dense outlined color="light-blue-7"></q-input>
						</div>                  
						<div class="q-mb-xl q-mt-xl row justify-end">
							<q-btn @click="submit()" color="light-blue-7">Confirm</q-btn>
						</div>   
					</div>
				</div>          
			</div>        
		</div>	

	<!-- Edit Schedule Dialog Box -->

		<q-dialog v-model="editScheduleDialog" persistent>
			<q-card style="width: 1200px; max-width: 120vw;">
				<q-card-section class="q-pb-none">
					<h5 class="text-h5 q-my-xs text-light-blue-7 text-weight-medium">Change Schedule</h5>
				</q-card-section>
				<q-card-section class="q-px-lg q-pb-none">
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-5">	
							<h6 class="text-h6 q-ma-none">Dr. {{ editDoctor.doctor_fullname }}</h6>
							<p class="q-ma-none">{{ editDoctor.SPECIALIZATION }}</p>					
							<p class="text-subtitle1 text-weight-medium">Clinic No: {{ editDoctor.CLINICNO }}</p>								
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">
							<h6 class="text-h6 q-ma-none q-mb-sm">Schedule</h6>	
							<template v-if="editSelectedScheduleID">
								<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ editFinalDayOfWeeks }}, {{ editFinalDays }}</p>						
								<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ editFinalDateFromDate }} - {{ editFinalDateToDate }}</p>
							</template>
							<template v-else>
								<p class="text-weight-medium text-subtitle1"><q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule selected.</p>
							</template>
						</div>
					</div>				
				</q-card-section>
				<q-card-section class="q-py-lg">
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-5">
							<div class="q-mb-md">
								<q-date v-model="date" :events="editNewEvent" event-color="accent" @click="editSelectDate" landscape />
							</div>						
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">				
							<q-table
								title="Available Time"
								:rows="editNewFilterDoctorScheduleData"
								:columns="editDoctorScheduleDataColumns"
								row-key="id"
								bordered
								flat
								:filter="filter"
								@row-click="editOnRowClickDate"
							>

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

								<template v-slot:body-cell-from_time="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.from_time_format }}
										</div>
									</q-td>
								</template>

								<template v-slot:body-cell-to_time="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.to_time_format }}                                            
										</div>
									</q-td>
								</template>

								<template v-slot:body-cell-patient_limit="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.patient_limit }}
										</div>
									</q-td>
								</template>
							</q-table>    
						</div>
					</div>				
				</q-card-section>
				<q-card-actions align="right" class="bg-white text-teal q-pa-lg">
					<q-btn flat label="Cancel" class="text-grey-8" @click="cancelEditSchedule" v-close-popup />
					<q-btn label="Confirm" class="bg-light-blue-7 text-white" style="min-width: 100px" @click="confirmEdit" />
				</q-card-actions>
			</q-card>
		</q-dialog>

	<!-- Transfer Patient Dialog Box -->

		<q-dialog v-model="transferDialog" persistent>
			<q-card style="width: 1200px; max-width: 120vw;">
				<q-card-section>
					<h5 class="text-h5 q-my-md text-light-blue-7 text-weight-medium">Transfer Schedule</h5>
					<div class="col-xs-12 col-sm-12 col-md-12">
						<h6 class="text-h6 q-ma-none q-mb-sm">Search Doctor</h6>
						<div class="row q-col-gutter-md">
							<div class="col-xs-12 col-sm-12 col-md-10">
								<q-select clearable label="Search doctor.." class="q-mb-md col-xs-12 col-sm-12 col-md-12 " dense v-model="transferDoctor" @filter="filterFnDoctor" use-input :options="doctorSearch" option-value="id" option-label="doctor_fullname" emit-value map-options  outlined color="light-blue-7">
									<template v-slot:option="scope">
										<q-item v-bind="scope.itemProps">
											<q-item-section>
												<q-item-label>Dr. {{ scope.opt.LASTNAME }}, {{ scope.opt.FIRSTNAME }} {{ scope.opt.MIDDLENAME }}<span caption></span></q-item-label>
												<small class="text-grey-10">{{ scope.opt.SPECIALIZATION }}</small>
											</q-item-section>
										</q-item>
									</template>  
								</q-select>	
							</div>
							<div class="col-xs-12 col-sm-12 col-md-2">
								<q-btn icon="event" size="md" class="q-mb-sm" @click="transferDoctorScheduleFn" label="View Schedule" no-caps bordered square flat color="light-blue-7" />
							</div>
						</div>					
						
						<template v-if="transferApprovedStatus == false">
							<q-card class="my-card">
								<q-card-section class="bg-light-blue-7 text-white">
									<h6 class="text-h6 q-ma-none">Previous Appointment</h6>																							
								</q-card-section>
								<q-card-section>
									<h6 class="text-h6 q-ma-none">Dr. {{ transferDoctorFullname }}</h6>
									<p class="q-ma-none">{{ transferDoctorSpecialization }}</p>					
									<p class="text-subtitle1 text-weight-medium">Clinic No: {{ transferDoctorClinicNo }}</p>
									<template v-if="transferSelectedScheduleID">
										<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ transferFinalDayOfWeeks }}, {{ transferFinalDays }}</p>						
										<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ transferFinalDateFromDate }} - {{ transferFinalDateToDate }}</p>
									</template>
									<template v-else>
										<q-banner inline-actions rounded dense class="bg-orange text-white">
											<q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule selected.
										</q-banner>
									</template>
								</q-card-section>							
							</q-card>
						</template>
						<template v-else>
							<q-card class="my-card">
								<q-card-section class="bg-positive text-white">							
									<h6 class="text-h6 q-ma-none">New Appointment</h6>																					
								</q-card-section>
								<q-card-section>
									<h6 class="text-h6 q-ma-none">Dr. {{ transferDoctorFullname }}</h6>
									<p class="q-ma-none">{{ transferDoctorSpecialization }}</p>					
									<p class="text-subtitle1 text-weight-medium">Clinic No: {{ transferDoctorClinicNo }}</p>
									<template v-if="transferSelectedScheduleID">
										<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ transferFinalDayOfWeeks }}, {{ transferFinalDays }}</p>						
										<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ transferFinalDateFromDate }} - {{ transferFinalDateToDate }}</p>
									</template>
									<template v-else>
										<q-banner inline-actions rounded class="bg-orange text-white">
											<q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule selected.
										</q-banner>
									</template>
								</q-card-section>							
							</q-card>
						</template>					
					</div>			
				</q-card-section>
				<q-card-actions align="right" class="q-pa-md">
					<q-btn color="light-blue-7" label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="transferScheduleDialog" persistent>
			<q-card style="width: 1200px; max-width: 120vw;">
				<q-card-section class="q-px-lg q-mt-md q-pb-none">
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-5">	
							<h6 class="text-h6 q-ma-none">Dr. {{ transferDoctor.doctor_fullname }}</h6>
							<p class="q-ma-none">{{ transferDoctor.SPECIALIZATION }}</p>					
							<p class="text-subtitle1 text-weight-medium">Clinic No: {{ transferDoctor.CLINICNO }}</p>								
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">
							<h6 class="text-h6 q-ma-none q-mb-sm">Schedule</h6>	
							<template v-if="transferSelectedScheduleID">
									<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ transferFinalScheduleDayOfWeeks }}, {{ transferFinalScheduleDays }}</p>						
									<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ transferFinalScheduleDateFromDate }} - {{ transferFinalScheduleDateToDate }}</p>
							</template>	
							<template v-else>
								<q-banner inline-actions rounded class="bg-orange text-white">
									<q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule selected.
								</q-banner>	
							</template>	
						</div>
					</div>				
				</q-card-section>
				<q-card-section class="q-py-lg">
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-5">
							<div class="q-mb-md">
								<q-date v-model="date" :events="transferNewEvent" event-color="accent" @click="transferSelectDate" landscape />
							</div>	
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">				
							<q-table
								title="Available Time"
								:rows="transferNewFilterDoctorScheduleData"
								:columns="transferDoctorScheduleDataColumns"
								row-key="id"
								bordered
								flat
								:filter="filter"
								@row-click="transferOnRowClickDate"
							>

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

								<template v-slot:body-cell-from_time="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.from_time_format }}
										</div>
									</q-td>
								</template>

								<template v-slot:body-cell-to_time="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.to_time_format }}                                            
										</div>
									</q-td>
								</template>

								<template v-slot:body-cell-patient_limit="props">
									<q-td :props="props">
										<div class="text-grey-9 text-center">
											{{ props.row.patient_limit }}
										</div>
									</q-td>
								</template>
							</q-table>    
						</div>
					</div>
					
				</q-card-section>
				<q-card-actions align="right" class="bg-white text-teal q-pa-lg">
					<q-btn flat label="Cancel" class="text-grey-8" @click="cancelTransferSchedule" v-close-popup />
					<q-btn label="Confirm" class="bg-light-blue-7 text-white" style="min-width: 100px"  @click="confirmTransfer"  v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

	<!-- Delete Dialog Box -->

		<q-dialog v-model="deleteConfirmDialog">
			<q-card>        
				<q-card-section class="row items-center">
					<q-avatar icon="delete_forever" color="light-blue-7" text-color="white" />
					<span class="q-ml-sm">Are you sure want to cancel this appointment?</span>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="No" color="light-blue-7" v-close-popup />
					<q-btn flat label="Yes" @click="deleteConfirm" color="light-blue-7" />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- Settings Dialog Box -->

		<q-dialog v-model="goToPrinterSettingsDialog" pesistent>
                <q-card style="width: 700px; max-width: 80vw;" class="">
                    <q-card-section >
                        <h6 class="q-ml-sm q-mt-md q-mb-none text-center text-weight-medium text-light-blue-7 text-h6">No printer detected.</h6>
                    </q-card-section>
                    <q-card-actions align="center" class="q-pa-md">                        
                        <q-btn color="light-blue-7" label="Go to Settings" :to="{name: 'Settings'}" unelevated />                                
                    </q-card-actions>
                </q-card>
            </q-dialog>

  	</div>
</template>

<script>

import { api } from 'boot/axios'
import { date } from 'quasar'
import { Notify } from 'quasar'
import PatientCountToday from 'components/PatientCountToday.vue'


export default {
    name: 'ApprovedList',
    data() {
        return {    			
			rowDoctorID: '',
			filter: '',
			disable: true,
          	columns: [
				{
					name: 'referenceNo',
					label: 'Reference No.',
					field: row => row.reference_no
				},
				{
					name: 'approved_date',
					label: 'Approved date',
				},
				{
					name: 'full_name',
					label: 'Full Name',
					// field: row => row.patient_id == null ? row.last_name + ', ' + row.first_name + ' ' + row.middle_name : row.patient_id.last_name + ', ' + row.patient_id.first_name + ' ' + row.patient_id.middle_name
					field: row => row.last_name + ', ' + row.first_name + ' ' + row.middle_name
				},
				{
					name: 'appointment',
					label: 'Appointment',
					field: ''
				},
				{
					name: 'contact_number',
					label: 'Contact Number',
					field: row => row.patient_id == null ? row.contact_number : row.patient_id.contact_number,
						classes:['text-center']
				},
				{
					name: 'action',
					label: 'Action',
					field: ''
				}            
          	],

          	data: [],

          	patientStatus: '',

			patientApi: [],
          	patientSearch: [],
         	patient: '',

          	referenceNo: '',
          	lastName: '',
          	firstName: '',
          	middleName: '',
          	sex: '',
          	birthdate: '',
          	birthplace: '',
          	civilStatus: '',
          	bloodType: '',
          	contactNumber: '',
          	email: '',
          	homeNo: '',
          	street: '',
          	address: '',
          	addressId: '' ,

          	payment: 'Cash',

			paymentOptions: [
				{
					label: 'Cash',
					value: 'Cash'
				},
				{
					label: 'HMO',
					value: 'HMO'
				}
			],

			weight: '',
			height: '',
			temperature: '',
			bloodPressure: '',
			pulseRate: '',
			sp02: '',

			paymentMethod: '',
			hmoco: '',
			classification: '',
			serviceType: '',

			nationality: '',
			religion: '',
			auxiliary: '',
			auxiliaryID: '',
          
			doctorApi: [],
			doctorSearch: [],
			doctor: '',	
			clinic_no: '',			

			scheduleID: '',
			patientID: '',

          	confirmIDUpdate: '',

          	complaint: '',

          	onefDoctor: '',         
			
			// Delete Appointment Schedule 

			deleteConfirmDialog: false,
			deleteID: '',

         	 // Edit Appointment Schedule

			editDoctorScheduleData: [],
          	editNewFilterDoctorScheduleData: [],
          	date: date.formatDate(Date.now(), 'YYYY/MM/DD'),

          	editDoctorScheduleDataColumns: [
            	{
              		name:'from_time',
              		label: 'Start Time',
              		field: row => date.formatDate(row.from_time, 'hh:mm:ss A')
				},
				{
					name: 'to_time',
					label: 'End Time',
					field: row => date.formatDate(row.to_time, 'hh:mm:ss A')
				},
				{
					name: 'patient_limit',
					label: 'Patient Limit',
					field: ''
				}
          	],

			editDoctor: '',

          	editNewEvent: [],
          	editScheduleDialog: false,
          	editSelectedScheduleID:'',
			editFinalDateFromDate: '',
			editFinalDateToDate:'',
			editFinalDays:'',
			editFinalDayOfWeeks:'',
			
			// Transfer Appointment Schedule

			transferDoctorScheduleData: [],
          	transferNewFilterDoctorScheduleData: [],

			transferDoctorScheduleDataColumns: [
            	{
					name:'from_time',
					label: 'Start Time',
					field: row => date.formatDate(row.from_time, 'hh:mm:ss A')
				},
				{
					name: 'to_time',
					label: 'End Time',
					field: row => date.formatDate(row.to_time, 'hh:mm:ss A')
				},
				{
					name: 'patient_limit',
					label: 'Patient Limit',
					field: ''
				}
          	],

			transferDoctor: '',
			
			transferNewEvent: [],
			
			transferDialog: false,
          	transferScheduleDialog: false,
			transferDoctorApproved: false,		

			transferDoctorFullname: '',
			transferDoctorSpecialization: '',
			transferDoctorClinicNo: '',

			transferSelectedScheduleID:'',
			transferFinalDateFromDate: '',
			transferFinalDateToDate:'',
			transferFinalDays:'',
			transferFinalDayOfWeeks:'',
			
			transferApprovedStatus: '',

			goToPrinterSettingsDialog: false,

			printerDescription: '',
			printerIpAdress: '',
        }
    },

    components: {
		PatientCountToday
    },   

    async mounted() {   
		await this.getPrinter()
        await this.getSchedulePatientLimit()
        await this.getOnefDoctor()       
        await this.getApprovedList()
        await this.getOnefExactDoctor()
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

		async getPrinter() {
            await api 
                .get('/api/v1/printer/')
                .then(response => {
                    if (response.data.length === 0) {
                        this.goToPrinterSettingsDialog = true
                    } else {
                        api
                        .get('/api/v1/active-printer/')
                        .then(response => {
                            this.printerDescription = response.data[0].description
                            this.printerIpAddress = response.data[0].ip_address                            
                        })
                    } 
                })
        },


        async getApprovedList() {
			await api
            	.get('/api/v1/approved-list/')
            	.then(response => {
					this.data = response.data
              		let onefDoctorData = this.onefDoctor          

              		this.data.map(x => {

						let doctor_fullname = onefDoctorData.filter(item => {                  
							try{
								return item.doctor_id == x.schedule.doctor 
							} catch(error){ }                                 
						})
					
						if(doctor_fullname.length > 0){
							x['doctor_fullname'] = doctor_fullname[0].doctor_fullname
							x['clinic_no'] = doctor_fullname[0].CLINICNO               
						} else {
							x['doctor_fullname'] = ''
							x['clinic_no'] = ''
						}                  
              		})             
            	})
				.catch(error => {
					// console.log(error)
				})
        },

        async getSchedulePatientLimit(){
            await api
				.get('/api/v1/schedule-patient-limit/')
				.then(response => { })
              	.catch(error => {
					// console.log(error)
              	})
        },

        async getOnefDoctor(){
            await api
				.get('/api/v1/onef_doctor/')
              	.then(response => {
					this.onefDoctor = response.data
              	})
              	.catch(error => {
                	// console.log(error)
             	})
        },

		filterFnDoctor(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.doctorSearch = this.onefDoctor.filter(v => v.doctor_fullname.toLowerCase().indexOf(needle) > -1)              
			})
		},	

      	getReferenceRow(props) {
        	this.referenceNo = props.row.reference_no
		},

		onRowClick(evt, row) {    
			if(row.patient_id == null){
				this.patient = null
				this.referenceNo = row.reference_no
				this.lastName = row.last_name
				this.firstName = row.first_name
				this.middleName = row.middle_name
				this.sex = row.sex
				this.birthdate = date.formatDate(row.birthdate, 'MMMM D, YYYY')
				this.birthplace = row.birthplace
				this.civilStatus = row.civil_status
				this.bloodType = row.blood_type    
				this.contactNumber = row.contact_number
				this.email = row.email
				this.homeNo = row.home_no
				this.street = row.street
				this.address = row.address
				this.patientStatus = 'New Patient'
				this.paymentMethod = row.payment_method
				this.hmoco = row.hmoco
				this.classification = row.classification
				this.serviceType = row.service_type         
				
				if(row.auxiliary){
					this.auxiliary = row.auxiliary.title
					this.auxiliaryID = row.auxiliary.id
					this.doctor = null 
					this.scheduleID = null
				} else {
					this.rowDoctorID = row.schedule.doctor
					this.doctor = row.doctor_fullname
					this.clinic_no = row.clinic_no
					
					this.scheduleID = row.schedule.id
					this.auxiliary = null
					
					this.transferApprovedStatus = row.transfer_approved 

					let daysFormatted = date.formatDate(row.schedule.days, 'MMMM DD, YYYY')
					let daysOfWeekFormatted = date.formatDate(row.schedule.days, 'dddd')	

					this.date = date.formatDate(row.schedule.days, 'YYYY/MM/DD')

					// <----- Edit Schedule ----->

					this.editSelectedScheduleID = row.schedule.id
					this.editFinalDateFromDate = row.from_time_format
					this.editFinalDateToDate = row.to_time_format
					this.editFinalDays = daysFormatted
					this.editFinalDayOfWeeks = daysOfWeekFormatted

					// <----- Transfer Schedule ----->
					
					this.transferSelectedScheduleID = row.schedule.id
					this.transferFinalDateFromDate = row.from_time_format
					this.transferFinalDateToDate = row.to_time_format
					this.transferFinalDays = daysFormatted
					this.transferFinalDayOfWeeks = daysOfWeekFormatted	
					this.transferApprovedStatus = row.transfer_approved 
									           
				}        

				this.nationality = row.nationality
				this.religion = row.religion
				this.complaint = row.complaint  
				
				this.confirmIDUpdate = row.id
				this.patientID = row.patient_id

			} else {

				this.patientStatus = row.patient_id
				this.referenceNo = row.reference_no
				this.lastName = row.last_name
				this.firstName = row.first_name
				this.middleName = row.middle_name
				this.sex = row.sex
				this.birthdate = date.formatDate(row.birthdate, 'MMMM D, YYYY')
				this.birthplace = row.birthplace
				this.civilStatus = row.civil_status
				this.bloodType = row.blood_type
				this.contactNumber = row.contact_number
				this.email = row.email
				this.homeNo = row.home_no
				this.street = row.street
				this.address = row.address 
				this.paymentMethod = row.payment_method
				this.hmoco = row.hmoco
				this.classification = row.classification
				this.serviceType = row.service_type				

				if (row.auxiliary){
					this.auxiliary = row.auxiliary.title
					this.auxiliaryID = row.auxiliary.id
					this.doctor = null 
					this.scheduleID = null
				} else {
					this.rowDoctorID = row.schedule.doctor
					this.doctor = row.doctor_fullname
					this.clinic_no = row.clinic_no

					this.scheduleID = row.schedule.id					
					this.auxiliary = null 

					this.transferApprovedStatus = row.transfer_approved 				

					let daysFormatted = date.formatDate(row.schedule.days, 'MMMM DD, YYYY')
					let daysOfWeekFormatted = date.formatDate(row.schedule.days, 'dddd') 

					this.date = date.formatDate(row.schedule.days, 'YYYY/MM/DD')

					// <----- Edit Schedule ----->

					this.editSelectedScheduleID = row.schedule.id
					this.editFinalDateFromDate = row.from_time_format
					this.editFinalDateToDate = row.to_time_format
					this.editFinalDays = daysFormatted
					this.editFinalDayOfWeeks = daysOfWeekFormatted

					// <----- Transfer Schedule ----->
					
					this.transferSelectedScheduleID = row.schedule.id
					this.transferFinalDateFromDate = row.from_time_format
					this.transferFinalDateToDate = row.to_time_format
					this.transferFinalDays = daysFormatted
					this.transferFinalDayOfWeeks = daysOfWeekFormatted	
					this.transferApprovedStatus = row.transfer_approved 			
										          
				}         

				this.nationality = row.nationality
				this.religion = row.religion
				this.complaint = row.complaint

				this.confirmIDUpdate = row.id
				this.patientID = row.patient_id
			}
		},

		async getOnefExactDoctor(){
			const doctorID = 1000

			await api
				.get(`/api/v1/onef_exact_doctor/${doctorID}/`)
              	.then(response => { })
              	.catch(error => {
					// console.log(error)
              	})
      	},

		// Edit Schedule //

		async editScheduleDialogFn(props){
			this.editScheduleDialog = true

			const doctorID = props.row.schedule.doctor

			await api
				.get(`/api/v1/onef_exact_doctor/${doctorID}/`)
				.then(response => {
					this.editDoctor = response.data[0]
				})
				.catch(error => {
					// console.log(error)
				})
				
			await api
				.get(`/api/v1/schedule-patient-limit-list/${doctorID}/`)
					.then(response => {  
						(response.data).map(item => {
							this.editNewEvent.push(date.formatDate(item.days, 'YYYY/MM/DD' ))                
						})  
						this.editDoctorScheduleData = response.data
					})
					.catch(error => { })   
		},

		editSelectDate(){
			let filterDoctorScheduleData =  this.editDoctorScheduleData.filter(item => {
				return date.formatDate(item.days, 'YYYY/MM/DD' ) == date.formatDate(this.date, 'YYYY/MM/DD' )         
			})

			this.editNewFilterDoctorScheduleData = filterDoctorScheduleData
		},

        editOnRowClickDate(evt, row){
			let daysFormatted = date.formatDate(row.days, 'MMMM DD, YYYY')
			let daysOfWeekFormatted = date.formatDate(row.days, 'dddd')    

			this.editSelectedScheduleID = row
			this.editFinalDateFromDate = row.from_time_format
			this.editFinalDateToDate = row.to_time_format
			this.editFinalDays = daysFormatted
			this.editFinalDayOfWeeks = daysOfWeekFormatted
      	},

		cancelEditSchedule(){
			this.editSelectedScheduleID = ''
		},

		confirmEdit() {
			const formUpdateSchedule = {
				schedule: this.editSelectedScheduleID.id
			}

			api			
				.put(`/api/v1/update-appointment-schedule/${this.confirmIDUpdate}/`, formUpdateSchedule)
				.then(response => {
					window.location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		// Transfer Schedule //

		async transferScheduleDialogFn(props){
			this.transferDialog = true

			const doctorID = props.row.schedule.doctor

			await api
				.get(`/api/v1/onef_exact_doctor/${doctorID}/`)
				.then(response => {

					this.transferDoctor = response.data[0]

					this.transferDoctorFullname = response.data[0].doctor_fullname
					this.transferDoctorSpecialization = response.data[0].SPECIALIZATION
					this.transferDoctorClinicNo = response.data[0].CLINICNO	
				})
				.catch(error => {
					// console.log(error)
				})
		},

		async transferDoctorScheduleFn() { 
			try {
				const doctorId = this.transferDoctor.doctor_id			

				if(doctorId == null) {
					Notify.create({
						message: 'Please select doctor first.',
						type: 'negative',
						position: 'top'
					})
				} else {
					this.transferFinalScheduleDateFromDate = this.transferFinalDateFromDate
					this.transferFinalScheduleDateToDate = this.transferFinalDateToDate
					this.transferFinalScheduleDays = this.transferFinalDays
					this.transferFinalScheduleDayOfWeeks = this.transferFinalDayOfWeeks

					this.transferScheduleDialog = true

					await api
						.get(`/api/v1/schedule-patient-limit-list/${doctorId}/`)
						.then(response => {  
							(response.data).map(item => {
								this.transferNewEvent.push(date.formatDate(item.days, 'YYYY/MM/DD' ))                
							})  
							this.transferDoctorScheduleData = response.data
							
						})
						.catch(error => {                
						})
				}
				
			} catch(err) {
				Notify.create({
					message: 'Please select doctor first.',
					type: 'negative',
					position: 'top'
				})
			}  
		},		

		transferSelectDate(){
			let filterDoctorScheduleData =  this.transferDoctorScheduleData.filter(item => {
				return date.formatDate(item.days, 'YYYY/MM/DD' ) == date.formatDate(this.date, 'YYYY/MM/DD' )         
			})

			this.transferNewFilterDoctorScheduleData = filterDoctorScheduleData
		},

		transferOnRowClickDate(evt, row){
			let daysFormatted = date.formatDate(row.days, 'MMMM DD, YYYY')
			let daysOfWeekFormatted = date.formatDate(row.days, 'dddd')    
			
			this.transferSelectedScheduleID = row

			this.transferFinalScheduleDateFromDate = row.from_time_format
			this.transferFinalScheduleDateToDate = row.to_time_format
			this.transferFinalScheduleDays = daysFormatted
			this.transferFinalScheduleDayOfWeeks = daysOfWeekFormatted
		},

		cancelTransferSchedule(){
			// this.transferSelectedScheduleID = ''
			this.transferNewEvent = []			
		},				

		confirmTransfer() {
			const formUpdateSchedule = {
				schedule: this.transferSelectedScheduleID.id,
				transfer_approved: true
			}

			api			
				.put(`/api/v1/update-appointment-schedule/${this.confirmIDUpdate}/`, formUpdateSchedule)
				.then(response => {
					window.location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},

		// Delete Schedule //

		deleteConfirmDialogFn(props){
			this.deleteID = props.row.id
			this.deleteConfirmDialog = true
		},

		async deleteConfirm() {
			const dataID = this.deleteID

			await api
				.delete(`/api/v1/approved-list/${dataID}/`)
				.then(response => {
					window.location.reload()
				})
				.catch(error => {
					// console.log(error)
				})
		},     

		submit(){
			const newPatientData = {
				patient_id: this.patientID,
				reference_no: this.referenceNo,
				last_name: this.lastName,
				first_name: this.firstName,
				middle_name: this.middleName,
				sex: this.sex,
				birthdate: date.formatDate(this.birthdate, 'YYYY-MM-DD'),
				birthplace: this.birthplace,
				civil_status: this.civilStatus,
				blood_type: this.bloodType,
				contact_number: this.contactNumber,
				email: this.email,
				home_no: this.homeNo,
				street: this.street,
				address: this.address,
				payment_method: this.payment,
				hmoco: this.hmoco,
				classification: this.classification,
				service_type: this.serviceType,
				schedule: this.scheduleID,
				auxiliary: this.auxiliaryID,
				complaint: this.complaint,
				nationality: this.nationality,
				religion: this.religion,
				height: this.height,
				weight: this.weight,
				temperature: this.temperature,
				blood_pressure: this.bloodPressure,
				pulse_rate: this.pulseRate,
				sp02: this.sp02, 
				
			}

			const setApprovalStatusFormdata = {
				approval_status: true,
			}
				
			api
				.post('/api/v1/doctor-patient/', newPatientData)
				.then(response => {
					Notify.create({
						message: 'Successfully approved.',
						type: 'positive',
						position: 'top'
					})

					const printFormData = {
						reference_no: response.data.reference_no,
						lastname: this.lastName,
						firstname: this.firstName,
						middlename: this.middleName,

						// Step One

						height: this.height,
						weight: this.weight,
						temperature: this.temperature,
						blood_pressure: this.bloodPressure,
						pulse_rate: this.pulseRate,
						sp02: this.sp02,
						
						// Step two

						hmoco: this.hmoco,
						
						// Step Three

						doctor_fullname: this.doctor,
						doctor_clinicno: this.clinic_no,

						ip_address: this.printerIpAddress
					}

					api
						.post('/api/v1/print_network_registration/', printFormData)
						.then(response => {
							window.location.reload()
						})
						.catch(error => {
							// console.log(error)
						})
					})
					.catch(error => {
						console.log(JSON.stringify(error))
					})

			api
				.patch(`/api/v1/approved-list/${this.confirmIDUpdate}/`, setApprovalStatusFormdata)
				.then(response => {	})
				.catch(error => {
					console.log(error)
				})				
		},
    }  
}
</script>