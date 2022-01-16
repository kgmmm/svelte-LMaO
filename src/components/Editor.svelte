<script>
  import { currentFile, indentToggle, files } from "../stores";

  import { v4 as uuidv4 } from "uuid";

  export let currentID;
  export let currentTitle;
  export let currentText;

  $: saveValid = currentTitle && currentText;

  function saveFile() {
    let isOverwrite = currentID != "";

    if (!isOverwrite) {
      let newFile = {
        id: uuidv4(),
        type: "note",
        title: currentTitle,
        text: currentText,
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
        type: "note",
        title: currentTitle,
        text: currentText,
      };

      localStorage.setItem("file:" + newFile.id, JSON.stringify(newFile));
      files.update((currentFiles) => {
        let newSet = currentFiles.filter((file) => file.id != newFile.id);
        return [newFile, ...newSet];
      });
    }
  }

  function tabCheck(event) {
    if ($indentToggle == false) return;
    if (event.key !== "Tab") return;

    event.preventDefault();
    this.setRangeText("  ", this.selectionStart, this.selectionStart, "end");
  }
</script>

<div>
  <input
    type="text"
    name="editorTitle"
    id="editorTitle"
    placeholder="Title..."
    bind:value={currentTitle}
  />
  <textarea
    name="editorText"
    id="editorText"
    bind:value={currentText}
    on:keydown={tabCheck}
  />
  <button disabled={!saveValid} class="savebtn" on:click={saveFile}>Save</button
  >
</div>

<style lang="scss">
  div {
    grid-area: content;
    display: grid;
    grid-template-columns: 1fr var(--col-1-size);
    grid-template-rows: var(--col-1-size) 1fr;
    gap: var(--grid-gap);
  }

  input[name="editorTitle"] {
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
    background: var(--green);
    border: none;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    grid-row: 1;
    grid-column: 2;

    &:hover {
      background: var(--green-dark);
    }

    &[disabled] {
      opacity: 50%;
      cursor: not-allowed;

      &:hover {
        background: var(--green);
      }
    }
  }

  textarea {
    padding: 20px 30px;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    color: var(--color-1);
    background: var(--main-fg);
    grid-column: 1 / span 2;

    &:focus {
      outline: none;
    }
  }
</style>
