import React, { useState, FC, useEffect } from "react";
import { Button } from "../ui/button";
import SurveyForm from "../forms/SurveyForm";
import { QuestionType, SurveySchema } from "@/lib/type";
import { getSurvey } from "@/lib/actions/client.actions";

interface FinishedProps {
  data: any;
  resiNumber: string;
}

const Finished: FC<FinishedProps> = ({ data, resiNumber }) => {
  const [survey, setSurvey] = useState<SurveySchema>();
  const [loading, setLoading] = useState(false);

  const paymentStatus = data.is_paid ? "Sudah Terbayar" : "Belum Bayar";

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getSurvey();
      setSurvey(data);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="mt-4 m-10">
      <h1 className="text-2xl font-bold">Hasil Penelitian</h1>
      <div className="bg-[#bbbabf] w-full h-0.5 m-2" />
      <div className="flex flex-row space-x-2 justify-center m-2 mt-12 ">
        <p>Status pembayaran:</p>
        <p className="font-bold">{paymentStatus}</p>
      </div>
      {/* {data.is_survey_filled ? (
        <SurveyForm data={data} resiNumber={resiNumber} />
      ) : (
        <a href={data.report} target="_blank">
          <Button
            disabled={!data.is_paid}
            className="flex bg-black_brown justify-center rounded-xl text-xl text-ghost_white py-2 w-full"
          >
            Laporan Hasil Penelitian
          </Button>
        </a>
      )} */}
      {data.is_survey_filled ? (
        <Button
          // disabled={!data.is_paid}
          className="flex bg-black_brown justify-center rounded-xl text-xl text-ghost_white py-2 w-full"
        >
          Laporan Hasil Penelitian
        </Button>
      ) : (
        survey && (
          <SurveyForm questions={survey} data={data} resiNumber={resiNumber} />
        )
      )}

      <div className="mt-2">
        <p className="m-2 text-charcoal_green italic">
          Klik Tombol Refresh untuk perbarui status Pembayaran
        </p>
      </div>
    </section>
  );
};

export default Finished;
