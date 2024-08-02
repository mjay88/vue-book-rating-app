<script setup>
import { computed } from "vue";
const props = defineProps({
	label: {
		type: String,
	},
	type: {
		type: String,
		required: true,
	},
	mode: {
		type: String,
		required: true,
	},
});
defineEmits(["handleClick"]);

const styles = computed(() => {
	const baseClasses =
		"flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
	const modeClasses = {
		primary:
			"bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
		secondary: "text-gray-900",
		auxillary: "",
	};
	return `${baseClasses} ${modeClasses[props.mode]}`;
});
</script>
<template>
	<button
		:type="type"
		:class="styles"
		class="flex items-center justify-between"
		@click="$emit('handleClick')"
	>
		{{ label }}
		<div class="ml-1">
			<slot name="icon"></slot>
		</div>
		<slot></slot>
	</button>
</template>
