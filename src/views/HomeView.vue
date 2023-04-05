<template>
    <div>
        <NavLine></NavLine>        
        <b-container>
            <b-row>
                <b-col>
                    <div class="d-flex flex-column justify-content-center mt-5 pt-5">
                        <router-link class="btn btn-primary btn-lg mb-3" to="/auth">
                            <span>Авторизация</span>
                            <b-icon icon="door-open" class="ml-2"></b-icon>
                        </router-link>
                        <router-link :is="topicsDisabled ? 'button' : 'router-link'" class="btn btn-primary btn-lg" to="/topics" :disabled="topicsDisabled">
                            <span>Темы</span>
                            <b-icon icon="card-checklist" class="ml-2"></b-icon>
                        </router-link>                        
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions(['SOCKET_DROP'])
    },
    computed: {
        ...mapGetters(['AUTHORIZED']),
        topicsDisabled: function(){
            return (this.AUTHORIZED) ? false : true
        }
    },
    created: function(){
        this.SOCKET_DROP()
    }
}

</script>
