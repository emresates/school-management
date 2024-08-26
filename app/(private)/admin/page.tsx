import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-2/3">
        <div className="flexicjb flex-wrap gap-lg">
          <UserCard type="students" />
          <UserCard type="teachers" />
          <UserCard type="parents" />
          <UserCard type="staffs" />
        </div>
      </div>

      <div className="w-1/3">right</div>
    </div>
  );
};

export default AdminPage;
