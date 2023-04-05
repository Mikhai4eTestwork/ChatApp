<template>
    <div class="d-flex flex-column p-5 border rounded bg-light mx-5 mt-5">
        <div class="app-chat-history d-flex flex-column-reverse">
            <div class="d-flex flex-column">
                <div v-for="(message, index) in chat_history"
                    v-bind:key="index"
                    v-bind:num="index"
                    :class="'w-100 d-flex mb-3 px-5 '+message.position"
                    >
                    <b-alert show :class="'w-50 '+message.margin" :variant="message.variant">{{message.message}}</b-alert>
                </div>                
            </div>
        </div>
            <b-form>
                <div class="d-flex px-5 mt-5">
                    <b-textarea class="mx-5" v-model="message" @keypress="keyPress"></b-textarea>            
                </div>
                <div class="d-flex px-5 mt-2">
                    <b-button 
                        variant="primary" 
                        class="mx-5" 
                        block @click.prevent="sendMessage"
                        :disabled="!message"
                        size="lg"
                    >
                        <span>
                            Отправить
                        </span>
                        <b-icon icon="box-arrow-up" class="ml-2"></b-icon>
                    </b-button>
                </div>
            </b-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message: '',
        }
    },
    props: ['chat_history', 'chat_id'],
    computed: {

    },
    methods: {
        keyPress: function(e){
            if (e.key==='\n' && e.code === 'Enter'){
                this.sendMessage()
            }
        },
        sendMessage: function(){
                this.$emit('sendMessage', this.message)
                this.message = ''
        },
        chessOrder: function(){
            for (let i=0; i < this.chat_history.length; i++){
                this.chat_history[i].position = (i % 2 ===0) ? 'flex-row-reverse' : ''
                this.chat_history[i].margin = (i % 2 ===0) ? 'mr-5' : 'ml-5'
                this.chat_history[i].variant = (i % 2 ===0) ? 'primary' : 'info'
            }
        }        
    },
    watch: {
        chat_history: function(){
            this.chessOrder()
        }
    },
    beforeMount: function(){
        this.chessOrder()
    },
}
</script>

<style lang="sass">
.app-chat-history
    height: 400px
    overflow-y: scroll
</style>