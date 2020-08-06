import React, {Fragment} from 'react'
import { Modal} from 'antd';

const ModalContainer = ({headerState, setModal}) => {
  const {isOpen} = headerState;

  return (
    <Fragment>
      <Modal
          title="Contact"
          centered
          visible={isOpen}
          onOk={() => setModal(isOpen)}
          onCancel={() => setModal(isOpen)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
    </Fragment>
  )
}

export default ModalContainer;