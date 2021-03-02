<template>
  
    <footer>

        <div class = "wrapperFooter">

            <nav class = "navbarFooter">
            
                <router-link :to = "{ name: 'Home' }">Help</router-link>

            </nav>

			<router-link class = "polylineFooter" :to = "{ name: 'Home' }">
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
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
	}

	.wrapperFooter {
		max-width: 1200px;
		margin: 0 auto;
        margin-right: 0%;
		display: flex;
		padding: 5px;
        padding-right: 0%;
		justify-content: space-between;
		align-items: center;
        flex-direction: row;
	}

	footer .wrapperFooter {
		color: #dfdfdf;
	}

	.navbarFooter {
		max-width: 1150px;
		padding-right: 0%;
        margin-left: 0%;
		padding: 10px;
		text-align: left;
        width: 30%;
        
	}

	.navbarFooter a {
		cursor: pointer;
		font-size: 24px;
		text-decoration: none;
		color: black;
		padding: 8px 16px;
	}

	.navbarFooter a:hover {
		background: #dfdfdf;
	}

	.navbarFooter a.router-link-active {
		font-weight: bold;
		text-decoration: underline;
	}

	.polylineFooter {
		margin: 10px;
		cursor: pointer;
        position: relative;
	}

	.polylineFooter svg {
		width: 100px;
		height: 38px;
        
	}

    .contact{
        margin: 0 auto;
    }

    .contact h4{
        float: right;
        color: #8c8c8c;
    }

    .contact h3{
        color: #8c8c8c;
    }

</style>
