<template>
    <div>
    <div>
        <h1>{{name}}</h1>
        <div>
            <label> Rating:
                <p>{{rstars}}</p>
            </label>
        </div>
        <li v-for:"contact in contactInfo" v-text= "contact"></li>

        <button @click:"expand">Learn More</button> 
        <p v-show:"more">{{description}}</p>
        <!--<p v-show:"more">{{latitude}}</p>
        <p v-show:"more">{{longitude}}</p>-->
        <!--google maps api ^^^-->
     </div>
        </div>
    </template>

<script>
    // var user = localStorage.getItem('user');

export default {
                props:[],
                data () {//data is not an object in vue components but rather a fn that returns an object
                        return {
                            name: 'carol',
                            // user.name,
                            decription: 'desc',
                            //  user.description,
                            rating: 4,
                            rstars: [],
                            // user.avgRating, 
                            // latitude: user.latitude,
                            // longitude: user.longitude,
                            contactInfo: ['4566'], 
                            // user.contactInfo,
                            more: false
                        };
                },
                methods: {
                    expand() {//consider also changing the size //ask fawzy
                        this.more = true;
                    }
                },
                mounted(){
                        var n = this.rating;
                        var r = [];
                        while(n>0){   
                            r.push('&#9733'); //colored star
                            n--;
                        }
                        n = 5; //assuming max rating is 5
                        while((n- this.rating)>0)
                        {
                            r.push('&#9734'); //empty star
                            n--;
                        }
                        this.rstars= r; 
                }


                }
    </script>    




  