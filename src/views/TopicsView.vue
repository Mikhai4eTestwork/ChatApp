<template>
    <div>
        <NavLine></NavLine>
        <b-container>
            <b-row>
                <b-col>
                    <h1 class="border-bottom pb-3 mt-5">
                        <b-icon icon="person-circle" class="mr-2"></b-icon>
                        <span>User: {{this.LOGIN}}</span>
                    </h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="d-flex flex-column mt-5 align-items-baseline">
                    <b-button v-for="(topic, index) in topics"
                        v-bind:key="index"
                        variant="dark" class="mx-1"
                        block
                        size="lg"
                        :disabled="topic.active"
                        @click="setChatId(index)"
                    >
                        <span>
                            {{topic.topic}}
                        </span>
                        <b-icon icon="chevron-double-right" class="ml-2"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return {
            topics: [],
        }
    },
    computed: {
        ...mapGetters(['ENDPOINT_TOPICS', 'LOGIN', 'JWT', 'AUTHORIZED'])
    },
    methods: {
        ...mapActions(['CHAT_ID_SET', 'SOCKET_DROP']),
        async getTopics(){
            const service = `${this.ENDPOINT_TOPICS}?token=${this.JWT}&login=${this.LOGIN}`
            const response = await fetch(service, {
                method: 'GET'
            })
            let topics = await response.json()
            topics = topics.result.topics
            for (let i=0; i < Object.entries(topics).length; i++){
                let topic = {
                    chat_id: Object.entries(topics)[i][0],
                    topic: Object.entries(topics)[i][1],
                    active: false,
                }
                this.topics.push(topic)
            } 
        },
        setChatId: function(index){
            this.CHAT_ID_SET(this.topics[index].chat_id)
            this.$router.push('/chat')
        }
    },
    created: function(){
        if (!this.AUTHORIZED){
            this.$router.push('/auth')
        }
        this.SOCKET_DROP()
    },
    beforeMount: function(){
        this.getTopics()
    },
}
</script>
