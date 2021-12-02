<template>
    <div id="login" class="container p-3 my-3">
        <form class="align-items-center" @submit.prevent>
            <div class="row">Username:</div>
            <div class="row">
                <input v-model="username" placeholder="Username" />
            </div>
            <div class="row mt-3">Password:</div>
            <div class="row">
                <input v-model="password" type="password" />
            </div>
            <div class="row">
                <input
                    type="submit"
                    value="Log in"
                    class="btn btn-primary btn-sm mt-3"
                    @click="login"
                />
            </div>
        </form>
        <div class="row">
            <button
                class="btn btn-primary btn-sm mt-3"
                @click="$emit('create-account-clicked')"
            >
                Create new account
            </button>
        </div>
        <div v-if="pending" class="row justify-content-center">
            <b-spinner variant="primary" class="mt-3"></b-spinner>
        </div>
        <b-alert v-model="error" variant="danger" class="mt-3">
            {{ errorMessage }}
        </b-alert>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            token: null,
            pending: false,
            error: 0,
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            this.pending = true;
            this.error = 0;

            try {
                const { data } = await axios.post("/api/login", {
                    username: this.username,
                    password: this.password,
                });
                this.token = data.token;

                this.error = 0;

                this.$emit("login-clicked", this.token);
            } catch (error) {
                this.token = null;

                this.error = 5;
                if (error.response) {
                    this.errorMessage = error.response.data.error;
                } else {
                    this.errorMessage = error.message;
                }
            }
            this.pending = false;
        },
    },
};
</script>

<style scoped>
#login {
    width: 150px;
}
input {
    width: 150px;
}
</style>
