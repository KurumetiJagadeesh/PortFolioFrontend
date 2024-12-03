import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } =portfolioData;
  
  return (
    <div>
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#0aa17e82] w-1/3 sm:border-primary sm:flex-row sm:overflow-x-scroll sm:w-full sm:p-5">
          {experiences.map((experience, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-2xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-2xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nemo
            eligendi quibusdam sapiente tempora possimus, soluta sequi optio
            nisi, officia aliquid cumque amet omnis nesciunt perferendis
            expedita dolorem accusamus laboriosam!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
