<template>
    <div class="alert alert-danger" role="alert">
                <strong>404 </strong>
                <h6>File not found</h6>
    </div>
</template>
<script>    
export default {
    props:['loadBar'],
    created: function(){
        this.loadBar();
    }
}
</script>