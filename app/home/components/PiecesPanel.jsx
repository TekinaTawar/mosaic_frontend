"use client";

import S from "./PiecesPanel.module.scss";
import { FaSignHanging } from "react-icons/fa6";
import area from "@/public/icons/area.svg";
import rotateClockwise from "@/public/icons/rotateClockwise.svg";
import Image from "next/image";
import { useState } from "react";
import { dxfJsonParsedAtom, fullDxfSvgDataAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { createSVG } from "utils/svgGenerator";

const Piece = ({ pieceJson }) => {

  console.log("pieceJson")
  console.log(pieceJson)
  return (
    <section className={S.piece}>
      <section className={S.pieceImage}>
        {createSVG(pieceJson.vertices)}
      </section>
      <section className={S.pieceDetails}>
        <button>
          <Image
            src={rotateClockwise}
            alt="Rotate Clockwise"
            className={S.rotateClockwise}
          />
          Change Orientation
        </button>
        <section className={S.countSection}>
          <label htmlFor="count">
            <span>#</span>Count
          </label>
          <input type="number" id="count" defaultValue={1} min={1} />
        </section>
        <section className={S.perimeterSection}>
          <span>
            <FaSignHanging className={S.perimeterIcon} />
            Perimeter
          </span>
          <span>4 ft</span>
        </section>
        <section className={S.areaSection}>
          <span>
            <Image src={area} alt="Area" className={S.areaIcon} />
            Area
          </span>
          <span>4 ft</span>
        </section>
      </section>
    </section>
  );
};

const PiecesPanel = () => {
  const [boundriesOrFull, setBoundriesOrFull] = useState("Full Design");
  const fullDxfSvgData = useAtomValue(fullDxfSvgDataAtom);
  const dxfJsonParsed = useAtomValue(dxfJsonParsedAtom);
  console.log("dxfJsonParsed")
  console.log(dxfJsonParsed)

  const toggleBoundriesOrFull = () => {
    if (boundriesOrFull === "Boundries Only") {
      setBoundriesOrFull("Full Design");
    } else {
      setBoundriesOrFull("Boundries Only");
    }
  };

  return (
    <div className={S.piecesPanel}>
      <section className={S.pieceHeader}>
        <span>Filter</span>
        <div className={S.boundriesOrFull}>
          <label
            htmlFor=""
            className={`${boundriesOrFull === "Boundries Only" && S.enable}`}
            onClick={toggleBoundriesOrFull}
          >
            Boundries Only
          </label>
          <label
            htmlFor=""
            className={`${boundriesOrFull === "Full Design" && S.enable}`}
            onClick={toggleBoundriesOrFull}
          >
            Full Design
          </label>
        </div>
        <div className={S.viewOptions}>
          <span>view</span>
          <label htmlFor="">Grid</label>
          <label htmlFor="">List</label>
        </div>
      </section>
      {boundriesOrFull === "Boundries Only" ? (
        <section className={S.pieceBody}>
          {dxfJsonParsed.map((pieceJson, index) => {
            return <Piece key={index} pieceJson={pieceJson} />;
          })}
        </section>
      ) : (
        <section className={S.fullDesign}>
          <div
            dangerouslySetInnerHTML={{ __html: fullDxfSvgData }}
            className={S.designSvg}
          />
        </section>
      )}
    </div>
  );
};
export default PiecesPanel;
