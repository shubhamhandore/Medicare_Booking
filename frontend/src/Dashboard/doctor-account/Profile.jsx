/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    // Form Validation: Ensure required fields are filled before submission
    if (!formData.name || !formData.email || !formData.phone || !formData.bio) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Generic add and delete item handler
  const handleAddItem = (key, defaultItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], defaultItem],
    }));
  };

  const handleDeleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  // Generic change handler for nested data like qualifications, experiences, timeSlots
  const handleNestedInputChange = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;

      return { ...prevFormData, [key]: updatedItems };
    });
  };

  const handleAddQualification = () => {
    handleAddItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleDeleteQualification = (index) => {
    handleDeleteItem("qualifications", index);
  };

  const handleAddExperience = () => {
    handleAddItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleDeleteExperience = (index) => {
    handleDeleteItem("experiences", index);
  };

  const handleAddTimeSlot = () => {
    handleAddItem("timeSlots", {
      day: "Sunday",
      startingTime: "10:00",
      endingTime: "04:00",
    });
  };

  const handleDeleteTimeSlot = (index) => {
    handleDeleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
            required
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form_input"
            required
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form_input"
            maxLength={100}
            required
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form_label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
                required
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div>
              <p className="form_label">Fees</p>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form_input"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="mb-5">
          <p className="form_label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("qualifications", index, e)
                    }
                    required
                  />
                </div>

                <div>
                  <p className="form_label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("qualifications", index, e)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Degree</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("qualifications", index, e)
                    }
                  />
                </div>

                <div>
                  <p className="form_label">University*</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("qualifications", index, e)
                    }
                    required
                  />
                </div>
              </div>

              <button
                onClick={() => handleDeleteQualification(index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddQualification}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>

        {/* Experiences Section */}
        <div className="mb-5">
          <p className="form_label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("experiences", index, e)
                    }
                    required
                  />
                </div>

                <div>
                  <p className="form_label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("experiences", index, e)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Position</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("experiences", index, e)
                    }
                  />
                </div>

                <div>
                  <p className="form_label">Hospital*</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("experiences", index, e)
                    }
                    required
                  />
                </div>
              </div>

              <button
                onClick={() => handleDeleteExperience(index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>

        {/* Time Slots Section */}
        <div className="mb-5">
          <p className="form_label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form_label">Day*</p>
                  <select
                    name="day"
                    value={item.day}
                    className="form_input py-3.5"
                    onChange={(e) =>
                      handleNestedInputChange("timeSlots", index, e)
                    }
                    required
                  >
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>

                <div>
                  <p className="form_label">Starting Time*</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("timeSlots", index, e)
                    }
                    required
                  />
                </div>
                <div>
                  <p className="form_label">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    className="form_input"
                    onChange={(e) =>
                      handleNestedInputChange("timeSlots", index, e)
                    }
                    required
                  />
                </div>
                <div
                  onClick={() => handleDeleteTimeSlot(index)}
                  className="flex items-center"
                >
                  <button className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddTimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add TimeSlot
          </button>
        </div>

        {/* About Section */}
        <div className="mb-5">
          <p className="form_label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form_input"
            required
          ></textarea>
        </div>

        {/* Photo Upload Section */}
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 overflow-hidden">
              <img
                src={formData.photo}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </figure>
          )}
          <input
            type="file"
            accept="image/*"
            className="form_input"
            onChange={handleFileInputChange}
          />
        </div>

        {/* Update Profile Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="form_submit_button"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
