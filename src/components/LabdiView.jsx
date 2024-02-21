import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { startOfMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const LapdiView = () => {
  const [lapdi, setlapdi] = useState([]);
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
    getlapdi();
  }, []);

  const getlapdi = async () => {
    try {
      let url = `http://localhost:5000/lapdi?search_query=${keyword}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setlapdi(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching lapdi:", error.message);
    }
  };

  useEffect(() => {
    getlapdi();
  }, [page, keyword, startDate, endDate]);

  const deleteLapdi = async (lapdiId) => {
    try {
      await axios.delete(`http://localhost:5000/lapdi/${lapdiId}`);
      getlapdi();
    } catch (error) {
      console.log(error);
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

  const formatTanggal = (tanggal) => {
    const formattedDate = new Date(tanggal);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return formattedDate.toLocaleDateString('en-GB', options);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
    getlapdi();
  };

  return (
    <div className="container pt-md-5">
      <form className="mt-4" onSubmit={searchData}>
        <label className="mt-5 mb-3 is-size-2">List Lapdi</label>
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
            <th>Jam</th>
            <th>Anggota</th>
            <th>Urai</th>
            <th>Lokasi</th>
            <th>Penyebab</th>
            <th>Kerugian</th>
            <th>Tindakan</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lapdi.map((lapdi) => (
            <tr key={lapdi.id}>
              <td>{lapdi.id}</td>
              <td>{lapdi.formattedTanggal && lapdi.formattedTanggal.split(' ').join('-')}</td>
              <td>{lapdi.jam}</td>
              <td>{lapdi.anggota}</td>
              <td>{lapdi.urai}</td>
              <td>{lapdi.lokasi}</td>
              <td>{lapdi.penyebab}</td>
              <td>{lapdi.kerugian}</td>
              <td>{lapdi.tindakan}</td>
              <td>
                <img src={lapdi.image} alt="Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteLapdi(lapdi.id)}>
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
  );
};

export default LapdiView;
