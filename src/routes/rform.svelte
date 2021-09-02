<script>
  import ReactAdapter from "$lib/ReactAdapter.svelte";
  //import React from 'react';
  import Form from "@rjsf/core";

// const schema = {
//   title: "Todo",
//   type: "object",
//   required: ["title"],
//   properties: {
//     title: {type: "string", title: "Title", default: "A new task"},
//     done: {type: "boolean", title: "Done?", default: false}
//   }
// };
// const schema = {
//   "title": "A registration form",
//   "description": "A simple form example.",
//   "type": "object",
//   "required": [
//     "firstName",
//     "lastName"
//   ],
//   "properties": {
//     "firstName": {
//       "type": "string",
//       "title": "First name",
//       "default": "Chuck"
//     },
//     "lastName": {
//       "type": "string",
//       "title": "Last name"
//     },
//     "telephone": {
//       "type": "string",
//       "title": "Telephone",
//       "minLength": 10
//     }
//   }
// };

//** ----------------------------------- Dates and Time  */

// const schema = {
//   "title": "Date and time widgets",
//   "type": "object",
//   "properties": {
//     "native": {
//       "title": "Native",
//       "description": "May not work on some browsers, notably Firefox Desktop and IE.",
//       "type": "object",
//       "properties": {
//         "datetime": {
//           "type": "string",
//           "format": "date-time"
//         },
//         "date": {
//           "type": "string",
//           "format": "date"
//         }
//       }
//     },
//     "alternative": {
//       "title": "Alternative",
//       "description": "These work on most platforms.",
//       "type": "object",
//       "properties": {
//         "alt-datetime": {
//           "type": "string",
//           "format": "date-time"
//         },
//         "alt-date": {
//           "type": "string",
//           "format": "date"
//         }
//       }
//     }
//   }
// };

// const uischema = {
//   "alternative": {
//     "alt-datetime": {
//       "ui:widget": "alt-datetime",
//       "ui:options": {
//         "yearsRange": [
//           1980,
//           2030
//         ]
//       }
//     },
//     "alt-date": {
//       "ui:widget": "alt-date",
//       "ui:options": {
//         "yearsRange": [
//           1980,
//           2030
//         ]
//       }
//     }
//   }
// }

/** =========================== Files accept ===========================*/
const schema = {
  "title": "Files",
  "type": "object",
  "properties": {
    "file": {
      "type": "string",
      "format": "data-url",
      "title": "Single file"
    },
    "files": {
      "type": "array",
      "title": "Multiple files",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    },
    "filesAccept": {
      "type": "string",
      "format": "data-url",
      "title": "Single File with Accept attribute"
    }
  }
};

const uischema = {
  "filesAccept": {
    "ui:options": {
      "accept": ".pdf"
    }
  }
}

const log = (type) => console.log.bind(console, type);
const onSubmit = ({formData}, e) => alert("Data submitted: "+JSON.stringify(formData));

</script>

<main>
  <h1>React Form for Svelte</h1>
  <ReactAdapter
    el={Form}
    schema={schema}
    uiSchema={uischema}
    onChange={log("changed")}
    onSubmit={onSubmit}
    onError={log("errors")}
  />


</main>

<style>
  /**
   * Styling a React Component using Svelte styles.
   */
  :global(.mui-btn) {
    margin: 20px;
  }
  :global(.mui-divider) {
    margin-bottom: 20px;
  }
  /* ----------------------------------------------- */
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    margin-top: 20px;
  }
  h1,
  h2, 
  h3 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0;
    line-height: 3.5rem;
  }
  @media (min-width: 640px) {
    main {
      max-width: 800px;
    }
  } 
</style>

<div id="app">

</div>