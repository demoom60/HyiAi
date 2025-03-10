import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUsers, deleteUser } from "../store/userSlice";
import UserForm from "../components/UserForm";
import { User } from "../store/userSlice";

const UserListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users ?? { users: [], loading: false });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openAddUserModal = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const openEditUserModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={openAddUserModal}>
        <Text style={styles.addButtonText}>{'+ Add User'}</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `temp-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => openEditUserModal(item)}>
                <Text style={styles.buttonText}>{'Edit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(deleteUser(item.id))}>
                <Text style={styles.buttonText}>{'Delete'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <UserForm visible={modalVisible} onClose={() => setModalVisible(false)} user={selectedUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#ffc107",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserListScreen;
