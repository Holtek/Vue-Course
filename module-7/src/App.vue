// <template>
  //
  <div class="container">
    //
    <div class="row">
      //
      <div class="col-xs-12">
        //
        <button @click="selectedComponent='appQuote'">Quote</button>
        //
        <button @click="selectedComponent='appAuthor'">Author</button>
        //
        <button @click="selectedComponent='appNew'">New</button>
        //
        <hr />//
        <p>{{selectedComponent}}</p>//
        <keep-alive>
          //
          <component :is="selectedComponent">
            //
            <p>Default Content</p>//
          </component>//
        </keep-alive>//
        <!-- <app-quote>
//           <h2 slot="title">{{quoteTitle}}</h2>
//           <p slot="content">A wonderful Quote</p>
        //         </app-quote>-->
        //
        <hr />//
      </div>//
    </div>//
  </div>//
</template>

// <script>
// import Quote from "./components/Quote.vue";
// import Author from "./components/Author.vue";
// import New from "./components/New.vue";
// export default {
//   data: function() {
//     return {
//       quoteTitle: "The Quote",
//       selectedComponent: "appQuote"
//     };
//   },
//   components: {
//     appQuote: Quote,
//     appAuthor: Author,
//     appNew: New
//   }
// };
//
</script>

// <style scoped>
//
</style>



<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Http</h1>
        <div class="from-group">
          <label for>Username</label>
          <input class="from-control" type="text" v-model="user.username" />
        </div>
        <div class="from-group">
          <label for>Mail</label>
          <input class="from-control" type="text" v-model="user.email" />
        </div>
        <button class="btn btn-primary" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: ""
      }
    };
  },
  methods: {
    submit() {
      this.$http.post("https://vue-http-9b118.firebaseio.com/data.json");
    }
  }
};
</script>

<style>
</style>
