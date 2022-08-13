<script>
  export let isLoading;
</script>

{#if isLoading}
  <div class="wrapper">
    <div class="loader" />
    <div class="label">Loading</div>
  </div>
{/if}

<style>
  .wrapper {
    position: absolute;
    z-index: 999;
    top: var(--space-xs);
    right: var(--space-xs);
    margin: 0;
    display: flex;
    align-items: center;
    width: auto;
  }
  .label {
    font-size: var(--font-size-s);
    color: var(--color-text-weaker);
    margin-left: var(--space-xs);
  }
  .loader,
  .loader:after {
    border-radius: 50%;
  }
  .loader {
    position: relative;
    width: 18px;
    height: 18px;
    border-top: 3px solid var(--color-foreground-weakest);
    border-right: 3px solid var(--color-foreground-weakest);
    border-bottom: 3px solid var(--color-foreground-weakest);
    border-left: 3px solid var(--color-brand-base);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
