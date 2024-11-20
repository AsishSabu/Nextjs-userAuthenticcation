import React from "react";

const Profile = ({ params }:any) => {
  return (
    <div className="text-center text-3xl">
      Profile <span className="bg-red-800">{params.id}</span>
    </div>
  );
};

export default Profile;
