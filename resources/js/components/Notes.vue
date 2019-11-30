<template>
   

    <table class="table table-hover">
  <thead>
    <tr>
      
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Opertions</th>
    </tr>
  </thead>
  <tbody>
  
    <tr  v-for="note in notesData.data" :key="note.id">
      
      <td>{{note.title}}</td>
      <td v-html="note.description"></td>
      
            <td>

        <button class="edit" @click="editNote(note.id,note.title,note.description)">Edit</button>
        <button class="delete" @click="deleteNote(note.id)">Delete</button>
</td>

     
      
      
    </tr>
   
    <pagination :data="notesData" @pagination-change-page="getResults"></pagination>
  </tbody>
  <v-app>
<v-dialog
            persistant
            scrollable
            v-model="editNoteDialog"
            max-width="500"
        >
            <v-card>


                    <v-card-title class="headline justify-space-between" >
                        Edit Note
                        <v-btn icon @click="editNoteDialog= false">
                            <v-icon color="red" small >close</v-icon>
                        </v-btn>
                    </v-card-title>


                <v-card-text>
                    <div>
   
 
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Note Title:</label>
            <input type="text" class="form-control" v-model="edit_title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Note Description:</label>
                <vue-editor v-model="edit_description"  :editorToolbar="customToolbar"></vue-editor>
            
            </div>
          </div>
        </div><br />
        
    
  </div>
                    
                   
                    
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn
                        color="red"
                        text
                        @click="editNoteDialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="red"
                        text
                        @click="updatePost()"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-app>

</table>

</template>
 
<script>
	import axios from 'axios';
  import { VueEditor } from "vue2-editor";
	axios.interceptors.request.use(function (config) {
    // assume your access token is stored in local storage 
    // (it should really be somewhere more secure but I digress for simplicity)
    let token = localStorage.getItem('token')
    if (token) {
       config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
    export default {
            components: {
    VueEditor
  },

    	name: "Notes",
        data() {
            return {
                notesData: {},
              editNoteDialog: false,
              id:'',
              edit_title:'',
              edit_description:'',
                  customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }],],
            }
        },
        mounted() {
             this.$store.dispatch('get_all_notes');
        },

        computed:{
             get_notes(){
                return this.$store.getters.get_notes;
            },
           },
           watch:{
             get_notes(note){
              if(note.data.length !=0)
              {
                this.notesData=note;

              }
            
           
         }
       },
            
        methods: {
          editNote(id,title,description){
            this.id=id;
            this.edit_title=title;
            this.edit_description=description;
                this.editNoteDialog = true;
            },
            getResults(page) {
                // if (typeof page === 'undefined') {
                //     page = 1;
                // }
      
               axios.get('/api/vue/note?page=' + page)
                    .then(data => {
                    	
                        this.notesData = data.data;
                    });
            },
               deleteNote(id){  
                this.$store.dispatch('delete_note', {
                        id: id,
                     

                    });

            },
            updatePost()
            {
                     this.$store.commit('set_clear_app_msgs');

                     
                      if (this.edit_title!='' && this.edit_description!='') {

                          this.$store.dispatch('editNote', {
                              id:this.id,
                              title: this.edit_title,
                              description: this.edit_description,
                          });
                          this.editNoteDialog=false;

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
<style type="text/css">
  body{
  font-family: Arial, sans-serif;
}
.table{
  width: 100%;
  thead{
    th{
      padding: 10px 10px;
      background: #00adee;
      font-size: 15px;
      text-transform: uppercase;
      vertical-align: top;
      color: #1D4A5A;
      font-weight: normal;
      text-align: left;
    }
  }
  tbody{
    tr{
      td{
        padding: 10px;
        background: #f2f2f2;
        font-size: 14px;
      }
    }
  }
}

.add, .edit, .save, .delete{
  outline: none;
  background: none;
  border: none;
}

.edit, .save, .delete{
  padding: 5px 10px;
  cursor: pointer;
}


.add{
  float: right;
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 13px;
  padding: 0;
  padding: 3px 5px;
  cursor: pointer;
  
  &:hover{
    background: #ffffff;
    color: #00adee;
  }
}

.save{
  display: none;
  background: #32AD60;
  color: #ffffff;
  
  &:hover{
    background: darken(#32AD60, 10%);
  }
}

.edit{
  background: #2199e8;
  color: #ffffff;
  
  &:hover{
    background: darken(#2199e8, 10%);
  }
}

.delete{
  background: #EC5840;
  color: #ffffff;
  
   &:hover{
    background: darken(#EC5840, 10%);
  }
}

</style>