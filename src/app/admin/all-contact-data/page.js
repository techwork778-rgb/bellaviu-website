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
  const [AllContact, setAllContact] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [seacrhTerm, setsearchSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = pageSize; // Dynamically linked to pageSize
  const [selectAll, setSelectAll] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [action, setAction] = useState("choose");
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredCustomer = AllContact.filter((user) => {
    const fullname = `${user.name} ${user.email_id}`.toLowerCase();
    return fullname.includes(seacrhTerm.toLowerCase());
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact-us/fetch", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAllContact(data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(filteredCustomer.map((user) => user.contact_us_id)); // Select all rows of current page
    }
    setSelectAll(!selectAll); // Toggle the selectAll state
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        // Deselect user
        return prevSelected.filter((id) => id !== userId);
      } else {
        // Select user
        return [...prevSelected, userId];
      }
    });
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

  // Export Functionality
  const handleExport = () => {
    const usersToExport = AllContact.filter((user) =>
      selectedUsers.includes(user.contact_us_id)
    );

    if (usersToExport.length > 0) {
      const csvContent = generateCSV(usersToExport);
      downloadCSV(csvContent);
    } else {
      alert("No users selected for export");
    }
    setSelectedUsers([]);
    toast.success("Exported Successfully");
  };
  const handleDelete = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to delete.");
      return;
    }
    setIsDeleting(true); // Set loading state to true
    // Make a DELETE request to the backend
    try {
      const response = await fetch("/api/contact-us/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: selectedUsers }), // Send selected user IDs
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success, e.g., show success message or reload data
        toast.success("Deleted successfully");
        setSelectedUsers([]); // Clear selection after delete
        fetchContacts(); // Refetch the contact data after delete
      } else {
        // Handle errors
        toast.error(data.error || "An error occurred while deleting");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
      console.error(error);
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  // Helper function to generate CSV content
  const generateCSV = (data) => {
    const headers = [
      "S.N",
      "Name",
      "Email",
      "Message",
    ];
    const rows = data.map((user, index) => [
      index + 1,
      user.name,
      user.email_id,
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
      link.setAttribute("download", "selected_users.csv");
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
          <Table>
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
    <>
    <Toaster/>
    
    <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <div className="d-flex flex-column" style={{ marginBottom: "20px" }}>
        <h3 className="title">All Contact List</h3>
        <p className="subtitle">
          Displaying {paginatedData.length} of {totalItems} Contact
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
                handleDelete();
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
            {/* {action === "" ? "Apply" : action === "delete" ? "Delete" : "Export"} */}
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
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {" "}
                <Checkbox
                  checked={paginatedData.every((user) =>
                    selectedUsers.includes(user.contact_us_id)
                  )}
                  onChange={handleSelectAll} // Calls the select all handler
                />
              </TableCell>
              <TableCell>S.N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
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
                <TableRow key={user.contact_us_id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.contact_us_id)} // Check if user is selected
                      onChange={() => handleSelectUser(user.contact_us_id)} // Call handleSelectUser on change
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {(currentPage - 1) * pageSize + index + 1}
                    </Typography>
                  </TableCell>

                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email_id}</TableCell>

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
    </>
  );
};

export default BookingsTable;
