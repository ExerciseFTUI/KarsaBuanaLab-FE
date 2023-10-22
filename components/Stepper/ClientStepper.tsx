'use client'

import React from 'react'

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
            activeBgColor: '#333d29', // Warna latar belakang langkah aktif
            activeTextColor: '#EDECF2', // Warna teks langkah aktif
            completedBgColor: '#333d29', // Warna latar belakang langkah yang telah selesai
            completedTextColor: '#EDECF2', // Warna teks langkah yang telah selesai
            inactiveBgColor: '#333d29', // Warna latar belakang langkah yang belum aktif
            inactiveTextColor: '#EDECF2', // Warna teks langkah yang belum aktif
            size: '3em', // Ukuran langkah
            circleFontSize: '1.25rem', // Ukuran font isi langkah
            labelFontSize: '1rem', // Ukuran font label langkah
            borderRadius: '50%', // Radius sudut langkah
            fontWeight: 500, // Ketebalan huruf label langkah
        }} 
        connectorStyleConfig={{
            disabledColor: '#AEADB2', // Warna connector ketika dinonaktifkan
            activeColor: '#333d29', // Warna connector aktif
            completedColor: '#333d29', // Warna connector yang telah selesai
            size: 10, // Ketebalan connector
            stepSize: '3em', // Ukuran step
            style: 'dotted', // Gaya connector (dapat berupa 'solid', 'dashed', atau 'dotted')      
        }}/>
    )
}

export default ClientStepper