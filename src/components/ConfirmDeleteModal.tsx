/*
 * AdvaHealth Solutions Pty. Ltd. ("AHS") CONFIDENTIAL
 * Copyright (c) 2022 AdvaHealth Solutions Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of AHS. The intellectual and technical concepts contained
 * herein are proprietary to AHS and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from AHS.  Access to the source code contained herein is hereby forbidden to anyone except current AHS employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of AHS. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 */

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
