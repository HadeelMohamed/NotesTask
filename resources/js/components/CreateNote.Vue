<template>
  <div>
    <h1>Create A Note</h1>
    <form @submit.prevent="addNote">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Note Title:</label>
            <input type="text" class="form-control" v-model="note.title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Note Description:</label>
                <vue-editor v-model="note.description"  :editorToolbar="customToolbar"></vue-editor>
         
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";

    export default {
        components: {
    VueEditor
  },
        data(){
        return {
          note:{},
          customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }],],

        }
    },
    methods: {
            addNote()
            {


                     
                      if (this.note.title!='' && this.note.description!='') {

                          this.$store.dispatch('addNote', {
                              title: this.note.title,
                              description: this.note.description,
                          });
                          this.$router.push({name:'notes'});

                      } else {
                          this.$store.commit('set_app_msgs', {
                              msg: "Please Fill all inputs ",
                              color: "info",
                              icon: ""
                          })
                      }

            },
    }
  }
</script>