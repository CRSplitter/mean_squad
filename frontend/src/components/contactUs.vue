<template>
    <div class="container">
        <div class="text-center">
            <h1><strong>MEAN SQUAD</strong></h1>
            <h3>Proudly presenting the team</h3>
        </div>
        <br><br>
        <div class="row text-center">
            <div class="col-sm-4" v-for="member in team">
                <div class="team-members">
                    <div class="team-avatar">
                        <img v-if="member.img" class="img-responsive" :src="member.img" alt="" style="min-height: 350px;">
                        <img v-else class="img-responsive" src="http://keenthemes.com/assets/bootsnipp/member1.png" alt="" style="min-height: 350px;">
                    </div>
                    <div class="team-desc">
                        <h4><strong>{{member.name}}</strong></h4>
                        <strong v-if="member.email">{{member.email}}</strong>
                        <!--<span>Back-End</span>-->
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    //import activityCard from './activityCard';
    //import popUp from './popUp';
    var URL = require('./env.js').HostURL;


    export default {
        props: [],
        name: 'contactUs',
        data() {
            return {
                team: [{
                    name: 'Abdelrahman El Meniawy',
                    img: '/static/img/meniawy.JPG',
                    email: 'ameniawy18@gmail.com'
                }, {
                    name: 'Mohamed Amr Fawzy'
                }, {
                    name: 'Islam Elgohary',
                    img: '/static/img/islam.JPG',
                    email: 'islam.o.elgohary@gmail.com'
                }, {
                    name: 'Mira Ekladios',
                    img:'/static/img/mira.jpg',
                    email:'miraekladious@gmail.com'
                }, {
                    name: 'Mohab Amr'
                }, {
                    name: 'Muhammad Khattab',
                    img: 'static/img/khattab.jpg',
                    email: 'msskmohammed96@gmail.com'
                }, {
                    name: 'Carol Emad Soliman'
                }, {
                    name: 'Ahmed Khaled El Gabri'
                }, {
                    name: 'Ahmed Hossam Maarek'
                }]

            }
        },
        components: {

        },
        created: function () {

        },
        methods: {

        }
    }
</script>

<style scoped>
/* Team Members */
.team-members {
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    margin-bottom: 35px;
}

.team-members .team-avatar {
    position: relative;
}

.team-members .team-avatar:after {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: " ";
    position: absolute;
    background: rgba(129, 129, 129, 0.1);
    transition-duration: 300ms;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);
}

.team-members .team-avatar img {
    display: block;
    margin: 0 auto;
    text-align: center;
}

.team-members .team-desc {
    left: auto;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    position: absolute;
    opacity: 0;
    color: #fff;
    -webkit-transform: translate3d(0, 10%, 0);
    transform: translate3d(0, 10%, 0);
    -webkit-transition: opacity 0.3s;
    -moz-transition: opacity 0.3s;
    -ms-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
}

.team-members .team-desc h4 {
    font-size: 22px;
    font-weight: 600;
    margin: 0 0 10px;
    color: #fff;
}

.team-members .team-desc span {
    display: block;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
}

.team-members:hover .team-avatar:after {
    background: rgba(47, 60, 72, 0.5);
    transition-duration: 300ms;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);
}

.team-members:hover .team-desc {
    -webkit-transform: translate3d(0, -5%, 0);
    transform: translate3d(0, -5%, 0);
    -webkit-transform: translate3d(0, -10%, 0);
    transform: translate3d(0, -10%, 0);
}

.team-members:hover .team-desc {
    opacity: 1;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>