<template>
    <div class = "card">
        <h1> {{name}}
            </h1>
        <div>
            <label>Rating: </label>
                <ul>
                    <li class="hl" v-for="star in stars" v-text="star"></li>
                </ul>
        </div>
        <li v-for:"contact in contactInfo" v-text= "contact"></li>
        <button @click:"expand">Learn More</button> 
        <p v-show:"more">{{description}}</p>
        <p v-show:"more">{{latitude}}</p>
        <p v-show:"more">{{longitude}}</p>
        <!--google maps api ^^^-->
    </div>
    </template>

<script>
    // var user = localStorage.getItem('user');

export default {
                props:['business'], //props passed from parent to child  
                data () {//data is not an object in vue components but rather a fn that returns an object
                        return {
                            name: business.name,
                            // user.name,
                            decription: business.description,
                            //  user.description,
                            rating: business.avgRating,
                            // user.avgRating, 
                            // latitude: user.latitude,
                            // longitude: user.longitude,
                            contactInfo: business.contactInfo, 
                            // user.contactInfo,
                            more: false
                        };
                },
                methods: {
                    expand() {//also changing the size --fawzy
                        this.more = true;
                    }
                },
                // mounted(){

                // },
                computed: {
                    stars(){
                        // consider partially filled stars 
                        var r = this.rating;
                        var stars = [];
                        while(r>0){   
                            stars.push('&#9733'); //colored star
                            r--;
                        }
                        r = 5; //assuming max rating is 5
                        while((r-this.rating)>0){
                            stars.push('&#9734'); //empty star
                            n--;
                        }
                        return stars;
                    }
                }
            }
    </script>    

    <style scoped>
    .hl{
        list-style-type: none;
        display: inline;
    }
</style>




  