<template lang="html">
  <div>
    <div class='center shad'>
      <div class='searchContainer'>

        <div class='center'>
          <h2> Search</h2>
        </div>

        <div class='center des'>
          Search Thousands of activities and businesses to reserve your spot ...
        </div>

        <input v-on:keyup='search' type="text" v-model="content" class="form-control box_shadow" aria-label="" placeholder="">
        <br>
        <div class="center dropCont">
          <select class="form-control drop backgroudcolor1" v-model="searchType">
                        <option value="business">
                          Business
                        </option>
                        <option value="activity">
                          Activity
                        </option>
        </select>
        </div>

        <!--<div class="btn-group btn-group-horizontal">
          <label class="btn active">
           <input name="type" type="radio"  v-model= "searchType" value="business" checked> <span>  Business</span>
      </label>
      <label class="btn">
      <input name="type" type="radio"  v-model= "searchType" value="activity" > <span> Activity</span>
          </label>
        </div>-->
      </div>
    </div>

    <div class="search-results center">
      <div class="searchCont">
        <searchResults :results="results" :searchType="searchType"></searchResults>
      </div>
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
        whatever: ''
      }
    },
    components: {
      searchResults: SearchResults
    },
    methods: {
      search: function (e) {
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

  .shad {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    padding-bottom: 30px;
  }

  .searchContainer {
    position: relative;
    width: 500px;
    height: auto;
    margin-top: 30px;
  }

  input {
    height: 50px;
    border-radius: 30px !important;
    border: 0px !important;
  }

  .des {
    color: gray;
    padding: 10px;
    padding-right: 40px;
    padding-left: 40px;

    text-align: center
  }

  .drop {
    width: 95px;
    color: white;
  }

  .dropCont {
    
  }

  .search-results {
    position: relative;
    padding: 50px;
    background-image: url('/static/default/images/bgPattern.jpg')
  }

  .search-results {
    position: relative;
  }
</style>