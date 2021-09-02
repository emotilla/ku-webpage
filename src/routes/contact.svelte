<script>
    import { onMount } from 'svelte';
    import environmentVariables from '$lib/environmentVariables';
    const { hasura_url, hasura_admin_secret } = environmentVariables;

    
    // var myHeaders = {}; 
    // myHeaders["x-hasura-admin-secret"] = hasura_admin_secret;
    // myHeaders["Content-Type"] = "application/json";

    let name, mobile, last_name, email, source, timestamp;
    let info = "Contacto";  // info for debug 
    let info2 = "Ayudanos a contactarte con la siguiente información";  // info for debug 


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

    const operationsDoc = `
    mutation contact_insert($name: String, $mobile: String, $last_name: String, $email: String, $source: String, $timestamp: timestamp) {
        insert_contact_form(objects: {name: $name, mobile: $mobile, last_name: $last_name, email: $email, source: $source, timestamp: $timestamp}) {
        returning {
            uuid
            timestamp
            email
            name
            last_name
            mobile
        }
        }
    }
    `;

    function validateEmail () {
        return true
    }

    function validateMobile () {
        return true
    }

    async function send_form () {
        source = "https://quad-tree.com";  // todo: get from page object
        timestamp = new Date().toISOString();
        const { errors, data } = await fetchGraphQL(
            operationsDoc,
            "contact_insert",
            {"name": name, "mobile": mobile, "last_name": last_name, "email": email, "source": source, "timestamp": timestamp}
        );

        if (errors) {
            // info = errors;
        } else {
            // info = data;
            // alert(JSON.stringify(data));
            document.getElementById("contact_form").style.display="none"; 
            info = "Gracias!"
            info2 = "Recibirás un email de confirmación"
        }
    }
    
    onMount( async () => {
    });

</script>



<div class="hero min-h-screen">
  <div class="flex-col justify-center hero-content lg:flex-row">
    <div class="text-center lg:text-left">
      <h1 class="mb-5 text-5xl font-bold">{info}</h1> 
      <p class="mb-5">{info2}</p>
        <!-- {#if info}
            {JSON.stringify(info)}
        {/if} -->
    </div> 
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" id="contact_form">
      <div class="card-body">
        <div class="form-control">
          <label for="name" class="label">
            <span class="label-text">Nombre(s)</span>
          </label> 
          <input type="text" placeholder="Nombre" class="input input-bordered" bind:value={name}>
        </div> 
        <div class="form-control">
          <label for="last_name" class="label">
            <span class="label-text">Apellidos</span>
          </label> 
          <input type="text" placeholder="Apellidos" class="input input-bordered" bind:value={last_name}> 
          <!-- <label for="form-control" class="label">
            <a href="https://localhost:3000" class="label-text-alt" alt="">Forgot password?</a>
          </label> -->
        </div> 
        <div class="form-control">
          <label for="last_name" class="label">
            <span class="label-text">Correo Electrónico</span>
          </label> 
          <input type="text" placeholder="email" class="input input-bordered" bind:value={email}> 
        </div> 
        <div class="form-control">
          <label for="last_name" class="label">
            <span class="label-text">Teléfono móvil</span>
          </label> 
          <input type="text" placeholder="número a 10 dígitos" class="input input-bordered" bind:value={mobile}> 
        </div> 
        <div class="form-control mt-6">
          <button class="button btn btn-primary" on:click={()=>send_form()}>enviar</button>
        </div>
      </div>
    </div>
  </div>
</div>