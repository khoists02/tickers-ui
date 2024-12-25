
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalTitle, ModalHeader } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  body?: JSX.Element | string;
  centered?: boolean;
  children?: JSX.Element[] | JSX.Element;
  size?: "sm" | "lg" | "xl";
  type?: "warning" | "danger" | "info";
  loading?: boolean;
  disabled?: boolean;
  fullSize?: boolean;
}

export interface FormModalProps extends ModalProps {
  header: {
    text: string;
    iconClass?: string;
    props?: typeof ModalHeader;
    titleProps?: typeof ModalTitle;
  };
  dialogClassName?: string;
  onClose: () => void;
  confirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancel?: () => void;
  confirmBtnName?: string;
  cancelBtnName?: string;
  confirmBtnVariant?: string;
  cancelBtnVariant?: string;
  closeButton?: boolean;
  isShowConfirmBtn?: boolean;
}

export const FormModal: FC<FormModalProps> = (props: FormModalProps) => {
  const {
    header,
    body,
    children,
    confirmBtnName,
    cancelBtnName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading,
    confirmBtnVariant,
    cancelBtnVariant,
    disabled,
    closeButton,
    onClose,
    confirm,
    cancel,
    isShowConfirmBtn = true,
    centered = true,
  } = props;
  const wrapper = React.createRef<HTMLDivElement>();
  return (
    <Modal
      {...props}
      className="simple-modal"
      onHide={onClose}
      centered={centered}
    >
      <Modal.Header
        {...header.props}
        onHide={onClose}
        closeButton={closeButton}
      >
        <Modal.Title {...header.titleProps}>
          {header.iconClass && (
            <i
              className={header.iconClass}
              style={{ padding: "4px 8px", fontSize: "50px" }}
            />
          )}
          <div className="header-wrapper">{header.text}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body && (
          <p
            className="mb-3 font-size-lg text-center"
            style={{ fontSize: "0.875rem" }}
          >
            {body}
          </p>
        )}
        <div className="wrapper" ref={wrapper}>
          {children}
        </div>
      </Modal.Body>
      <Modal.Footer className="pb-3">
        {cancel && (
          <Button
            variant={cancelBtnVariant || "light"}
            onClick={cancel}
            // eslint-disable-next-line react/no-array-index-key
            key={new Date().getMilliseconds() + Math.random()}
            className="ladda-button btn btn-primary btn-ladda btn-ladda-spinner btn-light"
          >
            {cancelBtnName || "Cancel"}
          </Button>
        )}
        {confirm && isShowConfirmBtn && (
          <button
            key={new Date().getMilliseconds() + Math.random()}
            type="button"
            disabled={disabled}
            className={`btn ${confirmBtnVariant ? `btn-${confirmBtnVariant}` : "primary"
              } ml-2`}
            onClick={(e) => {
              confirm(e);
            }}
          >
            {confirmBtnName || "Submit"}
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
