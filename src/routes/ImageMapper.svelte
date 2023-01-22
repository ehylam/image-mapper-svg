<script lang="ts">
	import ImageMapper from '../lib/utils/ImageMapper';

	let container: HTMLDivElement,
		svg: HTMLElement,
		mapper: HTMLElement,
		imageCanvas: HTMLImageElement;
	let files: any;
	let imageMapper: any;

	$: imgSrc = files ? URL.createObjectURL(files[0]) : '';

	$: if (files && imageCanvas) {
		imageCanvas.onload = () => {
			imageMapper = new ImageMapper(container, mapper, svg, imageCanvas, {});
		};
	}

	function onSVGClick() {
		if (imageMapper) {
			const points = imageMapper.getPoints();
			const code = document.querySelector('.mapper-points__points code');
			code.textContent = points;
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

	{#if imageMapper}
	<div class="mapper-points">
		<div class="mapper-points__points">
			<p>Points:</p>
			<pre>
				<code />
			</pre>
		</div>
	</div>
	{/if}
</section>

<style>
	img {
		width: 100%;
		object-fit: contain;
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

	input {
		margin: 40px 0;
	}

	.mapper-points {
		margin: min(10vw, 20px) 0;
	}

	.mapper-points p {
		margin-bottom: 5px;
	}

	.mapper-points pre {
		display: flex;
		margin-top: 0;
		background-color: #222;
		color: #ebebeb;
	}
</style>
