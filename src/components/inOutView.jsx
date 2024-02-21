import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const InOutView = () => {
  const [inout, setInOut] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getInOut();
  }, [page, query, startDate, endDate]);

  const getInOut = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/inout?search_query=${query}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
      );
      setInOut(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching InOut data:", error.message);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "If you don't find the data you're looking for, please search with a specific keyword!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setQuery(query);
  };

  const handleDeleteInOut = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/inout/${id}`);
        getInOut();

        toast.success("Data deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting InOut data:", error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
        <form className="mt" onSubmit={searchData}>
            <label className="mt-5 mb-3 is-size-2">List Tamu</label>
            <div className="field">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find something here..."
                />
              </div>
            </div>
            <div className="field has-addons">
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover className="mt-2">
              <thead>
                <tr>
                  <th>Time In</th>
                  <th>No kendaraan</th>
                  <th>Time Out</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {inout.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time_in}</td>
                    <td>
                      <p className="title is-7">{item.no_kendaraan}</p>
                    </td>
                    <td>{item.time_out}</td>
                    <td>
                      <a href={item.image} target="_blank" rel="noopener noreferrer">
                        <button className="border-0">
                          <img
                            src={item.image}
                            alt="Image"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </button>
                      </a>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteInOut(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="has-text-centered has-text-danger">{msg}</p>
          <nav
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InOutView;
