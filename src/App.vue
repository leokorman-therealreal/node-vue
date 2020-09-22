<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'Bulma/css/bulma.min';
@import 'Bulma/sass/utilities/initial-variables';

:root {
  --base-unit: calc(#{$gap} / 4);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: $gap;
}

#app h1 {
    font-weight: bold;
}

#nav {
    padding: var(--base-unit);

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
