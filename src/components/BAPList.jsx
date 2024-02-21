import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { startOfMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const BAPList = () => {
  const [BAP, setBAP] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getBAP();
  }, [page, query, startDate, endDate]);

  const getBAP = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/bap?search_query=${query}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
      );
      setBAP(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching BAP:", error.message);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "If you don't find the data you're looking for, try searching with a specific keyword!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    getBAP();
  };

  const handleDeleteBAP = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bap/${id}`);
      getBAP();
    } catch (error) {
      console.error("Error deleting BAP:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form className="mt-4" onSubmit={searchData}>
            <label className="mt-5 mb-3 is-size-2 has-text-weight-bold">
              List BAP
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
                <th>Tanggal</th>
                <th>Jam</th>
                <th>Pemeriksa</th>
                <th>Diperiksa</th>
                <th>TTL</th>
                <th>Pekerjaan</th>
                <th>Alamat</th>
                <th>KTP</th>
                <th>HP</th>
                <th>Pertanyaan</th>
                <th>jawaban</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {BAP.map((bap) => (
                <tr key={bap.id}>
                  <td>
                    {bap.formattedTanggal &&
                      bap.formattedTanggal.split(" ").join("-")}
                  </td>
                  <td>{bap.jam}</td>
                  <td>{bap.pemeriksa}</td>
                  <td>{bap.diperiksa}</td>
                  <td>{bap.ttl}</td>
                  <td>{bap.pekerjaan}</td>
                  <td>{bap.alamat}</td>
                  <td>{bap.ktp}</td>
                  <td>{bap.hp}</td>
                  <td>
                    <ul>
                      <li>{bap.pertanyaan1}</li>
                      <li>{bap.pertanyaan2}</li>
                      <li>{bap.pertanyaan3}</li>
                      <li>{bap.pertanyaan4}</li>
                      <li>{bap.pertanyaan5}</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>{bap.jawaban1}</li>
                      <li>{bap.jawaban2}</li>
                      <li>{bap.jawaban3}</li>
                      <li>{bap.jawaban4}</li>
                      <li>{bap.jawaban5}</li>
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteBAP(bap.id)}
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

export default BAPList;
