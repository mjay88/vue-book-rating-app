<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/vue";
import { StarIcon, ArrowLeftIcon } from "@heroicons/vue/20/solid";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const bookId = route.params.bookId;
const book = ref(null);
const author = ref("");

const getBook = async (bookId) => {
	try {
		const response = await fetch(
			`https://openlibrary.org/works/${bookId}.json`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		book.value = data;
	} catch (error) {
		console.error("Error fetching books:", error);
	}
};

onBeforeMount(() => {
	getBook(bookId);
});

const getImageSrc = (book) => {
	return `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
};

watch(book, async (newBook, oldBook) => {
	try {
		const response = await fetch(
			`https://openlibrary.org${newBook.authors[0].author.key}.json`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		author.value = data.name;
	} catch (error) {
		console.error("Error fetching books:", error);
	}
});
</script>
<template>
	<div class="bg-white">
		<div
			class="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
		>
			<RouterLink to="/">
				<BaseButton
					class="absolute right-5 top-5"
					label="Go Home"
					mode="primary"
					type="button"
				>
				</BaseButton>
			</RouterLink>
			<div v-if="book" class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				<!-- Image gallery -->
				<TabGroup as="div" class="flex">
					<TabPanels class="aspect-h-1 aspect-w-1 w-full">
						<TabPanel class="flex justify-center items-center">
							<img
								:src="getImageSrc(book)"
								:alt="`cover for ${book.title}`"
								class="h-full w-8/12 object-cover object-center sm:rounded-lg"
							/>
						</TabPanel>
					</TabPanels>
				</TabGroup>

				<!-- Product info -->
				<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					<h1
						class="text-center text-3xl font-bold tracking-tight text-gray-900"
					>
						{{ book.title }}
					</h1>
					<h1
						class="text-center text-3xl font-bold tracking-tight text-gray-900"
					>
						{{ author }}
					</h1>

					<!-- Reviews -->
					<!-- <div class="mt-3">
						<h3 class="sr-only">Reviews</h3>
						<div class="flex items-center">
							<div class="flex items-center">
								<StarIcon
									v-for="rating in [0, 1, 2, 3, 4]"
									:key="rating"
									:class="[
										product.rating > rating
											? 'text-indigo-500'
											: 'text-gray-300',
										'h-5 w-5 flex-shrink-0',
									]"
									aria-hidden="true"
								/>
							</div>
							<p class="sr-only">{{ product.rating }} out of 5 stars</p>
						</div>
					</div> -->

					<div class="mt-6">
						<h3 class="text-center font-bold tracking-tight text-gray-900">
							{{
								book.description.value
									? book.description.value
									: book.description
							}}
						</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
