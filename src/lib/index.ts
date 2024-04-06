import { writable } from "svelte/store";

export interface Message {
    message_id: string;
    message_sender: string;
    message_content: string;
}

export const messagesStore = writable<Message[]>([
    {message_id: "a", message_sender: "a", message_content: "test message 1"},
    {message_id: "a", message_sender: "a", message_content: "test message 2"},
    {message_id: "a", message_sender: "b", message_content: "test message 3"}
]);
