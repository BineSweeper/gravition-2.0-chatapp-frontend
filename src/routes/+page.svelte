<script lang="ts">
  import { messagesStore } from "$lib";
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
  import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
  import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
  import SvelteMarkdown from 'svelte-markdown'
  import autosize from 'svelte-autosize';
  import NewChat from "$lib/NewChat.svelte";

  let messageText: string;

  let showNewModal: boolean = false;
  
  function handleSubmit(): void {
    if (!messageText || !messageText.trim()) {
      return
    }
    messagesStore.update(messages => {
      messages.push({
        message_id: 'a',
        message_sender: 'a',
        message_content: messageText
      });
      messageText = '';
      return messages;
    });
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  interface User {
    name: string,
    id: string
  }

  let users: User[] = [
    { name: 'Alice', id: 'a' },
    { name: 'Charlie', id: 'c' },
    { name: 'David', id: 'd' },
    { name: 'Frank', id: 'f' },
  ];

  let selectedUser: User = users[0];
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>

<div class="flex flex-col mx-auto p-2 h-screen">
  <div class="flex flex-row justify-between bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-lg">
    <h1 class="text-4xl font-bold text-white">Quantum Peers</h1>
    <ThemeSwitcher />
  </div>

  <div class="flex flex-row flex-1 gap-2">

    <div class="flex flex-col border-r-4 dark:border-neutral-950 pr-2">
      <div class="flex flex-col flex-1 overflow-auto mt-5">
        {#each users as user}
          <div
            class="flex flex-row gap-5 sm:min-w-72 items-center p-2 rounded-md"
            class:bg-sky-500={selectedUser.id === user.id}
            class:dark:bg-sky-600={selectedUser.id === user.id}
            class:odd:dark:bg-neutral-900={selectedUser.id !== user.id}
            class:even:dark:bg-neutral-800={selectedUser.id !== user.id}
            class:odd:bg-neutral-100={selectedUser.id !== user.id}
            class:even:bg-neutral-200={selectedUser.id !== user.id}
            class:hover:cursor-pointer={selectedUser.id !== user.id}
            on:click={() => selectedUser = user}
            >
            <div class="text-5xl">👤</div>
            <div class="text-xl">{user.name}</div>
          </div>
        {/each}
      </div>

      <button class="p-4 mt-5 mb-3 bg-sky-500 dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-700 transition rounded-2xl" on:click={() => showNewModal = true}
        >New Chat</button>
    </div>
    
    <div class="flex flex-col flex-1">
      <div class="flex flex-col flex-1 overflow-auto gap-1 text-lg mt-5">
        {#each $messagesStore as message}
          <div class="flex justify-between" class:flex-row-reverse={message.message_sender === 'a'}>
            <div
              class="max-w-md px-3 py-1 rounded-lg shadow transition"
              class:bg-neutral-300={message.message_sender !== 'a'}
              class:dark:bg-neutral-600={message.message_sender !== 'a'}
              class:bg-sky-400={message.message_sender === 'a'}
              class:dark:bg-sky-500={message.message_sender === 'a'}
            >
              <SvelteMarkdown source={message.message_content} />
            </div>
          </div>
        {/each}
      </div>

      <form class="flex flex-row items-end " on:submit|preventDefault={handleSubmit}>
        <textarea class="max-h-32 flex-1 dark:bg-neutral-900 dark:border-neutral-700 border border-neutral-300 rounded-md w-full my-4 text-xl p-2"
          on:keydown={handleKeyDown}
          rows="1"
          placeholder="Send a message..."
          use:autosize
          bind:value={messageText}/>
        <button
          type="submit"
          class="rounded-3xl ml-2 my-4 transition text-5xl text-sky-500 hover:text-sky-600"
        >
          <FontAwesomeIcon icon={faArrowAltCircleRight} /> 
        </button>
      </form>
    </div>
  </div>
</div>

<NewChat bind:show={showNewModal} />
