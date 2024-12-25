import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";

export interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string | JSX.Element;
  loading?: boolean;
  btnConfirmName?: string;
  btnCancelName?: string;
}

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  show,
  onClose,
  title,
  loading,
  btnConfirmName,
  btnCancelName,
}) => {
  return (
    <Modal className="confirm-modal" centered show={show}>
      <Modal.Header>
        <div className="swal2-icon mb-2 swal2-warning swal2-animate-warning-icon" />
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center mb-1">Confirmation</h4>
        <div className="text-center">{title}</div>
      </Modal.Body>
      <Modal.Footer className="flex-center">
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          {btnConfirmName || "Delete"}
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          {btnCancelName || "Cancel"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
