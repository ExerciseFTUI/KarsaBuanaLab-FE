'use client'

import React, {useState} from 'react'

import { Stepper} from 'react-form-stepper';

interface ClientStepperProps {
  steps: { label: string }[];
  activeStep: number;
}

const ClientStepper: React.FC<ClientStepperProps> = (props) => {
    return (
        <Stepper 
        { ...props }
        connectorStateColors={true}
        styleConfig={{
            activeBgColor: '#333d29',
            activeTextColor: '#EDECF2',
            completedBgColor: '#333d29',
            completedTextColor: '#EDECF2',
            inactiveBgColor: '#333d29',
            inactiveTextColor: '#EDECF2',
            size: '3em',
            circleFontSize: '1.25rem',
            labelFontSize: '1rem',
            borderRadius: '50%',
            fontWeight: 500,
        }} 
        connectorStyleConfig={{
            disabledColor: '#AEADB2', 
            activeColor: '#333d29', 
            completedColor: '#333d29', 
            size: 10, 
            stepSize: '3em', 
            style: 'dotted',     
        }}/>
    )
}

export default ClientStepper