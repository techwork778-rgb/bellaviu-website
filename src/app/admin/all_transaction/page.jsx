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
    const fullname = `${user.cardholder_name} ${user.id}`.toLowerCase();
    return fullname.includes(seacrhTerm.toLowerCase());
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/get_transaction");
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
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all users
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id)); // Select all users across all pages
    }
    setSelectAll(!selectAll);
  };
  const handleExport = () => {
    const usersToExport = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    if (usersToExport.length > 0) {
      const csvContent = generateCSV(usersToExport);
      downloadCSV(csvContent);
      toast.success("Transaction details exported successfully!");
    } else {
      toast.error("No transactions selected for export");
    }
  };

  const generateCSV = (data) => {
    const headers = [
      "Sr No",
      "Order Id",
      "Amount",
      "Currency",
      "Status",
      "Card Brand",
      "Card Number",
      "Cardholder Name",
      "Authentication Status",
      "Transaction Date",
      "Authorization Code",
      "Transaction ID",
      "Merchant Name",
      "Merchant ID",
    ];

    const rows = data.map((user, index) => [
      index + 1,
      user.id,
      user.amount,
      user.currency,
      user.status,
      user.card_brand,
      user.card_number,
      user.cardholder_name,
      user.authentication_status,
      user.creation_time,
      user.authorization_code,
      user.authentication_transaction_id,
      user.merchant_name,
      user.merchant_id,
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
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <div className="d-flex flex-column" style={{ marginBottom: "10px" }}>
        <h3 className="title">All Transaction</h3>
        <p className="subtitle">
          Displaying {paginatedData.length} of {totalItems} Booking.
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
            <MenuItem value="export">Export</MenuItem>
          </Select>

          <Button
            size="small"
            disabled={!action}
            onClick={() => {
              if (action === "delete") {
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
                    selectedUsers.includes(user.id)
                  )}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Sr No</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Order Id</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Amount</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Status</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Card Brand</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Card Number</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Cardholder Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Date</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Authentication Status</TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }} >Authorization Code</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Transaction ID</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Merchant Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} >Merchant ID</TableCell>
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
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {(currentPage - 1) * pageSize + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {user.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.amount}
                    {user.currency}
                  </TableCell>

                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.card_brand}</TableCell>
                  <TableCell>{user.card_number}</TableCell>
                  <TableCell>{user.cardholder_name}</TableCell>
                  <TableCell>
                    {" "}
                    {new Date(user.creation_time).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{user.authentication_status}</TableCell>
                  <TableCell>{user.authorization_code}</TableCell>
                  <TableCell>{user.authentication_transaction_id}</TableCell>
                  <TableCell>{user.merchant_name}</TableCell>
                  <TableCell>{user.merchant_id}</TableCell>
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
  );
};

export default BookingsTable;
