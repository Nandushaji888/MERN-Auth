import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl, imageUrl } from "../../config/baseUrl";
import { update } from "../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const [Image, setImage] = useState("");
  const user = useSelector((state) => state.user.user);
  const token = user.token;
  console.log("token", token);

  const [imgId, setImgId] = useState(user);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const submitImage = async () => {
    if (Image) {
      console.log("Image");
      console.log(Image);
      const formData = new FormData();
      formData.append("image", Image);
      formData.append("email", user.email);

      // You can append more fields to the formData object if needed
      // formData.append('field_name', field_value);

      axios
        .post(`${baseUrl}/uploadImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            authorization: token,
          },
        })
        .then((response) => {
          // Handle the response
          dispatch(update(response.data.user, response.data.token));
          setImgId(response.data.user);
          toast.success("File uploaded successfully");
          //   console.log('File uploaded successfully', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("File upload failed", error);
          toast.success("File upload failed");
        });
    }
  };

  const submitHandler=()=> {

  }


  return (
    <>
      <Header />
      <ToastContainer />
      <div className="vh-100">
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      {user && (
                        <MDBCardImage
                          style={{ width: "180px", borderRadius: "10px" }}
                          src={`/${imgId.image}`}
                          alt="Profile pic"
                          fluid
                        />
                      )}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <MDBCardTitle>{user ? user.name : ""}</MDBCardTitle>
                      <MDBCardText>{user ? user.email : ""}</MDBCardText>

                      {Image ? (
                        <img
                          alt="Profile pic"
                          width="35px"
                          height="40px"
                          src={Image ? URL.createObjectURL(Image) : ""}
                        ></img>
                      ) : (
                        ""
                      )}

                      <div className="d-flex pt-1">
                        <div className="custom-file mt-4">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                          />
                          {/* <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                        Add Profile Photo
                                                    </label> */}
                          <span
                            onClick={submitImage}
                            className="btn btn-primary mt-4"
                          >
                            Add
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4 ms-5 mt-5">
                  <h2 style={{ marginLeft: 125 }}>Update </h2>
                  <div className="d-flex text-black ms-5">
                    <div className="flex-grow-1 ms-5 mt-3">
                      <MDBCardText >
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={(e)=>setName(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </MDBCardText>
                      <MDBCardText>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={(e)=>setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </MDBCardText>
                      <MDBCardText>
                        <input
                          type="password"
                          name="password"
                          onChange={(e)=>setPassword(e.target.value)}

                          placeholder="Enter Password"
                        />
                      </MDBCardText>

                      <input
                        type="password"
                        name="confirmPassword"
                        onChange={(e)=>setConfirmPassword(e.target.value)}

                        placeholder="Confirm Password"
                      />
                      <div className="d-flex pt-1">
                        <div className="custom-file mt-4">
                          <span onClick={submitHandler} className="btn btn-primary  ms-5">
                            Submit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer> */}
      </div>
    </>
  );
}
