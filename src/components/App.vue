<template>
  <router-view />
</template>

<style lang="scss">
@use '@/styles/colors';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Montserrat, sans-serif;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
}

body {
  background-color: colors.$primary;
  color: colors.$text;
  width: 100%;
  min-height: 100svh;
}
</style>
