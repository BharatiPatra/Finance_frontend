"use client";

import React from "react";
import { Card } from "@/components/ui/card"; // Adjust the import path as needed
import { Avatar } from "@/components/ui/avatar"; // Assuming you have an Avatar component
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
  netWorth: string;
}

interface TeamMembersProps {
  members: UserProfile[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const getUserInitials = (name: string) =>
    name
      .split(" ")
      .map((n: string) => n[0])
      .join("");

  return (
    <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Team Members</h3>
        <p className="text-sm text-gray-600">Financial advisory team</p>
      </div>

      <div className="space-y-4">
        {members.map((user, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="relative">
              <Avatar
                src={user.avatar}
                fallback={getUserInitials(user.name)}
                className="h-10 w-10"
              />

              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                  user.status
                )}`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {user.netWorth}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamMembers;
