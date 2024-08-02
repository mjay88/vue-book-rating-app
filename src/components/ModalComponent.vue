<script setup>
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
	isModalOpen: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		default: null,
	},
});

const emit = defineEmits("close:modal");

const closeModal = () => {
	emit("close:modal");
};
</script>
<template>
	<TransitionRoot as="template" :show="isModalOpen">
		<Dialog class="relative z-10" @close="closeModal">
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
									>{{ title }}</DialogTitle
								>
							</div>
							<slot></slot>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
