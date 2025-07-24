// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/Home";

import EventsListPage from "./pages/Events/EventsList";
import EventDetailsPage from "./pages/Events/EventDetails";
import GalleryListPage from "./pages/Gallery/GalleryList";
import AlbumDetailsPage from "./pages/Gallery/AlbumDetails";
import MembersListPage from "./pages/Members/MembersList";
import MemberProfilePage from "./pages/Members/MemberProfile";
import AnnouncementsListPage from "./pages/Announcements/AnnouncementsList";
import AnnouncementsList from "./pages/Announcements/AnnouncementsList";
import FamilyHub from "./pages/FamilyHub/FamilyHub";
import FamilyPoll from "./pages/FamilyHub/FamilyPoll";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsListPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />{" "}
        {/* Dynamic segment for event ID */}
        <Route path="gallery" element={<GalleryListPage />} />
        <Route path="gallery/:albumId" element={<AlbumDetailsPage />} />{" "}
        {/* Dynamic segment for album ID */}
        <Route path="members" element={<MembersListPage />} />
        <Route path="members/:memberId" element={<MemberProfilePage />} />{" "}
        {/* Dynamic segment for member ID */}
        <Route path="announcements" element={<AnnouncementsListPage />} />
        <Route path="announcements/:id" element={<AnnouncementsList />} />{" "}
        {/* Dynamic segment for announcement ID */}
        <Route path="familyhub" element={<FamilyHub />} />
        <Route path="familypoll/:id" element={<FamilyPoll />} />{" "}
        <Route
          path="*"
          element={
            <div className="text-center p-8 text-xl font-bold">
              404 Not Found
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
