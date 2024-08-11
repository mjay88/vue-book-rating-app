<script setup>
import { ref, defineAsyncComponent } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import BookCard from "../components/BookCard.vue";
import BookLoadingSkeleton from "../components/BookLoadingSkeleton.vue";
import { url } from "../constants";
import { useBooks } from "../composables/books";

const AsyncFormComponent = defineAsyncComponent(
	() => import("../components/FormComponent.vue")
);
const AsyncModalComponent = defineAsyncComponent(
	() => import("../components/ModalComponent.vue")
);

const offset = ref(0);
const { data: books, isLoading, error } = useBooks(url, offset);

const isModalOpen = ref(false);

const handleFormSubmission = (formData) => {
	const newBook = { ...formData, id: Number(Date.now()) };
	books.value.push(newBook);
	closeModal();
};

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

		<BaseButton
			@handleClick="offset += 3"
			class="absolute right-5 top-5"
			label="Next Page"
			mode="primary"
			type="button"
		>
		</BaseButton>

		<AsyncModalComponent
			:isModalOpen="isModalOpen"
			title="Add A New Book"
			@close:modal="closeModal"
		>
			<AsyncFormComponent
				@add:book="handleFormSubmission"
				@close:modal="closeModal"
			/>
		</AsyncModalComponent>

		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-4">
			<div
				class="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-1 sm:gap-x-6 sm:gap-y-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
			>
				<BookLoadingSkeleton v-if="isLoading" v-for="i in 3" />
				<BookCard
					v-else
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
