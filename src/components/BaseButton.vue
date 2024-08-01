<script setup>
import { computed } from "vue";
const props = defineProps(["label", "mode", "type"]);
defineEmits(["handleClick"]);

const styles = computed(() => {
	let style;
	if (props.mode === "primary") {
		style = [
			"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
		];
	} else if (props.mode === "secondary") {
		style = ["text-sm font-semibold leading-6 text-gray-900"];
	} else if (props.mode === "auxillary") {
		style = "";
	}
	return style;
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
