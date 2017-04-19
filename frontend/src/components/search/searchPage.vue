<template lang="html">
        <div class="">
          <div class="wrapper">
            <div class="container-fluid">
              <div class="row">

                <div class="col-sm-10 col-sm-offset-2 search-header">
                  <h1 class="firs-search-header">Search for activities/businesses </h1>
                </div>
              </div>
              <br>
              <div class="row search-bar" v-if="!shows">
                <div class="col-sm-10 col-sm-offset-2">
                  <div class="input-group">
                    <input type="text" v-model="content" class="form-control" aria-label="...">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger" aria-haspopup="true" aria-expanded="false" v-on:click="show">Search! <span class="caret"></span></button>
                    </div><!-- /btn-group -->
                  </div><!-- /input-group -->

                  <div class="btn-group btn-group-horizontal" >
                    <label class="btn active">
                      <input name="type" type="radio"  v-model= "searchType" value="business" checked> <i class="fa fa-circle-o fa-2x"></i><i class=""></i> <span>  Business</span>
                    </label>
                    <label class="btn">
                      <input name="type" type="radio"  v-model= "searchType" value="activity" ><i class="fa fa-circle-o fa-2x"></i><i class=""></i><span> Activity</span>
                    </label>
                  </div>
                </div><!-- /.col-lg-6 -->
              </div><!-- /.row -->
            </div>
          </div>
          <!-- <div class="search-results">
              <searchResults v-if="shows" :searchType="searchType" :content="content" ></searchResults>
          </div> -->
        </div>
</template>

<script>
import SearchResults from './searchResults';

export default {

  data() {
    return {
      searchType: '',
      content: '',
      shows: false,
      whatever:''
    }
  },
  components: {
    searchResults: SearchResults
  },
  methods : {
      show : function(e) {
      console.log(this.whatever);
      console.log("whatever");
      if (!this.shows) {
        this.shows = true;
      }
    }
  }
}
</script>

<style lang="css">

   body {
    background-image: url('/static/img/search.jpg');
    background-repeat: no-repeat;
    background-size: cover;

  }
  .container-fluid {
    margin-top: 20%
  }
  .search-header {
    margin-left: 20%
  }
  h1 {
    font-family: sans-serif;
    font-weight: 400;
    color: white;
    background-clip: padding-box;
  }
  .search-bar {
    margin-left: 10%
  }
  .input-radio {
    margin-left: 2%;
  }

  /*radio*/
  /*label.btn span {
  font-size: 1.5em ;
}

label input[type="radio"] ~ i.fa.fa-circle-o{
    color: white;    display: inline;
}
label input[type="radio"] ~ i.fa.fa-dot-circle-o{
    display: none; color: white;
}
label input[type="radio"]:checked ~ i.fa.fa-circle-o{
    display: none;
}
label input[type="radio"]:checked ~ i.fa.fa-dot-circle-o{
    color: #D9534F;    display: inline;
}
label:hover input[type="radio"] ~ i.fa {
color: #D9534F;
}

label input[type="checkbox"] ~ i.fa.fa-square-o{
    color: white;    display: inline;
}
label input[type="checkbox"] ~ i.fa.fa-check-square-o{
    display: none;
}
label input[type="checkbox"]:checked ~ i.fa.fa-square-o{
    display: none;
}
label input[type="checkbox"]:checked ~ i.fa.fa-check-square-o{
    color: #D9534F;    display: inline;
}
label:hover input[type="checkbox"] ~ i.fa {
color: #D9534F;
}

div[data-toggle="buttons"] label.active{
    color: #D9534F;
}

div[data-toggle="buttons"] label {
display: inline-block;
padding: 6px 12px;
margin-bottom: 0;
font-size: 14px;
font-weight: bold;
line-height: 2em;
text-align: left;
white-space: nowrap;
vertical-align: top;
cursor: pointer;
background-color: none;
border: 0px solid
#c8c8c8;
border-radius: 3px;
color: white;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
-o-user-select: none;
user-select: none;

}

div[data-toggle="buttons"] label:hover {
color: #D9534F;
}

div[data-toggle="buttons"] label:active, div[data-toggle="buttons"] label.active {
-webkit-box-shadow: none;
box-shadow: none;
}*/

</style>
