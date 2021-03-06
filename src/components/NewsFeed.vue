<template>
	<div class="news-feed-container">
		<h2 id="news-feed-title" >Latest Cardiomyopathy News and Research</h2>
		<div v-if="newsItems.length !== 0"  class="news-feed-content">
			<div v-for="item in newsItems" :key="item.created" class="news-item">
				<img class="news-image-element" :src="item.media.content[0].url[0]">
				<div class="news-article-content">
					<span>{{ item.created }}</span>
					<h2 @click="redirectTo(item.link)"><a>{{ item.title }}</a></h2>
					<p class="news-description">{{ item.description }}</p>
				</div>
			</div>
		</div>
		<div v-else>
			<div>
				<HeartPulse />
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import HeartPulse from '../components/HeartPulse'
export default {
	components: { HeartPulse },
	setup() {
		const newsItems = ref('')

		const redirectTo = (link) => {
			window.open(link);
		}
		
		const retrieveNews = async () => {

			try {
				let response = await axios.get('https://send-rss-get-json.herokuapp.com/convert/?u=https://www.news-medical.net/tag/feed/Cardiomyopathy.aspx')
				console.log(response.data.items)
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

	.news-feed-container h2 {
		border-bottom: 1px solid #dfdfdf;
	}

	#news-feed-title {
		font-size: 32px;
	}

	.news-item {
		padding: 20px;
		margin: 10px 0;
		display: flex;
		border-bottom: 1px solid #b9b9b9;
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

	@media screen and (max-width: 750px) {
		#news-feed-title {
			font-size: 26px;
			margin: 0 10px;
		}

		.news-image-element {
			width: 80%;
			margin: 0 auto;
		}

		.news-item {
			display: flex;
			flex-direction: column;
			padding: 0;
			margin: 10px auto;
		}
	}

</style>