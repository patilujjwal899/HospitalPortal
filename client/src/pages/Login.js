import { Button, Form, Input } from "antd"
import React from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { hideLoading, showLoading } from "../redux/alertsSlice"

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/login", values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        navigate("/")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
  }

  return (
    <div
      className="authentication"
      style={{
        backgroundImage: `url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dlogin%2Bbackground&psig=AOvVaw3BgoJqeyBcyI29cDPQR8k-&ust=1677483723034000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOi1zfzXsv0CFQAAAAAdAAAAABAE")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="authentication-form card p-3"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
          className="card-title"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          Welcome Back
        </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>

          <Link
            to="/register"
            className="anchor mt-2"
            style={{ display: "block", textAlign: "center" }}
          >
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
