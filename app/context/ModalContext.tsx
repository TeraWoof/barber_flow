import React, { createContext, useContext, useState } from "react";

// Definimos o que o nosso Context vai partilhar
interface ModalContextData {
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ModalContext.Provider value={{ modalVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useAppointmentModal = () => useContext(ModalContext);
