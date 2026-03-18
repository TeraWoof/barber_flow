import React, { createContext, useContext, useState } from "react";

interface ContextData {
  modalVisible: boolean;
  appointmentModal: boolean;
  statusModal: boolean;
  openAppointment: () => void;
  closeAppointment: () => void;
  openStatus: () => void;
  closeStatus: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const AppContext = createContext<ContextData>({} as ContextData);

export const useAppContext = () => useContext(AppContext);
// context/AppContext.tsx
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const openStatus = () => {
    setStatusModal(true);
  };
  const closeStatus = () => {
    setStatusModal(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);
  const openAppointment = () => setAppointmentModal(true);
  const closeAppointment = () => setAppointmentModal(false);

  return (
    <AppContext.Provider
      value={{
        modalVisible,
        appointmentModal,
        statusModal,
        openStatus,
        closeStatus,
        openModal,
        closeModal,
        openAppointment,
        closeAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
