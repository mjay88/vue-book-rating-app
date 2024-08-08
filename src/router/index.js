import { createRouter, createWebHistory } from "vue-router";
import BookPage from "../pages/BookPage.vue";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: HomePage },
		{ path: "/books/:bookId", name: "books", component: BookPage, props: true },
	],
});

export default router;
