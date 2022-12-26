export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}
export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
export async function register(email, username, password) {
  // const result = await request("api/auth/local/register", {
  //   method: "POST",
  //   auth: false,
  //   body: {
  //     email,
  //     username,
  //     password,
  //     name: username,
  //   },
  // });
  const getData = await new Promise((res, rej) => {
    setTimeout(() => {
      res(() => {
        return {
          jwt: Math.random(),
          user: {
            avatar: null,
            blocked: false,
            confirmed: true,
            createdAt: new Date(),
            email: email,
            gender: null,
            id: Math.random(),
            intro: null,
            mobilePhone: null,
            name: username || null,
            provider: "local",
            updatedAt: new Date(),
            username: username || null,
            website: null,
          },
        };
      });
    }, 1000);
  });

  const result = getData();
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}
export async function login(email, password) {
  const getData = await new Promise((res, rej) => {
    setTimeout(() => {
      res(() => {
        return {
          jwt: Math.random(),
          user: {
            avatar: null,
            blocked: false,
            confirmed: true,
            createdAt: new Date(),
            email: email,
            gender: null,
            id: Math.random(),
            intro: null,
            mobilePhone: null,
            provider: "local",
            updatedAt: new Date(),
            website: null,
          },
        };
      });
    }, 1000);
  });

  const result = getData();
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}
