<template>
	<div class="news-feed-container">
		<h1>{{ description }}</h1>
		<div class="news-feed-content">
			<div v-for="item in newsItems" :key="item.created" class="news-item">
				<img class="news-image-element" :src="item.media.content[0].url[0]">
				<div class="news-article-content">
					<span>{{ item.created }}</span>
					<h2 @click="redirectTo(item.link)"><a>{{ item.title }}</a></h2>
					<p class="news-description">{{ item.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
export default {
	
	setup() {
		const description = ref('')
		const newsItems = ref('')

		const redirectTo = (link) => {
			window.open(link);
		}
		
		const retrieveNews = async () => {

			try {
				let response = await axios.get('https://send-rss-get-json.herokuapp.com/convert/?u=https://www.news-medical.net/tag/feed/Cardiomyopathy.aspx')
				console.log(response.data.items)
				description.value = response.data.description
				newsItems.value = response.data.items
				for(let i in newsItems.value) {
					newsItems.value[i].created = new Date(newsItems.value[i].created).toUTCString()
				}
			} catch(err) {
				console.log(err.message)
			}
		}

		retrieveNews()

		return {
			description,
			newsItems,
			redirectTo
		}
	}
}
</script>

<style>
	.news-feed-container {
		text-align: left;
	}

	.news-item {
		padding: 20px;
		margin: 10px 0;
		display: flex;
	}

	.news-article-content {
		padding: 20px;
	}

	.news-article-content a:hover {
		cursor: pointer;
		text-decoration: underline;
		color: #048004;
	}

	.news-description {
		margin-top: 25px;
	}

	.news-image-element {
		width: 323px;
		height: 250px;
	}
</style>