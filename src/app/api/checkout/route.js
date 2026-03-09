import fetch from 'node-fetch';

export async function POST(req) {
  const { orderData, encodedCredentials } = await req.json(); // Parse the request body



  try {
    const response = await fetch(
      'https://ap-gateway.mastercard.com/api/rest/version/83/merchant/927924000/session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('External API error:', errorData);
      return new Response(
        JSON.stringify({ error: `Failed to initiate order: ${errorData.error.explanation} `}),
        { status: 500 }
      );
    }

    // Check if the response is JSON
    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      return new Response(text, { status: 500 });
    }

   

    // Return a successful response with the data from the external API
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// import fetch from 'node-fetch';

// export async function POST(req) {
//   const { orderData, encodedCredentials } = await req.json(); // Parse the request body

//   console.log('Order Data:', orderData); // Log the order data to ensure it's correct

//   try {
//     const response = await fetch(
//       'https://ap-gateway.mastercard.com/api/rest/version/83/merchant/TEST999992000/session',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Basic ${encodedCredentials}`,
//         },
//         body: JSON.stringify(orderData),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('External API error:', errorData);
//       return new Response(
//         JSON.stringify({ error: `Failed to initiate order: ${errorData.error.explanation} `}),
//         { status: 500 }
//       );
//     }

//     // Check if the response is JSON
//     const contentType = response.headers.get('Content-Type');
//     let data;
//     if (contentType && contentType.includes('application/json')) {
//       data = await response.json();
//     } else {
//       const text = await response.text();
//       return new Response(text, { status: 500 });
//     }

//     console.log('API Response:', data); // Log the response from the API

//     // Return a successful response with the data from the external API
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     console.error('Error in POST handler:', error);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500 }
//     );
//   }
// }