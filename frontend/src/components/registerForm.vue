<template>
  <div>

    <form v-on:submit="register">
      <label for="inputName" class="sr-only">Name</label>
      <input type="text" v-model="name" name="name" class="form-control" id="inputName" placeholder="name" required>

      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" v-model="username" name="username" class="form-control" id="inputUsername" placeholder="username" required>

      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" name="password" id="inputPassword" class="form-control" placeholder="password"required>

      <label for="inputPassword2" class="sr-only">Password</label>
      <input type="password" v-model="confirmPassword" name="confirmPassword" id="inputPassword2" class="form-control" placeholder="password confirmation" required>

      <label for="inputEmail" class="sr-only">Email</label>
      <input type="email" v-model="email" name="email" class="form-control" id="inputEmail" placeholder="email" required>

      <label for="inputDate" v-if="formType === 'Client'" class="sr-only">Date of birth</label>
      <input type="date" v-if="formType === 'Client'" v-model="dateOfBirth" name="dateOfBirth" class="form-control" id="inputDate" placeholder="date of birth" required>

      <label for="inputName" v-if="formType === 'Business'" class="sr-only">Title</label>
      <input type="text" v-if="formType === 'Business'" v-model="name" name="name" class="form-control" id="inputName" placeholder="business name or title" required>

      <label for="inputDescription" v-if="formType === 'Business'" class="sr-only">Description</label>
      <input type="text" v-if="formType === 'Business'" v-model="description" name="description" class="form-control" id="inputDescription" placeholder="description" required>

      <label for="inputAddress" v-if="formType === 'Business'" class="sr-only">Address</label>
      <input type="text" v-if="formType === 'Business'" v-model="address" name="address" class="form-control" id="inputAddress" placeholder="address" required>

      <label for="inputContact" v-if="formType === 'Business'" class="sr-only">Contact info</label>
      <input type="text" v-if="formType === 'Business'" v-model="contactInfo" name="contactInfo" class="form-control" id="inputContact" placeholder="contact info" required>

      <label for="inputLatitude" v-if="formType === 'Business'" class="sr-only">Latitude</label>
      <input type="number" v-if="formType === 'Business'" v-model="latitude" name="latitude" class="form-control" id="inputLatitude" placeholder="latitude" required>

      <label for="inputLongitude" v-if="formType === 'Business'" class="sr-only">Longitude</label>
      <input type="number" v-if="formType === 'Business'" v-model="longitude" name="longitude" class="form-control" id="inputLongitude" placeholder="longitude" required>

      <input type="submit" class="btn btn-danger" value="Sign up">
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
    export default {
        props: ['formType'],
        name: 'register',
        data() {
            return {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                name: '',
                dateOfBirth: '1999-12-31',
                name: '',
                longitude: null,
                latitude: null,
                contactInfo: '',
                description: '',
                address: '',
                errors: []
            }
        },
        methods: {
            register: function(e) {
                e.preventDefault();
                var userInputs = {
                    username: this.username,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    email: this.email,
                    name: this.name
                };

                if (this.formType === 'Client') {
                    userInputs.dateOfBirth = this.dateOfBirth;
                    this.$http.post('http://localhost:8080/client/register', userInputs)
                        .then(function(res) {
                            console.log(res);
                            if (res.body.errors) {
                                this.errors = res.body.errors;
                            } else {
                                // TODO success
                            }
                        }, function(res) {
                            console.log("error");
                        });
                } else {
                    if (this.formType === 'Business') {
                        userInputs.name = this.name;
                        userInputs.address = this.address;
                        userInputs.description = this.description;
                        userInputs.longitude = this.longitude;
                        userInputs.latitude = this.latitude;

                        this.$http.post('http://localhost:8080/business/register', userInputs)
                            .then(function(res) {
                                console.log(res);
                                if (res.body.errors) {
                                    this.errors = res.body.errors;
                                } else {
                                    // TODO success
                                }
                            }, function(res) {
                                console.log("error");
                            });
                    } else {
                        if (this.formType === 'BusinessOpertor') {
                            this.$http.post('http://localhost:8080/BusinessOpertor/register', userInputs)
                                .then(function(res) {
                                    console.log(res);
                                    if (res.body.errors) {
                                        this.errors = res.body.errors;
                                    } else {
                                        // TODO success
                                    }
                                }, function(res) {
                                    console.log("error");
                                });
                        } else {
                            // formType === 'Admin'
                            this.$http.post('http://localhost:8080/admin/register', userInputs)
                                .then(function(res) {
                                    console.log(res);
                                    if (res.body.errors) {
                                        this.errors = res.body.errors;
                                    } else {
                                        // TODO success
                                    }
                                }, function(res) {
                                    console.log("error");
                                });
                        }
                    }
                }

            }
        }
    }
</script>
