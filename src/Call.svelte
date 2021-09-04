<script>
  import { onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import { peer, friendUsername } from './store.js';

  let videoStream;
  let inCall = false;

  onMount(() => {
    peer.on('error', (error) => console.error('GOT PEER ERROR', error));

    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peer.call($friendUsername, stream);
        call.on('stream', async (remoteStream) => {
          inCall = true;
          await tick();
          videoStream.srcObject = remoteStream;
        });
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });

    peer.on('call', (call) => {
      window.navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on('stream', async (remoteStream) => {
            inCall = true;
            await tick();
            videoStream.srcObject = remoteStream;
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    return () => (inCall = false);
  });
</script>

{#if inCall}
  <div transition:fly={{ x: -800, duration: 2000 }}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={videoStream} autoplay />
  </div>
{:else}
  <p>Waiting for {$friendUsername} to pick up</p>
{/if}
