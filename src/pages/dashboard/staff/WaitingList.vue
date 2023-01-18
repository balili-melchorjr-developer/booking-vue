<template>
	<div>
    	<div class="q-px-lg">
      		<div class="row q-mt-xl">
        		<h4 class="text-h4 text-weight-medium text-light-blue-7 q-mt-sm col-md-6 align-center">Registered Online</h4>
				<div class="col-md-3 q-mt-sm">            
				</div>
						<!-- Patient Count Today Component -->
						<!-- <PatientCountToday /> -->              
			</div>
			<div class="q-pa-md">
				<q-table
					:rows="data"
					:columns="columns"
					row-key="reference_no"
					bordered
					flat
					:filter="filter" 
					dense
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

					<template v-slot:body-cell-reference_no="props">
						<q-td :props="props">
							<div>                  
								<q-btn class="text-deep-purple-13 text-weight-bold text-subtitle2 text-left q-my-md" flat @click="getReferenceRow(props)">{{ props.value }}</q-btn>
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-appointment_date="props">
						<q-td :props="props">
							<div class="text-grey-9 text-subtitle2 text-center">
								{{ dateMeridian(props.row.date_created) }}
							</div>
							<div class="text-weight-light text-center">
								{{ fullDate(props.row.date_created) }}
							</div>  
						</q-td>
					</template>

					<template v-slot:body-cell-full_name="props">
						<q-td :props="props">
							<div class="text-grey-9 text-left text-subtitle2">
								{{ props.row.last_name }}, {{ props.row.first_name }} {{ props.row.middle_name }}
							</div>
							<div class="text-left text-weight-light">
								{{ props.row.sex }}
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-address="props">
						<q-td :props="props">
							<div class="text-grey-9 text-left text-subtitle2">
								{{ props.row.home_no }} {{ props.row.street }}   
							</div>
							<div class="text-left text-weight-light">                               
								{{ props.row.address }}
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-birthdate="props">
						<q-td :props="props">
							<div class="text-grey-9">
								{{ props.value }}
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-contact_number="props">
						<q-td :props="props">
							<div class="text-grey-9 text-center">
								{{ props.row.contact_number }}
							</div>
						</q-td>
					</template>

					<template v-slot:body-cell-new_patient_action="props">
						<q-td :props="props">
							<q-btn dense round flat color="grey" @click="selectedRow(props)" icon="done">
								<q-tooltip>
									Select this item.
								</q-tooltip>
							</q-btn>
							<q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete">
								<q-tooltip>
									Delete this item.
								</q-tooltip>
							</q-btn>
						</q-td>
					</template>

				</q-table>
			</div>        
    	</div>

    	<q-separator/>
      
		<div class="q-px-lg">
			<div class="row ">
				<div class="col-md-8 q-pa-lg">  
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-6">              
							<q-select dense outlined v-model="patient" @update:model-value="patientIdCheckerFn" @filter="onSearch" use-input :options="patientApi" option-value="patient" option-label="full_name" emit-value map-options label="Search patient...">
								<template v-if="patient" v-slot:append>
									<q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
								</template>                        
							</q-select>
							<!-- <q-select dense outlined v-model="patient" @update:model-value="patientIdCheckerFn" @filter="filterFnPatient" use-input :options="patientSearch" option-value="patient" option-label="full_name" emit-value map-options label="Search patient...">
							<template v-if="patient" v-slot:append>
								<q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
							</template>                        
							</q-select>                                -->
						</div>
						<div class="col-md-6"  style="height: 2rem">
							<span style="font-size: 1rem;" class="row content-center justify-end col-md-12 text-light-blue-7 text-weight-bold">Reference No.</span>
							<span style="font-size: 1.5em;" class="row content-center justify-end col-md-12 text-bold text-subtitle1 text-deep-purple-13">{{ referenceNo }}</span>           
						</div>
					</div>
					
					<div class="row" style="height: 4rem">
						<div class="text-subtitle1 text-light-blue-7 text-weight-bold q-py-lg col-md-6">Patient Information
							<template v-if="lastName"> 
								<q-chip color="positive" text-color="white">
									New Patient
								</q-chip>
							</template>
							<template v-else-if="patient"> 
								<q-chip color="accent" text-color="white">
									{{ patient.PATIENTID }}
								</q-chip>
							</template>                 
						</div>                
					</div>

					<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
						<div class="col-xs-12 col-sm-12 col-md-3">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Last Name</p>
								<template v-if="patient == null">
									<q-input :disable="disable"  v-model="lastName" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.LASTNAME" dense outlined color="light-blue-7"/>
								</template>
								<template  v-else>
									<q-input :disable="disable" v-model="patient.LASTNAME" dense outlined color="light-blue-7"/>
								</template>                
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3">
							<p class="text-subtitle2 text-weight-light q-mb-xs">First Name</p>
								<template v-if="patient == null">
									<q-input :disable="disable" v-model="firstName" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.firstname" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.FIRSTNAME" dense outlined color="light-blue-7"/>
								</template>  
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3" >
							<p class="text-subtitle2 text-weight-light q-mb-xs">Middle Name</p>
								<template v-if="patient == null">
									<q-input :disable="disable" v-model="middleName" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.MIDDLENAME" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.MIDDLENAME" dense outlined color="light-blue-7"/>
								</template>                 
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Sex</p>
								<template v-if="patient == null">
									<q-select :disable="disable" v-model="sex" :options="sexOptions" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-select :disable="disable" v-model="patient.gender" :options="sexOptions" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-select :disable="disable" v-model="patient.gender" :options="sexOptions" dense outlined color="light-blue-7"/>
								</template>               
						</div>                    
					</div>

					<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Nationality</p>
								<template v-if="patient == null ">
									<q-select :disable="disable" color="light-blue-7" dense outlined v-model="nationality" @filter="filterFnNationality" use-input :options="nationalitySearch" option-value="nationality" option-label="nationality" emit-value map-options/>
								</template>
								<template v-else-if="patient.id">
									<q-select color="light-blue-7" :disable="disable" dense outlined v-model="patient.NATIONALITY" @filter="filterFnNationality" use-input :options="nationality" option-value="nationality" option-label="nationality" emit-value map-options/>
								</template>
								<template v-else>
									<q-select :disable="disable" color="light-blue-7" dense outlined v-model="patient.NATIONALITY" @filter="filterFnNationality" use-input :options="nationalitySearch" option-value="nationality" option-label="nationality" emit-value map-options/>               
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="tex-subtitle2 text-weight-light q-mb-xs">Religion</p>
								<template v-if="patient == null ">
									<q-select :disable="disable" color="light-blue-7" dense outlined v-model="religion" @filter="filterFnReligion" use-input :options="religionSearch" option-value="id" option-label="Religion" emit-value map-options/>                   
								</template>
								<template v-else-if="patient.id">
									<q-select  color="light-blue-7" :disable="disable" dense outlined v-model="patient.RELIGION" @filter="filterFnReligion" use-input :options="religion" option-value="description" option-label="Religion" emit-value map-options/>
								</template>
								<template v-else>
									<q-select :disable="disable" color="light-blue-7" dense outlined v-model="patient.RELIGION" @filter="filterFnReligion" use-input :options="religionSearch" option-value="id" option-label="Religion" emit-value map-options/>
								</template>
						</div>
					</div>

					<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Birth Place</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="birthplace" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.BIRTHPLACE" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.BIRTHPLACE" dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Civil Status</p>
								<template v-if="patient == null ">
									<q-select :disable="disable" v-model="civilStatus" :options="civilStatusOptions" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.CIVILSTAT" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.CIVILSTAT" dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Blood Type</p>
								<template v-if="patient == null ">
									<q-select :disable="disable" v-model="bloodType" :options="bloodTypeOptions" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.BLOODTYPE" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.BLOODTYPE" dense outlined color="light-blue-7"/>
								</template>
						</div>                   
					</div>

					<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-sm">
						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Birthdate</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="birthdate" type="date" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.dob" type="date" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.dob" type="date"  dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Contact Number</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="contactNumber" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.MOBILENO" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.MOBILENO" dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Email</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="email" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.email_add" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
								<q-input :disable="disable" v-model="patient.email_add" dense outlined color="light-blue-7"/>
									</template>
						</div>                   
					</div>

					<div class="row col-xs-12 col-sm-12 q-col-gutter-md q-mb-lg">

						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Home No.</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="homeNo" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.HOUSENO" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.HOUSENO" dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-3" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Street</p>
								<template v-if="patient == null ">
									<q-input :disable="disable" v-model="street" dense outlined color="light-blue-7"/>
								</template>
								<template v-else-if="patient.id">
									<q-input :disable="disable" v-model="patient.STREET" dense outlined color="light-blue-7"/>
								</template>
								<template v-else>
									<q-input :disable="disable" v-model="patient.STREET" dense outlined color="light-blue-7"/>
								</template>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-6" color="light-blue-7">
							<p class="text-subtitle2 text-weight-light q-mb-xs">Address</p>
								<template v-if="patient == null ">
									<q-select color="light-blue-7" :disable="disable" dense outlined v-model="address" @filter="filterFnAddress" use-input :options="addressSearch" option-value="address" option-label="full_address" emit-value map-options>
										<template v-if="patient" v-slot:append>
											<q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
										</template>
									</q-select>                     
								</template>
								<template v-else-if="patient.id">
									<q-select color="light-blue-7" :disable="disable" dense outlined v-model="patient.full_address" @filter="filterFnAddress" use-input :options="address" option-value="address" option-label="full_address" emit-value map-options>
										<template v-if="patient" v-slot:append>
											<q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
										</template>
									</q-select> 
								</template>
								<template v-else>
									<q-select color="light-blue-7" :disable="disable" dense outlined v-model="patient.full_address" @filter="filterFnAddress" use-input :options="addressSearch" option-value="id" option-label="full_address" emit-value map-options>
										<template v-if="patient" v-slot:append>
											<q-icon name="cancel" @click="clearAll" class="cursor-pointer" />
										</template>
									</q-select>
								</template>
						</div>                   
					</div>
				</div>

				<div class="col-md-4">
					<p class="q-my-lg text-subtitle1 text-light-blue-7 text-weight-bold">Other Information</p>
					<p class="q-my-md text-subtitle1 text-weight-medium q-mb-xs">Payment Method</p>
					<div>
						<q-option-group class="q-mb-lg" v-model="payment" inline dense :options="paymentOptions" color="light-blue-7" />
							<template v-if="payment == 'HMO'">
								<q-select clearable label="Search HMO..." class="q-mb-md" dense v-model="hmoco" @filter="filterFnHmoco" use-input :options="hmocoSearch" option-value="hmoco" option-label="hmoco" emit-value map-options  outlined color="light-blue-7" />
						</template>
					</div>

					<q-separator class="q-mb-lg"/>

					<q-select clearable label="Classification" class="q-mb-md" dense v-model="classification" @filter="filterFnClassification" use-input :options="classificationSearch" option-value="classification" option-label="classification" emit-value map-options  outlined color="light-blue-7" />
					<q-select clearable label="Service Type" class="q-mb-md" dense v-model="serviceType" @filter="filterFnServiceType" use-input :options="serviceTypeSearch" option-value="service_type" option-label="service_type" emit-value map-options  outlined color="light-blue-7" />
					
					<div class="row">                 
						<q-option-group class="q-mb-lg col-xs-12 col-sm-12 col-md-6" v-model="options" inline dense :options="otherOptions" color="light-blue-7" />              
							<template v-if="options == 'Doctor'">
								<div class="row col-xs-12 col-sm-12 col-md-6 justify-end">
									<q-btn icon="event" size="md" class="q-mb-sm" @click="doctorScheduleFn" label="View Schedule" no-caps bordered square flat color="light-blue-7" />
								</div>
							</template>
					</div>  

					<template v-if="options == 'Doctor'">
						<div class="">
							<q-select clearable label="Search Doctor.." class="q-mb-md col-xs-12 col-sm-12 col-md-12 " dense v-model="doctor" @filter="filterFnDoctor" use-input :options="doctorSearch" option-value="id" option-label="doctor_fullname" emit-value map-options  outlined color="light-blue-7">
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
					</template>
					<template v-else>
						<div>
							<q-select clearable label="Search Ancillary.." class="q-mb-md" dense v-model="auxiliary" @filter="filterFnAuxiliary" use-input :options="auxiliarySearch" option-value="id" option-label="title" emit-value map-options  outlined color="light-blue-7" />
						</div> 
					</template>                            
					<div>
						<q-input type="textarea" class="" v-model="complaint" dense outlined label="Complaint/Notes" />
					</div>
					<div class="q-mb-xl q-mt-xl row q-gutter-md justify-end">
						<q-btn flat color="grey-7" @click="clearAll">Clear</q-btn>
						<q-btn class="q-px-lg" outline color="secondary" @click="editField">Edit</q-btn>
						<q-btn class="q-px-lg" color="light-blue-7" @click="submit()">Submit</q-btn>
						<!-- <q-btn class="q-px-lg" rounded color="light-blue-7" @click="print">Print Me</q-btn>             -->
					</div>   
				</div>
			</div>        
		</div>

		<q-dialog v-model="confirm">
			<q-card>        
				<q-card-section class="row items-center">
					<q-avatar icon="delete_forever" color="light-blue-7" text-color="white" />
					<span class="q-ml-sm">Are you sure want to remove?</span>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="No" color="light-blue-7" v-close-popup />
					<q-btn flat label="Yes" @click="confirmDelete" color="light-blue-7" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="doctorSchedule" persistent>
			<q-card style="width: 1200px; max-width: 120vw;">
				<q-card-section>
					<div class="row q-col-gutter-md q-pa-md">
						<div class="col-xs-12 col-sm-12 col-md-5">
							<h6 class="text-h6 q-ma-none">Dr. {{ doctor.doctor_fullname }}</h6>
							<p>{{ doctor.SPECIALIZATION }}</p>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">
							<h6 class="text-h6 q-ma-none">Schedule</h6>
								<template v-if="selectedScheduleID">
									<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="event" class="q-mr-sm" color="light-blue-7" />{{ finalDayOfWeeks }}, {{ finalDays }}</p>						
									<p class="text-subtitle1 q-mb-xs"><q-icon size="sm" name="schedule" class="q-mr-sm" color="light-blue-7" />{{ finalDateFromDate }} - {{ finalDateToDate }}</p> 
								</template>
								<template v-else>
									<q-banner inline-actions dense rounded class="q-mt-sm bg-orange text-white">
									<q-icon size="sm" name="info" class="q-mr-md" color="white" />No schedule selected.
									</q-banner>
								</template>
						</div>            
					</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<div class="row q-col-gutter-md">
						<div class="col-xs-12 col-sm-12 col-md-5">
							<q-date v-model="date" :events="newEvent" event-color="accent" @click="selectDate" landscape />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-7">
							<q-table
								title="Available Time"
								:rows="newFilterDoctorScheduleData"
								:columns="doctorScheduleDataColumns"
								row-key="id"
								bordered
								flat
								:filter="filter"
								@row-click="onRowClick">

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
											<template v-if="props.row.patient">
												<template v-if="props.row.patient >= props.row.patient_limit">
													<q-icon name="warning" color="warning" size="1rem" /> {{ props.row.patient }} out of {{ props.row.patient_limit }}
													<q-tooltip>
														Patient limit exceeded
													</q-tooltip>
												</template>
												<template v-else>
													{{ props.row.patient }} out of {{ props.row.patient_limit }}
												</template>												
											</template>
											<template v-else>
												0 out of {{ props.row.patient_limit }}
											</template>
										</div>
									</q-td>
								</template>

								<!-- <template v-slot:body-cell-action="props">
									<q-td :props="props">
									<div class="row justify-center">
										<q-btn dense round flat color="grey" @click="editScheduleID(props)" icon="edit"></q-btn>
										<q-btn dense round flat color="grey" @click="deleteScheduleID(props)" icon="delete"></q-btn>
									</div>                                        
									</q-td>
								</template> -->
								
								</q-table>    
						</div>
					</div>
				</q-card-section>
				<q-card-actions align="right" class="q-pa-lg">
					<q-btn flat label="Cancel" @click="cancelSchedule" v-close-popup />
					<q-btn color="light-blue-7" label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="patientLimitDialog">
			<q-card class="bg-orange text-white" style="width: 400px">
				<q-card-section>
					<h6 class="text-h6 q-ma-sm text-center">Patient Limit Exceeded</h6>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<p class="text-center text-weight-medium text-body1">Are you sure you want to continue?</p>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn color="white" text-color="light-blue-7" label="OK" v-close-popup />
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
    name: 'WaitingList',
    data() {
		return {          
        	doctorSchedule: false,
        	doctorIdChecker: '',
        	doctorScheduleData: [],
			newFilterDoctorScheduleData:[],

        	date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        	newEvent: [],
        	splitterModel: 40,

        	filter: '',
        	disable: true,

        	doctorScheduleDataColumns: [
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
            		label: 'Patient',
            		field: ''
         		 }
			],

			columns: [
          		{
					name: 'reference_no',
            		label: 'Reference No.',
            		field: row => row.reference_no
          		},
				{
					name: 'appointment_date',
					label: 'Appointment date',
					field: row => date.formatDate(row.date_created, 'hh:mm A') + ' ' + date.formatDate(row.date_created, 'MMMM D, YYYY')
				},
				{
					name: 'full_name',
					label: 'Full Name',
					field: row => row.last_name + ' ' + row.first_name + ' ' + row.middle_name,
				},
				{
					name: 'address',
					label: 'Address',
					
				},
				{
					name: 'birthdate',
					label: 'Birthdate',
					field: row => date.formatDate(row.birthdate, 'MMMM D, YYYY')
				},
				{
					name: 'contact_number',
					label: 'Contact Number',
					field: row => row.contact_number,
					classes:['text-center']
				},
				{
					name: 'new_patient_action',
					label: 'Action',
					field: '',              
				}
        	],

        	data: [],

        	addressApi: [],
			addressSearch: [],          

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
			nationality: '', 
			religion: '',
			addressId: '' ,

			sexOptions: ['Male', 'Female'],
			civilStatusOptions: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
			bloodTypeOptions: ['A', 'AB', 'B', 'O', 'N/A'],
			
			dob: '',

			options: 'Doctor',
			otherOptions: [
				{
					label: 'Doctor',
					value: 'Doctor'
				},
				{
					label: 'Ancillary',
					value: 'Ancillary',
					disable: true
				}
			],

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
          
			doctorApi: [],
			doctorSearch: [],
			doctor: '',

			auxiliaryApi: [],
			auxiliarySearch: [],
			auxiliary: '',

			nationalityApi: [],
			nationalitySearch: [],
			nationality: '',

			religionApi: [],
			religionSearch: [],
			religion: '',

			classificationApi: [],
			classificationSearch: [],
			classification: '',

			serviceTypeApi: [],
			serviceTypeSearch: [],
			serviceType: '',

			hmocoApi: [],
			hmocoSearch: [],
			hmoco: '',

			complaint: '',

			patientIdChecker: '',
			confirm: false,
			confirmIDDelete: '',

			confirmIDUpdate: '',

			selectedScheduleID: '',

			finalDateFromDate: '',
			finalDateToDate: '',
			finalDays: '',
			finalDayOfWeeks: '',

			// Patient Limit Counts

			patientLimit: '',
			patientLimitDialog: false

      	}
    },

    components: {
		PatientCountToday,
    },

    async mounted() {
		await this.getDoctorList()
		await this.getPatientList()
		await this.getAddress()
		await this.getAuxiliary()
		await this.getNationality()
		await this.getReligion()
		await this.getWaitingList()
		await this.getOnefHmoco()
		await this.getOnefClassification()
		await this.getOnefServiceType()
    },

    methods: {
      	optionsFn(d) {
			return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
		},

		dateMeridian: function(dt){
			return date.formatDate(dt, 'hh:mm:ss A')
		},

		fullDate: function(dt){
			return date.formatDate(dt, 'MMMM DD, YYYY')
		},

		birthdateFormat: function(dt){
			return date.formatDate(dt, 'MM/DD/YYYY')
		},

		humanizeDaysFormat(d){
			return d = date.formatDate(d, 'dddd')
		},

		onSearch(search, loading) {
			if(search.length) {
				loading(true);
				this.search(loading, search, this);
			}
		},

		search(loading, search, vm) {
			setTimeout(() => {
				api
					.get(`/api/v1/onef_exact_patient/${search}/`)
					.then(response => {
						this.patientApi = response.data
					})
					.catch(error => {
						Notify.create({
							message: 'Patient does not exist.',
							type: 'negative',
							position: 'top'
						})
					})
			}, 15)
		},    

		async getWaitingList() {
			await api
				.get('/api/v1/online-appointment/')
				.then(response => {              
					this.data = response.data
				// let account_address = this.addressApi
				
				// for(let x in this.data){
					// console.log(this.data[x] = account_address[x].full_address)
					// console.log('address', this.data[x].address)
					// for(let item in account_address){

					
						// if(x.address == account_address[item].id){
						//     this.data[x]["full_address"] = account_address[item].full_address
						// }

					// }
				// }

				// (this.data).forEach(x => {
					
				//   for(let item in account_address){
				//       if(x.address == account_address[item].id){
				//           x["full_address"] = account_address[item].full_address
				//       }
				//   }
				// })          

				})
				.catch(error => {
					// console.log(error)
				})
		},        

		async getPatientList() {
			await api
				.get('/api/v1/onef_patient/')
				.then(response => { 
					this.patientApi = response.data           
				})   
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnPatient(val, update, abort) {
			if (val.length < 3){
				abort()
			}          
			update(() => {
				const needle = val.toLowerCase()              
				this.patientSearch = this.patientApi.filter(v => v.full_name.toLowerCase().indexOf(needle) > -1)   
			})  
		},

		async getAddress() {
			await api
				.get('/api/v1/onef_address/')
				.then(response => {
					this.addressApi = response.data
				})
				.catch(error => [
					// console.log(error)
				])
		},

		filterFnAddress(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.addressSearch = this.addressApi.filter(v => v.full_address.toLowerCase().indexOf(needle) > -1)            
			})
		},

		async getAuxiliary() {
			await api
				.get('/api/v1/auxiliary/')
				.then(response => { 
					this.auxiliaryApi = response.data
				})
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnAuxiliary(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.auxiliarySearch = this.auxiliaryApi.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
			})
		},

		async getNationality() {
			await api
				.get('/api/v1/onef_nationality/')
				.then(response => {
					this.nationalityApi = response.data
				})
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnNationality(val, update, abort){
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.nationalitySearch = this.nationalityApi.filter(v => v.nationality.toLowerCase().indexOf(needle) > -1)
			})
		},

		async getReligion() {
			await api
				.get('/api/v1/onef_religion/')
				.then(response => {
					this.religionApi = response.data
				})
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnReligion(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.religionSearch = this.religionApi.filter(v => v.Religion.toLowerCase().indexOf(needle) > -1)
			})
		},

		async getDoctorList() {
			await api
			.get('/api/v1/onef_doctor/')
			.then(response => {
				this.doctorApi = response.data 
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
				this.doctorSearch = this.doctorApi.filter(v => v.doctor_fullname.toLowerCase().indexOf(needle) > -1)              
			})
		},

		async getOnefClassification() {
			await api
				.get('/api/v1/onef_classification/')
				.then(response => {
					this.classificationApi = response.data 
				})
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnClassification(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.classificationSearch = this.classificationApi.filter(v => v.classification.toLowerCase().indexOf(needle) > -1)              
			})
		},

		async getOnefServiceType() {
			await api
				.get('/api/v1/onef_service_type/')
				.then(response => {
					this.serviceTypeApi = response.data 
				})
				.catch(error => {
					// console.log(error)
				})
		},

		filterFnServiceType(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.serviceTypeSearch = this.serviceTypeApi.filter(v => v.service_type.toLowerCase().indexOf(needle) > -1)              
			})
		},

		async getOnefHmoco() {
			await api
				.get('/api/v1/onef_hmoco/')
				.then(response => { 
					this.hmocoApi = response.data
				})
				.catch(error => {
					// console.log(error)
				})
			},

		filterFnHmoco(val, update, abort) {
			if (val.length < 3){
				abort()
			}
			update(() => {
				const needle = val.toLowerCase()
				this.hmocoSearch = this.hmocoApi.filter(v => v.hmoco.toLowerCase().indexOf(needle) > -1)
			})
		},

		getReferenceRow(props) {
			this.referenceNo = props.row.reference_no
			this.confirmIDUpdate = props.row.id
		},      

		selectedRow(props){
			this.patient = null
			this.referenceNo = props.row.reference_no
			this.lastName = props.row.last_name
			this.firstName = props.row.first_name
			this.middleName = props.row.middle_name
			this.sex = props.row.sex
			this.birthdate = props.row.birthdate
			this.contactNumber = props.row.contact_number
			this.email = props.row.email
			this.homeNo = props.row.home_no
			this.street = props.row.street
			this.address = props.row.address
			this.patientStatus = 'New Patient'
			this.confirmIDDelete = props.row.id
			this.confirmIDUpdate = props.row.id
			this.birthplace = props.row.birthplace
			this.bloodType = props.row.blood_type
			this.civilStatus = props.row.civil_status
		},

		deleteRow(props){
			this.confirmIDDelete = props.row.id
			this.confirm = true        
		},

		confirmDelete(){ 
			let dataID = this.confirmIDDelete
			api
			.delete(`/api/v1/online-appointment/${dataID}/`)
			.then(response => {
					Notify.create({
					message: 'Successfully deleted',
					type: 'positive',
					position: 'top'
				})

				window.location.reload()
			})
			.catch(error => {
				// console.log(error)
			})
		},     

		submit(){  
			if (this.patient) {  

				const setApprovalStatusFormdata = {
					last_name: this.patient.LASTNAME,
					first_name: this.patient.FIRSTNAME,
					birthdate: this.patient.dob,
					email: this.patient.email,
					address: this.patient.full_address,
					contact_number: this.patient.MOBILENO,
					approval_status: true
				}

				if (this.referenceNo == null){
					Notify.create({
						message: 'No reference number selected.',
						type: 'negative',
						position: 'top'
				})

			} else if(this.options == 'Doctor') {

				if(this.doctor == ""){
					Notify.create({
						message: 'No doctor selected.',
						type: 'negative',
						position: 'top'
					})

				} else { 

					if(this.selectedScheduleID == "") {
						Notify.create({
							message: 'No schedule selected.',
							type: 'negative',
							position: 'top'
						})
					} else {
						const editPatientData = {
							reference_no: this.referenceNo,
							last_name: this.patient.LASTNAME,
							first_name: this.patient.FIRSTNAME,
							middle_name: this.patient.MIDDLENAME,
							sex: this.patient.gender,
							birthdate: this.patient.dob,
							birthplace: this.patient.BIRTHPLACE,
							civil_status: this.patient.CIVILSTAT,
							blood_type: this.patient.BLOODTYPE,
							contact_number: this.patient.MOBILENO,
							email: this.patient.email,
							home_no: this.patient.HOUSENO,
							street: this.patient.STREET,
							address: this.patient.full_address,
							payment_method: this.payment,
							hmoco: this.patient.HMOCO_,
							classification: this.classification,
							service_type: this.serviceType,
							schedule: this.selectedScheduleID,
							auxiliary: null,
							complaint: this.complaint,
							nationality: this.patient.NATIONALITY,
							religion: this.patient.RELIGION,
							patient_id: this.patient.PATIENTID,
						}

						api                
						.post('/api/v1/approved-list/', editPatientData)
						.then(response => {
							Notify.create({
							message: 'Appointment approved.',
							type: 'positive',
							position: 'top'
						})
							this.$router.push({name: 'ApprovedList'})
						})
						.catch(error => {
							// console.log(error)
						})

						api
							.patch(`/api/v1/online-appointment/${this.confirmIDUpdate}/`, setApprovalStatusFormdata)
							.then(response => {})
							.catch(error => {
								// console.log(error)
						}) 
					}           
				
				}

			} else if(this.options == "Ancillary") {

				if(this.auxiliary == ""){
					Notify.create({
						message: 'No Ancillary selected.',
						type: 'negative',
						position: 'top'
					})

				} else {

					const editPatientData = {
						reference_no: this.referenceNo,
						last_name: this.patient.LASTNAME,
						first_name: this.patient.FIRSTNAME,
						middle_name: this.patient.MIDDLENAME,
						sex: this.patient.gender,
						birthdate: this.patient.dob,
						birthplace: this.patient.BIRTHPLACE,
						civil_status: this.patient.CIVILSTAT,
						blood_type: this.patient.BLOODTYPE,
						contact_number: this.patient.MOBILENO,
						email: this.patient.email,
						home_no: this.patient.HOUSENO,
						street: this.patient.STREET,
						address: this.patient.full_address,
						payment_method: this.payment,
						hmoco: this.patient.HMOCO_,
						classification: this.classification,
						service_type: this.serviceType,
						schedule: null,
						auxiliary: this.auxiliary,
						complaint: this.complaint,
						nationality: this.patient.NATIONALITY,
						religion: this.patient.RELIGION,
						patient_id: this.patient.PATIENTID,
					}
					
					api
						.post('/api/v1/approved-list/', editPatientData)
						.then(response => {
							Notify.create({
								message: 'Appointment approved.',
								type: 'positive',
								position: 'top'
							})
							this.$router.push({name: 'ApprovedList'})
						})
						.catch(error => {
							// console.log(error)
						}) 
					
					api
						.patch(`/api/v1/online-appointment/${this.confirmIDUpdate}/`, setApprovalStatusFormdata)
						.then(response => {})
						.catch(error => {
							// console.log(error)
						})                
				}
			}         
			
			} else if(this.lastName) {
			
				const setApprovalStatusFormdata = {
					last_name: this.lastName,
					first_name: this.firstName,
					birthdate: this.birthdate,
					email: this.email,
					address: this.address,
					contact_number: this.contactNumber,
					approval_status: true
				}

				if(this.options == 'Doctor') {

					if(this.doctor == ""){
						Notify.create({
							message: 'No doctor selected',
							type: 'negative',
							position: 'top'
						})

					} else {

						if(this.selectedScheduleID == "") {
							Notify.create({
								message: 'No schedule selected',
								type: 'negative',
								position: 'top'
							})
						} else {
							const newPatientData = {
								reference_no: this.referenceNo,
								last_name: this.lastName,
								first_name: this.firstName,
								middle_name: this.middleName,
								sex: this.sex,
								birthdate: this.birthdate,
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
								patient_id: null,
								complaint: this.complaint,
								schedule: this.selectedScheduleID,
								auxiliary: null,
								nationality: this.nationality,
								religion: this.religion.Religion
							}

							api
							.post('/api/v1/approved-list/', newPatientData)
							.then(response => {
								Notify.create({
									message: 'Appointment approved.',
									type: 'positive',
									position: 'top'
								})
								this.$router.push({name: 'ApprovedList'})                  
							})
							.catch(error => {
							console.log(JSON.stringify(error))
							})

							api
								.patch(`/api/v1/online-appointment/${this.confirmIDUpdate}/`, setApprovalStatusFormdata)
								.then(response => {})
								.catch(error => {
									console.log(error)
								})
							}	
					} 

				} else if(this.options == 'Ancillary') {

					if(this.auxiliary == ""){
						Notify.create({
							message: 'No Ancillary selected',
							type: 'negative',
							position: 'top'
						})

					} else {                  

						const newPatientData = {
							reference_no: this.referenceNo,
							last_name: this.lastName,
							first_name: this.firstName,
							middle_name: this.middleName,
							sex: this.sex,
							birthdate: this.birthdate,
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
							patient_id: null,
							complaint: this.complaint,
							schedule: null,
							auxiliary: this.auxiliary,
							nationality: this.nationality,
							religion: this.religion.Religion
						}

						api
							.post('/api/v1/approved-list/', newPatientData)
							.then(response => {
								Notify.create({
									message: 'Appointment approved.',
									type: 'positive',
									position: 'top'
								})
								this.$router.push({name: 'ApprovedList'})
							})
							.catch(error => {
								console.log(JSON.stringify(error))
							})

						api
							.patch(`/api/v1/online-appointment/${this.confirmIDUpdate}/`, setApprovalStatusFormdata)
							.then(response => {})
							.catch(error => {
								console.log(error)
							})
					} 
				}  
			}          
		},

		clearAll() {
			this.referenceNo = ''
			this.lastName = ''
			this.firstName = ''
			this.middleName = ''
			this.sex = ''
			this.birthdate = ''
			this.contactNumber = ''
			this.email = ''
			this.homeNo = ''
			this.street = ''
			this.address = ''
			this.complaint = ''
			this.nationality = ''
			this.religion = ''

			if (this.patient == null) {

			} else {

				if (this.patient.address == undefined){			

				} else {
				
				}          
			}        
			this.patient = null        
		},

		editField(){
			if(this.patient !== null){         
				this.disable = true 

			} else {

				if (this.disable == true){
					this.disable = false
				} else {
					this.disable = true   
				}
			}          
		},

		patientIdCheckerFn() {
			this.referenceNo = null
			this.lastName = null
			this.disable = true

			try {
				this.patientIdChecker = this.patient
			}catch(err){ 

			}        
		},

		async doctorScheduleFn() {
			try{
			
				const doctorId = this.doctor.doctor_id

				if(doctorId == null) {
					Notify.create({
							message: 'Please select doctor first.',
							type: 'negative',
							position: 'top'
						})

				} else {

					this.doctorSchedule = true

					await api
						.get(`/api/v1/schedule-patient-limit-list/${doctorId}/`)
						.then(response => {  
							(response.data).map(item => {
								this.newEvent.push(date.formatDate(item.days, 'YYYY/MM/DD' ))													           
							})  

							this.doctorScheduleData = response.data
							
						})
						.catch(error => {                
						})

					await api
						.get(`/api/v1/approve-list-doctor/${this.doctor.doctor_id}/`)
						.then(response => {

							this.patientLimit = response.data

							let patientSchedule = []

							for(let num in this.patientLimit) {
								patientSchedule.push(this.patientLimit[num].schedule.id)
							}

							const countPatientLimit = {}
							
							patientSchedule.forEach(function (x) { countPatientLimit[x] = (countPatientLimit[x] || 0) + 1; });					
															
							this.doctorScheduleData.map(item => {
								for (let [key, value] of Object.entries(countPatientLimit)){							
									if(item.id == key){
										item['patient'] = value
									} 								
								}
							})								
						})

						.catch(error => {
							// console.log(error)
						})
				}
				
			}catch(err) {
				Notify.create({
					message: 'Please select doctor first.',
					type: 'negative',
					position: 'top'
				})
			}  
		},

		selectDate(){
			let filterDoctorScheduleData =  this.doctorScheduleData.filter(item => {
				return date.formatDate(item.days, 'YYYY/MM/DD' ) == date.formatDate(this.date, 'YYYY/MM/DD' )         
			})

			this.newFilterDoctorScheduleData = filterDoctorScheduleData				
		},

		onRowClick(evt, row){
			let daysFormatted = date.formatDate(row.days, 'MMMM DD, YYYY')
			let daysOfWeekFormatted = date.formatDate(row.days, 'dddd')    
			
			this.selectedScheduleID = row.id
			this.finalDateFromDate = row.from_time_format
			this.finalDateToDate = row.to_time_format
			this.finalDays = daysFormatted
			this.finalDayOfWeeks = daysOfWeekFormatted

			if(row.patient >= row.patient_limit) {
				this.patientLimitDialog = true
			}	

			api 
				.get('/api/v1/approved-list/')
				.then(response => {					
					// console.log(response.data)
				})
				.catch(error => {
					// console.log(error)
				})
		},       

		async print(){

			if (this.patient) {

				if (this.options == 'Doctor') {

				} else if (this.options == 'Ancillary') {
					
				}

			} else if (this.lastName) {

				if (this.options == 'Doctor') {					

				} else if (this.options == 'Ancillary') {
					
				}          
			}
		},

		cancelSchedule(){
			this.selectedScheduleID = ''
			this.newEvent = []
		}
    }
}
</script>