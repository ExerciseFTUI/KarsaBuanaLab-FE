import React from "react";

interface AdminNotesProps {
  notes: string;
  color: string;
  date: string;
}

const AdminNotes: React.FC<AdminNotesProps> = ({ notes, color, date }) => {
  // Construct dynamic class names based on the color prop
  const textColorClass = `text-${color}`;
  const borderColorClass = `border-${color}`;

  return (
    <div className={`ml-16 mt-5 w-5/6`}>
      <h1 className={`${textColorClass} text-lg text-bold mb-2 text-left`}>
        Notes :
      </h1>
      <div
        className={`${textColorClass} text-lg text-semibold border-solid border-2 ${borderColorClass} p-1 px-2 flex justify-between`}
      >
        <span className="text-left">{notes}</span>
        <span className="text-right">{date}</span>
      </div>
    </div>
  );
};

export default AdminNotes;
