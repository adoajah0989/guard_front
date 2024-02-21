import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/style.css";
import ReactPaginate from "react-paginate";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const PatroliList = () => {
  const [patroli, setPatroli] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getPatroli = async () => {
    try {
      let url = `http://localhost:5000/patroli?search_query=${keyword}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setPatroli(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
      if (error.response && error.response.status === 404) {
        setPatroli([]); // Reset guests array
        setPage(0); // Reset page to the first page
        setPages(0);
        setRows(0);
    }
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

  const handleDeletePatroli = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/patroli/${id}`);
        setQuery(""); // Reset search query
        getPatroli();
        toast.success("Data deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting guest:", error.message);
      }
    }
  };

  
  const clearSearchOnEsc = (e) => {
    if (e.key === "Escape") {
      setKeyword("");
      setQuery("");
    }
  };

  useEffect(() => {
    getPatroli();
    document.addEventListener("keydown", clearSearchOnEsc);
    return () => {
      document.removeEventListener("keydown", clearSearchOnEsc);
    };
  }, [page, startDate, endDate, keyword]);
  
  return (
    <Container>
      <Row  className="ml-1 p-3">
        <Col>
          <Form className="" onSubmit={searchData}>
            <Form.Label className="mt-2 mb-3 display-4 header">
              List Patroli
            </Form.Label>
            <Form.Group className="m-3">
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find something here..."
              />
            </Form.Group>
            <Form.Group className="mx-3">
              <Row>
                <Col>
                  <Form.Control
                    className=" my-2"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    className=" my-2"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <div className="m-3">
              <Button className="sb-button" type="submit">
                Search
              </Button>
            </div>
          </Form>

          <div style={{width:"100%", overflowX: "auto" }}>
            <Table  striped bordered responsive size="sm" className="mt-2">
            <thead>
               <tr>
                 <th>Tanggal</th>
                 <th>Temuan</th>
                 <th>Lokasi</th>
                 <th>Tindak</th>
                 <th>Status</th>
                 <th>Image</th>
                 <th>Action</th>
               </tr>
             </thead>

              <tbody>
                {patroli.map((patroli) => (
                  <tr key={patroli.id}>
                    <td>
                      {patroli.formattedTanggal &&
                        patroli.formattedTanggal.split(" ").join("-")}
                    </td>
                    <td>{patroli.urai_temuan}</td>
                    <td>{patroli.lokasi}</td>
                    <td>{patroli.tindak}</td>
                    <td>{patroli.status}</td>
                    <td className="centered">
                    <a
                      href={patroli.url1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="border-0">
                      <img src={patroli.url1} alt="Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </button>
                    </a>
                    <a
                      href={patroli.url2}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="border-0">
                      <img src={patroli.url2} alt="Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </button>
                    </a>
              </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePatroli(patroli.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="pagination-container">
            <p>
              Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <p className="text-center text-danger">{msg}</p>
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => changePage({ selected: page - 1 })}
                disabled={page === 0}
              />
              <Pagination.Next
                onClick={() => changePage({ selected: page + 1 })}
                disabled={page === pages - 1}
              />
            </Pagination>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default PatroliList;
