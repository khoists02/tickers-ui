import React, { FC, useState } from "react";

interface ICard {
  isExpended?: boolean;
  title?: string;
  subTitle?: string;
  children: React.ReactElement;
  hasSearchBox?: boolean;
  search?: (value: string) => void;
  widthTile?: number;
}

export const Card: FC<ICard> = ({
  isExpended = true,
  children,
  title,
  subTitle,
  hasSearchBox = false,
  search,
  widthTile = 100,
}) => {
  const [expended, setExpended] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  return (
    <>
      <div className="box">
        {title && (
          <div className="box-header d-flex justify-content-between">
            <div className="box-title" style={{ flex: 1 }}>
              <div className="d-flex align-items-center">
                <div>
                  <h5 style={{ minWidth: widthTile }}>{title}</h5>
                  {subTitle && <h6 className="subtitle">{subTitle}</h6>}
                </div>
                {hasSearchBox && (
                  <input
                    style={{ width: 250 }}
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (search) search(searchKey);
                      }
                    }}
                    value={searchKey}
                    type="search"
                    className="form-control form-control-sm mx-2"
                  />
                )}
              </div>
            </div>

            {isExpended && (
              <h4
                onClick={() => {
                  setExpended(!expended);
                }}
              >
                <i className="fa fa-angle-down cursor-pointer"></i>
              </h4>
            )}
          </div>
        )}

        <div className="box-body">{expended && children}</div>
      </div>
    </>
  );
};
