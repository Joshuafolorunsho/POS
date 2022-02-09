import { useState } from "react";

const useModal = () => {
   const [showModal, setShowModal] = useState(false);
   const [showModalTwo, setShowModalTwo] = useState(false);

   const openModal = () => {
      setShowModal(true);
   };
   const closeModal = () => {
      setShowModal(false);
   };

   const openModalTwo = () => setShowModalTwo(true);
   const closeModalTwo = () => setShowModalTwo(false);

   return {
      showModal,
      showModalTwo,
      openModal,
      openModalTwo,
      closeModal,
      closeModalTwo,
   };
};

export default useModal;
