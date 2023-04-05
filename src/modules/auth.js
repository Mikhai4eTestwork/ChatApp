export default {
    state: {
        token: '',
        login: ''
    },
    actions: {
        TOKEN_SET(context, auth_data){
            localStorage.setItem('auth', JSON.stringify(auth_data))
            document.cookie = 'token='+auth_data.token
            context.commit('TOKEN_COMMIT', auth_data)
        },
        TOKEN_UNSET(context){
            localStorage.removeItem('auth')
            let auth_data = {token: '', login: ''}
            context.commit('TOKEN_COMMIT', auth_data)
        },        
    },
    mutations: {
        TOKEN_COMMIT(state, auth_data){
            state.token = auth_data.token
            state.login = auth_data.login
        }
    },
    getters: {
        AUTHORIZED(state){
            return (state.token && state.login) ? true : false
        },
        JWT(state){
            return state.token
        },
        LOGIN(state){
            return state.login
        },        
    }
}