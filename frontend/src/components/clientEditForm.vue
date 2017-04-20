<template>
    <div v-if="client">
        <form v-on:submit="editClient">
            <br>

            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Name</label>
                <div class="col-10">
                    <input class="form-control" type="text" v-model="name" name="name" :value="client.userId.name">
                </div>
            </div>

            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Username</label>
                <div class="col-10">
                    <input class="form-control" type="text" v-model="username" name="username" :value="client.userId.username">
                </div>
            </div>

            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Date Of Birth</label>
                <div class="col-10">
                    <input class="form-control" type="date" v-model="dateOfBirth" name="dateOfBirth" :value="client.dateOfBirth">
                </div>
            </div>

            <div v-if="client && client.userId.profileImage">
                <img :src="http://localhost:8080/uploads/ + client.userId.profileImage" alt="client.userId.username">
            </div>

            <div class="form-group row">
                <label for="image" class="col-2 col-form-label">Image</label>
                <div class="col-10">
                    <input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
                </div>
            </div>

            

            <button type="submit" class="btn btn-danger">Save</button>

        </form>

        <div v-if="errors.length > 0">
            <div class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong>
                <div v-for="error in errors">
                    {{ error.msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var URL = require('../env.js').HostURL;
    export default {
        props: ['clientUsername'],
        name: 'ClientEditForm',
        data() {
            return {
                dateOfBirth: '',
                client: undefined,
                name: '',
                username: '',
                profileImage: '',
                errors: [],
                msg: ''
            }
        },
        methods: {
            editClient(e) {
                e.preventDefault();
                var form = new FormData();
                form.append('username', this.username);
                form.append('name', this.name);
                form.append('image', this.profileImage);
                form.append('email', this.client.userId.email);

                this.$http.post(URL + '/client/edit', form)
                    .then(function(res) {
                        if(res.data.errors) {
                            this.errors = res.data.errors;
                        }
                        else if(res.data.msg) {
                            this.msg = res.data.msg;
                        }
                    }, function(res) {
                        // TODO: handle error STATUS
                    });

            },
            fileChanged(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.profileImage = files[0];
                }
            }
        },
        created: function() {
            this.$http.get(URL + '/client/show/' + this.clientUsername)
                .then(function(res) {
                    if(res.data.errors) {
                        this.errors = res.data.errors;
                    }
                    else {
                        this.client = res.data.data.client;
                    }
                });
        }

    }
</script>