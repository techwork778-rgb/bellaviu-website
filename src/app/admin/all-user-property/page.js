"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Box,
  Select,
  MenuItem,
  Button,
  Tooltip,
  TextField,
  Skeleton,
} from "@mui/material";
import { Search, Settings, Menu, MoreVertical } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const BookingsTable = () => {
  // State for storing users data and loading status
  const [property, setProperty] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [seacrhTerm, setsearchSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = pageSize; // Dynamically linked to pageSize
  const [selectAll, setSelectAll] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [action, setAction] = useState("choose");
  const [isDeleting, setIsDeleting] = useState(false); // State for tracking deletion progress

  const filteredCustomer = property.filter((user) => {
    const fullname = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullname.includes(seacrhTerm.toLowerCase());
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-user-property", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
    
      setProperty(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedUsers([]); // Deselect all
  //   } else {
  //     setSelectedUsers(paginatedData.map((user) => user.up_id)); // Select all
  //   }
  //   setSelectAll(!selectAll);
  // };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all users
    } else {
      setSelectedUsers(filteredCustomer.map((user) => user.up_id)); // Select all users across all pages
    }
    setSelectAll(!selectAll);
  };
  // Pagination Logic
  const totalItems = filteredCustomer.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = filteredCustomer.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when page size changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Select a user for deletion/export
  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  // Export Functionality
  const handleExport = () => {
    const usersToExport = property.filter((user) =>
      selectedUsers.includes(user.up_id)
    );

    if (usersToExport.length > 0) {
      const csvContent = generateCSV(usersToExport);
      downloadCSV(csvContent);
    } else {
      alert("No users selected for export");
    }
    setSelectedUsers([]);
    toast.success("User Exported Successfully");
  };
  const handleDeleteProperties = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one property to delete.");
      return;
    }

    setIsDeleting(true); // Start deletion process

    try {
      // Send the selected property IDs to the backend API for deletion
      const response = await fetch("/api/delete-user-property", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upIds: selectedUsers }), // Send selected up_ids
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message); // Success message
        setProperty((prev) =>
          prev.filter((property) => !selectedUsers.includes(property.up_id))
        );
        toast.success("User Properties Deleted Successfully");
        fetchData();
      } else {
        console.error(result.error); // Error message
        toast.error("Error deleting properties");
      }
    } catch (error) {
      console.error("Error deleting properties:", error);
      toast.error("Error deleting properties");
    } finally {
      setIsDeleting(false); // End deletion process
      setSelectedUsers([]); // Clear selected users after deletion
    }
  };

  // Helper function to generate CSV content
  const generateCSV = (data) => {
    const headers = [
      "S.N",
      "Username",
      "Phone",
      "Property",
      "Furnishing Status",
      "Bed Capacity",
      "Building Name",
      "Community Name",
      "Location",
      "Message",
    ];
    const rows = data.map((user) => [
      user.up_id,
      user.firstname + " " + user.lastname,
      user.phone,
      user.property_type,
      user.furnishing_status,
      user.no_bedrooms,
      user.building_name,
      user.community,
      user.city,
      user.message,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    return csvContent;
  };

  // Function to trigger file download
  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "all_users_property.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Toaster />
        <Skeleton
          variant="rectangular"
          height={60}
          width="100%"
          sx={{ mb: 2, borderRadius: "5px" }}
        />
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[...Array(6)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton height={40} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(6)].map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (!isClient) return null;

  return (
    <Box
      sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, width: "100%" }}
    >
      <div className="d-flex flex-column" style={{ marginBottom: "20px" }}>
        <h3 className="title">All User Property</h3>
        <p className="subtitle">
          Displaying {paginatedData.length} of {totalItems} properties.
        </p>
      </div>
      {/* Header Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Select
            size="small"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            sx={{ width: 140, bgcolor: "background.default" }}
          >
            <MenuItem value="choose" disabled>
              Action
            </MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </Select>

          <Button
            size="small"
            disabled={!action}
            onClick={() => {
              if (action === "delete") {
                handleDeleteProperties(); // Corrected call to handleDeleteProperties
              } else if (action === "export") {
                handleExport();
              }
            }}
            sx={{
              p: 1,
              color: "white",
              bgcolor:
                action === "delete"
                  ? "red"
                  : action === "export"
                  ? "primary.main"
                  : "grey",
              "&:hover": {
                bgcolor:
                  action === "delete"
                    ? "darkred"
                    : action === "export"
                    ? "primary.dark"
                    : "grey",
              },
            }}
          >
            {isDeleting
              ? "Deleting..."
              : action === "choose"
              ? "Apply"
              : action === "delete"
              ? "Delete"
              : "Export"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "background.default",
            p: 1,
            borderRadius: 1,
          }}
        >
          <TextField
            size="small"
            placeholder="Search"
            sx={{ width: "300px" }}
            value={seacrhTerm}
            onChange={(e) => setsearchSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search size={18} style={{ marginRight: 8 }} />,
            }}
          />
          <select
            className="form-select"
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "auto" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, minWidth: 650, overflow: "scroll", width: "100%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>S.N</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Username</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Phone</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Property Type</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                Furnishing Status
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Bed Capacity</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Building Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Community</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Location</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((user, index) => (
                <TableRow key={user.up_id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.up_id)}
                      onChange={() => handleSelectUser(user.up_id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {(currentPage - 1) * pageSize + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.firstname} {user.lastname}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.property_type}</TableCell>
                  <TableCell>{user.furnishing_status}</TableCell>
                  <TableCell>{user.no_bedrooms}</TableCell>
                  <TableCell>{user.building_name}</TableCell>
                  <TableCell>{user.community}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.message}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Box>
  );
};

export default BookingsTable;
