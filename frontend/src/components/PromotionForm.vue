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
        //  let data = new FormData();
        //  data.append('discountValue', this.discount);
        //  data.append('details', this.details);
        //  data.append('image', this.image);
        //  console.log(data);
         this.$http.post('http://localhost:8080/business/createpromotion', {
           discountValue : this.discount,
           details : this.details,
           image : this.image,
           activityId: this.activity._id
         })
          .then(function(res) {
               console.log('success');
               console.log(res.body);
            //     console.log(res.data.errors[0]); 
                 if (res.body.errors) {
                     this.errors = res.body.errors;
                 } else {
                     // TODO success
                 }
             }).catch(function(err){
               console.log("error");
               console.log(err);
               console.log(console.log(JSON.stringify(err.data)));

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

   //    this.axios.post('http://localhost:8080/business/createpromo', data).then((res) => {
   //      console.log("success");
   //      console.log(res);
   //      // setTimeout(() => {
   //      //     this.$router.push('/'); // Change later
   //      // }, 1000);
   //    }).catch((err) => {
   //      console.log("error");
   //      console.log(err);
   //      // this.form.errors.record(err.response.data.message);
   //      // window.scrollTo(0, 0);
   //    })
   //  }



 </script>
