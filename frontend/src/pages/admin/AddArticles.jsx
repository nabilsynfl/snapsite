import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddArticles from "../../components/FeaturesAdmin/FormAddArticles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddArticles = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <FormAddArticles />
    </Layout>
  );
};

export default AddArticles;
