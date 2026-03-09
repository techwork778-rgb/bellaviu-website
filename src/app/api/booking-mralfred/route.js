import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const property_id = searchParams.get('property_id');
  console.log(property_id,"l");

  if (!property_id) {
    return new Response(JSON.stringify({ error: 'property_id is required' }), {
      status: 400,
    });
  }

  try {
    const apiResponse = await axios.get(
      `https://api.mralfred.io/api/external/bookings?property_id=${property_id}`,
      {
        headers: {
          Authorization: 'Bearer Bellaviu@mralfred.com:p8hrz1a9b6c4d2e7f5g0h3j2k9l8m4n7kl4t9u0vy6n', // use only token, not email
        },
        maxBodyLength: Infinity,
      }
    );

    return new Response(JSON.stringify(apiResponse.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch error:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch bookings' }), {
      status: 500,
    });
  }
}
