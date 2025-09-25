"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Slide,
} from "@mui/material";
import { useRouter } from "next/navigation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BlockIcon from "@mui/icons-material/Block";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AdminBreadCrumbs from "@/app/components/Admin/AdminBreadCrumbs";
import BadgeIcon from "@mui/icons-material/Badge"; // For ID Card
import DescriptionIcon from "@mui/icons-material/Description"; // For Appointment Letter
import axios from "axios";
import Image from "next/image";

const roles = [
  "rashtriyapramukh",
  "sahpramukh",
  "sangathanmantri",
  "sahsangathanmantri",
  "koshadhaksh",
  "karyalaysachiv",
  "rashtriyapracharak",
  "sahpracharak",
  "mediaprabhari",
  
  "pradeshprabhari",              // ✅ जोड़ा गया
  "pradeshpramukh",
  "pradeshsahpramukh",
  "pradeshsangathanmantri",
  "pradeshsahsangathanmantri",
  "pradeshkoshadhaksh",
  "pradeshkaryalaysachiv",
  "pradeshpracharak",
  "pradeshsahpracharak",
  "pradeshmediaprabhari",

  "mandalprabhari",               // ✅ जोड़ा गया
  "mandalpramukh",                // यदि हो
  "mandalsangathanmantri",        // यदि हो

  "jilapramukh",
  "sahjilapramukh",
  "jilasangathanmantri",
  "jilasahsangathanmantri",
  "jilakoshadhaksh",
  "jilakaryalaysachiv",
  "jilapracharak",
  "jilasahpracharak",
  "districtmediaprabhari",

  "member"
];


const roleToPadName = {
  rashtriyapramukh: "राष्ट्रीय प्रमुख",
  sahpramukh: "सह प्रमुख",
  sangathanmantri: "संगठन मंत्री",
  sahsangathanmantri: "सह संगठन मंत्री",
  koshadhaksh: "कोषाध्यक्ष",
  karyalaysachiv: "कार्यालय सचिव",
  rashtriyapracharak: "राष्ट्रीय प्रचारक",
  sahpracharak: "सह प्रचारक",
  mediaprabhari: "मीडिया प्रभारी",

  pradeshprabhari: "प्रदेश प्रभारी",                 // ✅ जोड़ा गया
  pradeshpramukh: "प्रदेश प्रमुख",
  pradeshsahpramukh: "प्रदेश सह प्रमुख",
  pradeshsangathanmantri: "प्रदेश संगठन मंत्री",
  pradeshsahsangathanmantri: "प्रदेश सह संगठन मंत्री",
  pradeshkoshadhaksh: "प्रदेश कोषाध्यक्ष",
  pradeshkaryalaysachiv: "प्रदेश कार्यालय सचिव",
  pradeshpracharak: "प्रदेश प्रचारक",
  pradeshsahpracharak: "प्रदेश सह प्रचारक",
  pradeshmediaprabhari: "प्रदेश मीडिया प्रभारी",

  mandalprabhari: "मंडल प्रभारी",                     // ✅ जोड़ा गया
  mandalpramukh: "मंडल प्रमुख",                       // ✅ जोड़ा गया
  mandalsangathanmantri: "मंडल संगठन मंत्री",         // ✅ जोड़ा गया

  jilapramukh: "जिला प्रमुख",
  sahjilapramukh: "सह जिला प्रमुख",
  jilasangathanmantri: "जिला संगठन मंत्री",
  jilasahsangathanmantri: "जिला सह संगठन मंत्री",
  jilakoshadhaksh: "जिला कोषाध्यक्ष",
  jilakaryalaysachiv: "जिला कार्यालय सचिव",
  jilapracharak: "जिला प्रचारक",
  jilasahpracharak: "जिला सह प्रचारक",
  districtmediaprabhari: "जिला मीडिया प्रभारी",

  member: "सदस्य"
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RightGiveRank = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const breadcrumbLinks = [{ label: "Admin", href: "/admin" }];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/admin/getAllDoctors`
        );
        if (response.status === 200) {
          const userData = response.data.data.map((u) => ({
            ...u,
            padKaNaam: roleToPadName[u.role] || "सदस्य",
          }));
          setUsers(userData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);



  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.contact.includes(searchTerm)
  );

 const handleAssign = async () => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/admin/updateUserRole/${selectedUser.userId}`,
      {
        role: newRole,
      }
    );

    console.log('Role updated:', res.data);

    // Update users only after successful response
    const updatedUsers = users.map((u) =>
      u.userId === selectedUser.userId
        ? { ...u, role: newRole, padKaNaam: roleToPadName[newRole] || "सदस्य" }
        : u
    );

    setUsers(updatedUsers);
    setOpenAssignModal(false);
    setSelectedUser(null);
    setNewRole("");
    
    return res.data;
  } catch (error) {
    console.error('Failed to update role:', error.response?.data || error.message);
  }
};


  const handleRemove = async () => {

     try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BaseUrl}/api/auth/admin/updateUserRole/${selectedUser.userId}`,
      {
        role: "member",
      }
    );

    console.log('Role updated:', res.data);
    const updatedUsers = users.map((u) =>
      u.userId === selectedUser.userId
        ? { ...u, role: "member", padKaNaam: "सदस्य" }
        : u
    );
    setUsers(updatedUsers);
    setOpenRemoveModal(false);
    setSelectedUser(null);
     return res.data;
     } catch (error) {
    console.error('Failed to update role:', error.response?.data || error.message);
  }
  };


const router = useRouter();

const handleIDCardIssue = (user) => {
  if (!user) return;
  const encodedData = encodeURIComponent(JSON.stringify(user));
  window.open(`/idcard?data=${encodedData}`, "_blank");
};

const handleAppointmentLetterIssue = (user) => {
  if (!user) return;
  const encodedData = encodeURIComponent(JSON.stringify(user));
  window.open(`/appletterpdf?data=${encodedData}`, "_blank");
};



  return (
    <div className="lg:w-[84%] w-full absolute right-0 min-h-screen bg-gray-100 p-6">
      <div className="py-7">
        <AdminBreadCrumbs links={breadcrumbLinks} name="पद" />
      </div>

      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
        <PersonSearchIcon fontSize="large" /> पद प्रबंधन
      </h2>

      <TextField
        fullWidth
        variant="outlined"
        label="नाम या संपर्क खोजें"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-custom-maroon text-gray-900">
            <tr>
              <th className="px-4 py-3">नाम</th>
              <th className="px-4 py-3">संपर्क</th>
              <th className="px-4 py-3">पद</th>
              <th className="px-4 py-3">कार्रवाई</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-900">
                  कोई उपयोगकर्ता नहीं मिला
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.userId}
                  className="border-b text-gray-900 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-semibold flex items-center gap-2">
                    <Avatar
                      src={user.dpUrl || "/default-avatar.png"} // fallback if dp not found
                      alt={user.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    {user.name}
                  </td>
                  <td className="px-4 py-3 font-semibold">{user.name}</td>
                  <td className="px-4 py-3">{user.contact}</td>
                  <td className="px-4 py-3">{user.padKaNaam || "सदस्य"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<EmojiEventsIcon />}
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenAssignModal(true);
                        setNewRole(user.role);
                      }}
                    >
                      पद दें
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<BlockIcon />}
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenRemoveModal(true);
                      }}
                    >
                      पद से मुक्त करें
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<BadgeIcon />}
                      onClick={() => handleIDCardIssue(user)}
                    >
                      आईडी कार्ड जारी करें
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DescriptionIcon />}
                      onClick={() => handleAppointmentLetterIssue(user)}
                    >
                      नियुक्ति पत्र जारी करें
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      <Dialog
        open={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="flex items-center gap-2 text-blue-700">
            <EmojiEventsIcon />
            <span>पद दें - {selectedUser?.name}</span>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <InputLabel>पद चुनें</InputLabel>
            <Select
              value={newRole}
              label="पद चुनें"
              onChange={(e) => setNewRole(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {roleToPadName[role] || role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignModal(false)}>रद्द करें</Button>
          <Button
            onClick={handleAssign}
            variant="contained"
            startIcon={<CheckCircleIcon />}
            color="success"
          >
            पुष्टि करें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Modal */}
      <Dialog
        open={openRemoveModal}
        onClose={() => setOpenRemoveModal(false)}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <div className="flex items-center gap-2 text-red-600">
            <WarningAmberIcon />
            <span>पद से मुक्त करें - {selectedUser?.name}</span>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            क्या आप वाकई {selectedUser?.name} को उसके पद से मुक्त करना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveModal(false)}>रद्द करें</Button>
          <Button
            onClick={handleRemove}
            variant="contained"
            color="error"
            startIcon={<BlockIcon />}
          >
            मुक्त करें
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RightGiveRank;
