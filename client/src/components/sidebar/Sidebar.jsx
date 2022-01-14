import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(BASE_URL + "/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">BỘ Y TẾ VIỆT NAM</span>
        <img
          src="https://lh3.googleusercontent.com/6ngfWgwu9fjecJXy6HiTT5Q-RC2H17_iJHf45LVqgDeyveFnH3yszlsApo1x4xA4nZtINPDZd4oFNuAHmL64PchKn3KXLP7DUEmwrlena-I9p7YCg3x2vpnueqZIHvWf2ZA4nrTDIVOfbM95Tbk1bqlyMrWq2Ng8JyabgLEXKoMvAlWRkLo3B9F9sdX_-VKyDNn1PYzLqEMQsmzCtT5dygGvBfIarkYETSBbGJmFuqY5Bsyg9x3oycu1Xh6W2KFUw_Xm54ebn4n7H6irA9S47TWMtlAwT2A13B2sn2XzQDU3UgoUwK25Nq4ps25FqGYDX3RpmZrUPMSF03iFAjJqXO79Vf7JszVMxwbUbMJMNsaeu4ow25ua_5TW5mMWsTjHPHpCNvsmeoOhQoOWAPg4bwSsE96djtAS7fmgLKNfdoyImQ_y5Plm-AvlTcgTSg8t2yQZFCWK8cWFjn26h9suUZm1Y4AVQUOs4OIEKOsIRuoBfH0rbChkdyqfHJL9Mfy5_i2tlRBdgRuuZoKIinedNCLNa9aIV10WdI68Wr_ZSc2taKX0BdFup7LNKH06Hdj6Sc4sSI-159zHmORNIVEUl6gxFwCZaVC5EOC5_5P2Gcb6BWDxw9EdEunVkEhKYLBgtKC8TQxNWnQZmgJnce02uYb2AP-aMIwxUTDOygKN7rbBfLPopgSXdFb7k2D70HTC9Q4H7WhzqNo6GTzO4P1_dw=w350-h368-no?authuser=0"
          alt=""
        />
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">QUỐC GIA</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
