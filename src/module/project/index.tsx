import { Route, Routes } from "react-router-dom";

import ProjectList from "./view/project-list";
import ProjectCreate from "./view/project-create";
import ProjectDetail from "./view/project-detail";
import ProjectEdit from "./view/project-edit";
import ProjectInsight from "./view/project-insight";

const Projects = () => {
  return (
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path="create" element={<ProjectCreate />} />
      <Route path=":project_id" element={<ProjectDetail />} />
      <Route path=":project_id/edit" element={<ProjectEdit />} />
      <Route path=":project_id/insight" element={<ProjectInsight />} />
    </Routes>
  );
};

export default Projects;
