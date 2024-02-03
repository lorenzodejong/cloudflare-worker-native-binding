import { Transformer } from '@napi-rs/image';

interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const svgResponse = await fetch('https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/duck.svg');
		const svgBuffer = await svgResponse.arrayBuffer();

		const transformer = new Transformer(svgBuffer);
		const png = await transformer.png();

		const responseHeaders = new Headers();
		responseHeaders.set('Cache-Control', `public, max-age=${1 * 60 * 60}`);
		responseHeaders.set('vary', 'Accept');
		responseHeaders.set('Content-Type', 'image/png');

		return new Response(png, { headers: responseHeaders });
	},
};
