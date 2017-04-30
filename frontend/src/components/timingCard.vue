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
            <button class="actionfont" @click="confirmDel">x</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');

    export default {
        props: ['time', 'day','remove'],
        name: 'slotsCard',
        data() {
            return {
                errors:[],
                msg:[]
            }
        },

        methods:{
            removeTiming: function(){
                var context = this;
                this.$http.post(URL + '/business/removeTiming', {
                        slotId: this.time._id,
                        dayId: this.day._id
                    })
                    .then(function(res) {
                        if(res.body.errors){
                        this.$swal(
                                'Failed!',
                                res.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            this.$swal(
                                'Activity Deleted!',
                                'Activity has been deleted!',
                                'success'
                            );
                            this.remove(this.time._id);
                        }
                    }, (err) => {
					context.errors = err.body.errors
				});
            },
            confirmDel: function () {
                var self = this;
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Delete!',
                    cancelButtonText: 'No, take me back!',
                    buttonsStyling: true
                }).then(function () {
                    self.removeTiming();
                });
            },

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