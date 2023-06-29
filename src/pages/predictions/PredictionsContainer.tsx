/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-key */
import React, { FC, useCallback, useEffect, useState } from "react";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../config/store";
import {
  ISearchPredictions,
  defaultSearchPrediction,
} from "../../types/tickers";
import { getPredictions } from "./ducks/operators";
import { Card } from "../../components/Card";
import { EditTable, IColumn } from "../../components/Table/EditTable";
import { useNavigate } from "react-router-dom";
import { TableFooter } from "../../components/Table/TableFooter";
import { SearchPaginateType } from "../../types/generic";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal";
import axios from "axios";

const PredictionsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { entities, loading, pageable } = useSelector(
    (state: IRootState) => state.predictionsReducer
  );
  const [searchParams, setSearchParams] = useState<ISearchPredictions>(
    defaultSearchPrediction
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editId, setEditId] = useState("");

  const [searchKey, setSearchKey] = useState("");

  const fetchData = useCallback(
    (search?: SearchPaginateType) => {
      dispatch(getPredictions({ ...search, search: searchKey }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch, searchKey]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (id: string): void => {
    navigate(`/Predictions/${id}/Edit`);
  };

  const initialCols: IColumn[] = [
    {
      name: "name",
      header: "Name",
    },
    {
      name: "trainFilter",
      header: "Train Filter",
    },
    {
      name: "testFilter",
      header: "Test Filter",
    },
    {
      id: "actions",
      actions: [
        <i
          className="fa fa-pencil trash px-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
          }}
        ></i>,
        <i className="fa fa-trash text-danger cursor-pointer px-2"></i>,
      ],
    },
  ];

  const searchPage = (search: SearchPaginateType) => {
    setSearchParams({
      ...searchParams,
      ...search,
    });
    fetchData({
      ...searchParams,
      ...search,
    });
  };

  return (
    <div className="row">
      {showDeleteModal && (
        <ConfirmDeleteModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={async () => {
            try {
              await axios.delete(`/predictions/${editId}`);
              fetchData();
              setShowDeleteModal(false);
            } catch (error) {}
          }}
          title="Are you sure you want to delete this record ?"
          btnConfirmName="Delete"
        />
      )}
      <div className="col-xl-12 col-12">
        <Card>
          <div className="row">
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchData();
                }}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="col-xl-12 col-12">
        <EditTable
          loading={loading}
          columns={initialCols}
          data={entities}
          showOption={false}
          title="Predictions"
          selectRow={(id, action) => {
            setEditId(id);
            if (action === "edit") {
              handleEdit(id);
            } else {
              setShowDeleteModal(true);
            }
          }}
          // eslint-disable-next-line react/jsx-key
          headerActions={[
            <i
              className="fa fa-plus"
              aria-hidden
              key={new Date().getMilliseconds() + Math.random()}
              onClick={() => {
                navigate("/Predictions/Create");
              }}
            ></i>,
            <i
              className="fa fa-refresh"
              aria-hidden
              key={new Date().getMilliseconds() + Math.random()}
              onClick={() => {
                fetchData();
              }}
            ></i>,
          ]}
        />
        <TableFooter
          searchPage={searchPage}
          totalElements={pageable.totalElements}
          offset={pageable.number * pageable.size}
          first={pageable.number === 0}
          last={pageable.number >= pageable.totalElements / pageable.size - 1}
          numberOfElements={pageable.numberOfElements}
          pageNumber={pageable.number}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PredictionsContainer;
