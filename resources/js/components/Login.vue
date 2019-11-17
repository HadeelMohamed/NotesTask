<template>
    <v-app>

   <v-container>
     <v-form ref="form">
    <v-layout row class="text-xs-center">
     
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
            <v-text-field prepend-icon="person" name="username" label="username"
            v-model="username"
                        class="ma-1"
                        placeholder="Username"
                        dense
                        :rules="[rules.required]"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"
                        
                        placeholder="Password"
                        dense
                        :rules="[rules.required,rules.min,rules.max]"></v-text-field>
            <v-card-actions>
              <v-btn color="success"
        class="mr-4"
        @click="Login" >Login</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-form>
  </v-container>
</v-app>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                
  
                username: '',
                password: '',
                

                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
                },
            }
        },
        
        methods:{
           
            Login(){
                if (this.$refs.form.validate()) {
                   
      this.$store.dispatch('LoginUser',{username:this.username,
                  password:this.password})
       .then(() => this.$router.push('/notes'))
       .catch(err => console.log(err))



                }
            },
          }
    }
</script>

<style scoped>

</style>
