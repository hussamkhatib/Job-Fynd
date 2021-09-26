import React from "react";
import Image from "next/image";
import hero from "../public/hero.jpg";

const HowItWorks = () => {
  return (
    <section className="py-6 md:py-20 px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl text-center pb-16  md:pb-24 pt-12">
        How it works?
      </h1>

      <div className="flex flex-col  md:flex-row py-12">
        <div className="flex-1 mx-auto">
          <Image src={hero} alt="" />
        </div>
        <div className="flex flex-col flex-1 items-center justify-center px-12">
          <h3 className="text-2xl pb-5">Apy</h3>
          <div>
            Vivamus egestas vitae est et dapibus. Curabitur non libero eget
            ligula semper lobortis eget suscipit erat. Pellentesque iaculis
            volutpat leo.
          </div>
        </div>
      </div>

      <div className="flex  flex-col-reverse  md:flex-row py-12">
        <div className="flex flex-col flex-1 items-center justify-center px-12">
          <h3 className="text-2xl pb-5">Cras Shortlisted.</h3>
          <div>
            Cras pharetra tempor turpis, vitae ultricies magna fermentum in.
            Vestibulum interdum, est sed lacinia pellentesque, turpis sapien
            fringilla tortor, eu porta nulla nisi dapibus nulla.
          </div>
        </div>
        <div className="flex-1 mx-auto">
          <Image src={hero} alt="" />
        </div>
      </div>

      <div className="flex  flex-col md:flex-row py-12">
        <div className="flex-1 mx-auto">
          <Image src={hero} alt="" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <h3 className="text-2xl pb-5">Morbi</h3>
          <div>
            Morbi aliquam, ante a lacinia euismod, augue mauris bibendum metus,
            non iaculis nunc libero eget est. Mauris blandit sem ac auctor
            scelerisque.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
