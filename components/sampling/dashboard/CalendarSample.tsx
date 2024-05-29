//@ts-nocheck

"use client"

import { CalendarSample } from "@/lib/models/sampling.model"
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/navigation"

interface dashboardSampling {
  data: CalendarSample[];
  role: string;
}

const CalendarSample : FC<dashboardSampling> = ({ data, role }) => {
  const router = useRouter()
  const [projectTitle, setProjectTitle] = useState("");
  const [detailProject, setDetailProject] = useState(false);
  const [timeline, setTimeline] = useState("");
  const [clickedEvent, setClickedEvent] = useState(null);
  const [updatedData, setUpdatedData] = useState<CalendarSample[]>([]);

  useEffect(() => {
    const updatedData = data.map((item) => {
      const endDate = new Date(item.end);
      endDate.setDate(endDate.getDate() + 1);
      const updatedItem = { ...item, end: endDate.toISOString().split('T')[0] };
      return updatedItem;
    });
    setUpdatedData(updatedData);
  }, [data]);

  

  // // Sementara di off in dulu karena belum terlalu butuh
  // const handleDateClick = (arg) => {
  //   alert(arg.dateStr);
  // }

  const handleEventClick = (eventInfo) => {
    setProjectTitle(eventInfo.event.title);
    setDetailProject(true);
    setClickedEvent(eventInfo.event._def.extendedProps);

    const startDate = new Date(eventInfo.event.start);
    const formattedStartDate = startDate.toLocaleDateString();

    if (eventInfo.event.end) {
      const endDate = new Date(eventInfo.event.end);
      endDate.setDate(endDate.getDate() - 1); 
      const formattedEndDate = endDate.toLocaleDateString();
      setTimeline(`${formattedStartDate} - ${formattedEndDate}`);
    } else {
      setTimeline(formattedStartDate);
    }
  };

  function renderEventContent(eventInfo) {
    const { title } = eventInfo.event;

    return (
      <div 
        className='hover:cursor-pointer bg-moss_green border-dark_green'    
        onClick={() => handleEventClick(eventInfo)}
      >
        <div className=' m--1 py-1 pl-2'><i>{title}</i></div>
      </div>
    );
  }

  // To close component when click outside the component detail information
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-content")) {
        setDetailProject(false);
      }
    };

    if (detailProject) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailProject, setDetailProject]);

  return (
    <>
      {detailProject && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black  bg-opacity-50'>   {/* Background*/}
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
          {/* Component detail project */}
          <div className='z-50 modal-content bg-white p-4 rounded-lg px-10 py-5'>
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
              <div className='flex mb-2'>
                <span className='font-bold w-24'>Location</span>
                <span> <span className=' font-bold'>:</span> {clickedEvent.location}</span>
              </div>
              <div className='flex'>
                <span className='font-bold w-24'>Who</span>
                <span className='font-bold'>: </span>
                <ul>
                  {/* Check if there are people assigned to the project */}
                  {clickedEvent && clickedEvent.person && clickedEvent.person.length > 0 ? (
                    clickedEvent.person.map((person, index) => (
                      <li key={person}> <span>&nbsp;</span> {index + 1}. {person}</li>
                    ))
                  ) : (
                    <li><span>&nbsp;</span>No people assigned to this project yet</li>
                  )}
                </ul>
              </div>
            </div>
            <div className='flex justify-center gap-10 mt-10'>
              <button
                onClick={() => {
                  const basePath = "sampling/";
                  const path = role.toLowerCase() === "user" ? "sample/" : "project/";
                  router.push(`${basePath}${path}${clickedEvent._id}`);
                }}                
                className=' bg-moss_green text-white px-4 py-2 rounded hover:bg-dark_green'
              >
                See Project
              </button>
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
          // weekends={false}
          events={updatedData}  
          // dateClick={handleDateClick}
          eventContent={renderEventContent}
        />
      </div>
    </>
  );
}

export default CalendarSample;