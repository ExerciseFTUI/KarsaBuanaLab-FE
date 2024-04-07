import { NotesFromAdmin } from '@/lib/models/project.model';
import React from 'react';

const NotesAdmin = ({ notes }: { notes: NotesFromAdmin[] }) => {

    const sortedNotes = notes.sort((a, b) => {
        // Convert the dates to Date objects for comparison
        const dateA: any = new Date(a.date);
        const dateB: any = new Date(b.date);

        // Sort in descending order
        return dateB - dateA;
    });

    return (
        <div>
            <h1 className="text-black_brown text-2xl font-semibold pb-4">
                Notes From Admin
            </h1>
            <div className="md:max-h-[55vh] overflow-y-scroll custom-scrollbar">
                {sortedNotes.map((note, index) => (
                    <div key={index} className="h-fit w-full border-2 border-dark_green rounded-lg p-2 mb-2">
                        {/* Print date with DD MONTH YEAR like 20 Febuary 2025 */}
                        <p className="font-light text-sm">{new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="font-normal text-base">{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotesAdmin;
