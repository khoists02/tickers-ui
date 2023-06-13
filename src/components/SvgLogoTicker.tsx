/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from "axios";
import React, { type FC, useEffect, useState } from "react";

export const SvgLogoTicker: FC<{ polygonUrl: string }> = ({ polygonUrl }) => {
  const [svgContent, setSvgContent] = useState("");
  useEffect(() => {
    if (polygonUrl) {
      const getLogoCsvUrl = async () => {
        const result = await axios.get("/tickers/logo", {
          params: {
            url: polygonUrl,
          },
        });

        if (result?.data) {
          setSvgContent(result?.data);
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getLogoCsvUrl();
    }
  }, [polygonUrl]);
  return (
    <span
      className="svg-content"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    ></span>
  );
};
