<template>
    <div>
        <div v-if="errors.length > 0">
            <div class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong>
                <div v-for="error in errors">
                    {{ error.msg }}
                </div>
            </div>
        </div>

        <form v-on:submit="register">

            <label for="inputName" v-if="formType === 'Client'" class="sr-only">Name</label>
            <input type="text" v-model="name" v-if="formType === 'Client'" name="name" class="form-control" id="inputName" placeholder="name"
                required>
            <label for="inputName" v-if="formType === 'Business Operator'" class="sr-only">Name</label>
            <input type="text" v-model="name" v-if="formType === 'Business Operator'" name="name" class="form-control" id="inputName"
                placeholder="name" required>
                <div  v-if="!(formType === 'Business Operator')">
                            <br>

                </div>
            <label for="inputName" v-if="formType === 'Site Admin'" class="sr-only">Name</label>
            <input type="text" v-model="name" v-if="formType === 'Site Admin'" name="name" class="form-control" id="inputName" placeholder="name"
                required>
            <div  v-if="!(formType === 'Business') &&  !(formType === 'Client')">
                            <br>

                </div>
            <label for="inputUsername" class="sr-only">Username</label>
            <input type="text" v-model="username" name="username" class="form-control" id="inputUsername" placeholder="username" required>
            <br>

            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" v-model="password" name="password" id="inputPassword" class="form-control" placeholder="password"
                required>
            <br>

            <label for="inputPassword2" class="sr-only">Password</label>
            <input type="password" v-model="confirmPassword" name="confirmPassword" id="inputPassword2" class="form-control" placeholder="password confirmation"
                required>
            <br>

            <label for="image" class="actionfont">Profile picture</label>
            <input type="file" name="image" v-if=" formType!='Site Admin'" id="image" class="form-control" accept="image/*" @change="fileChanged">
            <br>

            <label for="inputEmail" class="sr-only">Email</label>
            <input type="email" v-model="email" name="email" class="form-control" id="inputEmail" placeholder="email" required>

            <br>
            <div class="center">
                <label for="inputDate" v-if="formType === 'Client'" class="actionfont">Date of birth</label>

            </div>
            <input type="date" v-if="formType === 'Client'" v-model="dateOfBirth" name="dateOfBirth" class="form-control" id="inputDate"
                placeholder="date of birth" required>

            <br>

            <label for="inputName" v-if="formType === 'Business'" class="sr-only">Title</label>
            <input type="text" v-if="formType === 'Business'" v-model="name" name="name" class="form-control" id="inputName" placeholder="business name or title"
                required>
            <div v-if="formType === 'Business'">
                <br>

            </div>

            <label for="inputDescription" v-if="formType === 'Business'" class="sr-only">Description</label>
            <input type="textarea" v-if="formType === 'Business'" v-model="description" name="description" class="form-control" id="inputDescription"
                placeholder="description" required>
            <div v-if="formType === 'Business'">
                <br>

            </div>
            <label for="inputAddress" class="sr-only">Address</label>
            <input type="text" v-if="formType === 'Business'" v-model="address" name="address" class="form-control" id="inputAddress"
                placeholder="address" required>
            <div v-if="formType === 'Business'">
                <br>

            </div>
            <label for="inputContact" v-if="formType === 'Business'" class="sr-only">Contact info</label>
            <input type="text" v-if="formType === 'Business'" v-model="contactInfo" name="contactInfo" class="form-control" id="inputContact"
                placeholder="contact info" required>
            <br>

            <label v-if="formType === 'Business'">Choose your location</label>
            <div v-if="formType === 'Business'" id="registerMap">
                <gmap-map :center="center" :zoom="12" style="width: 100%; height: 100%" @click="moveMarker">
                    <gmap-marker v-for="m in markers" :key="m" :position="m.position" :clickable="true" :draggable="true" @position_changed="updMarker(m, $event)"></gmap-marker>
                </gmap-map>
                <br>

            </div>
            <div v-if="formType === 'Business'">
                <br>
                <br>

            </div>
			<div class="center">	
				<pulseLoader :loading="loading"></pulseLoader>
			</div>
            <div v-if="!loading" class="center">
                <button :disabled="disable" type="submit" class="backgroudcolor1">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
	import pulseLoader from './PulseLoader.vue'
    var hostURL = require('./env').HostURL;

    var welcome = function () {
        window.location = "/welcome";
    };

    export default {
        props: ['formType', 'close'],
        name: 'register',
        data() {
            return {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                dateOfBirth: '1999-12-31',
                name: '',
                image: '',
                contactInfo: '',
                description: '',
                address: '',
                disable: false,
                loading: false,
                pos: {
                    lat: 29.99137716486692,
                    lng: 31.407180786132812
                },
                center: {
                    lat: 29.99137716486692,
                    lng: 31.407180786132812
                },
                markers: [{
                    position: {
                        lat: 29.99137716486692,
                        lng: 31.407180786132812
                    }
                }],
                errors: []
            }
        },
        methods: {
            register: function (e) {
                e.preventDefault();
                this.loading=true;
                var form = new FormData();
                form.append('username', this.username);
                form.append('password', this.password);
                form.append('confirmPassword', this.confirmPassword);
                form.append('email', this.email);
                form.append('name', this.name);
                form.append('image', this.image);

                if (this.formType === 'Client') {
                    this.disable = true;
                    form.append('dateOfBirth', this.dateOfBirth);

                    this.$http.post(hostURL + '/client/register', form)
                        .then(function (res) {
                            this.loading=false;
                            this.disable = false;
                            if (res.body.errors) {
                                this.errors = res.body.errors;
                            } else {
                                welcome();
                            }
                        }, function (res) {
                            // TODO
                        });
                } else {
                    if (this.formType === 'Business') {
                        this.disable = true;
                        form.append('address', this.address);
                        form.append('description', this.description);
                        form.append('longitude', this.pos.lng);
                        form.append('latitude', this.pos.lat);

                        this.$http.post(hostURL + '/business/register', form)
                            .then(function (res) {
                                this.loading=false;
                                if (res.body.errors) {
                                    this.errors = res.body.errors;
                                } else {
                                    welcome();
                                }
                            }, function (res) {
                                // TODO
                            });

                    } else {
                        if (this.formType === 'Business Operator') {
                            this.disable = true;
                            this.$http.post(hostURL + '/businessOperator/register', form)
                                .then(function (res) {
                                    this.loading=false;
                                    this.disable = false;
                                    if (res.body.errors) {
                                        this.errors = res.body.errors;
                                    } else {
                                        this.close();
                                        this.$swal(
                                            'Business Operator Created!',
                                            'Successfully created a business operator, you can now login',
                                            'success'
                                        );
                                    }
                                }, function (res) {
                                    // TODO
                                });
                        } else {
                            // formType === 'Admin'
                            this.disable = true;
                            this.$http.post(hostURL + '/admin/register', form)
                                .then(function (res) {
                                    this.loading=false;
                                    this.disable = false;
                                    if (res.body.errors) {
                                        this.errors = res.body.errors;
                                    } else {
                                        welcome();
                                    }
                                }, function (res) {
                                    // TODO
                                });
                        }
                    }
                }

            },
            updMarker: function(m, event) {
                m.position = {
                    lat: event.lat(),
                    lng: event.lng()
                }
                this.pos = {
                    lat: event.lat(),
                    lng: event.lng()
                }
            },
            moveMarker: function(mouseArgs) {
                this.markers[0].position = {
                    lat: mouseArgs.latLng.lat(),
                    lng: mouseArgs.latLng.lng()
                }
                this.pos = {
                    lat: mouseArgs.latLng.lat(),
                    lng: mouseArgs.latLng.lng()
                }
            },
            fileChanged: function(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.image = files[0];
                }
            }
        },
        components:{
			pulseLoader
		}
    }
</script>

<style scoped>
    button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }

    .promoContainer {
        position: relative;
        width: 500px;
        margin-top: 50px;
    }

    .shad {
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }

    input {
        border-radius: 10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    }
</style>