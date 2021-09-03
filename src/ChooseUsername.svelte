<script>
  import { createEventDispatcher } from 'svelte';
  import { username } from './store.js';

  const dispatch = createEventDispatcher();

  const onKeydown = e => {
    if (e.key == 'Enter' && !disabled) {
      dispatch('next');
    }
  };

  $: disabled = $username.length == 0;
</script>

<input on:keydown={onKeydown} bind:value={$username} placeholder="What's your username?" />
<button on:click={() => dispatch('next')} disabled={disabled}>
  Choose username
</button>
