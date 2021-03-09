<template>
  <div class="container">
    <div class="title">
      <h1>Welcome to <br/>quinbook</h1>
    </div>
    <div class="loginPart">
      <h4>Login to Continue</h4>
      <input type="text" v-model="userName" placeholder="Username" name="username" class="input-css">
      <input type="password" v-model="password" placeholder="Password" name="password" class="input-css">
      <button class="btn" @click="onsubmit">Login</button>
      <h4>Not Registered Yet?<router-link to="/register"> Register Now!</router-link></h4>
    </div>
  </div>
</template>

<script scoped>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'loginPage',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['setLoginAction']),
    
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
        userName: this.userName,
        password: this.password
      }
      if (this.validate()) {
        axios.post('http://', obj).then((res) => {
          localStorage.setItem('sessionID', res.data.sessionID)
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
    }
  },
  created () {
    if (localStorage.getItem('sessionID') !== null) {
      this.$router.push('/login')
    }
  },
  components: {
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
    padding: 30px 60px 40px;
    margin-left: 20%;
    margin-top: 15%;
  }

  h4 {
    text-align: center
  }

  .btn {
    margin: auto;
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

  .input-css{
    display: block;
    padding: 10px;
    width: 250px;
    min-width: 250px;
    margin-bottom: 20px;
    outline: none;
    border-radius: 5px;
    border: 0px;
    border-bottom: 1px solid white;
    -moz-box-shadow: 0 0 10px 1px gray;
    -webkit-box-shadow: 0 0 10px 1px gray;
    box-shadow: 0 0 10px 1px gray;
  }

</style>  