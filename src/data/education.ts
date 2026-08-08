export interface Education {
  degree: string;
  institution: string;
  location?: string;
  start?: string;
  end?: string;
  details?: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Technology - Information Technology",
    institution: "Meenakshi College Of Engineering",
    location: "K. K. Nagar, Chennai, Tamil Nadu 600078",
    start: "2010",
    end: "2014",
    details: "CGPA -7.23",
  },
  {
    degree: "Grade 11 & 12 (HSC - Higher Secondary)",
    institution: "Sri Vijay Vidyalaya Matric Higher Secondary School",
    location: "Gandhi Nagar, Dharmapuri, Tamil Nadu 636701",
    start: "2008",
    end: "2010",
    details: "Score - 86.9%",
  },
  {
    degree: "Grade 6 --> Grade 10 (SSLC -Secondary School)",
    institution: "National Matric Higher Secondary School",
    location: "varattampatti, Kaveripattinam, Krishnagiri, Tamil Nadu India - 635106",
    start: "2003",
    end: "2008",
    details: "Score - 89.8%",
  },
  {
    degree: "Kinder Garden --> Grade 5",
    institution: "National Matriculation School",
    location: "Paiyur, Tamil Nadu India - 635112",
    start: "1997",
    end: "2003",
  },
];
