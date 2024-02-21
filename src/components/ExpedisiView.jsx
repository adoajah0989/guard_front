import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { startOfMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


const ExpedisiView = () => {
  const [expedisi, setExpedisi] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getExpedisi();
  }, [page, keyword, startDate, endDate]); // useEffect dijalankan sekali saat komponen dipasang

  const getExpedisi = async () => {
    try {
      let url = `http://localhost:5000/ekspedisi?search_query=${keyword}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setExpedisi(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching patroli:", error.message);
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

  const deleteExpedisi = async (id) => {
    try {
      // Lakukan permintaan DELETE ke endpoint /guests/:id
      await axios.delete(`http://localhost:5000/ekspedisi/${id}`);
      // Refresh data setelah penghapusan
      getExpedisi();
    } catch (error) {
      console.error("Error deleting expedisi:", error.message);
    }
  };
  useEffect(() => {
    getExpedisi();
  }, [startDate, endDate]);
  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form className="mt-4" onSubmit={searchData}>
            <label className="mt-5 mb-3 is-size-2 has-text-weight-bold">
              List Expedisi
            </label>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find something here..."
                />
              </div>
              <div className="field">
                <div className="control">
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
                </div>
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-striped is-bordered is-fullwidth mt-2 is-size-7">
            <thead>
              <tr>
                <th>Tanggal Diterima</th>
                <th>Nama Dokumen</th>
                <th>Dari</th>
                <th>Untuk</th>
                <th>Diserahkan ke</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expedisi.map((expedisi) => (
                <tr key={expedisi.id}>
                  <td>
                    {expedisi.formattedTanggal &&
                      expedisi.formattedTanggal.split(" ").join("-")}
                  </td>
                  <td>
                    <p className="title is-7">{expedisi.namaDok}</p>
                  </td>
                  <td>{expedisi.dari}</td>
                  <td>{expedisi.untuk}</td>
                  <td>{expedisi.diserahkan}</td>
                  <td>
                    <a
                      href={expedisi.url1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="border-0">
                        <img
                          src={expedisi.url1}
                          alt="Image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </button>
                    </a>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpedisi(expedisi.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
};

export default ExpedisiView;
