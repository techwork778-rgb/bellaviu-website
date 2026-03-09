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
  //  State for storing users data and loading status
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [seacrhTerm, setsearchSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Added pageSize state
  const [selectAll, setSelectAll] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // for export
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [action, setAction] = useState("choose");

  // for filter
  const filteredUsers = users.filter((user) => {
    const fullname = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullname.includes(seacrhTerm.toLowerCase());
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/get-users");
        const data = await response.json();
      
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // =====================delete functionality========================

  // const handleDelete = async () => {
  //   if (selectedUsers.length === 0) {
  //     toast.error("No users selected");
  //     return;
  //   }
  //   setDeleting(true); // Set deleting state to true while deleting is in progress
  //   try {
  //     const response = await fetch("/api/delete-user", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userIds: selectedUsers }),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       toast.success("deleted successfully");
  //       setUsers(users.filter((user) => !selectedUsers.includes(user.user_id)));
  //       setSelectedUsers([]);
  //     } else {
  //       toast.error(result.error || "Error deleting users");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting users:", error);
  //     toast.error("An error occurred while deleting users");
  //   }
  //   finally {
  //     setDeleting(false); // Reset deleting state after operation completes
  //   }
  // };

  // Pagination Logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all users
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.user_id)); // Select all users across all pages
    }
    setSelectAll(!selectAll);
  };

  const handleExport = () => {
    const usersToExport = users.filter((user) =>
      selectedUsers.includes(user.user_id)
    );

    if (usersToExport.length > 0) {
      const csvContent = generateCSV(usersToExport);
      downloadCSV(csvContent);
      toast.success("Exported successfully!");
    } else {
      toast.error("No transactions selected for export");
    }
  };

  const generateCSV = (data) => {
    const headers = [
      "S.N",
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Type",
      "Created Date",
      "Updated Date",
    ];
    const rows = data.map((user) => [
      user.user_id,
      user.first_name,
      user.last_name,
      user.email_id,
      user.type,
      new Date(user.created_dt).toLocaleDateString(),
      new Date(user.updated_dt).toLocaleDateString(),
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    return csvContent;
  };

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

  if (!isClient) {
    return null;
  }
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

  return (
    <>
       <Toaster />    
       <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <div className="d-flex flex-column" style={{ marginBottom: "10px" }}>
        <h3 className="title">All User</h3>
        <p className="subtitle">
          Displaying {paginatedData.length} of {totalItems} Users.
        </p>
      </div>
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
            {/* <MenuItem value="delete">Delete</MenuItem> */}
            <MenuItem value="export">Export</MenuItem>
          </Select>

          <Button
            size="small"
            disabled={!action}
            onClick={() => {
              if (action === "delete") {
                // handleDelete();
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
            {deleting
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
            value={seacrhTerm}
            onChange={(e) => setsearchSearch(e.target.value)}
            sx={{ width: 200 }}
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

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={paginatedData.every((user) =>
                    selectedUsers.includes(user.user_id)
                  )}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>S.N</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Updated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No user found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((user, index) => (
                <TableRow key={user.user_id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.user_id)}
                      onChange={() => handleSelectUser(user.user_id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {(currentPage - 1) * pageSize + index + 1}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {user.user_id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={user.avatar}
                        // sx={{ bgcolor: getRandomColor() }}
                      >
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body1">
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {user.email_id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={user.type}
                      size="small"
                      sx={{
                        bgcolor:
                          user.status === "Active"
                            ? "primary.light"
                            : "primary.light",
                        color: "white",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_dt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updated_dt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
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
          {[...Array(totalPages)].map((_, i) => (
            <li
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              key={i}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
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
