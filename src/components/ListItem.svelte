<script>
  import { fly } from "svelte/transition";
  import { currentFile } from "../stores";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import DeleteButton from "./DeleteButton.svelte";

  export let id;
  export let type;
  export let title;

  $: item = id;

  $: selected = $currentFile == item;

  function handleFileClick(targetID) {
    dispatch("fileToLoad", {
      fileID: targetID,
    });
  }

  function sendDelete(ListItemID) {
    dispatch("ListItemDelete", ListItemID);
  }
</script>

{#if type == "note"}
  <div
    style="--accent: var(--green); --accent-alt: var(--green-alt);"
    class:selected
    in:fly={{ y: 20, duration: 300 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-justify-left"
      viewBox="0 0 16 16"
      title="Note"
    >
      <path
        fill-rule="evenodd"
        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
      />
    </svg>
    <button on:click={handleFileClick(id)}>{title}</button>
    <DeleteButton on:deleteThis={sendDelete(id)} />
  </div>
{:else if type == "todos"}
  <div
    style="--accent: var(--purple); --accent-alt: var(--purple-alt);"
    class:selected
    in:fly={{ y: 10, duration: 300 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-list-check"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
      />
    </svg>
    <button on:click={handleFileClick(id)}>{title}</button>
    <DeleteButton on:deleteThis={sendDelete(id)} />
  </div>
{/if}

<style lang="scss">
  div {
    margin-bottom: var(--grid-gap);
    padding: 0.5rem;
    min-height: 60px;
    color: var(--color-1);
    background: var(--main-fg);
    user-select: none;
    display: grid;
    grid-template-rows: 1.5rem 1fr;
    grid-template-columns: 30px 1fr 30px;
    grid-template-areas:
      "indicator heading delete"
      "indicator heading delete";
    opacity: 80%;
    border-left: solid 3px var(--accent);

    &:hover {
      opacity: 100%;
    }

    &.selected {
      opacity: 100%;
      background: var(--accent-alt);
    }

    & svg {
      grid-area: indicator;
      width: 20px;
      height: 20px;
      fill: var(--color-1);
    }

    & button {
      grid-area: heading;
      font-size: 0.9rem;
      font-weight: 400;
      max-width: 100%;
      display: grid;
      justify-content: start;
      align-items: start;
      color: var(--color-1);
      background: transparent;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
</style>
