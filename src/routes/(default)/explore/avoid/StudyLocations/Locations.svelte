<script>
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  export let data;

  $: list = $STUDY_LOCATIONS.map((uid) => {});

  $: console.log({ data });
</script>

<table>
  <thead>
    <tr>
      <th> Scenario </th>
      <th> Study location </th>
      <th> Year </th>
      <th> likely </th>
      <th> temperature </th>
      <th> avoidable </th>
    </tr>
  </thead>
  <tbody>
    {#each data.data.scenarios as { study_locations, uid }}
      {#each study_locations as { avoidable, global_mean_temperature, likely, year, uid: location }}
        <tr>
          <td>
            {uid}
          </td>
          <td>
            {location}
          </td>
          <td>
            {year}
          </td>
          <td>
            {likely}
          </td>
          <td>
            {global_mean_temperature}
          </td>
          <td>
            {avoidable}
          </td>
        </tr>
      {/each}
    {/each}
  </tbody>
</table>
