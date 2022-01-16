import { writable } from "svelte/store";

export let files = writable([]);

export let currentFile = writable("");

export let indentToggle = writable(false);

