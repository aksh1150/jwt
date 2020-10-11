export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {
      // return access token if user logged with accesstoken JWT from localstorage
      "x-access-token": user.accessToken,
    };
  } else {
    return {};
  }
}
