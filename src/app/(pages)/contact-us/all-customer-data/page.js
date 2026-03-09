"use client";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./style.css";

const Page = () => {
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch properties
  useEffect(() => {
    setLoading(true);
    fetch("api/get-users", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  // Pagination Logic
  const totalItems = property.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = property.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="property-container">
      <div className="table-header">
        <div className="d-flex flex-column">
          <h3 className="title">All Customer Data</h3>
          <p className="subtitle">
            Displaying {paginatedData.length} of {totalItems} customer data.
          </p>
        </div>
        <div className="page-size-controls">
          <label htmlFor="pageSize">Page Size: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to page 1 when page size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <TableContainer component={Paper} className="custom-card">
        <Table aria-label="custom table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell>{prop.first_name || "N/A"}</TableCell>
                  <TableCell>{prop.last_name || "N/A"}</TableCell>
                  <TableCell>{prop.email_id || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="no-data">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {/* Pagination Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((page) => {
            // Show the first, last, and current pages
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return true;
            }
            // Add placeholder for ellipsis
            return false;
          })
          .map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "contained" : "text"}
              color="primary"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
