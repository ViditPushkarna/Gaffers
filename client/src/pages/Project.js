import React, { useEffect } from "react";
import Branding from "../components/Branding";
import styles from "../styles/pages/Project.module.css";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Tabs from "../components/project/Tabs";
import List from "../components/project/List";
import Board from "../components/project/Board";
import Docs from "../components/project/Docs";
import Extras from "../components/project/Extras";
import Members from "../components/project/Members";
import Mytasks from "../components/project/Mytasks";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import * as actionLogin from "../action/actionLogin";
import * as actionProject from "../action/actionProject";

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.project);

  const { initUser, initProject } = bindActionCreators(
    Object.assign({}, actionLogin, actionProject),
    dispatch
  );

  const params = useParams();

  useEffect(() => {
    if (error === true) return navigate("/home");
  }, [error]);

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("token") === null
    )
      return navigate("/");

    const user_email = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const req = {
      user_email: user_email,
    };

    axios
      .post("http://localhost:5000/user/getInfo", req)
      .then((res) => {
        if (res.data.success === false) throw Error("Error");

        initUser(res.data.user, token);
      })
      .catch((err) => {
        console.log(err);
      });

    initProject(params.id.slice(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <Branding />

        <Tabs name="List" link={`${params.id}/list`} navigate={navigate} />
        <Tabs name="Board" link={`${params.id}/board`} navigate={navigate} />
        <Tabs name="Docs" link={`${params.id}/docs`} navigate={navigate} />
        <Tabs
          name="Members"
          link={`${params.id}/members`}
          navigate={navigate}
        />
        <Tabs
          name="Mytasks"
          link={`${params.id}/mytasks`}
          navigate={navigate}
        />
        <Tabs name="Extras" link={`${params.id}/extras`} navigate={navigate} />
      </div>

      <div className={styles.content}>
        <div className={styles.titlebar}>
          <h1>{params['*'].toUpperCase()}</h1>
        </div>

        <Routes>
          <Route exact path="/list" element={<List />} />
          <Route exact path="/board" element={<Board />} />
          <Route exact path="/docs" element={<Docs />} />
          <Route exact path="/members" element={<Members />} />
          <Route exact path="/mytasks" element={<Mytasks />} />
          <Route exact path="/extras" element={<Extras />} />
          <Route path="/*" element={<Navigate to="/page_not_found" />} />
        </Routes>
      </div>
    </div>
  );
}
