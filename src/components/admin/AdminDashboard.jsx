"use client"
import React, { useState } from "react";
import PaperList from "./PaperList";
import PaperEditor from "./PaperEditor";
import { LayoutGrid, FileText, Users, Settings } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("papers");

  const renderContent = () => {
    switch (activeTab) {
      case "papers":
        return <PaperList />;
      case "editor":
        return <PaperEditor />;
      default:
        return <PaperList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("papers")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "papers"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid size={20} />
            <span>Question Papers</span>
          </button>

          <button
            onClick={() => setActiveTab("editor")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "editor"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText size={20} />
            <span>Paper Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "students"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users size={20} />
            <span>Students</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
