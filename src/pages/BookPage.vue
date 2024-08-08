<script setup>
import { onBeforeMount, ref } from "vue";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/vue";
import { StarIcon, ArrowLeftIcon } from "@heroicons/vue/20/solid";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const bookId = route.params.bookId;
const book = ref(null);

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

const product = {
	name: "Zip Tote Basket",
	price: "$140",
	rating: 4,
	images: [
		{
			id: 1,
			name: "Angled view",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		// More images...
	],
	colors: [
		{
			name: "Washed Black",
			bgColor: "bg-gray-700",
			selectedColor: "ring-gray-700",
		},
		{ name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
		{
			name: "Washed Gray",
			bgColor: "bg-gray-500",
			selectedColor: "ring-gray-500",
		},
	],
	description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
	details: [
		{
			name: "Features",
			items: [
				"Multiple strap configurations",
				"Spacious interior with top zip",
				"Leather handle and tabs",
				"Interior dividers",
				"Stainless strap loops",
				"Double stitched construction",
				"Water-resistant",
			],
		},
		// More sections...
	],
};
</script>
<template>
	<div class="bg-white">
		<div
			class="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
		>
			<BaseButton
				@handleClick=""
				class="absolute left-5 top-5"
				label="Go Back"
				mode="primary"
				type="button"
			>
				<template #icon>
					<ArrowLeftIcon class="h-4 w-4" />
				</template>
			</BaseButton>
			<RouterLink to="/">
				<BaseButton
					@handleClick="offset += 3"
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
						<TabPanel
							v-for="image in product.images"
							:key="image.id"
							class="flex justify-center items-center"
						>
							<img
								:src="getImageSrc(book)"
								:alt="image.alt"
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

					<!-- Reviews -->
					<div class="mt-3">
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
					</div>

					<div class="mt-6">
						<h3 class="sr-only">Description</h3>

						<div
							class="space-y-6 text-base text-gray-700"
							v-html="product.description"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
