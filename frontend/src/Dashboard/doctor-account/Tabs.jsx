/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage mobile menu state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Handle delete account modal

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleDeleteAccount = () => {
    // Implement logic for deleting account
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  const confirmDeleteAccount = () => {
    // Add actual account deletion logic here
    console.log("Account deleted!");
    setIsDeleteModalOpen(false);
    handleLogout();
  };

  const cancelDeleteAccount = () => {
    setIsDeleteModalOpen(false);
  };

  const renderButtonClass = (activeTab) => {
    return `${
      tab === activeTab
        ? "bg-indigo-100 text-primaryColor"
        : "bg-transparent text-headingColor"
    } w-full btn mt-0 rounded-md`;
  };

  return (
    <div>
      {/* Menu Icon for Mobile */}
      <span className="lg:hidden">
        <BiMenu
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-6 h-6 cursor-pointer"
        />
      </span>

      {/* Sidebar for Larger Screens */}
      <div
        className={`hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md`}
      >
        <button
          onClick={() => setTab("overview")}
          className={renderButtonClass("overview")}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={renderButtonClass("appointments")}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={renderButtonClass("settings")}
        >
          Profile
        </button>

        {/* Logout and Delete Account Buttons */}
        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Mobile Menu (Optional) */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col bg-white shadow-panelShadow items-center rounded-md mt-4 p-5">
          <button
            onClick={() => setTab("overview")}
            className={renderButtonClass("overview")}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("appointments")}
            className={renderButtonClass("appointments")}
          >
            Appointments
          </button>
          <button
            onClick={() => setTab("settings")}
            className={renderButtonClass("settings")}
          >
            Profile
          </button>
          <div className="mt-4 w-full">
            <button
              onClick={handleLogout}
              className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-4 text-sm text-gray-600">
              This action cannot be undone. Are you sure you want to delete your
              account?
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
