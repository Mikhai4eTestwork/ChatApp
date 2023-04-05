export default {
    state: {
        auth: '/auth',
        topics: '/topics',
        chat: '/chat',
        host: 'localhost',
        protocol: 'http://',
        port: '8008'
    },
    getters: {
        ENDPOINT_AUTH(state) {
            return `${state.protocol}${state.host}:${state.port}${state.auth}`
        },
        ENDPOINT_TOPICS(state) {
            return `${state.protocol}${state.host}:${state.port}${state.topics}`
        },
        ENDPOINT_CHAT(state) {
            const ws_prot = (state.protocol === 'http://') ? 'ws://' : 'wss://'
            return `${ws_prot}${state.host}:${state.port}${state.chat}`
            return state.chat
        },        
    },    
}