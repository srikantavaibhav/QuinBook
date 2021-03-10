<template>
  <div>
    <div class="container">
      <div class="userlogin">
        <div class="title">
          <img src="../assets/Quinbook.png" style="width:50%">
          <h1 style="font-size:40px" v-anime="{targets: 'h1', translateX: 200, rotate: '1turn', backgroundColor: '',color: '#FFFFFF', duration: 8000, loop: false}">  Welcome to</h1>
          <h1 style="font-size:80px" v-anime="{targets: 'h1', translateX: 200, rotate: '1turn', backgroundColor: '',color: '#3aed91', duration: 8000, loop: false} ">QuinBook</h1>

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
          <h4>Not Registered Yet?<router-link to="/register" style="color:white"> Register Now!</router-link></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import VueAnime from 'vue-animejs'
import Vue from 'vue'


Vue.use(VueAnime)

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
       this.$alert('Google Sign-In was not succesful. Try again!')
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
        this.$alert('Please enter username!')
        return false
      }
      if (this.password === '') {
        this.$alert('Please enter password!')
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
         console.log("dsdss")
        axios.post('http://10.177.68.66:8082/login', obj).then((res) => {
          console.log("dsdss")
          localStorage.setItem('sessionID', res.data.sessionID) // check sessionID or sessionId
          this.$store.dispatch('setLoginAction', res.data.sessionID)
          if (res.data.sessionID === '' && res.data.isRegistered === true) {
            this.$alert('Invalid Login Credentials!')
            localStorage.removeItem('sessionID') 
            this.$router.push('/login').catch(()=>{console.log('exception')})
          }
          if (res.data.sessionID === '' && res.data.isRegistered === false) {
            this.$alert('Not a registered user. Please register!')
            localStorage.removeItem('sessionID')
            this.$router.push('/register')
          }
          if (res.data.sessionID !== '' && res.data.isRegistered === true) {
            console.log('inThis')
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
      console.log('inside onGoogleLogin')
        axios.post('http://10.177.68.66:8082/login', obj).then((res) => {
          localStorage.setItem('sessionID', res.data.sessionID)
          this.$store.dispatch('setLoginAction', res.data.sessionID) // check store, whether to set true or sessionId
          if (res.data.sessionID === '' && res.data.isRegistered === true) {
            alert('Invalid Login Credentials!')
            localStorage.removeItem('sessionID') 
            this.$router.push('/login').catch(()=>{})
          }
          if (res.data.sessionID === '' && res.data.isRegistered === false) {
            alert('Not a registered user. Please register!')
            localStorage.removeItem('sessionID')
            this.$router.push('/register')
          }
          // if sessionId and isRegister exits
          if (res.data.sessionID !== '' && res.data.isRegistered === true) {
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

<style scoped>

  .userlogin {
    display: flex;
    justify-content: space-evenly;
  }

  .title {
    width: 30%;
    margin: 188px;
  }

  .loginPart {
    margin: 200px 150px 179px;
    border: 0.5px solid #bdb9b9;
    width: 25%;
    padding: 25px 25px 50px;
    background-color: #21bf73d2;
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
    -moz-box-shadow: 0 0 10px 1px black;
    -webkit-box-shadow: 0 0 10px 1px black;
    box-shadow: 0 0 10px 1px black;    
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
    -moz-box-shadow: 0 0 10px 1px black;
    -webkit-box-shadow: 0 0 10px 1px black;
    box-shadow: 0 0 10px 1px black;
    overflow: scroll;
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
    cursor: pointer;
  }

</style>  