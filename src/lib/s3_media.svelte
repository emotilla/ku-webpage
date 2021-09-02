<script >
    export let width;
    export let height;
    export let name;

    import { onMount } from 'svelte';
    import environmentVariables from '$lib/environmentVariables';
    const { hasura_url, hasura_admin_secret } = environmentVariables;

    let image;  // info from event_data

    onMount( async () => {

        async function fetchGraphQL(operationsDoc, operationName, variables) {
            let myHeaders = {}; 
            myHeaders["x-hasura-admin-secret"] = hasura_admin_secret;
            myHeaders["Content-Type"] = "application/json";

            const result = await fetch(
                `${hasura_url}/v1/graphql`,
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({
                        query: operationsDoc,
                        variables: variables,
                        operationName: operationName
                    })
                }
            );
            return await result.json();
        }

        const operationsDoc = `
            query MyQuery($name: String!) {
                s3_media(where: {name: {_eq: $name}}) {
                    bucket
                    description
                    name
                    filename
                    timestamp
                    type
                    url
                    uuid
                }
            }
        `;

        function fetchMyQuery() {
            return fetchGraphQL(
                operationsDoc,
                "MyQuery",
                {"name": name}
            );
        }

        async function startFetchMyQuery() {
            const { errors, data } = await fetchMyQuery();
            if (errors) {
                console.error(errors);
            } else {
                image = data.s3_media;
            }
        };

        startFetchMyQuery();
    })
</script>

<style>
    img {
      opacity: 1;
      transition: opacity 1200ms ease-out;
    }
</style>

<slot>
</slot>
<div>
    {#if image}
    <ul>
        {#each image as item}
        <li>
            <img src={item.url} alt={item.filename} width={width} height={height}> 
            <!-- <p>{item.url}</p> -->
        </li>
        {/each}    
    </ul>
    {/if}
</div>


