import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { startOfMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./sidebar";
import "../css/style.css";

const MutasiView = () => {
  const [mutasi, setMutasi] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getMutasi = async () => {
    try {
      let url = `http://localhost:5000/mutasi?search_query=${keyword}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setMutasi(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
    }
  };

  useEffect(() => {
    getMutasi();
  }, [page, keyword, startDate, endDate]); // useEffect dijalankan sekali saat komponen dipasang

  const handleDeleteMutasi = async (id) => {
    try {
      // Lakukan permintaan DELETE ke endpoint /guests/:id
      await axios.delete(`http://localhost:5000/mutasi/${id}`);
      // Refresh data setelah penghapusan
      getMutasi();
    } catch (error) {
      console.error("Error deleting mutasi:", error.message);
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
    getMutasi(startDate, endDate);
  };
  useEffect(() => {
    getMutasi();
  }, [page, keyword, startDate, endDate]);
  return (
    <div className="container mt-5">
      <div className="columns">
      <div id="sidebox" className="d-flex mt-5">
      </div>
        {/* Right Column - Table */}
        <div className="column">
          <form className="mt-4" onSubmit={searchData}>
            <label className="mt-5 mb-3 is-size-2">List Mutasi</label>
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
          <table className="table is-striped is-bordered is-fullwidth mt-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Shift</th>
                <th>anggota 1</th>
                <th>anggota 2</th>
                <th>anggota 3</th>
                <th>kegiatan 1</th>
                <th>kegiatan 2</th>
                <th>danru A</th>
                <th>danru B</th>
                <th>action</th>
              </tr>
            </thead>

            <tbody>
              {mutasi.map((mutasi) => (
                <tr key={mutasi.id}>
                  <td>{mutasi.id}</td>
                  <td>
                    {mutasi.formattedTanggal &&
                      mutasi.formattedTanggal.split(" ").join("-")}
                  </td>
                  <td>{mutasi.shift}</td>
                  <td>{mutasi.anggota_1}</td>
                  <td>{mutasi.anggota_2}</td>
                  <td>{mutasi.anggota_3}</td>
                  <td>{mutasi.kegiatan_1}</td>
                  <td>{mutasi.kegiatan_2}</td>
                  <td>{mutasi.danru_a}</td>
                  <td>{mutasi.danru_b}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteMutasi(mutasi.id)}
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

export default MutasiView;
