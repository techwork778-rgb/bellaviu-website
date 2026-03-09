import { database } from "../../../config/dbconnection"; // Adjust the path as necessary

export async function GET(req) {
  try {

    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    const type = url.searchParams.get("type"); // type query parameter distinguishes between bookings and revenue

   
    if (!year || isNaN(Number(year)) || year.length !== 4) {
      
      return new Response(
        JSON.stringify({
          error:
            "Year is a required query parameter and must be a valid 4-digit number.",
        }),
        { status: 400 }
      );
    }

    if (type === "revenue") {
      
      // Handle the revenue request
      const [resultMonthlyRevenue] = await database.query(
        `
        SELECT 
            MONTHNAME(check_in) AS checkin_month_name,
            SUM(price) AS monthly_revenue
        FROM 
            bookings
        WHERE 
            YEAR(check_in) = ?
        GROUP BY 
            MONTH(check_in), MONTHNAME(check_in)
        ORDER BY 
            MONTH(check_in)
        `,
        [year]
      );

    

      return new Response(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          monthly_revenue: resultMonthlyRevenue || [],
        }),
        { status: 200 }
      );
    }

  

    // Handle the default bookings data request
    const [resultBookings] = await database.query(
      `
      SELECT COUNT(id) AS total_bookings FROM bookings
      `
    );

  

    const [resultRevenue] = await database.query(
      `
      SELECT SUM(price) AS total_revenue FROM bookings
      `
    );

  

    const [resultMonthlyBookings] = await database.query(
      `
      SELECT 
          MONTHNAME(check_in) AS checkin_month_name,
          COUNT(id) AS monthly_bookings
      FROM 
         bookings
      WHERE 
          YEAR(check_in) =?
      GROUP BY 
          MONTH(check_in), MONTHNAME(check_in)
      ORDER BY 
          MONTH(check_in)
      `,
      [year]
    );

  

    if (resultBookings.length === 0 || resultRevenue.length === 0) {
    
      return new Response(
        JSON.stringify({
          total_bookings: 0,
          total_revenue: 0,
          monthly_bookings: [],
        }),
        { status: 200 }
      );
    }

    const { total_bookings } = resultBookings[0];
    const { total_revenue } = resultRevenue[0];


    return new Response(
      JSON.stringify({
        total_bookings,
        total_revenue,
        monthly_bookings: resultMonthlyBookings,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching booking data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
