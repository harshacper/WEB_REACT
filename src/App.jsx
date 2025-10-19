import React, { useState, useEffect } from "react";
import { User, Plus, Edit2, Trash2, Home, Users, Search, X } from "lucide-react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const API_URL = "http://127.0.0.1:5000/notes";

  // Fetch all students
  const fetchStudents = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  useEffect(() => {
    if (currentPage === "students") {
      fetchStudents();
    }
  }, [currentPage]);

  // Add new student
  const addStudent = () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    const data = { name: name.trim() };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setName("");
        setShowAddForm(false);
        fetchStudents();
        alert("Student added successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to add student");
      });
  };

  // Update student
  const updateStudent = (id) => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    const data = { name: name.trim() };

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setName("");
        setEditingId(null);
        fetchStudents();
        alert("Student updated successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to update student");
      });
  };

  // Delete student
  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          fetchStudents();
          alert("Student deleted successfully!");
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Failed to delete student");
        });
    }
  };

  // Start editing
  const startEdit = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setShowAddForm(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setShowAddForm(false);
  };

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Student Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your student records efficiently and effectively
          </p>
          <button
            onClick={() => setCurrentPage("students")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 text-lg font-semibold shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Plus className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add Students
            </h3>
            <p className="text-gray-600">
              Easily add new student records to your database with a simple form
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Edit2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Edit Records
            </h3>
            <p className="text-gray-600">
              Update student information quickly and maintain accurate records
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              View All Students
            </h3>
            <p className="text-gray-600">
              Browse through all student records with search and filter options
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            System Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">✓</div>
              <p className="text-gray-600">Easy to Use</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">⚡</div>
              <p className="text-gray-600">Fast Performance</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">🔒</div>
              <p className="text-gray-600">Secure Data</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">📱</div>
              <p className="text-gray-600">Responsive Design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Students Page Component
  const StudentsPage = () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Student Records
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all student information
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-md"
            >
              <Plus size={20} />
              Add New Student
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Student" : "Add New Student"}
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    editingId ? updateStudent(editingId) : addStudent();
                  }
                }}
              />
              <button
                onClick={() =>
                  editingId ? updateStudent(editingId) : addStudent()
                }
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
              >
                {editingId ? "Update" : "Add"}
              </button>
              {(editingId || showAddForm) && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-all duration-200"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students by name..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              All Students ({filteredStudents.length})
            </h2>
          </div>
          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <User className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">
                {searchTerm
                  ? "No students found matching your search"
                  : "No students added yet. Click 'Add New Student' to get started!"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <User className="text-indigo-600" size={20} />
                          </div>
                          <span className="font-medium text-gray-800">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.created_at
                          ? new Date(student.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => startEdit(student)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all mr-2"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <User className="text-indigo-600" size={28} />
              <span className="text-xl font-bold text-gray-800">
                Student Portal
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage("home")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === "home"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home size={20} />
                Home
              </button>
              <button
                onClick={() => setCurrentPage("students")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === "students"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users size={20} />
                Students
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "home" ? <HomePage /> : <StudentsPage />}
    </div>
  );
}

export default App;