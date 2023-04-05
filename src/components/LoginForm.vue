<template>
    <div>
        <b-form class="mt-5 p-4 border rounded" autocomplete="off">
            <b-input class="mb-3" placeholder="Login" v-model="login"></b-input>
            <b-input class="mb-3" placeholder="Password" type="password" v-model="password"></b-input>
            <b-button variant="info" block @click="dataSend" :disabled="this.AUTHORIZED || !login || !password">
                <span>Login</span>
                <b-icon icon="box-arrow-in-right" class="ml-2"></b-icon>
            </b-button>
            <b-button variant="danger" block @click="this.TOKEN_UNSET" :disabled="!this.AUTHORIZED">
                <span>Logout</span>
                <b-icon icon="box-arrow-right" class="ml-2"></b-icon>
            </b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            login: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters(['ENDPOINT_AUTH', 'AUTHORIZED'])
    },
    methods: {
        ...mapActions(['TOKEN_SET', 'TOKEN_UNSET']),
        async dataSend(){
            let credentials = {
                login: btoa(this.login),
                password: btoa(this.password)
            }
            credentials = JSON.stringify(credentials)
            const response = await fetch(this.ENDPOINT_AUTH, {
               method: 'POST' ,
               headers: {},
               body: credentials
            })

            let jwt = await response.text()

            if (response.status===200){
                let auth_data = {
                    token: jwt,
                    login: this.login
                }
                this.TOKEN_SET(auth_data)
                this.$router.push('/topics')
            }
        },
        appOut: function(){

        }
    }
}
</script>
