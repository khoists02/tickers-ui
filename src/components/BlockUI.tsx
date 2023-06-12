import React, { type FC } from "react";
import { ThreeDots } from "react-loader-spinner";

interface IBlockUI {
  loading: boolean;
  children: React.ReactElement;
}

export const BlockUI: FC<IBlockUI> = ({ loading = false, children }) => {
  const BlockElement = (): React.ReactElement => {
    return (
      <>
        {children}
        <div className="full-width" style={{ zIndex: 1000 }}>
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#7047ee"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
            visible={true}
          />
        </div>
      </>
    );
  };
  return loading ? <BlockElement /> : children;
};
