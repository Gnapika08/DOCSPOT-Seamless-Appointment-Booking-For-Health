// React Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Formik Imports
import { Form, Formik } from "formik";
// MUI Imports
import { Button, Box, Typography } from "@mui/material";
// Custom Imports
import { SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Validation Schema
import { loginSchema } from "./components/validationSchema";
// Utils
import { onKeyDown } from "../../utils";
// Assets
import BottomLogo from "../../assets/images/bottomLogo.svg";
import BackgroundImage from "../../assets/images/photo1.png";
// Redux
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const user = await loginUser(payload);
      if (user?.data?.status) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/");
      }
      if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
        {/* Bottom Logo */}
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            right: "-175px",
            "@media (max-width: 576px)": { display: "none" },
          }}
        >
          <img
            src={BottomLogo}
            alt="bottom logo"
            style={{ transform: "rotate(-6deg)", height: "200px" }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            "@media (max-width: 768px)": { flexDirection: "column-reverse" },
          }}
        >
          {/* Left (Form) */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "0 100px",
                "@media (min-width: 1500px)": { padding: "0 50px", width: "550px" },
                "@media (min-width: 768px) and (max-width: 991px)": { padding: "0 45px" },
                "@media (min-width: 576px) and (max-width: 767px)": { padding: "0 50px", width: "550px" },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* Updated Heading */}
                <Typography
                  variant="h4"
                  sx={{
                    color: "#ace1a5",
                    fontWeight: "bold",
                    mb: 1,
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  DocSpot
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#333",
                    fontSize: "18px",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  Seamless Appointment Booking For Health
                </Typography>

                <Formik
                  initialValues={formValues}
                  onSubmit={(values) => LoginHandler(values)}
                  validationSchema={loginSchema}
                >
                  {(props) => {
                    const { values, touched, errors, handleBlur, handleChange } = props;

                    return (
                      <Form onKeyDown={onKeyDown}>
                        <Box sx={{ height: "95px", marginTop: "20px" }}>
                          <SubHeading sx={{ marginBottom: "5px", color: "black" }}>Email</SubHeading>
                          <PrimaryInput
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            helperText={errors.email && touched.email ? errors.email : ""}
                            error={errors.email && touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>

                        <Box sx={{ height: "95px" }}>
                          <SubHeading sx={{ marginBottom: "5px", color: "black" }}>Password</SubHeading>
                          <PrimaryInput
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            helperText={errors.password && touched.password ? errors.password : ""}
                            error={errors.password && touched.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={hideShowPassword}
                            endAdornment={
                              showPassword ? <AiOutlineEye color="disabled" /> : <AiOutlineEyeInvisible color="disabled" />
                            }
                          />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                          <Typography sx={{ color: "black", fontSize: "15px" }}>
                            New here?{" "}
                            <Link
                              to="/signup"
                              style={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
                            >
                              Create a new account
                            </Link>
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                              padding: "5px 30px",
                              textTransform: "capitalize",
                              margin: "20px 0",
                            }}
                          >
                            {isLoading ? "Login..." : "Login"}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          </Box>

          {/* Right (Image) */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", margin: "0 auto" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "black",
                }}
              >
                <SubHeading
                  sx={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontSize: "17px",
                  }}
                >
                  {/* Empty or future use */}
                </SubHeading>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Login;
