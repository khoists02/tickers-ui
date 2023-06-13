import React, { type FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../config/store";
import { getTickerDetails } from "./ducks/operators";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { SvgLogoTicker } from "../../components/SvgLogoTicker";

const TickerDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ ticker: string }>();
  const { entity, loading } = useSelector(
    (state: IRootState) => state.tickersReducer
  );
  useEffect(() => {
    dispatch(getTickerDetails(params.ticker));
  }, [dispatch, params]);

  return (
    <BlockUI loading={loading}>
      <>
        <SvgLogoTicker polygonUrl={entity?.logoUrl || ""} />
      </>
    </BlockUI>
  );
};

export default TickerDetailsContainer;
