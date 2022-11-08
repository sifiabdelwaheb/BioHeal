import React from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import IntlMessages from '../../helpers/IntlMessages';
import Classes from './style.module.css';

const AddNewModal = (props) => {
  const pathname = window.location.pathname;
  return (
    <Modal
      isOpen={props.modalOpen}
      toggle={props.toggleModal}
      className={Classes.Modalregister}
      backdrop='static'>
      <ModalHeader className='text-success' toggle={props.toggleModal}>
        {props.modaltitle}
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button
          style={{
            backgroundColor: '#223620',
            borderColor: '#223620',
            borderRaduis: '20px',
          }}
          onClick={props.toggleModal}>
          <IntlMessages id='cancel' />
        </Button>
        <Button
          style={{ backgroundColor: '#223620', borderColor: '#223620' }}
          onClick={props.onSubmitForm}>
          <IntlMessages id='submit' />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
