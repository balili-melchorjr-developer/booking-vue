import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      isAuthenticated: false,
      token: '',
      user: {
        id: 0,
        email: '',
        roles: '',
      }
    },

    mutations: {
      initializeStore(state) {
        if (sessionStorage.getItem('token')) {
          state.token = sessionStorage.getItem('token')
          state.isAuthenticated = true
          state.user.email = sessionStorage.getItem('email')
          state.user.id = sessionStorage.getItem('userid')
          state.user.roles = sessionStorage.getItem('roles')
        } else {
          state.token = ''
          state.isAuthenticated = false
          state.user.id = 0
          state.user.email = ''
          state.user.roles = ''
        }
      },

      setIsLoading(state, status) {
        state.isLoading = status
      },
      
      setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
      },
      removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
      },
      setUser(state, user) {
        state.user = user
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
