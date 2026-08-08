export interface Social {
  label: string;
  href: string;
  icon: string; // Font Awesome class e.g. "fab fa-github"
}

export interface Profile {
  name: string;
  subtitle: string;
  bio: string[];
  resume: string;
  image: string;
  socials: Social[];
}

export const profile: Profile = {
  name: "Jebakumar",
  subtitle:
    "MTS Software System Design Engineer @ AMD | EX-Intel, EX-SonicWall | Ethernet & Wireless Networking | Building Scalable Data Center Systems | Educator",
  bio: [
    "Hello! Hi, I'm Jebakumar Govindaswamy. feel free to call me JEBA",
    "Here is a quick and little overview about me.",
    "I am a dedicated IT professional with over {{EXPERIENCE}} of experience in the field, passionate about solving problems in simple and efficient ways. With a strong foundation in Information Technology, I completed my undergraduate degree in 2014 from Meenakshi College of Engineering, Chennai, Tamil Nadu.",
    "My career journey has been shaped by continuous learning and a genuine enthusiasm for technology. I enjoy staying updated with the latest advancements by reading technical journals and exploring new tools and techniques. I also find joy in sharing knowledge with others, whether through casual discussions or mentoring.",
    "Currently based in Bangalore, Karnataka, India. I balance my professional life with quality time spent with my family. I especially cherish spontaneous outings with my son, which remind me that happiness often comes from life’s simplest moments. I firmly believe that happiness and satisfaction grow when we keep things super simple.",
  ],
  resume: "/assets/docs/Jebakumar_Govindaswamy_Resume.pdf",
  image: "/assets/images/profile.jpg",
  socials: [
    { label: "GitHub", href: "https://github.com/jebakumarn", icon: "fab fa-github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jebakumarg", icon: "fab fa-linkedin" },
    { label: "Email", href: "mailto:jebakumar@gmail.com", icon: "fas fa-envelope" },
    { label: "Phone", href: "tel:+919952235964", icon: "fas fa-mobile-alt" },
    { label: "WhatsApp", href: "https://wa.me/+919952235964", icon: "fab fa-whatsapp" },
  ],
};
