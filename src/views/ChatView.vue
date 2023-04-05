<template>
    <div>
        <NavLine></NavLine>
        <b-container>
            <b-row>
                <b-col>
                    <h1 class="border-bottom pb-3 mt-5 d-flex justify-content-between align-items-center">
                        <div>
                            <b-icon icon="chat-left-quote-fill" class="mr-2"></b-icon>
                            <span>Чат:&nbsp;&nbsp;&nbsp;{{topic_name}}</span>
                        </div>
                        <router-link to="/topics" class="btn btn-success d-flex justify-content-between align-items-center px-3 text-decoration-none">
                            <b-icon icon="card-checklist" class="mr-3"></b-icon>
                            <span>К списку тем</span>
                        </router-link>
                    </h1>
                </b-col>
            </b-row>            
            <b-row>
                <b-col class="px-5">
                    <ChatWindow v-bind:chat_history="chat_history" v-on:sendMessage="sendMessage"></ChatWindow>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return {
            chat_history: {},
            topic_name: '',
            timeout_id: void(0)
        }
    },
    computed: {
        ...mapGetters(['ENDPOINT_CHAT', 'SOCKET', 'LOGIN', 'CHAT_ID', 'AUTHORIZED'])
    },
    methods: {
        ...mapActions(['SOCKET_UP', 'CHAT_ID_SET']),
        getHistory: function(chatId){
            const chat_init = {
                topics: parseInt(this.CHAT_ID),
                login: this.LOGIN
            }            
            this.SOCKET.send(JSON.stringify(chat_init))
        },
        sendMessage: function(text){
            const message = {
                login: this.LOGIN,
                topics: parseInt(this.CHAT_ID),
                message: text
            }
            this.chat_history.push(message)
            this.SOCKET.send(JSON.stringify(message))
            //сбрасываем предыдущий таймаут
            window.clearTimeout(this.timeout_id)
            //ставим новый на 3 минуты
            let vue_context = this
            this.timeout_id = window.setTimeout(function(){
                vue_context.SOCKET.close()
            }, 180000)
        }        
    },
    created: function(){
        if (!this.AUTHORIZED){
            this.$router.push('/auth')
        }
    },
    beforeMount: function(){
        this.CHAT_ID_SET()
        const vue_context = this
        if (this.AUTHORIZED){
            this.SOCKET_UP(this.ENDPOINT_CHAT)                        
        }
        this.SOCKET.onopen = function(e){
            vue_context.getHistory(vue_context.CHAT_ID)
        }
        this.SOCKET.onmessage = function(e){
            const data = JSON.parse(e.data)
            vue_context.topic_name = (data.topics) ? data.topics : vue_context.topic_name
            vue_context.chat_history = (data.result) ? data.result : vue_context.chat_history
            if (data.message){
                vue_context.chat_history.push(data)
            }
        }        
    },
    mounted: function(){

    }
}
</script>
