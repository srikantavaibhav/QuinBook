<template>
  <div class="container">
    
    <div class="title">
      <h1>Welcome to <br/>quinbook</h1>
    </div>
    <div class="loginPart">
      <h4>Login to Continue</h4>
      <input type="text" v-model="userName" placeholder="Username" name="username" class="input-css">
      <div class="passwordFeild">
      <input :type="type" v-model="password" placeholder="Password" name="password" class="input-css">
      <button @click="toggle" id="eye">
        <i class="fa fa-eye"  v-if="icon"></i>
        <i class="fa fa-eye-slash" v-else></i>
      </button>
      </div>
      <button class="btn" @click="onsubmit">Login</button>
      <hr style="width:81%;text-align:left;margin-left:25px">
      <button v-google-signin-button="clientId" class="google-signin-button"><img id = "google" src="../assets/1004px-Google__G__Logo.svg.webp"><div id = "buttonText"> Continue with Google </div></button>
      <h4>Not Registered Yet?<router-link to="/register"> Register Now!</router-link></h4>


    </div>
  </div>
</template>

<script scoped>
import { mapActions } from 'vuex'
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  
  name: 'loginPage',
  data () {
    return {
      isGoogle: '',
      token: '',
      userName: '',
      password: '',
      type: 'password',
      icon: true
  }
  },
  directives: {
    GoogleSignInButton
  },
  methods: {
    ...mapActions(['setLoginAction']),

     OnGoogleAuthSuccess (idToken) {
      // Receive the idToken and make your magic with the backend
      console.log(idToken)
      if(idToken !== null){
      this.onGoogleLogin(idToken)
     } else{
       alert('Google Sign-In was not succesful. Try again!')
     }
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },

    toggle () {
      this.type = this.type==='password'?'text':'password'
      this.icon = this.type==='password'?true:false
    },
   
    validate () {
      if (this.userName === '') {
        alert('Please enter username!')
        return false
      }
      if (this.password === '') {
        alert('Please enter password!')
        return false
      }
      return true
    },
    onsubmit () {
        const obj = {
        isGoogle: 'false',
        token: '',
        userName: this.userName,
        password: this.password
      }
      if (this.validate()) {
        axios.post('http://', obj).then((res) => {
          localStorage.setItem('sessionID', res.data.sessionID) // check sessionID or sessionId
          this.$store.dispatch('setLoginAction', res.data.sessionID)
          if (res.data.sessionID === '' && res.data.isRegistered === 'true') {
            alert('Invalid Login Credentials!')
            localStorage.removeItem('sessionID') 
            this.$router.push('/login')
          }
          if (res.data.sessionID === '' && res.data.isRegistered === 'false') {
            alert('Not a registered user. Please register!')
            localStorage.removeItem('sessionID')
            this.$router.push('/register')
          }
          if (this.$route.query.routeto === 'home') {
            this.$router.push('/home')
          } else {
            this.$router.push('/login')
          }
        })
      }
  },

  onGoogleLogin (idToken) {
    const obj = {
        isGoogle: 'true',
        token: idToken,
        userName: '',
        password: ''
      }
        axios.post('http://', obj).then((res) => {
          localStorage.setItem('sessionID', res.data.sessionID)
          this.$store.dispatch('setLoginAction', res.data.sessionID) // check store, whether to set true or sessionId
          if (res.data.sessionID === '' && res.data.isRegistered === 'true') {
            alert('Invalid Login Credentials!')
            localStorage.removeItem('sessionID') 
            this.$router.push('/login')
          }
          if (res.data.sessionID === '' && res.data.isRegistered === 'false') {
            alert('Not a registered user. Please register!')
            localStorage.removeItem('sessionID')
            this.$router.push('/register')
          }
          // if sessionId and isRegister exits
          if (this.$route.query.routeto === 'home') {
            this.$router.push('/home')
          } else {
            this.$router.push('/login')
          }
        })
      

    }
  },
  created () {
    if (localStorage.getItem('sessionID') !== null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style >

  .container {
    display: flex;
  }

  .title {
    /* flex: 0 0 auto; */
    margin-left: 25%;
    margin-top: 20%;
  }

  .loginPart {
    /* flex: 0 0 auto; */
    border: 1px solid black;
    padding: 0px 60px 2px;
    margin-left: 20%;
    margin-top: 12%;
  }

  h4 {
    margin-top: 50px;
    text-align: center
  }

  .btn {
    margin-left: 115px;
    display: block;
    background-color: white;
    width: 100px;
    padding: 10px;
    display: block;
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .btn:focus{
    background-color: #eaecec;
    outline: none;

  }

  #google {
    float: left;
  }

  #buttonText {
    margin: 4px;
  }

  .google-signin-button {
    height: 35px;
    display: block;
    width: 270px;
    margin: 10px 25px 4px;
    border: 0px;
    background-color: white;
    -moz-box-shadow: 0 0 10px 1px gray;
    -webkit-box-shadow: 0 0 10px 1px gray;
    box-shadow: 0 0 10px 1px gray;    
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }

  .google-signin-button:focus {
    background-color: #eaecec;
    outline: none;
  }

  .input-css {
    display: block;
    padding: 10px;
    width: 250px;
    min-width: 250px;
    margin-left: 25px;
    margin-bottom: 20px;
    outline: none;
    border-radius: 5px;
    border: 0px;
    -moz-box-shadow: 0 0 10px 1px gray;
    -webkit-box-shadow: 0 0 10px 1px gray;
    box-shadow: 0 0 10px 1px gray;
  }

  .input-css:focus{
    background-color: #dbdfdf;
  }

  img {
    margin-right: px;
    width: 10%;
  height: auto;
  }

  .passwordFeild {
    display: flex;

  }

  #eye {
    margin: 0px 2px 19px;
    float: right;
  }

</style>  