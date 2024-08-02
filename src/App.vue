<script setup>
import { ref, reactive, onBeforeMount } from "vue";

import { StarIcon, PlusIcon } from "@heroicons/vue/20/solid";
import { TrashIcon, DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";

import BaseButton from "./components/BaseButton.vue";

const url =
	"https://openlibrary.org/subjects/classic_literature.json?details=false&limit=3";

const books = ref([]);

const errors = reactive({
	title: null,
	author: null,
	image: null,
	rating: null,
});

const formData = reactive({
	id: null,
	title: null,
	author: null,
	image: null,
	rating: null,
});

const validations = reactive({
	title: "required",
	author: "required",
	image: "required",
});

const getBooks = async () => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		books.value = data.works;
	} catch (error) {
		console.error("Error fetching books:", error);
	}
};

onBeforeMount(() => {
	getBooks();
});

const validationRules = (rule) => {
	if (rule === "required") return /^ *$/;
	return null;
};

const validate = () => {
	let valid = true;
	clearErrors();
	for (const [field, rule] of Object.entries(validations)) {
		const validation = validationRules(rule);
		if (validation) {
			if (validation.test(formData[field] || "")) {
				errors[field] = `${field} is ${rule}`;
				valid = false;
			}
		}
	}
	return valid;
};
const clearErrors = () => {
	errors.title = null;
	errors.author = null;
	errors.image = null;
	errors.rating = null;
};

const isModalOpen = ref(false);

const handleFormSubmission = () => {
	// console.log(formData);
	if (validate()) {
		const newBook = { ...formData, id: Number(Date.now()) };
		books.value.push(newBook);
		closeModal();
	}
	console.log(errors);
};

const closeModal = () => {
	isModalOpen.value = false;
	resetForm();
};

const openModal = () => {
	isModalOpen.value = true;
};

const displayAuthorName = (book) => {
	return book.authors ? book.authors[0].name : book.author;
};

const resetForm = () => {
	formData.title = null;
	formData.author = null;
	formData.image = null;
	formData.rating = null;
	formData.id = null;
};

const handleChangeRating = (bookIndex, newRating) => {
	books.value[bookIndex].rating = newRating;
};

const removeBook = (bookIndex) => {
	books.value = books.value.filter((book, bookIdx) => bookIndex !== bookIdx);
};


const getImageSrc = (book) => {
	return book.cover_id
		? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
		: book.image;
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
		<TransitionRoot as="template" :show="isModalOpen">
			<Dialog class="relative z-10" @close="isModalOpen = false">
				<TransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in duration-200"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div
						class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					/>
				</TransitionChild>

				<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div
						class="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<TransitionChild
							as="template"
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel
								class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all my-8 w-full max-w-md p-6"
							>
								<div class="mt-3 text-center sm:mt-5">
									<DialogTitle
										as="h3"
										class="text-base font-semibold leading-6 text-gray-900"
										>Add A New Book</DialogTitle
									>
								</div>
								<form @submit.prevent="handleFormSubmission">
									<div class="space-y-12">
										<div class="border-b border-gray-900/10 pb-12">
											<div
												class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
											>
												<div class="sm:col-span-6">
													<label
														for="title"
														class="block text-sm font-medium leading-6 text-gray-900"
														>Title</label
													>
													<div class="mt-1">
														<div
															class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
														>
															<input
																type="text"
																name="title"
																id="title"
																v-model="formData.title"
																autocomplete="title"
																class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																placeholder="A Tale of Two Cities"
															/>
														</div>
														<p
															v-if="errors.title != null"
															class="text-red-500 text-sm"
														>
															This is a required field
														</p>
													</div>
												</div>
												<div class="sm:col-span-6">
													<label
														for="author"
														class="block text-sm font-medium leading-6 text-gray-900"
														>Title</label
													>
													<div class="mt-1">
														<div
															class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
														>
															<input
																type="text"
																name="author"
																id="author"
																v-model="formData.author"
																autocomplete="author"
																class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																placeholder="Charles Dickens"
															/>
														</div>
														<p
															v-if="errors.author != null"
															class="text-red-500 text-sm"
														>
															This is a required field
														</p>
													</div>
												</div>
												<div class="sm:col-span-6">
													<label
														for="cover"
														class="block text-sm font-medium leading-6 text-gray-900"
														>Cover</label
													>
													<div class="mt-1">
														<div
															class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
														>
															<input
																type="text"
																name="cover"
																id="cover"
																v-model="formData.image"
																autocomplete="cover"
																class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																placeholder="https://path-to-image"
															/>
														</div>
														<p
															v-if="errors.image != null"
															class="text-red-500 text-sm"
														>
															This is a required field
														</p>
													</div>
												</div>
												<div class="sm:col-span-2">
													<label
														for="rating"
														class="block text-sm font-medium leading-6 text-gray-900"
														>Rating</label
													>
													<div class="mt-2">
														<select
															id="rating"
															name="rating"
															v-model.number="formData.rating"
															class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option :value="1">1</option>
															<option :value="2">2</option>
															<option :value="3">3</option>
															<option :value="4">4</option>
															<option :value="5">5</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="mt-6 flex items-center justify-end gap-x-6">
										<BaseButton
											type="button"
											@handleClick="closeModal"
											label="Cancel"
											mode="secondary"
										>
										</BaseButton>
										<BaseButton type="submit" label="Submit" mode="primary">
											<template #icon>
												<DocumentArrowDownIcon class="w-4 h-4" />
											</template>
										</BaseButton>
									</div>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-4">
			<div
				class="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8"
			>
				<div
					v-for="(book, bookIndex) in books"
					:key="book.id"
					class="group relative flex flex-col justify-center items-center sm:flex-none sm:block shadow-lg shadow-gray-500/50 rounded mb-4 pt-2 md:pt-0"
				>
					<div
						class="relative md:h-96 md:w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto"
					>
						<div v-if="book.rating" class="z-10">
							<StarIcon
								class="text-yellow-400 w-20 h-20 absolute right-0 top-0 sm:right-[-6px] sm:top-[-6px] sm:w-14 sm:h-14 md:right-3 md:top-4 lg:right-4 lg:top-6 lg:w-20 lg:h-20"
							></StarIcon>
							<span
								class="absolute right-[1.95rem] top-6 text-3xl sm:right-[.9rem] sm:top-2 sm:text-2xl md:right-[2.1rem] md:top-7 lg:right-12 lg:top-12 lg:text-3xl"
								>{{ book.rating }}</span
							>
						</div>
						<img
							:src="getImageSrc(book)"
							class="object-cover object-center md:scale-90 rounded-md"
						/>
					</div>
					<h1 class="font-semibold text-gray-900 text-center text-2xl">
						{{ book.title }}
					</h1>
					<h1 class="font-semibold text-gray-900 text-center text-xl">
						{{ displayAuthorName(book) }}
					</h1>

					<div class="flex items-center justify-center m-2">
						<button class="flex items-center justify-center flex-1">
							<StarIcon
								v-for="rating in [1, 2, 3, 4, 5]"
								:key="rating"
								@click="handleChangeRating(bookIndex, rating)"
								:class="[
									book.rating >= rating
										? 'text-yellow-400 hover:text-yellow-600'
										: 'text-gray-200 hover:text-gray-400',
									'h-10 w-10 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 flex-shrink-0',
								]"
								aria-hidden="true"
							/>
						</button>

						<BaseButton
							@handleClick="removeBook(bookIndex)"
							class="absolute right-1"
							type="button"
							mode="auxillary"
						>
							<TrashIcon class="hover:text-slate-600" />
						</BaseButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
