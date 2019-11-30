<template>
    <v-app>


    <v-form
      ref="form"

    >
     <v-text-field
                        autofocus
                        
                        v-model="firstName"
                        placeholder="First Name"

                        color="#e60000"
                        :rules="[rules.required]"
                ></v-text-field>
                          <v-text-field
                            v-model="email"
                            placeholder="Email"
                           
                            :rules="[rules.required,rules.email]"
                            :error-messages="errors"
                            @blur="checkEmail()"
                    ></v-text-field>
                     <v-text-field
                            v-model="username"
                        placeholder="username"

                            :rules="[rules.required]"
                            :error-messages="usernameerrors"
                            @blur="checkUsername()"
                    ></v-text-field>

                   
                <v-text-field
                        v-model="newPassword"
                        class="ma-1"
                        placeholder="Password"
                        dense
                        :rules="[rules.required,rules.min,rules.max]"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        @click:append="show = !show"
                ></v-text-field>
                
               
                <v-text-field
                        v-model="confirmPassword"
                        class="ma-1"
                        placeholder="Confirm Password"
                        dense
                        :rules="[rules.required,passwordConfirmationRule]"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        @click:append="show = !show"
                ></v-text-field>
               
      

     

     

      <v-btn
        color="success"
        class="mr-4"
        @click="Register"
      >
        Register
      </v-btn>

     
    </v-form>
 
</v-app>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                show: false,
                firstName:'',
  
                email: '',
                newPassword: '',
                confirmPassword: '',
                username:'',
                errors:'',
                usernameerrors:'',

                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Minimum 6 characters',
                    max: v => v.length <= 32 || 'Maximum 32 characters',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
                },
            }
        },
         computed:{
            passwordConfirmationRule() {
                return () => (this.newPassword === this.confirmPassword) || 'Password must match'
            },
        },
        methods:{
            checkEmail(){

                axios.post('/api/vue/checkEmailUser',{email:this.email}).then(valid => {

                    if(valid.data === false){

                        this.errors = 'Email Already Existed'
                    }
                    else
                    {
                        this.errors = ''
                    }
                })

            },
            checkUsername(){

                axios.post('/api/vue/checkUsername',{username:this.username}).then(valid => {

                    if(valid.data === false){

                        this.usernameerrors = 'Username Already Existed'
                    }
                    else
                    {
                        this.usernameerrors = ''
                    }
                })

            },
            Register(){
                if (this.$refs.form.validate()&& this.errors=='' && this.usernameerrors =='') {
                   
      this.$store.dispatch('RegisterUser',{email:this.email,
                  password:this.confirmPassword,firstName:this.firstName,username:this.username})
       .then(() => this.$router.push('/notes'))
       .catch(err => console.log(err))



                }
            },
          }
    }
</script>

<style scoped>

</style>
