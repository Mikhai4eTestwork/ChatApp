<template>
    <div>
        <NavLine></NavLine>        
        <b-container>
            <b-row>
                <b-col class="d-flex justify-content-center pt-5">
                    <LoginForm></LoginForm>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions(['SOCKET_DROP'])
    },
    created: function(){
        this.SOCKET_DROP()
    }
}
</script>
