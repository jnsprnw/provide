<header>
  <h4>How to start?</h4>
  <p>
    The <b>climate risk dashboard</b> allows you to explore future impacts from climate
    change as the world warms. Start by picking a mode.
  </p>
</header>
<section class="path">
  <div>
    <span class="text-label">Impacts</span>
    <span class="description"
      >Pick a geography, select one or several scenarios, and explore
      corresponding impacts</span
    >
  </div>
  <figure class="container">
    <img src="/img/impacts.png" />
  </figure>
  <a class="btn btn--big" href="/explore/impacts">Explore</a>
</section>
<section class="path disabled">
  <div>
    <span class="text-label">Emission scenarios</span>
    <span class="description"
      >Select a threshold for a climate impact, explore scenarios under which
      the threshold won't be exceeded
    </span>
  </div>
  <figure class="container">
    <img src="/img/emission-scenarios.png" />
  </figure>
  <span class="btn btn--big" aria-disabled="true">In development</span>
</section>

<style lang="postcss">
  header {
    grid-column: 2 / -2;
    margin: var(--space-xxxl) 0;
    text-align: center;
    color: var(--color-font-base);

    h4 {
      font-size: var(--font-size-large-l);
      margin-bottom: var(--space-m);
    }

    p {
      font-size: var(--font-size-large-xl);
    }
  }

  .path {
    display: grid;
    grid-template-rows: 1fr auto auto;
    grid-gap: var(--space-xs);
    grid-column-start: span 6;
    background-color: var(--color-background-stronger);

    figure img {
      width: 80%;
    }

    .text-label {
      display: block;
      padding: var(--space-xl) 0 0 var(--space-xl);
    }

    .description {
      padding: 0 var(--space-xl) 0 var(--space-xl);
      display: block;
      font-size: var(--font-size-large-xl);
      color: var(--color-text-base);
      font-weight: var(--font-weight-extrabold);
    }

    figure {
      width: 100%;
      text-align: center;
      padding: var(--space-m);
    }

    &.disabled {
      opacity: 0.6;
    }
  }
</style>
