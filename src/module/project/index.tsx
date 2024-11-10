import { Route, Routes } from "react-router-dom";

import NotFound from "@components/errors/not-found";
import ProjectCreate from "./view/project-create";
import ProjectDetail from "./view/project-detail";
import ProjectInsight from "./view/project-insight";
import ProjectList from "./view/project-list";

const Projects = () => {
  return (
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path="create" element={<ProjectCreate />} />
      <Route path=":project_id" element={<ProjectDetail />} />
      <Route path=":project_id/insight" element={<ProjectInsight />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Projects
