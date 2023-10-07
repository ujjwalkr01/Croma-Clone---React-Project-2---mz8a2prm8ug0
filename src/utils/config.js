const PROJECT_ID = "mz8a2prm8ug0";

export const getHeaderWithProjectId = () => {
  return {
    headers: { projectId: PROJECT_ID },
  };
};
