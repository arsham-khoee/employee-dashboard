import { Box, Modal } from "@mui/material"

function TheModal({ isModalOpen, setIsModalOpen, children }) {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Modal>
  )
}

export default TheModal
