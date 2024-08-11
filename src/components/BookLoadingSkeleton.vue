<script setup>
import CustomTransition from "./CustomTransition.vue";
</script>
<template>
	<CustomTransition>
		<div
			class="animate-pulse group relative flex flex-col justify-center items-center p-4 sm:flex-none sm:block shadow-lg shadow-gray-500/50 rounded"
		>
			<div
				class="relative bg-slate-200 md:h-96 md:w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto"
			></div>
			<div class="bg-slate-200 rounded-lg w-1/2 h-6 m-4"></div>
			<div class="bg-slate-200 rounded-lg w-1/2 h-6 m-4"></div>

			<div class="relative flex justify-between items-center m-2">
				<div class="bg-slate-200 rounded-lg w-1/12 h-4"></div>
				<div class="bg-slate-200 rounded-lg w-1/2 h-4"></div>

				<div class="bg-slate-200 rounded-lg w-1/12 h-4"></div>
			</div>
		</div>
	</CustomTransition>
</template>
