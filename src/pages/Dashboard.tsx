import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { To, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { setUser } from "../app/slices/AuthSlice";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthCheck = (path: To) => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email || "",
            name: currentUser.displayName || "",
          })
        );
        navigate(path);
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent='center'
          alignItems='center'
          style={{ margin: "5vh 10vw" }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard1} alt='icon' size='5rem' />}
              title={`Create Meeting`}
              description='Create a new meeting and invite people.'
              onClick={() => handleAuthCheck("/create")}
              paddingSize='xl'
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              style={{ height: 250 }}
              icon={
                <EuiImage
                  src={dashboard2}
                  alt='icon'
                  size='100%'
                  style={{ height: 100 }}
                />
              }
              title={`My Meetings`}
              description='View your created meetings.'
              onClick={() => handleAuthCheck("/mymeetings")}
              paddingSize='xl'
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard3} alt='icon' size='5rem' />}
              title={`Meetings`}
              description='View the meetings that you are invited to.'
              onClick={() => handleAuthCheck("/meetings")}
              paddingSize='xl'
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

export default Dashboard;
