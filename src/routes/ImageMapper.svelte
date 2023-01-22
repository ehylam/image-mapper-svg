<script lang="ts">
	import Prism from 'svelte-prism';
	import ImageMapper from '../lib/utils/ImageMapper';

	let container: HTMLDivElement,
		svg: HTMLElement,
		mapper: HTMLElement,
		imageCanvas: HTMLImageElement;
	let files: any;
	let imageMapper: any;
	let points: String = '';
	let demoCode: String = '';

	$: imgSrc = files ? URL.createObjectURL(files[0]) : '';

	$: if (files && imageCanvas) {
		imageCanvas.onload = () => {
			imageMapper = new ImageMapper(container, mapper, svg, imageCanvas, {});
		};
	}

	function onSVGClick() {
		if (imageMapper) {
			points = imageMapper.getPoints();
			const code = document.querySelector('.mapper-points__points code');
			code.textContent = points;

			demoCode = `<div style="position: relative;">
  // Make sure the intrinsic width and height of the image is the same as the image that is used to map the points.
  <img src="" alt="" style="width: 100%;" />
  <svg viewBox="0 0 ${imageMapper.imageSize.nWidth} ${imageMapper.imageSize.nHeight}" style="position: absolute; top: 0; left: 0;">
   <polygon fill="#1b0a0a74" points="${points}" />
  </svg>
</div>`
		}
	}
</script>

<section class="mapper-section">
	<input type="file" bind:files />
	<div class="mapper-container" bind:this={container}>
		<div class="mapper" bind:this={mapper}>
			{#if files && files[0]}
				<img bind:this={imageCanvas} src={imgSrc} />
			{/if}

			<svg class="map" bind:this={svg} on:click={onSVGClick}>
				<polygon fill="#1b0a0a74" />
			</svg>
		</div>
	</div>

	{#if points.length}
	<div class="mapper-points">
		<div class="mapper-points__points">
			<p>Points:</p>
			<pre>
				<code />
			</pre>
		</div>
	</div>
	{/if}

	{#if demoCode.length}
	<div class="mapper-example">
		<p>Example: </p>
		<Prism language="html" source={demoCode}/>
	</div>
	{/if}


</section>

<style>
	img {
		width: 100%;
		object-fit: contain;
	}

	input {
		margin: 40px 0;
	}

	p {
		margin-bottom: 5px;
	}

	.mapper-container {
		width: 100%;
	}
	.mapper {
		position: relative;
		width: 100%;
		transform-origin: top left;
	}

	.mapper svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.mapper-points {
		margin: min(10vw, 20px) 0;
	}

	.mapper-points pre {
		display: flex;
		margin-top: 0;
		background-color: #222;
		color: #ebebeb;
	}
</style>
