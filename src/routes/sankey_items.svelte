<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.0.0/dist/echarts.min.js"></script>
</svelte:head>

<script >
    import { onMount } from 'svelte';
    // import Footer from '$lib/footer.svx';
    import environmentVariables from '$lib/sendas_environmentVariables';
    const { hasura_url, hasura_admin_secret } = environmentVariables;

    let doc;  // info from event_data
    var myChart;           // Echart Global Object

    var items_data = [];
    var suppliers_data = [];

    onMount( async () => {


        var myHeaders = {}; 
        myHeaders["x-hasura-admin-secret"] = hasura_admin_secret;
        myHeaders["Content-Type"] = "application/json";

        async function fetchGraphQL(operationsDoc, operationName, variables) {
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
        query sankeyList {
            pixcando_stock {
                item_stock {
                    name
                    description
                    name
                    uom
                    uom_legible {
                        legible
                    }
                    price1
                    price2
                }
                id
                chat_id
                user_info {
                    source
                    type
                    id
                    name
                }
                qty
                name
                status
                timestamp
            }
        }
        `;

        function fetchMyQuery() {
            return fetchGraphQL(
                operationsDoc,
                "sankeyList",
                {}
            );
        }

        function graficador ( items, suppliers, links ) {
            var data = [];
            items.forEach((value,index)=>{
                var item = { name : `${value}` };
                data.push(item);
            })
            suppliers.forEach((value,index)=>{
                var item = { name :  value };
                data.push(item);
            })

            var myChart = echarts.init(document.getElementById('grafica'));
            //var app = {};
            var option;
            option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                animation: false,
                series: [
                    {
                        type: 'sankey',
                        bottom: '1%',
                        emphasis: {
                            focus: 'adjacency'
                        },
                        data,
                        links,
                        orient: 'vertical',
                        label: {
                            position: 'top'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                ]
            }
            if (option && typeof option === 'object') {
                myChart.setOption(option);
            }

        }




        async function startFetchMyQuery() {
            const { errors, data } = await fetchMyQuery();

            if (errors) {
                // console.error(errors);
            }

            var suppliers = {};  // array of unique suppliers
            var links= []

            doc = data.pixcando_stock;
            for (let index = 0; index < doc.length; index++) {
                const element = doc[index];
                var supplier_name = element.user_info.name;
                var item_name = element.item_stock.description;
                items_data.push(item_name);
                suppliers[supplier_name] = { name : supplier_name }
                links.push({source: supplier_name, target: item_name, value: element.qty});
            }

            // adds a unique name for Supplier from the user_info.name
            for (const record in suppliers) {
                if (suppliers[record]) {
                    suppliers_data.push(record);
                }
            }
            
            graficador(items_data, suppliers_data, links);
        }

        startFetchMyQuery();

       

      
    });

</script>


<div id="sankey_items" class="">
            <!-- {JSON.stringify(doc)} -->
            <!-- {#if doc}
                {#each doc as item, key}
                     {item.name}
                     {item.user_info.name}
                {/each}    
            {/if} -->
            <button class="btn btn-primary">DaisyUI Button</button>
</div>
<div>
    <div id="grafica" style="width: 100%;height:600px;"></div>
    <slot></slot>
</div>
<!-- <Footer /> -->

   



    

