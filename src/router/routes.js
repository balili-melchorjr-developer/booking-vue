import { isGloballyWhitelisted } from '@vue/shared'
import { Notify } from 'quasar'

const routes = [
	{
		path: '/front-layout',
		component: () => import('layouts/FrontLayout.vue'),
		children: [
			{ 
				path: '/login',
				component: () => import('pages/Login.vue') 
			},
		]
	},
  	{
		path: '/dashboard',
		component: () => import('layouts/Dashboard.vue'),
		children: [
			{
				path: '/walk-in-registration',
				component: () => import('pages/dashboard/staff/WalkInRegistration.vue'),
				name: 'WalkInRegistration',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 3){ // Role ID: 3 || OPD Staff Nurse
						next()
					} else  {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					}  
				}
			},
			{ 
				path: '/waiting-list',
				component: () => import('pages/dashboard/staff/WaitingList.vue'),
				name: 'WaitingList', 
				meta: { 
					requireLogin: true, 
				},

				beforeEnter: (to, from, next) => {          
					if(sessionStorage.roles == 3){ // Role ID: 3 || OPD Staff Nurse        
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					}  
				}         
			},
			{ 
				path: '/approved-list',
				component: () => import('pages/dashboard/staff/ApprovedList.vue'),
				name: 'ApprovedList',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {          
					if(sessionStorage.roles == 3){ // Role ID: 3 || OPD Staff Nurse
						next()            
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					} 
				}          
			}, 
			{
				path: '/doctor-list',
				component: () => import('pages/dashboard/staff/DoctorList.vue'),
				name: 'DoctorList',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {          
				if(sessionStorage.roles == 3){ // Role ID: 3 || OPD Staff Nurse             
					next()
				} else {
					Notify.create({
						message: "You're not allowed to this section",
						type: 'negative',
						position: 'top',
						actions: [
							{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
						]
					})
				} 
				} 
			},
			{ 
				path: '/patient-list', 
				component: () => import('pages/dashboard/staff/PatientList.vue'), 
				name: 'PatientList',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from , next) => {
					if(sessionStorage.roles == 3){ // Role ID: 3 || OPD Staff Nurse
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					} 
				} 
			},
			{
				path: '/hmo-staff/',
				component: () => import('pages/dashboard/staff/HMOStaff.vue'),
				name: 'HMOStaff',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 5){ // Role ID: 5 || HMO Staff
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dissmiss', color: 'white', handler: () => { /* ... */} }
							]
						})
					} 
				}
			},
			{
				path: '/security-guard/',
				component: () => import('pages/dashboard/staff/SecurityGuard.vue'),
				name: 'SecurityGuard',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 7){ // Role ID: 7 || Security Guard
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dissmiss', color: 'white', handler: () => { /* ... */} }
							]
						})
					} 
				}
			},	
			{
				path:'/medical-records/',
				component: () => import('pages/dashboard/staff/MedicalRecords.vue'),
				name: 'MedicalRecords',
				meta: {
					requireLogin: true,
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 6) { // Role ID: 6 || Medical Records Staff
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
							{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					} 
				}
			},
			{
				path: '/out-only-records/',
				component: () => import('pages/dashboard/staff/OutOnlyRecords.vue'),
				name: 'OutOnlyRecords',
				meta: {
					requireLogin: true,
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 6) { // Role ID: 6 || Medical Records Staff
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
							{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					}
				}
			},
			{ 
				path: '/doctor-patient/', 
				component: () => import('pages/dashboard/doctor/DoctorPatient.vue'), 
				name: 'DoctorPatient', 
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {          
					if(sessionStorage.roles == 1){ // Role ID: 1 || Doctor
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					} 
				}
			},
			{ 
				path: '/doctor-schedule/', 
				component: () => import('pages/dashboard/doctor/DoctorSchedule.vue'), 
				name: 'DoctorSchedule', 
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 1){ // Role ID: 1 || Doctor
						next()            
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					} 
				} 
			},
			{
				path: '/settings',
				component: () => import('pages/dashboard/staff/Settings.vue'),
				name: 'Settings',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 3 || sessionStorage.roles == 5 || sessionStorage.roles == 6 || sessionStorage.roles == 7){
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							action: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ }}
							]
						})
					}
				}
			},
			{ 
				path: '/test', 
				component: () => import('pages/dashboard/Test.vue') 
			},
		]
  	},

	{
		path: '/administrator-dasboard',
		component: () => import('layouts/AdministratorDashboard.vue'),
		children: [
			{ 
				path: '/administrator-home', 
				component: () => import('pages/administrator/Home.vue'), 
				name: 'Home',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 4){ // Role ID: 4 || Administrator
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					}
				}
			},
			{
				path: '/create-account',
				component: () => import('pages/administrator/CreateAccount.vue'),
				name: 'CreateAccount',
				meta: {
					requireLogin: true
				},
				beforeEnter: (to, from, next) => {
					if(sessionStorage.roles == 4){ // Role ID: 4 || Administrator
						next()
					} else {
						Notify.create({
							message: "You're not allowed to this section",
							type: 'negative',
							position: 'top',
							actions: [
								{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
							]
						})
					}
				}
			}
		]
	},
  // Always leave this as last one,
  // but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue')
	},
	{
		path: '/',
		component: () => import('pages/PatientAppointment.vue')
	},
	{
		name: 'ReferencePage',
		path: '/appointment-done',
		component: () => import('pages/ReferencePage.vue')
	},
	{
		name: 'CounterQueueMonitor',
		path: '/counter-queue-monitor',
		component: () => import('pages/CounterQueueMonitor.vue')
	},
	{
		name: 'QueueTouchPanel',
		path: '/queue-touch-panel',
		component: () => import('pages/QueueTouchPanel.vue'),
		// meta: {
		// 	requireLogin: true
		// },
		// beforeEnter: (to, from, next) => {
		// 	if(sessionStorage.roles == 7){
		// 		next()
		// 	} else {
		// 		Notify.create({
		// 			message: "You're not allowed to this section",
		// 			type: 'negative',
		// 			position: 'top',
		// 			actions: [
		// 				{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
		// 			]
		// 		})
		// 	}
		// }
	},
	{
		name: 'MedicalRecordsMonitor',
		path: '/medical-records-monitor',
		component: () => import('pages/MedicalRecordsMonitor.vue')
	},
	{
		name: 'ClinicQueueMonitor',
		path: '/clinic-queue-monitor',
		component: () => import('pages/ClinicQueueMonitor.vue')
	}
]

export default routes
