<template lang="">
    <div>
        <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          <section class="container-skeleton">
            <div class="loader" role="alert" aria-busy="true" aria-label="loading">
              <div class="circle"></div>
              <div class="bar"></div>
              <div class="bar short"></div>
            </div>
          </section>
          
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.container-skeleton {
    width: 100%;
}

.loader {
    display: grid;
    height: 6rem;
    width: 100%;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 20% 1fr;
    padding: 20px;
    gap: 15px;
}

.circle {
    grid-row: 1 / 3;
    grid-column: 1 / 2;

    height: 100%;
    aspect-ratio: 1;

    border-radius: 50%;
}

.bar {
    border-radius: 1rem;
}

.bar:not(.short) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
}

.bar.short {
    grid-row: 2 / 3;
    gird-column: 2 / 3;

    width: 75%;
}

/* Animation */
@keyframes pulse {
    from {
        background-color: #dddddd;
    }

    to {
        background-color: #eeeeee;
    }
}

.loader>* {
    animation:
        pulse 700ms infinite alternate;
}
</style>