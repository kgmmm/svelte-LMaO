<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let kind;

  function newFile(fileType) {
    dispatch("newFile", {
      type: fileType,
    });
  }
</script>

{#if kind == "note"}
  <button class="note" on:click={() => newFile("note")}>
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
  </button>
{:else if kind == "todos"}
  <button class="todos" on:click={() => newFile("todos")}>
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
  </button>
{/if}

<style lang="scss">
  button {
    margin: 0;
    margin-bottom: var(--grid-gap);
    padding: 0;
    width: 100%;
    height: var(--col-1-size);
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;

    &::after {
      min-width: max-content;
      padding: 3px 10px;
      position: absolute;
      top: 50%;
      left: calc(100% - var(--grid-gap));
      transform: translateY(-50%);
      z-index: 1;
      color: white;
      border-radius: 0 50vw 50vw 0;
      visibility: hidden;
      pointer-events: none;
    }

    &.note {
      background-color: var(--green);
      &:hover {
        background: var(--green-dark);

        &::after {
          background: var(--green-dark);
          visibility: visible;
        }
      }

      &::after {
        content: "Add Note";
      }
    }
    &.todos {
      background-color: var(--purple);
      &:hover {
        background: var(--purple-dark);

        &::after {
          background: var(--purple-dark);
          visibility: visible;
        }
      }

      &::after {
        content: "Add Todo";
      }
    }

    & svg {
      width: 55%;
      height: 55%;
      fill: white;
    }
  }
</style>
