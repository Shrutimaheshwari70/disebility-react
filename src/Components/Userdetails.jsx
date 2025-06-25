import React from "react";
import { useParams } from "react-router-dom";
import ArtCollaborations from "../pages/ArtCollaborations";
import EmployeeStories from "../pages/EmployeeStories";
import SocialTakeover from "../pages/SocialTakeover";
import PodcastSeries from "../pages/PodcastSeries";

function Userdetails() {
  const { name } = useParams();

  const components = {
    ArtCollaborations: <ArtCollaborations />,
    EmployeeStories: <EmployeeStories />,
    SocialTakeover: <SocialTakeover />,
    PodcastSeries: <PodcastSeries />,
  };

  return components[name] || <p style={{ color: "red" }}>404 - Page Not Found</p>;
}

export default Userdetails;
