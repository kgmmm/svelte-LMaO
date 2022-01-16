<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleDeleteClick() {
    dispatch("deleteThis");
  }
</script>

<button class="remove" on:click={handleDeleteClick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-x-lg"
    viewBox="0 0 16 16"
    title="Delete"
  >
    <path
      fill-rule="evenodd"
      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
    />
    <path
      fill-rule="evenodd"
      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
    />
  </svg>
</button>

<style lang="scss">
  button.remove {
    grid-area: delete;
    margin: 0;
    padding: 0;
    height: 30px;
    display: grid;
    place-items: center;
    border: none;
    background: transparent;
    cursor: pointer;

    & svg {
      fill: var(--color-1);
    }

    &:hover {
      & svg {
        fill: red;
      }
    }
  }
</style>
