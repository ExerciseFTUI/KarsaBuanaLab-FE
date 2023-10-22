import React, { FC } from "react";

interface ScheduleProps {

}

const Schedule: FC<ScheduleProps> = () => {
    return (
        <section className="m-10">
            <h1 className="text-2xl font-bold">Schedule Logbook</h1>
            <div className="bg-[#bbbabf] w-full h-0.5 m-2"/>
            <div className="flex bg-normal_green justify-center rounded-xl py-2 mt-12">
                <h2 className="text-xl text-ghost_white">Schedule</h2>
            </div>
            <div className="mt-2">
                <h3 className="font-semibold text-[#bbbabf] m-2">Notes Here</h3>
                <div className="border-2 border-[#bbbabf] rounded-lg h-24">
                    <p className="m-2">Progress saat ini sedang berada pada scheduling sample</p>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
