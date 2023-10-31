<script>
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  export let data;

  const SCENARIOS = ['curpol', 'gs', 'sp'];

  $: list = $STUDY_LOCATIONS.map(({ uid, label }) => {
    const datum = data.data.study_locations[uid];
    const { gmt, budget, lat, lng } = datum;

    return {
      label,
      uid,
      gmt,
      budget,
      lat,
      lng,
      scenarios: Object.fromEntries(SCENARIOS.map((uid) => [uid, datum.scenarios[uid]])),
    };
  });

  $: console.log({ data });
</script>

<table>
  <thead>
    <tr>
      <th> Study location </th>
      <th> Coordinates </th>
      <th> GMT </th>
      <th> Buget </th>
      {#each SCENARIOS as scenario}
        <th> {scenario} </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each list as { label, uid, lat, lng, gmt, budget, scenarios }}
      <tr>
        <td>
          {label} / {uid}
        </td>
        <td>
          {lat} / {lng}
        </td>
        <td>
          {gmt}
        </td>
        <td>
          {budget}
        </td>
        {#each Object.values(scenarios) as values}
          <td>
            {values.year} / {values.isAvoidable}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
