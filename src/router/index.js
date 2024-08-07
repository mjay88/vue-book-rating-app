import { createRouter, createWebHistory } from "vue-router";
import BookDetails from "../pages/BookDetails.vue";
import HomePage from "../pages/HomePage.vue";
import NotFound from "../components/404.vue";

//if using global state management, you could load data from here and pass as a prop

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: HomePage,
		},
		{
			path: "/books/:bookId",
			name: "books",
			component: BookDetails,
			props: true,
		},
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
