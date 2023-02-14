// This file requests data from the impact time endpoint. Currently, it only randomly generates the data.
import data from "$lib/../data/global_h-ssp119.json";

export function get(query) {
  const indicators = Object.entries(Object.fromEntries(query.url.searchParams))
    .filter(([key, value]) => key.includes("indicator"))
    .map(([key, value]) => value);

  const yearStart = 2000;
  const yearStep = 5;

  return {
    body: {
      yearStart,
      yearStep,
      data: indicators.reduce(
        (acc, indicator) => ({
          ...acc,
          [indicator]: [
            [1.619659819712243, 0.6963328050136922, 3.0583177166858313],
            [1.7061330314344039, 0.753595938651078, 3.1981456877785472],
            [1.8307585100355925, 0.8127030296378194, 3.437144389386084],
            [2.012203230223465, 1.0074601563213286, 3.6310517718986604],
            [2.037618561251202, 0.9762255165061141, 3.742075677101333],
            [2.209585568229226, 1.1390575887013452, 3.8848098648853355],
            [2.308453546479945, 1.2360488017448459, 4.0361300202273656],
            [2.522737092601511, 1.4166443423784463, 4.3290446659346165],
            [2.5772948541280494, 1.432477300444495, 4.454482253013366],
            [2.7977473026484545, 1.6119026998711659, 4.742451161472461],
            [3.023837502051285, 1.7990518141207557, 5.018356318575376],
            [3.042532935325224, 1.7794410476003866, 5.084394405104069],
            [3.3232587534535494, 2.0072264623795966, 5.5151324913614665],
            [3.46846074315072, 2.114838043734469, 5.716986351392172],
            [3.5876774368800746, 2.189463750936992, 5.928472755371228],
            [3.6852841214743064, 2.247275285811243, 6.081519846461259],
            [3.991280702755384, 2.482281533124103, 6.498672006585426],
          ].map((d) => d.map((w) => w + Math.random() - 0.5)).map((d, i) => [yearStart + yearStep * i, ...d]),
        }),
        {}
      ),
      description:
        "The chart displays the median near-surface air temperature value from 2020 until 2100 as line. The heatmap in the background shows the distribution of all scenarios in the same period. The resolution is one year.",
      model: "AIM/CGE 2.0",
    },
  };
}
