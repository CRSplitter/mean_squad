<template>
    <div>
        <h1>{{name}}</h1>
        <label> Rating: 
            <p v-model:"rating"></p>
            </label>
        <label> Contact Info: 
                <p>{{contactInfo}} 
                    </p>
            </label>
        <button @click:"expand"> show more </button>
        <p v-show:"more">{{description}}</p>
        <!--<p v-show:"more">{{latitude}}</p>
        <p v-show:"more">{{longitude}}</p>-->
        <!--google maps api ^^^-->
        </div>
    </template>

<script>
var user = localStorage.getItem('user'); //??

export default {
                props:[],
                data () {//data is not an object in vue components but rather a fn that returns an object
                        return {
                            name: user.name,
                            decription: user.description,
                            rating: user.avgRating, 
                            // latitude: user.latitude,
                            // longitude: user.longitude,
                            more: false
                        };
                },
                methods: {
                    expand() {//consider also changing the size //ask fawzy
                        this.more = true;
                    }


                        // &#9734; empty star &star
                        // &#9733; colored star &fstar
                },


                }
    </script>    




  