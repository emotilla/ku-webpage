<script context="module">
    import environmentVariables from '$lib/environmentVariables';
    const { hasura_url, hasura_admin_secret } = environmentVariables;

    var doc;

    async function fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(
            `${hasura_url}/v1/graphql`,
            {
                method: "POST",
                headers: {
                  "x-hasura-admin-secret": `${hasura_admin_secret}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: operationsDoc,
                    variables: variables,
                    operationName: operationName
                })
            }
        );

        return await result.json();
    }


    //todo: check the botname/database in the query ======================================
    const operationsDoc = `
    query getimages ($id:uuid!) {
        images:tierradeniebla_bot(where: {id: {_eq: $id}}) {
            id
            type
            timestamp_loc
            source
            name
            s3_links:data(path: "s3_links")
            caption:data(path: "message.caption")
            dest
        }
    }
    `;

    async function getimages_from_bot (uuid) {
        // timestamp = new Date().toISOString();
        const { errors, data } = await fetchGraphQL(
            operationsDoc,
            "getimages",
            {"id":  uuid}
        );

        if (errors) {
            return errors;
        } else {
            return data.images[0];
        }
    }
    
    export async function load({ fetch, page }) {
        try {
            doc = await getimages_from_bot (`${page.params.slug}`);
            doc.page = page
        } catch (e) {
            console.log(e);
        }
        return {
            props: {
                doc
            }
        };
    };

</script>

<div>
    {#if doc}
        <img src="{doc.s3_links[0]}" alt="{(doc.caption?doc.caption:"image")}">  
        {#if doc.caption}
            <h2>{doc.caption}</h2>
        {/if}
        <!-- <p>{JSON.stringify(doc)}</p> -->
    {/if}
</div>
