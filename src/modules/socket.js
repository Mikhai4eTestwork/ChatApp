export default {
    state: {
        socket: {},
        chatId: 0,
    },
    actions: {
        CHAT_ID_SET(context, val=''){
            const chatId = (localStorage.getItem('chatId') && !val) ? localStorage.getItem('chatId') : val
            localStorage.setItem('chatId', chatId)
            context.commit('CHAT_ID_COMMIT', chatId)
        },
        SOCKET_UP(context, endpoint){
            const ws = new WebSocket(endpoint)
            context.commit('SOCKET_COMMIT', ws)
        },
        SOCKET_DROP(context){
            context.commit('SOCKET_DROP_COMMIT') 
        },        
    },
    mutations: {
        SOCKET_COMMIT(state, socket){
            state.socket = socket
        },
        SOCKET_DROP_COMMIT(state){
            if (state.socket.readyState === 0 || state.socket.readyState === 1){
                state.socket.close()
            }
        },
        CHAT_ID_COMMIT(state, chatId){
            state.chatId = chatId
        }
    },
    getters: {
        SOCKET(state){
            return state.socket
        },
        CHAT_ID(state){
            return state.chatId
        }
    }
}