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
import "./style.css";

const Page = () => {
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch properties
  useEffect(() => {
    setLoading(true);
    fetch("api/contact-us/fetch", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data.data || []);
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

  const handleDelete = (id) => {
    setLoading(true); // Set loading to true before making the request
  
    fetch(`api/contact-us/delete/`, {
      method: "POST",
      body: JSON.stringify({ id }), // Send the ID in the request body
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
      
          // Optionally, update the property state to reflect the deletion
          setProperty(property.filter((item) => item.contact_us_id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  };  

  return (
    <div className="property-container">
      <div className="table-header">
        <div className="d-flex flex-column">
          <h3 className="title">All Contact Data</h3>
          <p className="subtitle">
            Displaying {paginatedData.length} of {totalItems} contacts us data.
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell> {/* Add actions column */}
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
                  <TableCell>{prop.name || "N/A"}</TableCell>
                  <TableCell>{prop.email_id || "N/A"}</TableCell>
                  <TableCell>{prop.message || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(prop.contact_us_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
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
