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
        <div className="full-width position-relative">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#7047ee"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="block-ui-loading align-items-center justify-content-center"
            visible={true}
          />
          {children}
        </div>
      </>
    );
  };
  return loading ? <BlockElement /> : children;
};
