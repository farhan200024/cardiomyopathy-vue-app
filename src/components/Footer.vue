<template>
  <footer>
    <div class = "wrapper-footer">
      <nav class = "navbar-footer">
				<router-link :to = "{ name: 'Home' }">Help</router-link>
      </nav>
			<router-link class = "polyline-footer" :to = "{ name: 'Home' }">
				<svg version = "1.0" xmlns = "http://www.w3.org/2000/svg" xmlns:xlink = "http://www.w3.org/1999/xlink" x = "0px" y = "0px" width = "100px" height = "38px" viewBox = "0 0 150 73" enable-background = "new 0 0 150 73" xml:space = "preserve">
					<polyline fill = "none" stroke = "green" stroke-width = "3" stroke-miterlimit = "10" points = "0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486" />
				</svg>
			</router-link>
      <div class = "contact">
        <h3>Contact Us</h3>
        <h4>Email: AdvWebGroup5@gmail.com</h4>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

  footer {
		background: white;
		border-top: 1px solid #dfdfdf;
	}

	.wrapper-footer {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	footer .wrapper-footer {
		color: #dfdfdf;
	}


	.navbar-footer a {
		cursor: pointer;
		font-size: 24px;
		text-decoration: none;
		color: black;
		padding: 8px 16px;
	}

	.navbar-footer a:hover {
		background: #dfdfdf;
	}

	.navbar-footer a.router-link-active {
		font-weight: bold;
		text-decoration: underline;
	}

	.polyline-footer {
		margin: 10px;
		cursor: pointer;
        position: relative;
	}

	.polyline-footer svg {
		width: 100px;
		height: 49px;
        
	}

    .contact h4{
      color: #8c8c8c;
    }

    .contact h3{
      color: #8c8c8c;
    }

</style>
