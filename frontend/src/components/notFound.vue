<template>
<!--    <div class="alert alert-danger" role="alert">
                <strong>404 </strong>
                <h6>File not found</h6>
    </div>-->
    <div>
    
    <link rel="stylesheet" href="/static/default/css/default.css">
        <div class ="spinner">
            <pulseLoader></pulseLoader>
        </div>
    </div>
</template>
<script>    
import pulseLoader from '../../node_modules/vue-spinner/src/PulseLoader.vue'
export default {
    props:['startP','endP'],
    created: function(){
        this.startP();
        this.endP();
    },
    components:{
        pulseLoader
    }
}
</script>