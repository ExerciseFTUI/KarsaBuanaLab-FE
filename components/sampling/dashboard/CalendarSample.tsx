//@ts-nocheck

"use client"
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const CalendarSample = () => {
  const [projectTitle, setProjectTitle] = useState("");       // useState untuk project title detail yang dipilih
  const [detailProject, setDetailProject] = useState(false);  // useState untuk running modal detail project yang diclick
  const [timeline, setTimeline] = useState("");               // useState untuk set timeline yang ditentukan

  // Function jika tanggal calendar di click
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  }

  // Function jika event atau project di click
  const handleEventClick = (eventInfo) => {
    setProjectTitle(eventInfo.event.title);
    setDetailProject(true);

    // Set date to string
    const startDate = new Date(eventInfo.event.start);
    const formattedStartDate = startDate.toLocaleDateString();

    // Check if the event has both start and end dates
    if (eventInfo.event.end) {
      const endDate = new Date(eventInfo.event.end);
      const formattedEndDate = endDate.toLocaleDateString();
      setTimeline(`${formattedStartDate} - ${formattedEndDate}`);
    } else {
      setTimeline(formattedStartDate);
    }
  };

  // Function untuk menampilkan event 
  function renderEventContent(eventInfo) {
    return (
      <div 
        className='hover:cursor-pointer bg-moss_green border-dark_green'    
        onClick={() => handleEventClick(eventInfo)}
      >
        <b>{eventInfo.timeText}</b>       {/* Jujur ini gua gatau apa */}
        <i>{eventInfo.event.title}</i>    {/* Nampilin title */}
      </div>
    );
  }

  return (
    <>
      {detailProject && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <div className='mb-4 text-black font-bold'>Project Details</div>
            <div className='flex flex-col'>
              <div className='flex mb-2'>
                <span className='font-bold w-24'>Project</span>
                <span> <span className=' font-bold'>:</span> {projectTitle}</span>
              </div>
              <div className='flex mb-2'>
                <span className='font-bold w-24'>Timeline</span>
                <span> <span className=' font-bold'>:</span> {timeline}</span>
              </div>
              <div className='flex'>
                <span className='font-bold w-24'>Who</span>
                <span> <span className=' font-bold'>:</span> Rizky, Firman, Alex</span>
              </div>
            </div>
            <div className='flex justify-center mt-10'>
              <button
                onClick={() => setDetailProject(false)}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col h-max-[90vh]'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: 'XYZ Project - Subang', start: '2024-03-01', end: '2024-03-05' },
            { title: 'Merbabu Project - Jateng', start: '2024-03-05', end: '2024-03-08' },
            { title: 'Prau adalah gunung', start: '2024-03-06', end: '2024-03-09' },
            { title: "Tanah Beracun Project", start : "2024-03-14"}
          ]}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
        />
      </div>
    </>
  );
}

export default CalendarSample;
