import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import { firebaseAuth } from "../utils/FirebaseConfig";
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadCrumbs";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!firebaseAuth.currentUser);

  const userName = useAppSelector(
    (openConverseApp) => openConverseApp.auth.userInfo?.name
  );
  const isDarkTheme = useAppSelector(
    (openConverseApp) => openConverseApp.auth.isDarkTheme
  );
  const [breadCrumbs, setBreadCrumbs] = useState([
    {
      text: "Dashboard",
    },
  ]);
  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    firebaseAuth.signOut();
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("openConverse-theme");
    localStorage.setItem(
      "openConverse-theme",
      theme === "light" ? "dark" : "light"
    );
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to='/'>
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color='white'>Open Converse</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {userName ? (
            <EuiText>
              <h3>
                <EuiTextColor color='white'>Hello, </EuiTextColor>
                <EuiTextColor color='white'>{userName}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent='center'
          alignItems='center'
          direction='row'
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType='sun'
                display='fill'
                size='s'
                color='warning'
                aria-label='theme-button-light'
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType='moon'
                display='fill'
                size='s'
                color='danger'
                aria-label='theme-button-dark'
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiFlexGroup>
              {isLoggedIn ? (
                <EuiButton
                  color='danger'
                  onClick={logout}
                  aria-label='logout-button'
                >
                  Logout
                </EuiButton>
              ) : (
                <EuiButton
                  color='primary'
                  onClick={() => navigate("/login")}
                  aria-label='login-button'
                >
                  Login
                </EuiButton>
              )}
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to='/'>
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color='white'>Open Converse</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent='center'
          alignItems='center'
          direction='row'
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType='sun'
                display='fill'
                size='s'
                color='warning'
                aria-label='theme-button-light'
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType='moon'
                display='fill'
                size='s'
                color='danger'
                aria-label='theme-button-dark'
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiText
              onClick={logout}
              size='s'
              title='Logout'
              aria-label='logout-button'
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme='dark'
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  );
}
