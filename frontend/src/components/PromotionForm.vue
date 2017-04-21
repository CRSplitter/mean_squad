<template>
  <div class="container">
    <div class="control">

      <form @submit="onSubmit" enctype="multipart/form-data">
        <label class="">Discount value</label>
        <input type="number" v-model="discount" name="discountValue" class="form-control" placeholder="Discount Value" required>
        <label  class="">Promotion details</label>
        <input type="textarea" v-model="details" name="details" class="form-control" placeholder="Promo details"required>
        <label class="label">Profile Picture</label>
               <p class="control has-icon has-icon-right">
                   <input type="file" name="image" accept="image/*" @change="fileChanged" >
               </p>


          <input type="submit" class="btn btn-lg btn-danger" value="Create Promo">
          </form>

      <ul v-if="errors.length > 0">
      <li v-for="error in errors">
      {{ error.type }} => {{ error.msg }}
    </li>
  </ul>
    </div>


  </div>
</template>


 <script>
 import axios from 'axios';

export default {
    props: ['activity'],
    name: 'PromotionForm',
    data() {
        return {
            discount: '',
            details: '',
            image: '',
            errors: []
         }
     },

     methods: {
       onSubmit(e) {
         e.preventDefault();
         this.$http.post('http://localhost:8080/business/createpromotion', {
           discountValue : this.discount,
           details : this.details,
           image : this.image,
           activityId: this.activity._id
         })
          .then(function(res) {
              console.log(res.body);
                    if (res.body.errors) {
                     this.errors = res.body.errors;
                 } else {
                     // TODO success
                 }
             }).catch(function(err){

             });
           },
       fileChanged(e){
         const files = e.target.files || e.dataTransfer.files;
         if (files.length > 0) {
           this.image = files[0];
         }
       }
     }
   }


 </script>
