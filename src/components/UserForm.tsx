import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../store/userSlice";
import { User } from "../store/userSlice";

interface UserFormProps {
  visible: boolean;
  onClose: () => void;
  user?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user,visible]);
  const handleSubmit = () => {
    if (user) {
      console.log('hfbadhsbfhads', user);
      dispatch(updateUser({ id: user.id, name, email }));
    } else {
      dispatch(addUser({ name, email, phone: "123-456-7890" }))
        .unwrap()
        .then(() => {
          console.log("User added successfully");
        })
        .catch((error) => console.error("Error adding user:", error));
    }
    onClose();
  };


  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{user ? "Edit User" : "Add User"}</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{user ? "Update User" : "Add User"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default UserForm;
