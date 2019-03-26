<template>
  <section class="about-page">
    <header>
      <h1>About Us</h1>
    </header>

    <main>
      <p class="about-txt">Hello&nbsp; there!</p>
      <p class="about-txt">We want to tell you that....</p>

      <div class="about-img-div">
        <img src="../assets/img/about/team.jpg">
      </div>

      <!-- <router-link exact to="/">Back Home</router-link> -->
    </main>
  </section>
</template>

<style scoped>
.about-page {
  color: rgb(207, 214, 228);
}
.about-page header h1 {
  font-size: 2.5em;
  margin: 20px 0 10px 0;
}

.about-img-div {
  min-width: 60vw;
  margin: 0 0 6px 0;
}

.about-page main img {
  width: auto;
  max-width: 90vw;
  max-height: 30vh;
  border-radius: 6px;
}

.about-txt {
  margin: 0 auto 8px auto;
  width: 80%;
  border-radius: 4px;
  background-color: #d8d8d800;
  font-size: 1.2em;
}

.about-page main a {
  font-size: 18px;
  color: rgb(214, 214, 214);
  padding: 4px 8px 4px 8px;
  background-color: rgb(78, 143, 163);
  border-radius: 6px;
  text-decoration: none;
  /* transition: color .4s; */
  transition: background-color 0.3s, color 0.3s;
}

.about-page main a:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(85, 167, 192);
}

@media (min-height: 500px) {
  .about-page header h1 {
    font-size: 1.75em;
  margin: 4px 0 6px 0;
  }
  .about-txt {
  margin: 0 auto 4px auto;
}
}
</style>