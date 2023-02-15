<script>
	import Header from './Header.svelte';
	import './styles.css';
	// get current year
	const year = new Date().getFullYear();
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			Built with Sveltekit ⚡ - Copyright © <a href="https://ericlam.dev/" target="_blank"
				>Eric Lam</a
			>
			{year}
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer p {
		font-size: 10px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
