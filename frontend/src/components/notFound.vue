<template>
<div class="alert alert-danger" role="alert">
                <strong>404 </strong>
                <h6>File not found</h6>
    
    <link rel="stylesheet" href="/static/default/css/default.css">
        
    </div>
</template>
<script>    
import pulseLoader from './PulseLoader.vue'
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