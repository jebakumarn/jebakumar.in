export interface Skill {
  name: string;
  percent: number;
}

export const skills: Skill[] = [
  { name: "Designing Networking Topology", percent: 95 },
  { name: "Switching and Routing", percent: 75 },
  { name: "L2-L3 Protocols: 802.1Q, 802.3, 802.11", percent: 85 },
  { name: "L2-L3 Protocols: MAC, ARP, 802.1x, STP", percent: 95 },
  { name: "L2-L3 Protocols:IP, ICMP, Routing - RIP, OSPF", percent: 60 },
  { name: "L4-L7 Protocols: TCP, UDP, DHCP, DNS, FTP, HTTP, SNMP", percent: 80 },
  { name: "L4-L7 Protocols: LDAP, TACACS+, Radius (EAP)", percent: 70 },
  { name: "WiFi - 802.11 Enterprise & Commercial (a/b/g/n/ac)", percent: 65 },
  { name: "Traffic Generator: IXIA Veriwave, Chariot, scapy", percent: 60 },
  { name: "Traffic Generator: iPerf, neper, Netperf", percent: 85 },
  { name: "Packet Analysis Tool: Wireshark, tcpdump", percent: 50 },
  { name: "Apps: hping, nmcli, ip, ifconfig, netsh", percent: 80 },
  { name: "Software Test life cycle: Agile Methodology", percent: 80 },
  { name: "Quality Control & Quality Analyst", percent: 90 },
  { name: "Software Testing: Functional & Non Functional", percent: 85 },
  { name: "Automation: Linux Bash Shell scripting", percent: 85 },
  { name: "Automation: BATCH & Powershell scripting", percent: 70 },
  { name: "Automation: Python - paramiko, ssl, csv, pyVim, os, subprocess, logging", percent: 85 },
  { name: "JIRA, IBM ClearQuest, ApTest, MS-Office", percent: 80 },
  { name: "Virtualization: ESX, HyperV, KVM, Proxmox, Namespace", percent: 70 },
  { name: "Networking Virtualization: SRIOV, VMDq, VMMq, ENS", percent: 70 },
  { name: "Windows Server: AD, DHCP, DNS, NPS, IIS, CA - Usage for Validation", percent: 50 },
  { name: "Intel Ethernet Product : FNIC, IPU - QA/Validation", percent: 80 },
  { name: "Nvidia Ethernet Product : ConnectX, DPU SmartNIC, DOCA - QA/Validation", percent: 30 },
  { name: "Firewall, Routers, Switches, AP - Deploy/Usage/QA/Validation", percent: 55 },
  { name: "DNS Registar, WEB HOSTING(Apache, Nginx) - Deploy/Usage", percent: 80 },
  { name: "TrueNAS, Nextcloud, Plex - Deploy/Usage", percent: 60 },
  { name: "Vulnerability tools: mdk3, airmon, aireplay - QA", percent: 40 },
  { name: "HTML, CSS, JScript - Deploy/Usage", percent: 55 },
  { name: "Usage of Artificial intelligence (AI) for Browsing, Coding & Development", percent: 80 },
];
