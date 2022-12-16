import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useStudentsContext } from '../../hooks/useStudentsContext';

function NilaiModal(props) {

    //handle props
    let dispatchType;
    let dispatchMessage;
    let formTitle;
    let formFinishButtonText;
    let buttonTitle;
    let updateMode;
    let viewMode;
    let buttonType;
    let bodyType;

    switch (props.mode) {
        default:
            case 'update':
                dispatchType = 'UPDATE_STUDENT';
                dispatchMessage = 'student updated';
                formTitle = 'Edit';
                formFinishButtonText = 'Save';
                buttonTitle = 'Edit';
                updateMode = true;
                viewMode = false;
                buttonType = 'nilai-edit-button';
                bodyType = 'nilai-edit-body'
                break;
            case 'view':
                dispatchType = 'SET_STUDENTS';
                dispatchMessage = 'view student';
                formTitle = 'View';
                formFinishButtonText = 'Close';
                buttonTitle = 'View';
                updateMode = false;
                viewMode = true;
                buttonType = 'nilai-view-button';
                bodyType = 'nilai-view-body'
                break;
    }
}

export default NilaiModal