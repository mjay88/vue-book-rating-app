<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
	<main class="relative isolate h-screen">
		<img
			src="https://images.unsplash.com/photo-1694180847438-261238ab1710?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt=""
			class="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
		/>
		<div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
			<p class="text-base font-semibold leading-8 text-white">404</p>
			<h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
				Page not found
			</h1>
			<p class="mt-4 text-base text-white/70 sm:mt-6">
				Sorry, we couldn’t find the page you’re looking for.
			</p>
			<div class="mt-10 flex justify-center">
				<RouterLink to="/" class="text-sm font-semibold leading-7 text-white"
					><span aria-hidden="true">&larr;</span> Back to home</RouterLink
				>
			</div>
		</div>
	</main>
</template>
