<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import BookCard from "./components/BookCard.vue";

const AsyncFormComponent = defineAsyncComponent(
	() => import("./components/FormComponent.vue")
);
const AsyncModalComponent = defineAsyncComponent(
	() => import("./components/ModalComponent.vue")
);

const url =
	"https://openlibrary.org/subjects/classic_literature.json?details=false&limit=3";

const books = ref([]);

const getBooks = async () => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		books.value = mapBookKeys(data.works);
		console.log(books.value);
	} catch (error) {
		console.error("Error fetching books:", error);
	}
};
//create a id field to sync incoming form data an API data, leave cover_id field because thats our we retrieve the cover images from api
const mapBookKeys = (books) => {
	return books.map((book) => {
		return { ...book, id: book["cover_id"] };
	});
};

onBeforeMount(() => {
	getBooks();
});

const handleFormSubmission = (formData) => {
	const newBook = { ...formData, id: Number(Date.now()) };
	books.value.push(newBook);
	closeModal();
};
const isModalOpen = ref(false);

const closeModal = () => {
	isModalOpen.value = false;
};

const openModal = () => {
	isModalOpen.value = true;
};

const handleChangeRating = (bookId, newRating) => {
	const bookUpdating = books.value.find((book) => book.id === bookId);
	bookUpdating.rating = newRating;
};

const removeBook = (bookId) => {
	books.value = books.value.filter((book) => bookId !== book.id);
};
</script>

<template>
	<div class="relative bg-white h-screen">
		<BaseButton
			@handleClick="openModal"
			class="absolute left-5 top-5"
			label="Add A Book"
			mode="primary"
			type="button"
		>
			<template #icon>
				<PlusIcon class="h-4 w-4" />
			</template>
		</BaseButton>
		<AsyncModalComponent
			:isModalOpen="isModalOpen"
			title="Add A New Book"
			@close:modal="closeModal"
		>
			<AsyncFormComponent
				@add:book="handleFormSubmission"
				@close="closeModal"
			/>
		</AsyncModalComponent>

		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-4">
			<div
				class="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 md:grid-cols-3 lg:gap-x-8"
			>
				<BookCard
					v-for="book in books"
					:key="book.id"
					:book="book"
					@change:rating="handleChangeRating"
					@remove:book="removeBook"
				/>
			</div>
		</div>
	</div>
</template>
