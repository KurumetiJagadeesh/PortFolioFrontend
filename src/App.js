import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin/index";
import axios from "axios";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from "./redux/rootSlice";
import Login from "./pages/admin/Login";

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Failed to fetch portfolio data:", error);
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
