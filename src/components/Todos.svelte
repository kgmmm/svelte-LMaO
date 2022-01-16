<script>
  import { currentFile, files } from "../stores";

  import { v4 as uuidv4 } from "uuid";

  export let currentID;
  export let currentTitle;
  export let currentTodos;

  $: saveValid = currentTitle && currentTodos.length > 0;

  $: rollingCount = currentTodos.length + 1;

  let newLabel;

  function checkForEnter(event) {
    if (event.key !== "Enter") return;

    let newTodo = { index: rollingCount++, label: newLabel, done: false };
    currentTodos = [...currentTodos, newTodo];

    newLabel = "";
  }

  function deleteThis(target) {
    currentTodos = currentTodos.filter((todo) => todo.index != target);
  }

  function saveFile() {
    let isOverwrite = currentID != "";

    if (!isOverwrite) {
      let newFile = {
        id: uuidv4(),
        type: "todos",
        title: currentTitle,
        todos: currentTodos,
      };

      localStorage.setItem("file:" + newFile.id, JSON.stringify(newFile));
      files.update((currentFiles) => {
        return [newFile, ...currentFiles];
      });

      currentID = newFile.id;
      currentFile.set(currentID);
    } else {
      let newFile = {
        id: currentID,
        type: "todos",
        title: currentTitle,
        todos: currentTodos,
      };

      localStorage.setItem("file:" + newFile.id, JSON.stringify(newFile));
      files.update((currentFiles) => {
        let newSet = currentFiles.filter((file) => file.id != newFile.id);
        return [newFile, ...newSet];
      });
    }
  }
</script>

<div class="main">
  <input
    type="text"
    name="todosTitle"
    id="todosTitle"
    placeholder="Title..."
    bind:value={currentTitle}
  />
  <div class="wrap">
    <input
      type="text"
      name="addTodo"
      id="addTodo"
      placeholder="Type a new todo and hit ENTER..."
      class="newTodo"
      bind:value={newLabel}
      on:keydown={checkForEnter}
    />
    {#each currentTodos as todo (todo.index)}
      <span>
        <input type="checkbox" bind:checked={todo.done} />
        <input type="text" bind:value={todo.label} disabled={todo.done} />
        <button class="delete" on:click={deleteThis(todo.index)}>
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
      </span>
    {/each}
  </div>
  <button disabled={!saveValid} class="savebtn" on:click={saveFile}>Save</button
  >
</div>

<style lang="scss">
  input[type="text"].newTodo {
    margin: 0;
    margin-bottom: var(--grid-gap);
    padding: 0 3px;
    width: 100%;
    max-width: 370px;
    height: 40px;
    color: var(--color-1);
    background: var(--main-fg);
    border: none;
    border-bottom: solid 3px var(--purple);

    &:focus {
      outline: none;
    }
  }

  span {
    width: 100%;
    max-width: 370px;
    display: grid;
    place-items: center;
    grid-template-columns: 40px 1fr 30px;
    grid-template-rows: 40px;

    & input[type="checkbox"] {
      margin: 0;
      padding: 0;
      width: 30px;
      height: 30px;
      accent-color: var(--purple);
    }

    & input[type="text"] {
      margin: 0;
      padding: 0 3px;
      width: 100%;
      height: 30px;
      color: var(--color-1);
      background: var(--main-fg);
      border: none;

      &[disabled] {
        opacity: 50%;
      }

      &:focus {
        outline: none;
      }
    }

    & button {
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
  }

  div.main {
    grid-area: content;
    display: grid;
    grid-template-columns: 1fr var(--col-1-size);
    grid-template-rows: var(--col-1-size) 1fr;
    gap: var(--grid-gap);
  }

  input[name="todosTitle"] {
    padding: 0 30px;
    width: 100%;
    height: 100%;
    color: var(--color-1);
    background: var(--main-fg);
    border: none;

    &:focus {
      outline: none;
    }
  }

  button.savebtn {
    margin: 0;
    padding: 0;
    color: white;
    background: var(--purple);
    border: none;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    grid-row: 1;
    grid-column: 2;

    &:hover {
      background: var(--purple-dark);
    }

    &[disabled] {
      opacity: 50%;
      cursor: not-allowed;

      &:hover {
        background: var(--purple);
      }
    }
  }

  div.wrap {
    padding: 20px 30px;
    width: 100%;
    height: 100%;
    max-height: 100%;
    color: var(--color-1);
    background: var(--main-fg);
    grid-row: 2;
    grid-column: 1 / span 2;
  }
</style>
