import React, { useState, FC } from "react";
import { Button } from "../ui/button";
import SurveyForm from "../forms/SurveyForm";

interface FinishedProps {
  data: any;
}

const Finished: FC<FinishedProps> = ({ data }) => {
  const paymentStatus = data.is_paid ? "Sudah Terbayar" : "Belum Bayar";

  return (
    <section className="mt-4 m-10">
      <h1 className="text-2xl font-bold">Hasil Penelitian</h1>
      <div className="bg-[#bbbabf] w-full h-0.5 m-2" />
      <div className="flex flex-row space-x-2 justify-center m-2 mt-12 ">
        <p>Status pembayaran:</p>
        <p className="font-bold">{paymentStatus}</p>
      </div>
      <SurveyForm data={data} />
      <div className="mt-2">
        <p className="m-2 text-charcoal_green italic">
          Klik Tombol Refresh untuk perbarui status Pembayaran
        </p>
      </div>
    </section>
  );
};

export default Finished;
