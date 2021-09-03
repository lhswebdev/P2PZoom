<script>
  import ChooseUsername from './ChooseUsername.svelte';
  import ConnectOther from './ConnectOther.svelte';
  import Call from './Call.svelte';
  import { username } from './store.js';

  let screens = [ConnectOther, Call];
  let screenIdx = 0;
  const nextScreen = () => {
    if (screenIdx < screens.length - 1) screenIdx++;
  };
</script>

<main>
  <p>Your id is {$username}</p>
  <svelte:component this={screens[screenIdx]} on:next={nextScreen} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
