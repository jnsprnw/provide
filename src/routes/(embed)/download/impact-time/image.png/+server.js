// import NotoSans from '//NotoSans-Regular.ttf';
import ImpactTime from '$src/routes/(default)/explore/impacts/ImpactTime/ImpactTime.svelte';
import satori from 'satori';
import { html as toReactNode } from 'satori-html';

import { Resvg } from '@resvg/resvg-js';

const height = 630;
const width = 1200;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
  const message = url.searchParams.get('message') ?? undefined;
  const result = ImpactTime.render({
    currentScenariosUID: ['curpol', 'gs'],
    currentGeographyUID: 'DEU',
    currentIndicatorUID: 'mean-temperature',
    currentIndicatorOptionValues: {
      time: 'annual',
      reference: 'present-day',
      spatial: 'area',
    },
  });
  const element = toReactNode(
    `${result.html}<style>${result.css.code}</style>`
  );

  const svg = await satori(element, {
    // fonts: [
    //   {
    //     name: 'Noto Sans',
    //     data: Buffer.from(NotoSans),
    //     style: 'normal',
    //   },
    // ],
    height,
    width,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      'content-type': 'image/png',
    },
  });
};
