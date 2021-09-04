<script>
  import { createEventDispatcher } from 'svelte';
  import { friendUsername } from './store.js';

  const dispatch = createEventDispatcher();

  const onKeydown = (e) => {
    if (e.key == 'Enter' && !disabled) {
      dispatch('next');
    }
  };

  $: disabled = $friendUsername.length == 0;
</script>

<input
  on:keydown={onKeydown}
  bind:value={$friendUsername}
  placeholder="Who would you like to talk to?"
/>

<button
  on:click={() => dispatch('next')}
  disabled={$friendUsername.length == 0}
>
  Go!
</button>
