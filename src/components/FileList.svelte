<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import { currentFile, files } from "../stores.js";

  import ListItem from "./ListItem.svelte";

  onMount(() => {
    let query = "file:";
    let result = [];

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0, 5) === query) {
        result.push(localStorage.getItem(key));
      }
    }

    if (result.length > 0) {
      result.forEach((entry) => {
        let newData = JSON.parse(entry);
        files.update((currentFiles) => {
          return [...currentFiles, newData];
        });
      });
    }
  });

  function deleteListItem(event) {
    if (event.detail == $currentFile) {
      dispatch("deletedOpenFile");
    }
    files.update((currentFiles) => {
      let newSet = currentFiles.filter((file) => file.id != event.detail);
      return [...newSet];
    });
    localStorage.removeItem("file:" + event.detail);
  }
</script>

<div class="wrap">
  {#if $files.length > 0}
    <div class="list">
      {#each $files as file}
        <ListItem {...file} on:fileToLoad on:ListItemDelete={deleteListItem} />
      {/each}
    </div>
  {:else}
    <h2>Your Files</h2>
  {/if}
</div>

<style lang="scss">
  div.wrap {
    grid-area: list;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: var(--base-1);
  }

  div.list {
    padding: var(--grid-gap);
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
  }

  h2 {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--color-1);
    font-size: 1.2rem;
    font-weight: 300;
    user-select: none;
    opacity: 50%;
  }
</style>
