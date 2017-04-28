<template>
    <div v-if="client">
        <form v-on:submit="editClient" style="min-width:500px; ">
            <br>

            <div class="form-group row myForm">
                <label class="label">Name</label>
                <input type="text" v-model="name" name="name" :value="name">
            </div>
            <div class="form-group row myForm">
                <label class="label">Email</label>
                <input type="email" v-model="email" name="name">
            </div>
            <div class="form-group row">
                <label class="label">Date Of Birth</label>
                <input type="date" v-model="dateOfBirth" name="dateOfBirth">
            </div>

            <!--<div v-if="client && client.userId.profileImage">
                <img class="imgSmall" :src="'http://localhost:8080/uploads/' + client.userId.profileImage" alt="client.userId.username">
            </div>-->

            <div class="form-group row">
                    <label for="image" class="actionfont">Profile picture</label>
                <div>
                    <input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
                </div>
            </div>


            <div class="center">	
				<pulseLoader :loading="loading"></pulseLoader>
			</div>
            <button v-if="!loading" type="submit" class="btn btn-danger" style="min-width: 80px; cursor: pointer">Save</button>

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
<style type="text/css" scoped>
    .label {
        color: #CC2839;
        padding: 10px;
        text-align: left;
        margin-right: 10px;
        float: left;
        width: 200px;
    }

    .imgSmall {
        max-width: 200px;
        max-height: 200px;
    }

    input {
        float: right;
        width: 300px;
        border: 2px solid #f23;
        padding: 10px;
        text-align: center;
        background-color: #eee;
    }

    .myBtn {
        min-width: 100px;
        cursor: pointer;
        border-radius: 100px;
    }

    .myForm {
        display: flex;
    }

    #logo {
        height: 100px;
        width: 200px;
        overflow: hidden;
    }
</style>
<script>
    import pulseLoader from './PulseLoader.vue'
    var URL = require('./env.js').HostURL;
    export default {
        props: ['clientUsername', 'close'],
        name: 'clientEditForm',
        data() {
            return {
                dateOfBirth: '',
                client: undefined,
                name: '',
                email: '',
                profileImage: '',
                errors: [],
                msg: '',
                loading:false
            }
        },
        methods: {
            editClient(e) {
                this.loading=true;
                e.preventDefault();
                var form = new FormData();
                form.append('name', this.name);
                form.append('image', this.profileImage);
                form.append('email', this.email);
                form.append('dateOfBirth', this.dateOfBirth);

                this.$http.post(URL + '/client/edit', form)
                    .then(function (res) {
                        this.loading=false;
                        if (res.data.errors) {
                            this.errors = res.data.errors;
                            this.$swal(
                                'Failed!',
                                res.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            this.msg = res.data.msg;
                            this.close();
                            this.$swal(
                                'Updated!',
                                this.msg,
                                'success'
                            );
                        }
                    }, function (res) {

                        this.$swal(
                            'Failed!',
                            'Error updating info.',
                            'error'
                        );
                    });

            },
            fileChanged(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.profileImage = files[0];
                }
            }
        },
        created: function () {
            this.$http.get(URL + '/client/show/' + this.clientUsername)
                .then(function (res) {
                    if (res.data.errors) {
                        this.errors = res.data.errors;
                    } else {
                        this.client = res.data.data.client;
                        this.name = this.client.userId.name;
                        this.username = this.client.userId.username;
                        this.email = this.client.userId.email;
                        this.dateOfBirth = this.client.dateOfBirth;
                        this.dateOfBirth = this.dateOfBirth.split('-')[0] + '-' + this.dateOfBirth.split('-')[1] +
                            '-' + this.dateOfBirth.split('-')[2].split('T')[0];

                    }
                });
        },
        components:{
			pulseLoader
		}

    }
</script>