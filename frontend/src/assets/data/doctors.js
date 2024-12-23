import doctorImg01 from "../images/doctor-img01.jpeg";

export const doctors = [
  {
    id: "01", // This can be a MongoDB ObjectId when connected to a database
    name: "Dr. Tejas Narode",
    specialization: "Surgeon",
    avgRating: 4.8,
    totalRating: 272,
    photo: doctorImg01,
    totalPatients: 1500,
    hospital: "Sopan Hospital, Shaha",
    qualifications: ["MBBS", "MS (General Surgery)"],
    experience: [
      "10+ years of experience in surgery",
      "Expert in laparoscopic surgeries",
    ],
    bio: "Dr. Tejas Narode is an experienced surgeon specializing in minimally invasive procedures with a track record of successful surgeries.",
    about:
      "With a commitment to providing the best care to his patients, Dr. Tejas has successfully performed over 1000 surgeries.",
    timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    reviews: [
      {
        user: "Jane Doe",
        rating: 5,
        text: "Excellent doctor, highly recommended!",
      },
      {
        user: "John Smith",
        rating: 4,
        text: "Great experience, would visit again.",
      },
    ],
  },
];
