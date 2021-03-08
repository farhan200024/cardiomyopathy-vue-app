<template>
<body>
  <div class="help-page-container">
        <h1>How can we help? </h1>
    <div class="help-page-content-wrapper">
          <h3>How to register:</h3>
          <ol>
        <li>go to <b><router-link :to = "{ name: 'Login' }">register</router-link></b> page</li>
        <li>Input all your details</li>
        <li>Check your email for verification link</li>
        <li>once verified, able use the service</li>
        <!--<img src="cardiomyopathy-vue-app/src/assets/images/register.JPG" alt="Icon" width="400" height="400">
        -->
      </ol>
      <br>
      <h3>How to login your account:</h3>
          <ol>
        <li>go to <b><router-link :to = "{ name: 'Login' }">login</router-link></b> page</li>
        <li>Input the login Details</li>
        <li>After logged in, able use the service</li>
      </ol>
      <br>
      <h3>what if you forget password:</h3>
          <ol>
        <li>go to <b><router-link :to = "{ name: 'Login' }">forgot password</router-link></b> page</li>
        <li>Input your email address</li>
        <li>check your email and click on the link to reset the password</li>
      </ol>
      <br>
      <h3>search for different types of cardiomyopathy:</h3>
          <ol>
        <li>go to <b><router-link :to = "{ name: 'Search' }">Search</router-link></b> data page</li>
        <li>search and filter for types of cardiomyopathy</li>
      </ol>
      <br>
      <h3>add, delete, update data and view in graphs:</h3>
          <ul>
        <li>go to <b><router-link :to = "{ name: 'Dashboard' }">dashboard</router-link></b> page (only accessible
        when logged in)</li>
        <li>add data, delete, update data or view and compare data in graphs </li>
      </ul>
      <br>
      <h3>View all the uploaded data available:</h3>
          <ul>
        <li>go to <b><router-link :to = "{ name: 'CardiomyopathyData' }">data</router-link></b> page (only accessible
        when logged in)</li>
        <li>view all the uploaded data in graph or view normally</li>
      </ul>
    </div>
        
  </div>

</body>
</template>

<style>

.help-page-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-page-content-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  width: 60%;
}

ol {
  background: #cacbcc;
  padding: 22px;
  
}
ol li {
  background: #f4fff3;
  padding: 5px;
  margin-left: 20px;
  text-align: initial;
}

ul {
  background: #cacbcc;
  padding: 20px;
}
ul li {
  background: #f4fff3;
  padding: 5px;
  margin-left: 20px;
  text-align: initial;
}

@media screen and (max-width: 700px) {
		.help-page-content-wrapper {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
    }
}
</style>