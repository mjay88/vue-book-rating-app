import { ref, watch } from "vue";

export const useBooks = (url, initialOffset) => {
	const data = ref([]);
	const error = ref(null);
	const isLoading = ref(null);
	const offset = ref(initialOffset);
	const fetchBooks = async () => {
		isLoading.value = true;

		try {
			const response = await fetch(url + offset.value);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const responseData = await response.json();
			data.value = mapBookKeys(responseData.works);
			isLoading.value = false;
		} catch (err) {
			console.error("Error fetching books:", err);
			error.value = err;
			isLoading.value = false;
		}
	};
	watch(offset, fetchBooks);
	fetchBooks();
	return { isLoading, error, data };
};

//create a id field to sync incoming form data an API data, leave cover_id field because thats our we retrieve the cover images from api
const mapBookKeys = (books) => {
	return books.map((book) => {
		return { ...book, id: book["cover_id"] };
	});
};
