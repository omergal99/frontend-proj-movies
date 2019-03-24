<template>
	<tr class="flex">
		<td class="user-details flex flex-col">
			<span class="user-name">{{user.name}}</span>
			<img :src="review.movie.movieImg">
			<span>{{review.movie.movieName}}</span>
			
		</td>
		<td class="review-txt">
			<span>{{review.content.txt}}</span>
		</td>
	</tr>	
</template>

<script>
export default {
	name: "UserReviews",
	props: {
		review: Object,
		user: Object
	}
};
</script>

<style scoped>
tr{
	/* height: 100px; */
	width: 75vw;
	border: 1px solid rgb(119, 105, 27);
	margin: 0 8px 6px 0;
    padding: 4px;
    border-radius: 4px;
}
img{
	margin: 5px;
	max-height: 150px;
}
.user-details{
	width: 15%;
	border-right: 1px solid rgb(119, 105, 27);
}
.review-txt{
	width: 85%;
	padding: 15px;
	text-align: left;
}
.user-name{
	font-weight: 1000;
}
</style>

