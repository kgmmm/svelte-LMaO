<script>
  import { currentFile, indentToggle } from "./stores";
  import { onMount } from "svelte";

  import Normalize from "./Normalize.svelte";

  import AddNew from "./components/AddNew.svelte";
  import FileList from "./components/FileList.svelte";
  import Editor from "./components/Editor.svelte";
  import Todos from "./components/Todos.svelte";

  let theme;

  onMount(() => {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const userPrefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    if (userPrefersDark) {
      document.body.setAttribute("theme", "dark");
      theme = "dark";
    } else if (userPrefersLight) {
      document.body.removeAttribute("theme");
      theme = "light";
    }

    let storedTheme = localStorage.getItem("theme");

    if (storedTheme == "dark") {
      document.body.setAttribute("theme", "dark");
      theme = "dark";
    } else if (storedTheme == "light") {
      document.body.removeAttribute("theme");
      theme = "light";
    }
  });

  function toggleTheme() {
    if (theme == "light") {
      localStorage.setItem("theme", "dark");
      document.body.setAttribute("theme", "dark");
      theme = "dark";
    } else if (theme == "dark") {
      localStorage.setItem("theme", "light");
      document.body.removeAttribute("theme");
      theme = "light";
    }
  }

  let currentContentType = "";

  let currentID = "";
  let currentTitle = "";
  let currentText = "";
  let currentTodos = new Array();

  $: editorProps = {
    currentID: currentID,
    currentTitle: currentTitle,
    currentText: currentText,
  };

  $: todosProps = {
    currentID: currentID,
    currentTitle: currentTitle,
    currentTodos: currentTodos,
  };

  function loadFile(event) {
    let targetFile = localStorage.getItem("file:" + event.detail.fileID);
    let parsed = JSON.parse(targetFile);

    if (parsed.type == "note") {
      currentContentType = "note";
      let targetTitle = parsed.title;
      let targetText = parsed.text;

      currentFile.set(event.detail.fileID);
      editorProps = {
        currentID: event.detail.fileID,
        currentTitle: targetTitle,
        currentText: targetText,
      };
    } else if (parsed.type == "todos") {
      currentContentType = "todos";
      let targetTitle = parsed.title;
      let targetTodos = parsed.todos;

      currentFile.set(event.detail.fileID);
      todosProps = {
        currentID: event.detail.fileID,
        currentTitle: targetTitle,
        currentTodos: targetTodos,
      };
    }
  }

  function newFile(event) {
    if (event.detail.type == "note") {
      currentFile.set("");
      editorProps = {
        currentID: "",
        currentTitle: "",
        currentText: "",
      };
      currentContentType = "note";
    } else if (event.detail.type == "todos") {
      currentFile.set("");
      todosProps = {
        currentID: "",
        currentTitle: "",
        currentTodos: new Array(),
      };
      currentContentType = "todos";
    }
  }

  function deletedOpenFile() {
    currentContentType = "";
  }
</script>

<Normalize />

<main>
  <button class="theme" on:click={toggleTheme}>
    {#if theme == "dark"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-lightbulb"
        viewBox="0 0 16 16"
      >
        <path
          d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"
        />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-lightbulb-off"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.23 4.35A6.004 6.004 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a2.954 2.954 0 0 0-.676-.941 4.984 4.984 0 0 1-1.455-4.405l-.837-.836zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z"
        />
      </svg>
    {/if}
  </button>
  <nav>
    <AddNew kind="note" on:newFile={newFile} />
    <AddNew kind="todos" on:newFile={newFile} />
    {#if currentContentType == "note"}
      <button
        class:active={$indentToggle == true}
        class="indent"
        on:click={() => indentToggle.set(!$indentToggle)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-text-indent-left"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
    {/if}
  </nav>
  <FileList on:fileToLoad={loadFile} on:deletedOpenFile={deletedOpenFile} />
  {#if currentContentType == "note"}
    <Editor {...editorProps} />
  {:else if currentContentType == "todos"}
    <Todos {...todosProps} />
  {:else}
    <div class="splash">
      <h2>LMaO</h2>
    </div>
  {/if}
</main>

<style lang="scss">
  :global(body) {
    display: grid;
    place-items: center;
    padding: var(--grid-gap);
    color: var(--color-1);
  }

  main {
    width: 100%;
    height: 100%;
    max-height: calc(100vh - calc(var(--grid-gap) * 2));
    display: grid;
    grid-template-columns: var(--col-1-size) var(--col-2-size) 1fr;
    grid-template-rows: var(--col-1-size) 1fr;
    gap: var(--grid-gap);
    grid-template-areas:
      "theme list content"
      "menu list content";

    & button.theme {
      grid-area: theme;
      color: var(--color-1);
      background: var(--base-1);
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;

      & svg {
        width: 60%;
        height: 60%;
        fill: var(--color-1);
        opacity: 50%;
      }
    }

    & nav {
      grid-area: menu;
      height: 100%;
      display: grid;
      align-content: start;
      grid-template-rows: auto auto 1fr;

      & button.indent {
        margin: 0;
        padding: 0;
        width: 100%;
        height: var(--col-1-size);
        align-self: end;
        display: grid;
        place-items: center;
        background: var(--base-2);
        border-radius: 50%;
        border: none;
        cursor: pointer;
        position: relative;

        &::after {
          content: "Tab-lock";
          min-width: max-content;
          padding: 3px 10px;
          position: absolute;
          top: 50%;
          left: calc(100% - var(--grid-gap));
          transform: translateY(-50%);
          z-index: 1;
          color: var(--color-1);
          background: var(--base-2);
          border-radius: 0 50vw 50vw 0;
          visibility: hidden;
          user-select: none;
        }

        &:hover {
          &::after {
            visibility: visible;
          }
        }

        &.active {
          background: var(--green);

          &::after {
            background: var(--green);
            visibility: visible;
          }
        }

        & svg {
          width: 45%;
          height: 45%;
          fill: var(--color-1);
          opacity: 50%;
        }
      }
    }

    & div.splash {
      grid-row: 1 / span 2;
      grid-column: 3;
      background: var(--base-1);

      & h2 {
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
    }
  }
</style>
