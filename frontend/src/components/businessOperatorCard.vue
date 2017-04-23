<template>
    <div>

        <div class="card card-outline-danger text-center">
            <div class="card-block">
                <img v-if="businessOperator.userId.profileImage" :src="url+'/uploads/'+businessOperator.userId.profileImage">
                <img v-else src="/static/default/images/defaultPic.png">
                <h3 class="card-title">{{ businessOperator.name }}</h3>
                <div class="row">
                    <router-link :to="'/profile/?username='+businessOperator.userId.username" class="btn btn-primary offset-md-1">View</router-link>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    export default {
        props: ['businessOperator'],
        name: 'BusinessOperatorCard',
        data() {
            return {}
        }
    }
</script>