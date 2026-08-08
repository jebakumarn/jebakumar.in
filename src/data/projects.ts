export interface Project {
  title: string;
  image: string;
  link: string;
}

// Displayed most-recent-first (Project15 → Project1), matching the source order.
// `link` values are "#" placeholders today, exactly as on the legacy site.
export const projects: Project[] = [
  {
    title:
      "High-Performance Network Benchmarking on Windows HyperV using Intel 100GbE NICs",
    image: "/assets/Project15-Intel-FNIC-E800-Virt-HyperV/Intel_Win_HyperV.png",
    link: "#",
  },
  {
    title:
      "Intel E800 series Throughput and Resource Utilization Profiling in Linux KVM Environments",
    image: "/assets/Project14-Intel-FNIC-E800-Virt-KVM/Intel_Linux_KVM.png",
    link: "#",
  },
  {
    title:
      "Intel Virtualized Ethernet Adapter Performance Evaluation on VMWare ESXi linux VMs",
    image: "/assets/Project13-Intel-FNIC-E800-Virt-ESX/Intel_ESX.png",
    link: "#",
  },
  {
    title:
      "Automated Rule Management and Rule Insert/Deletion Time Analysis on Intel IPU using P4",
    image: "/assets/Project12-Intel-IPU-TDI/Intel_IPU_P4_Process.png",
    link: "#",
  },
  {
    title: "Scalable Traffic and Latency Analysis on Intel Adapter using IPDK",
    image: "/assets/Project11-Intel-IPU-IPDK/Eth_92_IPDK.png",
    link: "#",
  },
  {
    title:
      "Intel IPU Host/Accelerator Mode LAN Performance Testing with iPerf, Netperf, Neper",
    image: "/assets/Project10-Intel-IPU-LAN/Intel-IPU-LAN.png",
    link: "#",
  },
  {
    title:
      "LAN Throughput and Latency Benchmarking on Intel E700 Series Adapter + HPC Datacenter Systems",
    image: "/assets/Project9-Intel-FNIC-E700-LAN/Eth_95_Intel-700-LAN-Perf.jpeg",
    link: "#",
  },
  {
    title:
      "LAN Throughput and Latency Benchmarking on Intel E800 Series Adapter + HPC Datacenter Systems",
    image: "/assets/Project8-Intel-FNIC-E800-LAN/Eth_94_Intel_E800-LAN-Perf.jpg",
    link: "#",
  },
  {
    title:
      "Test Bed Design and L2 Feature Validation of SonicWall Switches Across Standalone, Integrated, and Cloud Modes",
    image: "/assets/Project7-Sonicwall-Switch/Eth_96_SonicSwitch.png",
    link: "#",
  },
  {
    title:
      "Firewall and Switch Feature Validation: HA, WAN Failover, Load Balancing, NAT, PBR, and Auth Testing",
    image: "/assets/Project6-Sonicwall-Firewall/Eth_96_SonicOs.png",
    link: "#",
  },
  {
    title:
      "Wifi Feature Validation, Performance Testing, and IDS/IPS for SonicWall APs using IXIA, iPerf and Kali Linux",
    image: "/assets/Project5-Sonicwall-Wireless/Wifi_97_SonicWave.png",
    link: "#",
  },
  {
    title:
      "Configuring Wifi Test bed with 802.11ad Qualcomm OpenWrt, tested Association, Traffic, Roaming, QoS, and Stability",
    image: "/assets/Project4-Qualcomm-11AD/Wifi_98_11ad.png",
    link: "#",
  },
  {
    title:
      "Secure Printer Connectivity Testing with IPv4/IPv6, TLS, Port Security, Dot1X, FTP, DHCP, DNS, PKI, and Certificate Management",
    image: "/assets/Project3-HCL-Xerox-CK2.0/Eth_98_CK20.png",
    link: "#",
  },
  {
    title:
      "Test Strategy & Functional Validation of Wireless Printer Adapter with L2, TCP/IP, PKI & Web UI Testing",
    image: "/assets/Project2-HCL-Xerox-Toro/Wifi_99_xerox_wpsa.png",
    link: "#",
  },
  {
    title:
      "Isolated MFP/SFP printer network Setup and Protocol Compatibility Testing of Bonjour, IPP, HTTP/HTTPS on Windows & iOS",
    image: "/assets/Project1-HCL-Xerox-CK1.0/Eth_99_CK10.png",
    link: "#",
  },
];
