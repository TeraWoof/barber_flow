import { useAppContext } from "@/app/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
const states = {
  pending: "Pendente",
  paid: "Pago",
  canceled: "Cancelado",
  confirmed: "Confirmado",
};

export const StatusModal = () => {
  const { closeStatus, statusModal } = useAppContext();
  return (
    <Modal animationType="slide" transparent={true} visible={statusModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => closeStatus()}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Status da Marcação</Text>
          </View>
          <View>
            <Text style={styles.modalText}>Estado atual: Confirmado</Text>
            <Text>Alterar estado para:</Text>
            {Object.keys(states).map((key) => {
              if (key === "pending") {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D7B016",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => closeStatus()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      key={key}
                    >
                      {states[key]}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (key === "paid") {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#507cf5",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => closeStatus()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      key={key}
                    >
                      {states[key]}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (key === "canceled") {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EF5350",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => closeStatus()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      key={key}
                    >
                      {states[key]}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (key === "confirmed") {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4CAF50",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => closeStatus()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      key={key}
                    >
                      {states[key]}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (key === "confirmed") {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4CAF50",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => closeStatus()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      key={key}
                    >
                      {states[key]}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};
