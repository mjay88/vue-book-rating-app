<script setup>
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, reactive, ref } from "vue";
const emit = defineEmits(["add:book", "close:modal"]);

const input = ref(null);

onMounted(() => {
	input.value.focus();
});

const formData = reactive({
	id: null,
	title: null,
	author: null,
	image: null,
	rating: null,
});

const errors = reactive({
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

const addBook = () => {
	if (validate()) {
		const bookData = {
			id: Number(Date.now()),
			title: formData.title,
			author: formData.author,
			rating: formData.rating,
			image: formData.image,
		};
		emit("add:book", bookData);
		resetForm();
	}
};

const closeModal = () => {
	emit("close:modal");
	resetForm();
};

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

const resetForm = () => {
	formData.title = null;
	formData.author = null;
	formData.image = null;
	formData.rating = null;
	formData.id = null;
};
const clearErrors = () => {
	errors.title = null;
	errors.author = null;
	errors.image = null;
	errors.rating = null;
};
</script>
<template>
	<form @submit.prevent="addBook">
		<div class="space-y-12">
			<div class="border-b border-gray-900/10 pb-12">
				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
									ref="input"
								/>
							</div>
							<p v-if="errors.title != null" class="text-red-500 text-sm">
								This is a required field
							</p>
						</div>
					</div>
					<div class="sm:col-span-6">
						<label
							for="author"
							class="block text-sm font-medium leading-6 text-gray-900"
							>Author</label
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
							<p v-if="errors.author != null" class="text-red-500 text-sm">
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
							<p v-if="errors.image != null" class="text-red-500 text-sm">
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
</template>
