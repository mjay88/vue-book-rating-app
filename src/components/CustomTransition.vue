<template>
	<Transition
		appear
		enter-active-class="transition-opacity duration-1000 transition-transform duration-1000"
		leave-active-class="transition-opacity duration-1000 transition-transform duration-1000"
		enter-from-class="opacity-0 -translate-x-3"
		leave-to-class="opacity-0 -translate-x-3"
	>
		<slot></slot>
	</Transition>
</template>
