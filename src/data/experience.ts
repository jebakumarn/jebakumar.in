/**
 * A bullet is either a plain string, or an object with nested `children` for
 * sub-bullets (and sub-sub-bullets, recursively) — mirrors the résumé's nesting.
 */
export type Bullet = string | { text: string; children?: Bullet[] };

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  mapUrl?: string;
  start: string; // ISO "YYYY-MM" or "YYYY-MM-DD"; "YYYY" if only a year is shown
  end: string | null; // null = present/current
  bullets: Bullet[];
}

export const experience: Experience[] = [
  {
    title: "MTS Software System Design Engineer",
    company: "AMD India Private Limited",
    companyUrl: "https://www.amd.com/",
    location: "Bengaluru, Karnataka, India - 560001",
    mapUrl: "https://maps.app.goo.gl/CnQpBz47n9jpw7GN8",
    start: "2026-05-04",
    end: null,
    bullets: [
      "Designed and executed end-to-end software validation plans for AMD 25G/10G NIC across RHEL, Ubuntu, and Debian, covering 43+ Ethernet features including SR-IOV, MSI-X, TSO/LRO, RSS/RFS, PFC, IEEE 1588 PTP, FEC, VLAN, and ethtool operations.",
      "Built a zero-touch Python-based Ethernet test automation framework generating 70K–170K deterministic test cases with hardware capability gating; deployed via Docker on a dedicated QA server with automated live result ingestion into Grafana dashboards.",
      "Authored and maintained Jama verification criteria for 43+ Ethernet features with full SRS-to-test traceability; automated VC updates via Jama REST API and performed anomaly analysis with gap reports filed as Jira issues.",
      "Analyzed automated test coverage gaps and authored supplementary test cases for per-subcommand setter-path validation.",
      "Developed multi-day Ethernet Software Validation KT materials covering IEEE 802.3 PHY/MAC/LLC stack, driver/firmware architecture, and validation methodology for onboarding new team members.",
    ],
  },
  {
    title: "Driver Validation Engineer",
    company: "Intel Technology India Private Limited",
    companyUrl: "https://www.intel.com/",
    location: "Bengaluru, Karnataka, India - 560103",
    mapUrl: "https://maps.app.goo.gl/K34qinPj3fKR2HQz5",
    start: "2021-11-29",
    end: "2026-04-30",
    bullets: [
      "Performed and Led LAN throughput, IPForwarding, PacketPerSecond, FrameLoss and latency performance validation on Intel Ethernet 700, 700, E2100 Series network adapters across enterprise and virtualization environments.",
      "Developed automation scripts using Shell, PowerShell, and Python for regression performance testing of Intel network adapters. Reduced Manual validation cycles by ~60% and improved stability of performance benchmarking.",
      "Validated and gathered performance metrics for IPDK P4-OVS on Intel Network adapters",
      "Conducted manual performance testing for ESXi and Hyper-V environments focusing on SR-IOV, VMDq/VMMQ, Direct PCIe Assignment, and VxLAN features. Automated ESXi performance testing using Python (sys, os, netmiko, ssh, paramiko, pyVim, pyVmomi), PowerCLI, iperf, netperf, and Bash scripting.",
      "Led comparative benchmark testing and generated performance reports for Intel E800 Series, Broadcom P2100G, AMD Pensando, NVIDIA Mellanox CX5, CX6, and CX7 adapters.",
      "Participated in comparative benchmark performance testing and collected the perf report for Intel E800, E2100 series Network adapter, Nvidia Mellanox CX6, CX7 Adapters",
      {
        text: "Researched and tested Intel IPU Adapter, NVIDIA Bluefield Adapter features including:",
        children: [
          "LAN Throughput and Latency Performance for Host mode and IPU Accelerator Mode",
          {
            text: "Configuring maximum supported P4 rules and validated it via Table Drivern interface for following features:",
            children: ["Simple Exact Match", "Large Exact Match", "Flow Counter"],
          },
        ],
      },
      {
        text: "Validated Intel IPU Lookaside Crypto Engine Performance, Covering:",
        children: [
          "Crypto, Compression & Decompression, Service Chain combinations",
          "DMA Performance across data paths (Host <--> Accelerator)",
        ],
      },
    ],
  },
  {
    title: "Test Engineer",
    company: "SonicWall Technology Systems India Pvt Ltd",
    companyUrl: "https://www.sonicwall.com/",
    location: "Bengaluru, Karnataka, India - 560103",
    mapUrl: "https://maps.app.goo.gl/UtEar6c9xouRQ9SVA",
    start: "2019-04-22",
    end: "2021-11-22",
    bullets: [
      "Designed efficient test topology and bringing up Test environment as per test requirement using multiple firewalls, switches, and access points.",
      "Written and executed 300+ functional and user-acceptance test cases and test scripts for Sonicwall Switch and Sonicwall Access points products prior to release to production.",
      "Executed IXIA Veriwave Enterprise Master plan – Conformance, Interoperability, Performance Test plans on SonicWall Access Points. Automated it using TCL scripting.",
      "Tested Sonicwall GEN6/7 Firewall features like zones, Failover, Load balancing, SFP/SFP+ interfaces, AAA, VPN, High Availability, and policy-based routing.",
      "Reported over 200+ JIRA and worked with developers to identify root cause of issue and resolve it",
      "Engaged internal and external customers during planning and test phases and interfaced with assigned project managers to comply with entry criteria.",
    ],
  },
  {
    title: "Engineer II",
    company: "Qualcomm India Pvt Ltd - CDC (Under Payroll of Zilogic Systems Pvt. Ltd.)",
    companyUrl: "https://www.qualcomm.com/",
    location: "Chennai, Tamil Nadu, India - 600096",
    mapUrl: "https://maps.app.goo.gl/crcbTLTJFkYfdK758",
    start: "2017-12-20",
    end: "2019-03-29",
    bullets: [
      "Configuring and bringing up test bed as per requirement by installing 802.11ad supported WiFi chipsets in OpenWrt, windows, Linux (Ubuntu), Android devices and configuring it in AP/STA mode using hostapd and wpa_supplicant configuration file.",
      "Executing manual and automated script test cases for functionalities like Wireless Association, Traffic in TCP & UDP, QoS, Roaming, Multiple Virtual Access Point, Stability, Ping Latency and IOT. Automating Test scenarios using Qualcomm Internal automation Application and Bash scripting",
      "Reported Bugs and Closely worked with developers to identify root cause and resolve it.",
    ],
  },
  {
    title: "Member of Technical Staff",
    company: "HCL Technologies Ltd.",
    companyUrl: "https://www.hcltech.com/",
    location: "Chennai, Tamil Nadu, India - 603103",
    mapUrl: "https://maps.app.goo.gl/yB92aR9Lcy5Pp63n8",
    start: "2014-10-16",
    end: "2016-11-29",
    bullets: [
      "Analyzing and understanding Functional Requirement Specification Document of product to develop test strategy, test scenarios and test cases.",
      "Installed and configured windows server roles like Active Directory, Network Policy Service, DHCP, DNS and Certificate Authority for testing.",
      "Participating in system walk-through and inspection meetings to understand system operation flows and exposure to agile testing methodologies.",
      "Executed Apple Airprint and Android Mopria automated scripts, concurrent test cases and send successful logs to Apple and Mopria organization to certify product.",
      "Testing MAC-OS X, iOS and Android compatibility by executing more than 100 manual test cases on each product (Xerox MFP/SFP).",
      "Manage team with 4 members. Analyses and provides solution to issues faced by team and completed product testing as per schedule.",
      "Circulate daily and weekly status report to Program Lead and Reporting Manager.",
    ],
  },
];
