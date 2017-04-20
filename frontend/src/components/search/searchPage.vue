<template lang="html">
        <div class="">
          <div class="wrapper">
            <div class="container">
              <div class="row">
                <div class="col-sm-10 col-sm-offset-2 search-header">
                  <h1 class="firs-search-header">Search for activities/businesses </h1>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-sm-10 col-sm-offset-2">
                  <div class="input-group">
                    <input type="text" v-model="content" class="form-control" aria-label="">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-danger search-btn" aria-haspopup="true" aria-expanded="false" @click="search">Search! <span class="caret"></span></button>
                    </div><!-- /btn-group -->
                  </div><!-- /input-group -->
                  <div class="btn-group btn-group-horizontal" >
                    <label class="btn active">
                      <input name="type" type="radio"  v-model= "searchType" value="business" checked> <span>  Business</span>
                    </label>
                    <label class="btn">
                      <input name="type" type="radio"  v-model= "searchType" value="activity" > <span> Activity</span>
                    </label>
                  </div>
                </div><!-- /.col-lg-6 -->
              </div><!-- /.row -->
            </div>
          </div>
           <div class="search-results">
              <searchResults :results="results" :searchType="searchType"></searchResults>
          </div>

        </div>
</template>

<script>
import SearchResults from './searchResults';
var URL = require('../env.js').HostURL;
export default {

  data() {
    return {
      searchType: 'business',
      content: '',
      results: [],
      whatever:''
    }
  },
  components: {
    searchResults: SearchResults
  },
  methods : {
      search : function(e) {
        if (this.searchType == 'business') {
  				console.log('business search');
  				this.$http.get(URL + '/search/businesses?q=' + this.content)
  					.then(function (res) {
  						if (res.body.errors) {
  							console.log(res.body.errors);
  							this.erros = res.body.errors;
  						}
  						console.log(res.body.data);
  						this.results = res.body.data;
  					}).catch(function (err) {
  						console.log(err);
  					});
  			} else {

  				console.log('activity search');
  				this.$http.get(URL + '/search/activities?q=' + this.content)
  					.then(function (res) {
  						if (res.body.errors) {
  							console.log(res.body.errors);
  							this.errors = res.body.errors;
  						}
  						console.log(res.body.data);
  						this.results = res.body.data;
  					}).catch(function (err) {
  						console.log(err);
  					});
  			}
    }
  }
}
</script>

<style lang="css">
  .search-btn {
    width: 100%
  }

</style>
