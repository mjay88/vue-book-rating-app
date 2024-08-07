<script setup>
import { StarIcon } from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/24/outline";
defineProps({
	book: { Object, required: true },
});
const emit = defineEmits(["change:rating", "remove:book"]);

const changeRating = (bookId, rating) => {
	emit("change:rating", bookId, rating);
};
const removeBook = (bookId) => {
	emit("remove:book", bookId);
};

const displayAuthorName = (book) => {
	return book.authors ? book.authors[0].name : book.author;
};

const getImageSrc = (book) => {
	return book.cover_id
		? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
		: book.image;
};
</script>

<template>
	<Transition
		appear
		enter-active-class="transition-opacity duration-1000 transition-transform duration-1000"
		leave-active-class="transition-opacity duration-1000 transition-transform duration-1000"
		enter-from-class="opacity-0 -translate-x-3"
		leave-to-class="opacity-0 -translate-x-3"
	>
		<div
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

			<div class="relative flex justify-center items-center m-2">
				<div class="flex justify-center items-center mx-auto pl-12">
					<button
						v-for="rating in [1, 2, 3, 4, 5]"
						:key="rating"
						class="flex justify-center items-center"
					>
						<StarIcon
							@click="changeRating(book.id, rating)"
							:class="[
								book.rating >= rating
									? 'text-yellow-400 hover:text-yellow-600'
									: 'text-gray-200 hover:text-gray-400',
							]"
							class="h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10 flex-shrink-0"
							aria-hidden="true"
						/>
					</button>
				</div>

				<BaseButton
					@handleClick="removeBook(book.id)"
					type="button"
					mode="auxillary"
					class="md:ml-[-1rem]"
				>
					<TrashIcon class="hover:text-slate-600 h-8 w-8" />
				</BaseButton>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
/* .v-enter-active,
.v-leave-active {
	transition:
		opacity 1s ease,
		transform 1s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateX(-10px);
} */
</style>
