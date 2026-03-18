import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

type PropsType = {
  title: string;
  hour: string;
  contact: string;
  price: number;
  name: string;
  status: string; //"pending" | "paid" | "canceled" | "confirmed";
};

export default function Card(props: PropsType) {
  const [showOptions, setShowOptions] = useState(false);
  const { title, hour, contact, price, name, status } = props;

  return (
    <View
      style={{
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 10,
        width: "100%",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowOptions((prev) => !prev)}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
            <Text>{hour}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginTop: 5, fontStyle: "italic" }}>{name}</Text>
            <Text style={{ marginTop: 5 }}>{contact}</Text>
          </View>
          <View style={{ marginTop: 10, alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              € {price.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor:
              status === "pending"
                ? "#D7B016"
                : status === "paid"
                  ? "#507cf5"
                  : status === "canceled"
                    ? "#EF5350"
                    : "#4CAF50",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
          >
            {status === "pending"
              ? "Pendente de confirmação"
              : status === "paid"
                ? "Pago"
                : status === "canceled"
                  ? "Cancelado"
                  : "Confirmado"}
          </Text>
        </View>
      </TouchableOpacity>
      {showOptions && status !== "canceled" && status !== "paid" && (
        <View
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: "#eee",
              backgroundColor: "#f0f0f0",
              marginRight: 2,
            }}
            onPress={() => {
              console.log("Ação para:", title);
              Alert.alert(
                "Editar",
                "Funcionalidade de edição em desenvolvimento.",
              );
            }}
          >
            <Text style={{ color: "#000", textAlign: "center" }}>
              <Ionicons name="create" size={16} />
              Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: "#eee",
              backgroundColor: "#f0f0f0",
            }}
            onPress={() => {
              console.log("Ação para:", title);
              Alert.alert(
                "Alterar Estado",
                "Funcionalidade de alteração de estado em desenvolvimento.",
              );
            }}
          >
            <Text style={{ color: "#000", textAlign: "center" }}>
              <Ionicons name="swap-horizontal" size={16} />
              Alterar Estado
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
