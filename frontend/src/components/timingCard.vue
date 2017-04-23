<template>
<div>
    <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
    </div>

    <div v-else-if="errors.length > 0">
        <div class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong>
            <div v-for="error in errors">
                {{ error.msg }}
            </div>
        </div>
    </div> 


    <div class="center">
        <div class="remov">
            <div class="center">
                 {{time.time}} 
            </div>
            <div class="center actionfont">
            <button class="actionfont" @click="removeTiming">x</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');

    export default {
        props: ['time', 'day'],
        name: 'slotsCard',
        data() {
            return {
                errors:[],
                msg:[]
            }
        },

        methods:{
            removeTiming: function(){
                this.$http.post(URL + '/business/removeTiming', {
                        slotId: this.time._id,
                        dayId: this.day._id
                    })
                    .then(function(res) {
                        console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.msg = res.body.msg;
                        }
                    }, function(res) {
                        console.log("error");
                    });
            }
        },

        created: function(){
            this.userType = type;
        }
    }
</script>
<style scoped>
  .remov{
      position: relative;
      width: 70px;
      display: flex
  }
</style>