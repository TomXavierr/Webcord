import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
const ChangePasswordModal = ({ isOpen, onCancel, onPasswordChange }) => {
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const [errors, setErrors] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      // Update password data
      setPasswordData({
        ...passwordData,
        [name]: value,
      });
  
      // Validate password with regex
      if (name === "newPassword" || name === "confirmPassword") {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        const isValid = regex.test(value);
  
        if (!isValid) {
          setErrors({
            ...errors,
            [name]: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
          });
        } else {
          setErrors({
            ...errors,
            [name]: "",
          });
        }
      }
    };
  
    const handleSave = () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match.",
        });
        return;
      }
   
      onPasswordChange(passwordData.currentPassword, passwordData.newPassword,passwordData.confirmPassword);

      onCancel();
    };
  
    const handleClose = () => {
      onCancel();
    };
  
    return (
        
      <Dialog open={isOpen} onClose={onCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            variant="outlined"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handleChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ChangePasswordModal;