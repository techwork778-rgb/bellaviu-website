import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId in query parameters" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://ap-gateway.mastercard.com/api/rest/version/83/merchant/927924000/order/${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(
           // "merchant.TEST999992000:90b1a4356fcad98a78753de43d3b031c"
             "merchant.927924000:0fd0ff479d0fe17371ec99f739ccb99b"
          ).toString("base64")}`, // Replace with actual credentials
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching order status:", error.stack);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
