<template>
    <div class="card">
        <h1> {{name}}
            </h1>
        <label>Rating: </label>
        <ul>
            <li class="hl" v-for="star in stars">{{star}}</li>
            </ul>
        <ul>
            <li v-for:"contact in contacts">{{contact}}</li>
        </ul>
        <button @click:"viewActivities">View Activities</button>
        <button @click:"expand">Learn More</button>
        <p v-show:"more">About Us: {{description}}</p>
        <p v-show:"more">{{latitude}}</p>
        <p v-show:"more">{{longitude}}</p>
        <p v-if:"(loggedInUser.userType=='Business' || loggedInUser.userType =='BusinessOperator') && ">Current Balance: {{balance}}</p>
        <
        <!--google maps api ^^^-->
    </div>
</template>

<script>
    var loggedInUser = 
    {
        userType: localStorage.getItem('userType'),
        user: localStorage.getItem('user')
    }

    export default {
        props: ['business'], //props passed from parent to child  
        name: 'Business Card',
        data() {
            return {
                userId: business.userId,
                name: business.name,
                description: business.description,
                rating: business.avgRating,
                latitude: business.latitude,
                longitude: busienss.longitude,
                contacts: business.contactInfo,
                balance: business.balance,
                more: false
            };
        },
        methods: {
            expand: function(){ //consider changing the size --fawzy
                this.more = true;
            },
            viewActivities: function(){

            }
        },
        // mounted(){

        // },
        computed: {
            stars: function() {
                // consider partially filled stars 
                var r = this.rating;
                var stars = [];
                while (r > 0) {
                    stars.push('&#9733'); //colored star
                    r--;
                }
                r = 5; //assuming max rating is 5
                while ((r - this.rating) > 0) {
                    stars.push('&#9734'); //empty star
                    n--;
                }
                return stars;
            }
        }
    }
</script>

<style scoped>
    .hl {
        list-style-type: none;
        display: inline;
    }
</style>