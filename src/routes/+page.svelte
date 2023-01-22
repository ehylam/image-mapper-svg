<script>
	import ImageMapper from './ImageMapper.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container">
	<h1>Image Mapper - SVG</h1>
	<ImageMapper />

	<div class="group">
		<div class="controls">
			<h2>Controls</h2>
			<ul>
				<li>Click on the uploaded image to add a point</li>
				<li>Shift clicking on a point (green circle) removes the point</li>
				<li>Click on a drag a point to update it's position.</li>
			</ul>
		</div>

		<div class="guide">
			<h2>Installation Guide</h2>
			<ul>
				<li>Ensure that the intrinsic/natural width and height of the image is the same as the image that will be used in your website.</li>
				<li>Also make sure that the width and the height of the SVG's <code>viewBox</code> is the same as the intrinsic/natural width and height of the image</li>
			</ul>
		</div>
	</div>

	<div class="group">
		<div class="todo">
			<h2>TODO</h2>
			<ul>
				<li>Allow for more than 1 polygon</li>
				<li>Update polygon points as you drag, not on mouse up</li>
				<li>Local storage?</li>
				<li>Keybored controls - Undo, redo</li>
			</ul>
		</div>
	</div>

	<div class="group">
		<span>Disclaimer - The image file is read by JavaScript on the client-side and is not sent to any external servers. Instead, the image file is stored temporarily in your browser's memory or on the device's file system.<span>
	</div>
</section>

<style>
	.group {
		display: flex;
		justify-content: flex-start;
		column-gap: max(1.5vw, 15px);
		flex-wrap: wrap;
		border-top: 1px solid #bfbfbf;
		padding-top: max(1.5vw, 15px);
		padding-bottom: max(1.5vw, 15px);
	}

	.group:last-child {
		border-bottom: 1px solid #bfbfbf;
	}

	.group div {
		flex-basis: calc(50% - max(1.5vw, 15px) / 2)
	}

	.group span {
		font-size: 12px;
	}
</style>
