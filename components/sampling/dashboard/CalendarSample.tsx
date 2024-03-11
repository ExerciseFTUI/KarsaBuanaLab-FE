//@ts-nocheck

"use client"
import { useState, React } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from "@fullcalendar/interaction" 


const CalendarSample = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [detailProject, setDetailProject] = useState(false);
  const [timeline, setTimeline] = useState("")

  // function for clickable date
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

  // Function if event has clicked
  const handleEventClick = (eventInfo) => {
    setProjectTitle(eventInfo.event.title);
    setDetailProject(true);
    // Access start date and format it as needed
    const startDate = new Date(eventInfo.event.start);
    const formattedStartDate = startDate.toLocaleDateString(); // Format as needed
    setTimeline(formattedStartDate);
  };

  // Function for showing the project or event
  function renderEventContent(eventInfo:any) {
      return(
        <div 
          className=' hover:cursor-pointer'
          onClick={() => handleEventClick(eventInfo)}
        >
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </div>
      )
  }

  return (
    <>
      {/* Set it block and background blur and in the center of x and y  */}
      {detailProject && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <div className='mb-2 text-black'>Project: {projectTitle}</div>
            <div className='mb-2 text-black'>Timeline: {timeline}</div>
            <div className='mb-2 text-black'>Who: Rizky, Firman, Alex</div>
            <div className='flex justify-center items-center'>
              <button
                onClick={() => setDetailProject(false)}
                className='bg-red-500 text-white justify-center items-center px-4 py-2 rounded hover:bg-red-600'
              >
                Close Bro
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=' flex flex-col h-max-[90vh]'>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: 'XYZ Project - Subang', date: '2024-03-01' },
            { title: 'Merbabu Project - Jateng', date: '2024-03-05' }
          ]}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          />
      </div>
    </>
  )
}

export default CalendarSample;