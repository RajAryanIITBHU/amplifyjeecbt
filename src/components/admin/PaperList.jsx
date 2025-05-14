import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, FileText } from "lucide-react";

const PaperList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with actual API call
  const papers = [
    {
      id: "1",
      title: "JEE Advanced Mock Test 1",
      subject: "Physics",
      duration: 180,
      totalMarks: 100,
      createdAt: "2024-03-15",
      status: "published",
    },
    {
      id: "2",
      title: "JEE Advanced Mock Test 2",
      subject: "Chemistry",
      duration: 180,
      totalMarks: 100,
      createdAt: "2024-03-16",
      status: "draft",
    },
  ];

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Question Papers</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={20} />
          Create New Paper
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Papers List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Total Marks
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Created
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPapers.map((paper) => (
              <tr
                key={paper.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    <span className="font-medium text-gray-800">
                      {paper.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{paper.subject}</td>
                <td className="px-6 py-4 text-gray-600">
                  {paper.duration} mins
                </td>
                <td className="px-6 py-4 text-gray-600">{paper.totalMarks}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paper.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {paper.status.charAt(0).toUpperCase() +
                      paper.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{paper.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaperList;
