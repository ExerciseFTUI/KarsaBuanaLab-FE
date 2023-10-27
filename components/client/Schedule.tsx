import React, { FC } from "react";

import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea"

interface ScheduleProps {

}

const Schedule: FC<ScheduleProps> = () => {
    return (
        <section className="mt-4 m-10">
            <h1 className="text-2xl font-bold">Schedule Logbook</h1>
            <div className="bg-[#bbbabf] w-full h-0.5 m-2"/>
            <a href="" target="_blank">
                <Button className="w-full bg-moss_green justify-center rounded-xl text-xl text-ghost_white py-2 mt-12 hover:bg-black_brown">
                    Schedule
                </Button>
            </a>
            <div className="mt-2">
                <h3 className="font-semibold text-[#bbbabf] m-2">Notes Here</h3>
                <Textarea className="border-2 border-[#bbbabf] rounded-lg h-24" />
            </div>
        </section>
    );
};

export default Schedule;
