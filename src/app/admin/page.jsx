// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
// } from "@mui/material";
// import { AttachMoney, TrendingUp, People, Add } from "@mui/icons-material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
// } from "recharts";
// import { PieChart, Pie, Cell, Legend, Tooltip as PieTooltip } from "recharts";
// import { green, red, orange, blue, purple, teal } from "@mui/material/colors";
// import css from "./dashboard.css";

// const COLORS = [
//   blue[500],
//   green[400],
//   orange[400],
//   red[300],
//   purple[300],
//   teal[300],
// ];

// // Sample transaction data
// const transactions = [
//   {
//     id: 1,
//     title: "Hotel 1",
//     date: "06 April 2023",
//     amount: -10.0,
//     color: orange[400],
//   },
//   {
//     id: 2,
//     title: "Hotel 2",
//     date: "05 April 2023",
//     amount: 500.0,
//     color: green[300],
//   },
//   {
//     id: 3,
//     title: "Hotel 3",
//     date: "05 April 2023",
//     amount: 500.0,
//     color: green[300],
//   },
//   {
//     id: 4,
//     title: "Hotel 4",
//     date: "05 April 2023",
//     amount: 500.0,
//     color: green[300],
//   },
// ];

// const Dashboard = () => {
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalContacts, setTotalContacts] = useState(0);
//   const [monthlyBookingsData, setMonthlyBookingsData] = useState([]);
//   const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
        

//         // Fetch data for monthly revenue (with 'type=revenue')
//         const revenueResponse = await fetch(
//           "/api/bookings?year=2024&type=revenue"
//         );
//         if (!revenueResponse.ok) {
//           throw new Error(`HTTP error! status: ${revenueResponse.status}`);
//         }
//         const revenueData = await revenueResponse.json();
//         console.log("Revenue Data:", revenueData);

//         // Calculate total revenue from the monthly revenue data
//         const totalRevenueValue = revenueData.monthly_revenue.reduce(
//           (acc, item) => {
//             return acc + parseFloat(item.monthly_revenue);
//           },
//           0
//         );

//         setTotalRevenue(totalRevenueValue); // Set the total revenue state

//         // Format the revenue data for the chart
//         const formattedRevenue = revenueData.monthly_revenue.map((item) => ({
//           name: item.checkin_month_name.slice(0, 3), // Get the first 3 letters of the month
//           value: parseFloat(item.monthly_revenue), // Convert string to float
//         }));
//         setMonthlyRevenueData(formattedRevenue);

//         // Fetch total users
//         const usersResponse = await fetch("/api/useractive");
//         if (!usersResponse.ok) {
//           throw new Error(`HTTP error! status: ${usersResponse.status}`);
//         }
//         const usersData = await usersResponse.json();
//         setTotalUsers(usersData.total_users);

//         // Fetch total contacts
//         const contactsResponse = await fetch("/api/dashboard-contact");
//         if (!contactsResponse.ok) {
//           throw new Error(`HTTP error! status: ${contactsResponse.status}`);
//         }
//         const contactsData = await contactsResponse.json();
//         setTotalContacts(contactsData.total_contacts);
//         // Fetch data for total bookings and monthly bookings
//         const bookingsResponse = await fetch("/api/bookings?year=2024");
//         if (!bookingsResponse.ok) {
//           throw new Error(`HTTP error! status: ${bookingsResponse.status}`);
//         }
//         const bookingsData = await bookingsResponse.json();
//         setTotalBookings(bookingsData.total_bookings);

//         const monthlyBookings = bookingsData.monthly_bookings.map((item) => ({
//           name: item.checkin_month_name.slice(0, 3),
//           Booking: item.monthly_bookings,
//         }));
//         setMonthlyBookingsData(monthlyBookings);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box p={3} className="dashboard-container" minHeight="100vh">
//       {/* Page Title */}
//       <Typography variant="h4" className="dashboard-title" mb={2}>
//         Dashboard
//       </Typography>

//       {/* Analytics Section */}
//       <Grid container spacing={3} mb={4}>
//         {/* Total Bookings */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ p: 2 }}>
//             <Box display="flex" alignItems="center">
//               <Box flexGrow={1}>
//                 <Typography variant="subtitle1">Total Bookings</Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   {totalBookings}
//                 </Typography>
//               </Box>
//               <TrendingUp fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         {/* Revenue */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ p: 2 }}>
//             <Box display="flex" alignItems="center">
//               <Box flexGrow={1}>
//                 <Typography variant="subtitle1">Total Revenue</Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   ${totalRevenue > 0 ? totalRevenue.toFixed(2) : "0.00"}
//                 </Typography>
//               </Box>
//               <AttachMoney fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         {/* Active Users */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ p: 2 }}>
//             <Box display="flex" alignItems="center">
//               <Box flexGrow={1}>
//                 <Typography variant="subtitle1">Active Users</Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   {totalUsers}
//                 </Typography>
//               </Box>
//               <People fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         {/* Contact Enquiries */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ p: 2 }}>
//             <Box display="flex" alignItems="center">
//               <Box flexGrow={1}>
//                 <Typography variant="subtitle1">Contact Enquiries</Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   {totalContacts}
//                 </Typography>
//               </Box>
//               <Add fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
//       {/* Combined Card with Monthly Booking Report Chart and Pie chart */}
//       <Grid container spacing={3} mb={4}>
//         <Grid item xs={12} md={8}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Monthly Booking Report
//               </Typography>

//               {/* Monthly Booking Report */}
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={monthlyBookingsData}
//                   margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="name"
//                     interval={0} // Ensures all labels are shown
//                     tick={{ fontSize: 12 }}
//                   />
//                   <YAxis tick={false}>
//                     <Label
//                       value="Number of Bookings"
//                       angle={-90}
//                       position="insideLeft"
//                       style={{
//                         textAnchor: "middle",
//                         fill: "#000",
//                         fontSize: "14px",
//                       }}
//                     />
//                   </YAxis>
//                   <Tooltip />
//                   <Bar dataKey="Booking" fill="#6fa8dc" barSize={25} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Separate Card for Revenue Report */}
//         <Grid item xs={8} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Monthly Revenue Report
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={monthlyRevenueData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     fill="#8884d8"
//                   >
//                     {monthlyRevenueData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Legend verticalAlign="bottom" height={50} />
//                   <PieTooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>

    
//   );
// };

// export default Dashboard;
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { AttachMoney, TrendingUp, People, Add } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { PieChart, Pie, Cell, Legend, Tooltip as PieTooltip } from "recharts";
import { green, red, orange, blue, purple, teal } from "@mui/material/colors";
import css from "./dashboard.css";

const COLORS = [
  blue[500],
  green[400],
  orange[400],
  red[300],
  purple[300],
  teal[300],
];

// Sample transaction data
const transactions = [
  {
    id: 1,
    title: "Hotel 1",
    date: "06 April 2023",
    amount: -10.0,
    color: orange[400],
  },
  {
    id: 2,
    title: "Hotel 2",
    date: "05 April 2023",
    amount: 500.0,
    color: green[300],
  },
  {
    id: 3,
    title: "Hotel 3",
    date: "05 April 2023",
    amount: 500.0,
    color: green[300],
  },
  {
    id: 4,
    title: "Hotel 4",
    date: "05 April 2023",
    amount: 500.0,
    color: green[300],
  },
];

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [monthlyBookingsData, setMonthlyBookingsData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for total bookings and monthly bookings (same approach for revenue)
        const currentYear = new Date().getFullYear();
        const bookingsResponse = await fetch(`/api/bookings?year=${currentYear}`);
        if (!bookingsResponse.ok) {
          throw new Error(`HTTP error! status: ${bookingsResponse.status}`);
        }
        const bookingsData = await bookingsResponse.json();
        setTotalBookings(bookingsData.total_bookings);

        const monthlyBookings = bookingsData.monthly_bookings.map((item) => ({
          name: item.checkin_month_name.slice(0, 3),
          Booking: item.monthly_bookings,
        }));
        setMonthlyBookingsData(monthlyBookings);

        // Fetch data for monthly revenue (with 'type=revenue')
        const revenueResponse = await fetch(
          "/api/bookings?year=2025&type=revenue"
        );
        if (!revenueResponse.ok) {
          throw new Error(`HTTP error! status: ${revenueResponse.status}`);
        }
        const revenueData = await revenueResponse.json();
      

        // Calculate total revenue from the monthly revenue data
        const totalRevenueValue = revenueData.monthly_revenue.reduce(
          (acc, item) => acc + parseFloat(item.monthly_revenue),
          0
        );

        setTotalRevenue(totalRevenueValue); // Set the total revenue state
      

        // Format the revenue data for the chart
        const formattedRevenue = revenueData.monthly_revenue.map((item) => ({
          name: item.checkin_month_name.slice(0, 3), // Get the first 3 letters of the month
          value: parseFloat(item.monthly_revenue), // Convert string to float
        }));
        setMonthlyRevenueData(formattedRevenue);

        // Fetch total users
        const usersResponse = await fetch("/api/useractive");
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.total_users);

        // Fetch total contacts
        const contactsResponse = await fetch("/api/dashboard-contact");
        if (!contactsResponse.ok) {
          throw new Error(`HTTP error! status: ${contactsResponse.status}`);
        }
        const contactsData = await contactsResponse.json();
        setTotalContacts(contactsData.total_contacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={3} className="dashboard-container" minHeight="100vh">
      {/* Page Title */}
      <Typography variant="h4" className="dashboard-title" mb={2}>
        Dashboard
      </Typography>

      {/* Analytics Section */}
      <Grid container spacing={3} mb={4}>
        {/* Total Bookings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="subtitle1">Total Bookings</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalBookings}
                </Typography>
              </Box>
              <TrendingUp fontSize="large" />
            </Box>
          </Card>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="subtitle1">Total Revenue</Typography>
                <Typography variant="h5" fontWeight="bold">
                  AED {totalRevenue}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="subtitle1">Active Users</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalUsers}
                </Typography>
              </Box>
              <People fontSize="large" />
            </Box>
          </Card>
        </Grid>

        {/* Contact Enquiries */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="subtitle1">Contact Enquiries</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalContacts}
                </Typography>
              </Box>
              <Add fontSize="large" />
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* Combined Card with Monthly Booking Report Chart and Pie chart */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Monthly Booking Report
              </Typography>

              {/* Monthly Booking Report */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthlyBookingsData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0} // Ensures all labels are shown
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={false}>
                    <Label
                      value="Number of Bookings"
                      angle={-90}
                      position="insideLeft"
                      style={{
                        textAnchor: "middle",
                        fill: "#000",
                        fontSize: "14px",
                      }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="Booking" fill="#6fa8dc" barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Separate Card for Revenue Report */}
        <Grid item xs={8} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Monthly Revenue Report
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={monthlyRevenueData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {monthlyRevenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={50} />
                  <PieTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
