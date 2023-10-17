const PROJECT_ID = "mz8a2prm8ug0";

export const getHeaderWithProjectId = () => {
  return {
    headers: { projectId: PROJECT_ID },
  };
};

export const getToken = () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const getAuthHeaderConfig = () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: PROJECT_ID,
      },
    };
  } else {
    return {
      error: "user not logged in",
    };
  }
};
