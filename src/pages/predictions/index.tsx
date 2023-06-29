/*
 * AdvaHealth Solutions Pty. Ltd. ("AHS") CONFIDENTIAL
 * Copyright (c) 2022 AdvaHealth Solutions Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of AHS. The intellectual and technical concepts contained
 * herein are proprietary to AHS and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from AHS.  Access to the source code contained herein is hereby forbidden to anyone except current AHS employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of AHS. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 */

import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../../components/AuthRoute";
import { PageNotFound } from "../../components/PageNotFound";

const PredictionsPage = React.lazy(
  async () => await import("./PredictionsContainer")
);

const PredictionsCreateUpdate = React.lazy(
  async () => await import("./PredictionsCreateUpdate")
);

export interface IAuthRoute {
  element?: React.ReactElement;
  path?: string;
  can?: string[];
  index?: boolean;
}

const routes: IAuthRoute[] = [
  {
    path: "/",
    element: <PredictionsPage />,
    can: [],
    index: true,
  },
  {
    path: "/Create",
    element: <PredictionsCreateUpdate />,
    can: [],
    index: true,
  },
  {
    path: ":id/Edit",
    element: <PredictionsCreateUpdate />,
    can: [],
    index: true,
  },
];

const PredictionsRoute: FC = () => {
  return (
    <>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              index={route.index}
              element={<AuthRoute can={route.can} element={route.element} />}
            />
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export const PredictionsRouter = {
  element: <PredictionsRoute />,
  path: "/Predictions/*",
};
